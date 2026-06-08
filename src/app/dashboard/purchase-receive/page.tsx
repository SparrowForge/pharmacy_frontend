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
import { Badge } from "@/src/components/ui/badge";

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

import {
  Search,
  MoreHorizontal,
  FileText,
  Calendar,
  DollarSign,
  Trash2,
  Eye,
} from "lucide-react";

import { cn } from "@/src/lib/utils";
import Loading from "@/src/components/common/Loading";
import { usePurchaseOrderReceive } from "@/src/hooks/usePurchaseOrderReceive";


export default function PurchaseReceiptsPage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const [search, setSearch] = useState("");
  const [includeDeleted, setIncludeDeleted] = useState(false);

  const { fetchPurchaseReceipts, fetchLoading, purchaseOrderReceive } =
    usePurchaseOrderReceive();



  // fetch
  useEffect(() => {
    fetchPurchaseReceipts(page, limit);
  }, [fetchPurchaseReceipts, page, limit]);



  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <FileText className="w-6 h-6 text-primary" />
          </div>

          <div>
            <h1 className="text-2xl font-bold">Purchase Receipts</h1>
            <p className="text-muted-foreground">
              Manage all purchase receiving records
            </p>
          </div>
        </div>
      </div>

      {/* FILTERS */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        {/* SEARCH */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />

          <Input
            placeholder="Search receipt number..."
            className="pl-10"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>

        {/* INCLUDE DELETED */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={includeDeleted}
            onChange={(e) => {
              setIncludeDeleted(e.target.checked);
              setPage(1);
            }}
          />
          <label className="text-sm">Include Deleted</label>
        </div>
      </div>

      {/* TABLE */}
      <Card>
        <CardHeader>
          <CardTitle>All Receipts</CardTitle>
        </CardHeader>

        <CardContent>
          {fetchLoading ? (
            <Loading text="Loading receipts..." />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Receipt</TableHead>
                  <TableHead>PO</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Received At</TableHead>
                  <TableHead className="w-[80px]" />
                </TableRow>
              </TableHeader>

              <TableBody>
                {purchaseOrderReceive?.length ? (
                  purchaseOrderReceive?.map((item: any) => (
                    <TableRow key={item.id}>
                      {/* Receipt */}
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-primary" />
                          <div>
                            <p className="font-medium">{item?.receipt_number}</p>
                            <p className="text-xs text-muted-foreground">
                              ID: {item?.id.slice(0, 8)}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      {/* PO */}
                      <TableCell className="text-sm text-muted-foreground">
                        {item?.purchase_order_id.slice(0, 8)}...
                      </TableCell>

                      {/* STATUS */}
                      <TableCell>
                        <Badge
                          className={cn(
                            item?.status === "received"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700",
                          )}
                        >
                          {item?.status}
                        </Badge>
                      </TableCell>

                      {/* TOTAL */}
                      <TableCell className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                        {item?.total_amount}
                      </TableCell>

                      {/* DATE */}
                      <TableCell className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {new Date(item?.received_at).toLocaleDateString()}
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

                            <DropdownMenuItem
                              className="text-destructive"
                              // onClick={() => deletePurchaseReceipt(item.id)}
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
                      colSpan={6}
                      className="text-center py-10 text-muted-foreground"
                    >
                      No receipts found
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

        <Button variant="outline" onClick={() => setPage((p) => p + 1)}>
          Next
        </Button>
      </div>
    </div>
  );
}
