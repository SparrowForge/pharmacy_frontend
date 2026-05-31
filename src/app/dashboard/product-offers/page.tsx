"use client";

import { useEffect, useState } from "react";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Badge } from "@/src/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";

import { Search, MoreHorizontal, Edit, Trash2, Gift } from "lucide-react";

import { useProductOffers } from "@/src/hooks/useProductOffers";
import { initialLimit, initialPage } from "@/src/constants/utils";

import Loading from "@/src/components/common/Loading";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";

import ProductOfferDialogForm from "@/src/components/product-offer/ProductOfferDialogForm";

export default function ProductOffersPage() {
  const [page, setPage] = useState(initialPage);
  const [limit] = useState(initialLimit);
  const [search, setSearch] = useState("");
  const [includeDeleted, setIncludeDeleted] = useState(false);

  const [editId, setEditId] = useState<string | null>(null);

  const { fetchProductOffers, deleteProductOffer, offers, fetchLoading } =
    useProductOffers();

  /* ================= FETCH ================= */
  useEffect(() => {
    fetchProductOffers({
      page,
      limit,
      q: search,
      includeDeleted,
    });
  }, [page, limit, search, includeDeleted, fetchProductOffers]);

  /* ================= HELPERS ================= */
  const getDiscountTypeColor = (type: string) => {
    switch (type) {
      case "percentage":
        return "bg-blue-100 text-blue-700";
      case "fixed":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary/10 flex items-center justify-center rounded-xl">
            <Gift className="w-6 h-6 text-primary" />
          </div>

          <div>
            <h1 className="text-2xl font-bold">Product Offers</h1>
            <p className="text-muted-foreground">
              Manage discounts and promotional offers
            </p>
          </div>
        </div>

        <ProductOfferDialogForm
          offerId={editId}
          onClose={() => setEditId(null)}
        />
      </div>

      {/* SEARCH + FILTER */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />

          <Input
            className="pl-10"
            placeholder="Search offers..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={includeDeleted}
            onChange={(e) => {
              setIncludeDeleted(e.target.checked);
              setPage(1);
            }}
          />
          Include Deleted
        </label>
      </div>

      {/* TABLE */}
      <Card>
        <CardHeader>
          <CardTitle>All Product Offers</CardTitle>
        </CardHeader>

        <CardContent>
          {fetchLoading ? (
            <Loading text="Loading offers..." />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Product ID</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Start</TableHead>
                  <TableHead>End</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {offers?.map((item) => (
                  <TableRow key={item.id}>
                    {/* TITLE */}
                    <TableCell>
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.description || "No description"}
                        </p>
                      </div>
                    </TableCell>

                    {/* PRODUCT */}
                    <TableCell>{item.product_id}</TableCell>

                    {/* DISCOUNT */}
                    <TableCell>
                      <Badge
                        className={getDiscountTypeColor(
                          item.phar_discount_type,
                        )}
                      >
                        {item.phar_discount_type} - {item.discount_value}
                      </Badge>
                    </TableCell>

                    {/* START */}
                    <TableCell>{item.starts_at?.split("T")[0]}</TableCell>

                    {/* END */}
                    <TableCell>{item.ends_at?.split("T")[0]}</TableCell>

                    {/* STATUS */}
                    <TableCell>
                      <Badge
                        className={
                          item.is_active
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }
                      >
                        {item.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>

                    {/* ACTIONS */}
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setEditId(item.id)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            className="text-red-500"
                            onClick={() => deleteProductOffer(item.id)}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* PAGINATION */}
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Prev
        </Button>

        <Button variant="outline" onClick={() => setPage((p) => p + 1)}>
          Next
        </Button>
      </div>
    </div>
  );
}
