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

import { Search, MoreHorizontal, Edit, Trash2, Package } from "lucide-react";

import { useProductBatches } from "@/src/hooks/useProductBatches";
import { initialLimit, initialPage } from "@/src/constants/utils";

import Loading from "@/src/components/common/Loading";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import ProductBatchFormDialog from "@/src/components/product-batch/ProductBatchDialogForm";

export default function ProductBatchesPage() {
  const [page, setPage] = useState(initialPage);
  const [limit] = useState(initialLimit);
  const [search, setSearch] = useState("");
  const [includeDeleted, setIncludeDeleted] = useState(false);

  const [editId, setEditId] = useState<string | null>(null);

  const { fetchProductBatches, deleteProductBatch, batches, fetchLoading } =
    useProductBatches();

  /* ================= FETCH ================= */
  useEffect(() => {
    fetchProductBatches({
      page,
      limit,
      q: search,
      includeDeleted,
    });
  }, [page, limit, search, includeDeleted, fetchProductBatches]);

  /* ================= UI HELPERS ================= */
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700";
      case "inactive":
        return "bg-red-100 text-red-700";
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
            <Package className="w-6 h-6 text-primary" />
          </div>

          <div>
            <h1 className="text-2xl font-bold">Product Batches</h1>
            <p className="text-muted-foreground">
              Manage all product inventory batches
            </p>
          </div>
        </div>

        <ProductBatchFormDialog
          batchId={editId}
          onClose={() => setEditId(null)}
        />
      </div>

      {/* SEARCH + FILTER */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />

          <Input
            className="pl-10"
            placeholder="Search batches..."
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
          <CardTitle>All Product Batches</CardTitle>
        </CardHeader>

        <CardContent>
          {fetchLoading ? (
            <Loading text="Loading batches..." />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Batch</TableHead>
                  <TableHead>Barcode</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead>Purchase</TableHead>
                  <TableHead>Selling</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {batches?.map((item) => (
                  <TableRow key={item.id}>
                    {/* PRODUCT */}
                    <TableCell>
                      <div className="flex flex-col">
                        <p className="font-medium">
                          Batch #{item.batch_number}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Product ID: {item.product_id}
                        </p>
                      </div>
                    </TableCell>

                    {/* BARCODE */}
                    <TableCell>{item.barcode}</TableCell>

                    {/* QTY */}
                    <TableCell>{item.quantity_on_hand}</TableCell>

                    {/* PURCHASE */}
                    <TableCell>{item.purchase_price}</TableCell>

                    {/* SELLING */}
                    <TableCell>{item.selling_price}</TableCell>

                    {/* STATUS */}
                    <TableCell>
                      <Badge className={getStatusColor(item.status)}>
                        {item.status}
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
                            onClick={() => deleteProductBatch(item.id)}
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
