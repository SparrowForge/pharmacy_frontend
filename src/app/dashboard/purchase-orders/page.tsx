"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Badge } from "@/src/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
  Download,
  Trash2,
  LoaderIcon,
} from "lucide-react";
import { usePurchaseOrders } from "@/src/hooks/usePurchaseOrders";
import { useCompanies } from "@/src/hooks/useCompanies";
import Loading from "@/src/components/common/Loading";
import TableSkeleton from "@/src/components/common/TableSkeleton";

// hooks (replace with your actual paths)

export default function PurchaseOrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [supplierId, setSupplierId] = useState("all");
  const [isDeletedIncluded, setIsDeletedIncluded] = useState(false);
  const {
    fetchPurchaseOrders,
    fetchLoading,
    purchaseOrders,
    deletePurchaseOrder,
  } = usePurchaseOrders();
  const { companies, fetchCompanies } = useCompanies();

  const suppliers = companies?.filter(
    (c: any) => c.company_type === "supplier",
  );

  useEffect(() => {
    fetchCompanies();
    fetchPurchaseOrders({
      q: searchQuery,
      supplierId: supplierId === "all" ? undefined : supplierId,
      includeDeleted: isDeletedIncluded,
    });
  }, [searchQuery, supplierId, isDeletedIncluded]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "received":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Purchase Orders</h1>
          <p className="text-muted-foreground">
            Manage supplier orders and inventory procurement
          </p>
        </div>

        <Button asChild>
          <Link href="/dashboard/purchase-orders/new">
            <Plus className="w-4 h-4 mr-2" />
            Create Order
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <Label className="text-sm mb-2 block">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search PO number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Supplier Filter */}
            <div>
              <Label className="text-sm mb-2 block">Filter by Supplier</Label>
              <Select value={supplierId} onValueChange={setSupplierId}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Suppliers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Suppliers</SelectItem>

                  {suppliers?.map((s: any) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Deleted Toggle */}
            <div className="flex items-center gap-2 mt-6">
              <input
                type="checkbox"
                checked={isDeletedIncluded}
                onChange={(e) => setIsDeletedIncluded(e.target.checked)}
              />
              <Label>Include Deleted</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Purchase Orders</CardTitle>
          <CardDescription>Total:</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>PO Number</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead className="text-right">Total Quantity</TableHead>
                  <TableHead className="text-right">
                    Received Quantity
                  </TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {fetchLoading ? (
                  <TableSkeleton />
                ) : purchaseOrders.length > 0 ? (
                  purchaseOrders.map((po: any) => (
                    <TableRow key={po.id}>
                      <TableCell className="font-medium">
                        {po.po_number}
                      </TableCell>

                      <TableCell>{po.supplier_name}</TableCell>

                      <TableCell className="text-right">
                        {po.totalqty}
                      </TableCell>

                      <TableCell className="text-right">
                        {po.totalreceiveqty}
                      </TableCell>

                      <TableCell className="text-right font-semibold">
                        ৳{Number(po.total_amount).toFixed(2)}
                      </TableCell>

                      <TableCell>
                        {new Date(po.placed_at).toLocaleDateString()}
                      </TableCell>

                      <TableCell>
                        <Badge className={getStatusColor(po.status)}>
                          {po.status}
                        </Badge>
                      </TableCell>

                      {/* 3 DOT ACTIONS */}
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent align="end">
                            {po.status !== "received" && (
                              <Link
                                href={`/dashboard/purchase-receive/new/${po.id}`}
                              >
                                <DropdownMenuItem>
                                  <Eye className="w-4 h-4 mr-2" />
                                  Receive Items
                                </DropdownMenuItem>
                              </Link>
                            )}

                            <Link
                              href={`/dashboard/purchase-return/new/${po.id}`}
                            >
                              <DropdownMenuItem>
                                <Eye className="w-4 h-4 mr-2" />
                                Return Items
                              </DropdownMenuItem>
                            </Link>

                            

                            <DropdownMenuItem
                              onClick={() => deletePurchaseOrder(po.id)}
                              className="text-red-600"
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
                    <TableCell colSpan={7} className="text-center py-8">
                      No purchase orders found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
