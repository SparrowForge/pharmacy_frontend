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

import { AlertTriangle, CalendarClock } from "lucide-react";

import { useDashboard } from "@/src/hooks/useDashboard";
import TableSkeleton from "@/src/components/common/TableSkeleton";

const LIMIT = 20;
const DAYS = 7;

const ExpiringPage = () => {
  const [page, setPage] = useState(1);

  const { expiringSoonItems, expiringSoonLoading, fetchExpiringSoon } =
    useDashboard();

  useEffect(() => {
    fetchExpiringSoon(DAYS, page, LIMIT);
  }, [page, fetchExpiringSoon]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Expiring Soon</h1>

        <p className="text-muted-foreground">
          Products expiring within the next {DAYS} days
        </p>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Expiring Inventory</CardTitle>

          <CardDescription>
            Showing {expiringSoonItems?.length || 0} items
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Batch No</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-right">Selling Price</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {expiringSoonLoading ? (
                <TableSkeleton />
              ) : expiringSoonItems?.length > 0 ? (
                expiringSoonItems.map((item: any) => (
                  <TableRow key={item.id}>
                    {/* Product */}
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10">
                          <CalendarClock className="h-5 w-5 text-red-500" />
                        </div>

                        <div>
                          <p className="font-medium">{item.product_name}</p>

                          <p className="text-xs text-muted-foreground">
                            {item.barcode || "No barcode"}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    {/* SKU */}
                    <TableCell>{item.product_sku}</TableCell>

                    {/* Category */}
                    <TableCell>
                      <Badge variant="secondary">{item.category_name}</Badge>
                    </TableCell>

                    {/* Batch */}
                    <TableCell>{item.batch_number}</TableCell>

                    {/* Expiry Date */}
                    <TableCell>
                      {new Date(item.expiry_date).toLocaleDateString()}
                    </TableCell>

                    {/* Quantity */}
                    <TableCell className="text-right">
                      {item.quantity_on_hand}
                    </TableCell>

                    {/* Selling Price */}
                    <TableCell className="text-right font-medium">
                      ৳{Number(item.selling_price).toFixed(2)}
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      {item.days_until_expiry <= 7 ? (
                        <Badge variant="destructive">
                          Expires in {item.days_until_expiry} days
                        </Badge>
                      ) : (
                        <Badge className="bg-orange-500 text-white hover:bg-orange-500">
                          {item.days_until_expiry} days left
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="py-10 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <AlertTriangle className="h-8 w-8 text-muted-foreground" />

                      <p className="text-muted-foreground">
                        No expiring products found
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
          disabled={expiringSoonItems?.length < LIMIT}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ExpiringPage;
