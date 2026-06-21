"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";

import { Search, RotateCcw } from "lucide-react";

import { useCustomerStatement } from "@/src/hooks/useCustomerStatement";
import { useCompanies } from "@/src/hooks/useCompanies";

import TableSkeleton from "@/src/components/common/TableSkeleton";
import Loading from "@/src/components/common/Loading";

const ALL = "all";

export default function CustomerStatementPage() {
  const { fetchCustomerStatement, fetchLoading, data, totals, setCustomerId } =
    useCustomerStatement();

  const { companies, fetchCompanies, fetchLoading: loading } = useCompanies();

  const [filters, setFilters] = useState({
    start_date: "",
    end_date: "",
    customer_id: ALL,
  });

  const handleSearch = async () => {
    if (!filters.start_date || !filters.end_date) {
      toast.error("Start Date and End Date are required");
      return;
    }

    const customerId = filters.customer_id === ALL ? null : filters.customer_id;

    if (!customerId) {
      toast.error("Please select a customer");
      return;
    }

    setCustomerId(customerId);

    await fetchCustomerStatement({
      customerId,
      filters: {
        start_date: filters.start_date,
        end_date: filters.end_date,
      },
    });
  };

  const handleReset = () => {
    setFilters({
      start_date: "",
      end_date: "",
      customer_id: ALL,
    });
  };

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  if (loading) {
    return <Loading text="Loading customer data..." />;
  }

  const customers = companies.filter((c: any) => c.company_type === "customer");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Customer Statement</h1>
        <p className="text-muted-foreground">
          View customer ledger with sales, payments, returns, and balance.
        </p>
      </div>

      {/* Filters */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Customer */}
        <div className="space-y-2">
          <Label>Customer</Label>
          <select
            className="w-full border rounded-md p-2 bg-background"
            value={filters.customer_id}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                customer_id: e.target.value,
              }))
            }
          >
            <option value={ALL}>All Customers</option>

            {customers?.map((c: any) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Start Date */}
        <div className="space-y-2">
          <Label>
            Start Date <span className="text-red-500">*</span>
          </Label>
          <Input
            type="date"
            value={filters.start_date}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
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
              setFilters((prev) => ({
                ...prev,
                end_date: e.target.value,
              }))
            }
          />
        </div>
      </div>

      {/* Actions */}
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

      {/* SUMMARY */}
      {totals && (
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="p-4 border rounded-md">
            <p className="text-sm text-muted-foreground">Total Debit</p>
            <p className="text-lg font-semibold">{totals.total_debit}</p>
          </div>

          <div className="p-4 border rounded-md">
            <p className="text-sm text-muted-foreground">Total Credit</p>
            <p className="text-lg font-semibold">{totals.total_credit}</p>
          </div>

          <div className="p-4 border rounded-md">
            <p className="text-sm text-muted-foreground">Closing Balance</p>
            <p className="text-lg font-semibold">{totals.closing_balance}</p>
          </div>
        </div>
      )}

      {/* TABLE */}
      <div className="rounded-md border mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Reference</TableHead>
              <TableHead className="text-right">Debit</TableHead>
              <TableHead className="text-right">Credit</TableHead>
              <TableHead className="text-right">Balance</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {fetchLoading ? (
              <TableSkeleton />
            ) : data?.length > 0 ? (
              data.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell>
                    {new Date(item.date).toLocaleDateString()}
                  </TableCell>

                  <TableCell className="capitalize">{item.type}</TableCell>

                  <TableCell>{item.reference_number}</TableCell>

                  <TableCell className="text-right">{item.debit}</TableCell>

                  <TableCell className="text-right">{item.credit}</TableCell>

                  <TableCell className="text-right">{item.balance}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6">
                  No data found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
