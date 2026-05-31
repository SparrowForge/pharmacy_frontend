"use client";

import { useEffect, useState } from "react";

import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
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

import { MoreHorizontal, Edit, Trash2, Search } from "lucide-react";
import { useAppSelector } from "@/src/redux/hooks";

import { useProductTags } from "@/src/hooks/useProductTags";
import ProductTagDialog from "@/src/components/product-tag/ProductTagDialogForm";
import Loading from "@/src/components/common/Loading";

export default function ProductTagsPage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [includeDeleted, setIncludeDeleted] = useState(false);

  const [editId, setEditId] = useState<string | null>(null);

  const { fetchProductTags, deleteProductTag } = useProductTags();
  const { productTags, fetchLoading } = useAppSelector(
    (state) => state.productTags,
  );

  useEffect(() => {
    fetchProductTags({
      page,
      limit,
      q: search,
      includeDeleted,
    });
  }, [page, search, includeDeleted]);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Product Tags</h1>

        <ProductTagDialog tagId={editId} onClose={() => setEditId(null)} />
      </div>

      {/* SEARCH + FILTER */}
      <div className="flex gap-3 items-center">
        <div className="relative w-80">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          <Input
            className="pl-10"
            placeholder="Search tags..."
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
          <CardTitle>All Product Tags</CardTitle>
        </CardHeader>

        <CardContent>
          {fetchLoading ? (
            <Loading text="Loading data..." />
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product ID</TableHead>
                    <TableHead>Tag</TableHead>
                    <TableHead className="w-[80px]" />
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {productTags?.length ? (
                    productTags.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.product_id}</TableCell>
                        <TableCell>{item.tag}</TableCell>

                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
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
                                className="text-red-500"
                                onClick={() => deleteProductTag(item.id)}
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
                      <TableCell colSpan={3} className="text-center py-6">
                        No data found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>

              <div className="flex justify-end gap-2 mt-4">
                <Button
                  variant="outline"
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  Prev
                </Button>

                <Button onClick={() => setPage((p) => p + 1)}>Next</Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
