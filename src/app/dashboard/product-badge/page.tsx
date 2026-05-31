"use client";

import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

import { Input } from "@/src/components/ui/input";

import { Button } from "@/src/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";

import { Search, MoreHorizontal, Edit, Trash2, Tag } from "lucide-react";

import Loading from "@/src/components/common/Loading";

import { useProductBadges } from "@/src/hooks/useProductBadges";

import { useAppSelector } from "@/src/redux/hooks";

import { initialLimit, initialPage } from "@/src/constants/utils";
import ProductBadgeDialogForm from "@/src/components/product-badge/ProductBadgeDialogForm";

export default function ProductBadgesPage() {
  const [page, setPage] = useState(initialPage);

  const [search, setSearch] = useState("");

  const [editBadgeId, setEditBadgeId] = useState<string | null>(null);

  const { fetchProductBadges, deleteProductBadge } = useProductBadges();

  const { productBadges, fetchLoading } = useAppSelector(
    (state) => state.productBadge,
  );

  useEffect(() => {
    fetchProductBadges({
      page,
      limit: initialLimit,
      q: search,
    });
  }, [page, search, fetchProductBadges]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Product Badges</h1>

          <p className="text-muted-foreground">Manage product badges</p>
        </div>

        <ProductBadgeDialogForm
          badgeId={editBadgeId}
          onClose={() => setEditBadgeId(null)}
        />
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

        <Input
          className="pl-10"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Badges</CardTitle>
        </CardHeader>

        <CardContent>
          {fetchLoading ? (
            <Loading text="Loading..." />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product ID</TableHead>

                  <TableHead>Badge</TableHead>

                  <TableHead>Created</TableHead>

                  <TableHead />
                </TableRow>
              </TableHeader>

              <TableBody>
                {productBadges?.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.product_id}</TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4" />

                        {item.badge}
                      </div>
                    </TableCell>

                    <TableCell>
                      {new Date(item.created_at).toLocaleDateString()}
                    </TableCell>

                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => setEditBadgeId(item.id)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => deleteProductBadge(item.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
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
