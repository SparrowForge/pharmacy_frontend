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

import { useSupplierStatement } from "@/src/hooks/useSupplierStatement";
import { useCompanies } from "@/src/hooks/useCompanies";

import TableSkeleton from "@/src/components/common/TableSkeleton";
import Loading from "@/src/components/common/Loading";

const ALL = "all";

export default function SupplierStatementPage() {
  const { fetchSupplierStatement, fetchLoading, data, totals, setSupplierId } =
    useSupplierStatement();

  const { companies, fetchCompanies, fetchLoading:loading } = useCompanies();

  const [filters, setFilters] = useState({
    start_date: "",
    end_date: "",
    supplier_id: ALL,
  });

  const handleSearch = async () => {
    if (!filters.start_date || !filters.end_date) {
      toast.error("Start Date and End Date are required");
      return;
    }

    const supplierId = filters.supplier_id === ALL ? null : filters.supplier_id;

    if (!supplierId) {
      toast.error("Please select a supplier");
      return;
    }

    setSupplierId(supplierId);

    await fetchSupplierStatement({
      supplierId,
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
      supplier_id: ALL,
    });
  };

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  if (loading) {
    return <Loading text="Loading supplier data..." />;
  }

  const suppliers = companies.filter((c: any) => c.company_type === "supplier");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Supplier Statement</h1>
        <p className="text-muted-foreground">
          View supplier ledger with debit, credit, and balance.
        </p>
      </div>

      {/* Filters */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Supplier */}
        <div className="space-y-2">
          <Label>Supplier</Label>
          <select
            className="w-full border rounded-md p-2 bg-background"
            value={filters.supplier_id}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                supplier_id: e.target.value,
              }))
            }
          >
            <option value={ALL}>All Suppliers</option>

            {suppliers?.map((s: any) => (
              <option key={s.id} value={s.id}>
                {s.name}
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
