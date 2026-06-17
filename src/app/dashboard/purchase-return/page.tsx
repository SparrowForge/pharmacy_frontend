"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Badge } from "@/src/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/src/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

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
  MoreHorizontal,
  Plus,
  Search,
  Eye,
  Trash2,
  LoaderIcon,
} from "lucide-react";

import { usePurchaseReturn } from "@/src/hooks/usePurchaseReturn";
import { useCompanies } from "@/src/hooks/useCompanies";
import { usePurchaseOrders } from "@/src/hooks/usePurchaseOrders";
import TableSkeleton from "@/src/components/common/TableSkeleton";

export default function PurchaseReturnsPage() {
  const [search, setSearch] = useState("");

  const [supplierId, setSupplierId] = useState("all");
  const [purchaseOrderId, setPurchaseOrderId] = useState("all");
  const [status, setStatus] = useState("all");

  const [includeDeleted, setIncludeDeleted] = useState(false);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { purchaseReturns, fetchPurchaseReturns, fetchLoading, total } =
    usePurchaseReturn();

  const { companies, fetchCompanies } = useCompanies();
  const { purchaseOrders, fetchPurchaseOrders } = usePurchaseOrders();

  const suppliers = companies?.filter(
    (c: any) => c.company_type === "supplier",
  );

  // INIT LOAD
  useEffect(() => {
    fetchCompanies();
    fetchPurchaseOrders({ page: 1, limit: 100 });
  }, []);

  // FETCH RETURNS
  useEffect(() => {
    fetchPurchaseReturns({
      page,
      limit,
      q: search,

      supplierId: supplierId === "all" ? undefined : supplierId,

      purchaseOrderId: purchaseOrderId === "all" ? undefined : purchaseOrderId,

      status: status === "all" ? undefined : status,

      includeDeleted,
    });
  }, [
    page,
    limit,
    search,
    supplierId,
    purchaseOrderId,
    status,
    includeDeleted,
  ]);

  const totalPages = Math.ceil(total / limit);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Purchase Returns</h1>
          <p className="text-muted-foreground">
            Manage all purchase return records
          </p>
        </div>

        {/* <Button asChild>
          <Link href="/dashboard/purchase-return/new">
            <Plus className="w-4 h-4 mr-2" />
            Create Return
          </Link>
        </Button> */}
      </div>

      {/* FILTERS */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* SEARCH */}
            <div>
              <Label>Search</Label>
              <div className="relative mt-1">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  className="pl-9"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {/* SUPPLIER */}
            <div>
              <Label>Supplier</Label>
              <Select value={supplierId} onValueChange={setSupplierId}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Suppliers" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="all">All</SelectItem>

                  {suppliers?.map((s: any) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* PURCHASE ORDER */}
            <div>
              <Label>Purchase Order</Label>
              <Select
                value={purchaseOrderId}
                onValueChange={setPurchaseOrderId}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Orders" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="all">All</SelectItem>

                  {purchaseOrders?.map((po: any) => (
                    <SelectItem key={po.id} value={po.id}>
                      {po.po_number}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* STATUS */}
            <div>
              <Label>Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* LIMIT */}
            <div>
              <Label>Limit</Label>
              <Select
                value={String(limit)}
                onValueChange={(v) => setLimit(Number(v))}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* INCLUDE DELETED */}
            <div className="flex items-center gap-2 mt-6">
              <input
                type="checkbox"
                checked={includeDeleted}
                onChange={(e) => setIncludeDeleted(e.target.checked)}
              />
              <Label>Include Deleted</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* TABLE */}
      <Card>
        <CardHeader>
          <CardTitle>Purchase Returns</CardTitle>
          <CardDescription>Total: {total}</CardDescription>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Return No</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>PO</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {fetchLoading ? (
                <TableSkeleton />
              ) : purchaseReturns?.length > 0 ? (
                purchaseReturns?.map((item: any) => (
                  <TableRow key={item?.id}>
                    <TableCell>{item?.return_number}</TableCell>

                    <TableCell>{item?.supplier_name}</TableCell>

                    <TableCell>{item?.po_number}</TableCell>

                    <TableCell>{item?.item_count}</TableCell>

                    <TableCell>{item?.total_return_stock}</TableCell>

                    <TableCell>
                      ৳{Number(item?.total_amount).toFixed(2)}
                    </TableCell>

                    <TableCell>
                      <Badge className={getStatusColor(item?.status)}>
                        {item?.status}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      {new Date(item?.created_at).toLocaleDateString()}
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
                          <Link href={`/dashboard/purchase-return/${item?.id}`}>
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" />
                              View
                            </DropdownMenuItem>
                          </Link>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8">
                    No purchase returns found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* PAGINATION */}
          <div className="flex items-center justify-between mt-6">
            <Button
              variant="outline"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Previous
            </Button>

            <div className="text-sm text-muted-foreground">
              Page {page} / {totalPages || 1}
            </div>

            <Button
              variant="outline"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
