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

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";

import { MoreHorizontal, Edit, Trash2, Image } from "lucide-react";

import { useAppSelector } from "@/src/redux/hooks";
import { useProductImages } from "@/src/hooks/useProductImages";
import { initialLimit, initialPage } from "@/src/constants/utils";

import Loading from "@/src/components/common/Loading";
import ProductImageDialog from "@/src/components/product-image/ProductImageDialogForm";

export default function ProductImagesPage() {
  const [page, setPage] = useState(initialPage);
  const [limit] = useState(initialLimit);
  const [search, setSearch] = useState("");
  const [includeDeleted, setIncludeDeleted] = useState(false);

  const [editId, setEditId] = useState<string | null>(null);

  const { fetchProductImages, deleteProductImage } = useProductImages();

  const { productImages, fetchLoading, total } = useAppSelector(
    (state) => state.productImages,
  );

  /* FETCH */
  useEffect(() => {
    fetchProductImages({
      page,
      limit,
      q: search,
      includeDeleted,
    });
  }, [page, limit, search, includeDeleted]);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <Image className="w-5 h-5" />
          Product Images
        </h1>

        <ProductImageDialog
          productImageId={editId}
          onClose={() => setEditId(null)}
        />
      </div>

      {/* SEARCH + FILTER */}
      <div className="flex gap-3">
        <Input
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

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
          <CardTitle>All Product Images</CardTitle>
        </CardHeader>

        <CardContent>
          {fetchLoading ? (
            <Loading text="Loading product images..." />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Media</TableHead>
                  <TableHead>Primary</TableHead>
                  <TableHead>Sort</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {productImages?.length ? (
                  productImages.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.product_id}</TableCell>
                      <TableCell>{item.media_id}</TableCell>

                      <TableCell>
                        <Badge
                          className={
                            item.is_primary
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                          }
                        >
                          {item.is_primary ? "Yes" : "No"}
                        </Badge>
                      </TableCell>

                      <TableCell>{item.sort_order}</TableCell>

                      {/* ACTIONS */}
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="ghost">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => setEditId(item.id)}
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => deleteProductImage(item.id)}
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-10 text-muted-foreground"
                    >
                      No data found
                    </TableCell>
                  </TableRow>
                )}
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

        <Button
          variant="outline"
          disabled={productImages.length < limit}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
