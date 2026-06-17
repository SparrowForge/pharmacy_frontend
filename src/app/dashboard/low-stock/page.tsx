"use client";

import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";

import { AlertTriangle, Package } from "lucide-react";

import { useDashboard } from "@/src/hooks/useDashboard";
import TableSkeleton from "@/src/components/common/TableSkeleton";

const LIMIT = 20;

const LowStockPage = () => {
  const [page, setPage] = useState(1);

  const { lowStockItems, lowStockLoading, fetchLowStock } = useDashboard();

  useEffect(() => {
    fetchLowStock(page, LIMIT);
  }, [page, fetchLowStock]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Low Stock Items</h1>
        <p className="text-muted-foreground">
          Products that are below their minimum stock level
        </p>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Low Stock Inventory</CardTitle>
          <CardDescription>
            Showing {lowStockItems?.length || 0} items
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Rack No</TableHead>
                <TableHead className="text-right">Current Stock</TableHead>
                <TableHead className="text-right">Minimum Stock</TableHead>
                <TableHead className="text-right">Reorder Level</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {lowStockLoading ? (
                <TableSkeleton />
              ) : lowStockItems?.length > 0 ? (
                lowStockItems.map((item: any) => {
                  const stock = Number(item.current_stock);

                  return (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10">
                            <Package className="h-5 w-5 text-orange-500" />
                          </div>

                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {item.barcode || "No barcode"}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>{item.sku}</TableCell>

                      <TableCell>
                        <Badge variant="secondary">{item.category_name}</Badge>
                      </TableCell>

                      <TableCell>{item.brand_name}</TableCell>

                      <TableCell>{item.rack_no}</TableCell>

                      <TableCell className="text-right">
                        <span
                          className={
                            stock <= 0
                              ? "font-semibold text-red-600"
                              : "font-semibold text-orange-600"
                          }
                        >
                          {stock}
                        </span>
                      </TableCell>

                      <TableCell className="text-right">
                        {item.minimum_stock}
                      </TableCell>

                      <TableCell className="text-right">
                        {item.reorder_level}
                      </TableCell>

                      <TableCell>
                        {stock <= 0 ? (
                          <Badge variant="destructive">Out of Stock</Badge>
                        ) : (
                          <Badge>Low Stock</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="py-10 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <AlertTriangle className="h-8 w-8 text-muted-foreground" />
                      <p className="text-muted-foreground">
                        No low stock items found
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Prev
        </Button>

        <Button
          variant="outline"
          disabled={lowStockItems?.length < LIMIT}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default LowStockPage;
