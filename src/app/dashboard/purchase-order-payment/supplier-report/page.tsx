"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

import { Search, RotateCcw } from "lucide-react";

import { useCompanies } from "@/src/hooks/useCompanies";
import { usePaymentMethods } from "@/src/hooks/usePaymentMethods";
import { useSupplierPaymentReport } from "@/src/hooks/useSupplierPaymentReport";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";

import TableSkeleton from "@/src/components/common/TableSkeleton";

const ALL = "all";

export default function SupplierPaymentReportPage() {
  const { fetchSupplierPayments, fetchLoading, data, total_amount } =
    useSupplierPaymentReport();

  const { companies, fetchCompanies } = useCompanies();
  const { paymentMethods, fetchPaymentMethods } = usePaymentMethods();

  const [filters, setFilters] = useState({
    start_date: "",
    end_date: "",
    company_id: ALL,
    payment_method_id: ALL,
  });

  const handleSearch = async () => {
    if (!filters.start_date || !filters.end_date) {
      toast.error("Start Date and End Date are required");
      return;
    }

    await fetchSupplierPayments({
      start_date: filters.start_date,
      end_date: filters.end_date,
      company_id: filters.company_id === ALL ? undefined : filters.company_id,
      payment_method_id:
        filters.payment_method_id === ALL
          ? undefined
          : filters.payment_method_id,
      page: 1,
      limit: 20,
    });
  };

  const handleReset = () => {
    setFilters({
      start_date: "",
      end_date: "",
      company_id: ALL,
      payment_method_id: ALL,
    });
  };

  useEffect(() => {
    fetchCompanies();
    fetchPaymentMethods();
  }, [fetchCompanies, fetchPaymentMethods]);

  const suppliers = companies.filter((c: any) => c.company_type === "supplier");

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold">Supplier Payment Report</h1>
        <p className="text-muted-foreground">
          Filter supplier payments by date, supplier, and payment method.
        </p>
      </div>

      {/* FILTERS */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Start Date */}
        <div className="space-y-2">
          <Label>
            Start Date <span className="text-red-500">*</span>
          </Label>
          <Input
            type="date"
            value={filters.start_date}
            onChange={(e) =>
              setFilters((p) => ({
                ...p,
                start_date: e.target.value,
              }))
            }
          />
        </div>

        {/* End Date */}
        <div className="space-y-2">
          <Label>
            End Date <span className="text-red-500">*</span>
          </Label>
          <Input
            type="date"
            value={filters.end_date}
            onChange={(e) =>
              setFilters((p) => ({
                ...p,
                end_date: e.target.value,
              }))
            }
          />
        </div>

        {/* Supplier */}
        <div className="space-y-2">
          <Label>Supplier</Label>
          <Select
            value={filters.company_id}
            onValueChange={(value) =>
              setFilters((p) => ({
                ...p,
                company_id: value,
              }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Suppliers" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value={ALL}>All Suppliers</SelectItem>

              {suppliers?.map((c: any) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Payment Method */}
        <div className="space-y-2">
          <Label>Payment Method</Label>
          <Select
            value={filters.payment_method_id}
            onValueChange={(value) =>
              setFilters((p) => ({
                ...p,
                payment_method_id: value,
              }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Methods" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value={ALL}>All Methods</SelectItem>

              {paymentMethods?.map((pm: any) => (
                <SelectItem key={pm.id} value={pm.id}>
                  {pm.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex gap-3">
        <Button onClick={handleSearch} disabled={fetchLoading}>
          <Search className="w-4 h-4 mr-2" />
          Search
        </Button>

        <Button variant="outline" onClick={handleReset}>
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>

      {/* TABLE */}
      <div className="rounded-md border mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Payment #</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>PO Number</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Notes</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {fetchLoading ? (
              <TableSkeleton />
            ) : data?.length ? (
              data.map((item: any, idx: number) => (
                <TableRow key={idx}>
                  <TableCell>
                    {new Date(item.date).toLocaleDateString()}
                  </TableCell>

                  <TableCell>{item.payment_number}</TableCell>
                  <TableCell>{item.supplier_name}</TableCell>
                  <TableCell>{item.po_number}</TableCell>
                  <TableCell>{item.payment_method_name}</TableCell>

                  <TableCell className="text-right">{item.amount}</TableCell>

                  <TableCell className="capitalize">{item.status}</TableCell>

                  <TableCell>{item.notes || "-"}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-6">
                  No data found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* TOTAL */}
      <div className="flex justify-end text-sm font-semibold">
        Total Amount: {total_amount}
      </div>
    </div>
  );
}
