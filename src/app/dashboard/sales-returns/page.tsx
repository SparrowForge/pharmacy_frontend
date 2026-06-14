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

import Loading from "@/src/components/common/Loading";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

import { Search } from "lucide-react";

import { useSalesReturns } from "@/src/hooks/useSalesReturns";
import { useAppSelector } from "@/src/redux/hooks";
import { useCompanies } from "@/src/hooks/useCompanies";
import { useSalesInvoice } from "@/src/hooks/useSalesInvoice";
import TableSkeleton from "@/src/components/common/TableSkeleton";

const STATUS_OPTIONS = ["pending", "completed", "cancelled"];

export default function SalesReturnsPage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const [q, setQ] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [salesInvoiceId, setSalesInvoiceId] = useState("");
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [includeDeleted, setIncludeDeleted] = useState(false);

  const {
    fetchSalesReturns,
    salesReturns: data,
    fetchLoading,
  } = useSalesReturns();

  const { companies, fetchCompanies } = useCompanies();
  const { salesInvoices, fetchSalesInvoices } = useSalesInvoice();

  /* ================= LOAD DROPDOWNS ================= */
  useEffect(() => {
    fetchCompanies({ page: 1, limit: 100 });
    fetchSalesInvoices({ page: 1, limit: 100 });
  }, [fetchCompanies, fetchSalesInvoices]);

  /* ================= FETCH RETURNS (FIXED PARAMS) ================= */
  useEffect(() => {
    const params: any = {
      page,
      limit,
      includeDeleted,
    };

    if (q.trim()) {
      params.q = q.trim();
    }

    if (customerId) {
      params.customer_id = customerId;
    }

    if (salesInvoiceId) {
      params.sales_invoice_id = salesInvoiceId;
    }

    if (status) {
      params.status = status;
    }

    fetchSalesReturns(params);
  }, [
    page,
    limit,
    q,
    customerId,
    salesInvoiceId,
    status,
    includeDeleted,
    fetchSalesReturns,
  ]);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Sales Returns</h1>
        <p className="text-muted-foreground">
          Manage and track all sales returns
        </p>
      </div>

      {/* FILTERS */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* SEARCH */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search returns..."
              className="pl-10"
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setPage(1);
              }}
            />
          </div>

          {/* DROPDOWNS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* CUSTOMER */}
            <Select
              value={customerId || "all"}
              onValueChange={(val) => {
                setCustomerId(val === "all" ? "" : val);
                setPage(1);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Customer" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All Customers</SelectItem>

                {companies
                  ?.filter((c: any) => c.company_type === "customer")
                  ?.map((c: any) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>

            {/* INVOICE */}
            <Select
              value={salesInvoiceId || "all"}
              onValueChange={(val) => {
                setSalesInvoiceId(val === "all" ? "" : val);
                setPage(1);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Invoice" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All Invoices</SelectItem>

                {salesInvoices?.map((inv: any) => (
                  <SelectItem key={inv.id} value={inv.id}>
                    {inv.invoice_number}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* STATUS */}
            <Select
              value={status || "all"}
              onValueChange={(val) => {
                setStatus(val === "all" ? undefined : val);
                setPage(1);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Status" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>

                {STATUS_OPTIONS.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
        </CardContent>
      </Card>

      {/* TABLE */}
      <Card>
        <CardHeader>
          <CardTitle>Return List</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Return #</TableHead>
                <TableHead>Invoice</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {fetchLoading ? <TableSkeleton/> : data?.length > 0 ? (
                data.map((item: any) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.return_number}</TableCell>
                    <TableCell>{item.invoice_number}</TableCell>
                    <TableCell>{item.customer_name}</TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell>{item.total_amount}</TableCell>
                    <TableCell>
                      {new Date(item.return_date).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6">
                    No returns found
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

        <Button
          variant="outline"
          disabled={data?.length < limit}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
