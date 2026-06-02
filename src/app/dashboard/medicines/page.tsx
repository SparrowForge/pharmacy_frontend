"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Badge } from "@/src/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";

import {
  Search,
  Plus,
  Filter,
  Download,
  MoreHorizontal,
  Package,
  Edit,
  Trash2,
  Eye,
  Copy,
} from "lucide-react";

import { cn } from "@/src/lib/utils";
import { useProducts } from "@/src/hooks/useProducts";
import Loading from "@/src/components/common/Loading";
import { initialLimit, initialPage } from "@/src/constants/utils";

export default function ProductsPage() {
  const [page, setPage] = useState(initialPage);
  const [limit] = useState(initialLimit);
  const [search, setSearch] = useState("");
  const [includeDeleted, setIncludeDeleted] = useState(false);

  const { fetchProducts, deleteProduct, products, fetchLoading, total } =
    useProducts();

  /* ================= FETCH ================= */
  useEffect(() => {
    fetchProducts({
      page,
      limit,
      q: search,
      includeDeleted,
    });
  }, [page, limit, search, includeDeleted, fetchProducts]);



  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-muted-foreground">
            Manage your medicine catalog and pricing
          </p>
        </div>

        <div className="flex gap-2">
          {/* <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button> */}

          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link href="/dashboard/medicines/new">
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Link>
          </Button>
        </div>
      </div>

      {/* FILTERS */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* SEARCH */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />

              <Input
                className="pl-10"
                placeholder="Search by name, generic, barcode..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
            </div>

            {/* INCLUDE DELETED */}
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

            {/* <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button> */}
          </div>
        </CardContent>
      </Card>

      {/* TABLE */}
      <Card>
        <CardHeader>
          <CardTitle>Product Catalog</CardTitle>
          <CardDescription>
            Showing {products?.length || 0} of {total || 0} products
          </CardDescription>
        </CardHeader>

        <CardContent>
          {fetchLoading ? (
            <Loading text="Loading products..." />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Generic</TableHead>
                  <TableHead>Brand</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Stock</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>

              <TableBody>
                {products?.map((product) => (
                  <TableRow key={product.id}>
                    {/* PRODUCT */}
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 flex items-center justify-center rounded-lg">
                          <Package className="w-5 h-5 text-primary" />
                        </div>

                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {product.barcode}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    {/* GENERIC */}
                    <TableCell className="text-muted-foreground">
                      {product.generic_name}
                    </TableCell>

                    {/* BRAND */}
                    <TableCell>{product.brand_id}</TableCell>

                    {/* CATEGORY */}
                    <TableCell>
                      <Badge variant="secondary">{product.category_id}</Badge>
                    </TableCell>

                    {/* SUPPLIER */}
                    <TableCell className="text-muted-foreground">
                      {product.supplier_id}
                    </TableCell>

                    {/* PRICE */}
                    <TableCell className="text-right font-semibold text-primary">
                      ${Number(product.selling_price).toFixed(2)}
                    </TableCell>

                    {/* STOCK */}
                    <TableCell className="text-right">
                      <span
                        className={cn(
                          "font-medium",
                          product.current_stock < 10 && "text-red-600",
                        )}
                      >
                        {product.current_stock}
                      </span>
                    </TableCell>

                    {/* ACTIONS */}
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </DropdownMenuItem>

                          <Link
                            href={`/dashboard/medicines/edit/${product.id}`}
                          >
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                          </Link>

                          <DropdownMenuItem>
                            <Copy className="w-4 h-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => deleteProduct(product.id)}
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
