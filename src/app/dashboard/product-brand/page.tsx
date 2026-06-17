"use client";

import { useEffect, useState } from "react";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
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
import { Badge } from "@/src/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";

import { MoreHorizontal, Edit, Trash2, Search, Building2 } from "lucide-react";

import { useProductBrands } from "@/src/hooks/useProductBrands";
import { useCompanies } from "@/src/hooks/useCompanies";

import ProductBrandDialog from "@/src/components/product-brand/ProductBrandDialogueForm";
import TableSkeleton from "@/src/components/common/TableSkeleton";

export default function ProductBrandPage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");

  const [editId, setEditId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const { fetchBrands, deleteBrand, brands, fetchLoading } = useProductBrands();

  const { fetchCompanies } = useCompanies();

  useEffect(() => {
    fetchBrands({ page, limit, q: search });
  }, [page, limit, search, fetchBrands]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Product Brands</h1>
          <p className="text-muted-foreground">Manage all brands</p>
        </div>

        <ProductBrandDialog
          brandId={editId}
          onClose={() => {
            setEditId(null);
            setOpen(false);
          }}
        />
      </div>

      {/* SEARCH */}
      <div className="flex gap-3 max-w-md">
        <Search className="w-4 h-4 mt-3 text-muted-foreground" />
        <Input
          placeholder="Search brands..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>

      {/* TABLE */}
      <Card>
        <CardHeader>
          <CardTitle>All Brands</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Manufacturer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {fetchLoading ? (
                <TableSkeleton />
              ) : brands.length > 0 ? (
                brands?.map((b) => (
                  <TableRow key={b.id}>
                    <TableCell className="font-medium">{b.name}</TableCell>

                    <TableCell>{b.slug}</TableCell>

                    <TableCell className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-muted-foreground" />
                      {b.manufacturer_id}
                    </TableCell>

                    <TableCell>
                      <Badge variant="outline">
                        {b.is_delete ? "Deleted" : "Active"}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setEditId(b.id);
                              setOpen(true);
                            }}
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            className="text-red-500"
                            onClick={() => deleteBrand(b.id)}
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
                  <TableCell colSpan={5} className="text-center py-10">
                    No data found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
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
