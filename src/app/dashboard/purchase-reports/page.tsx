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

import { useProductCategories } from "@/src/hooks/useProductCategories";
import { useProducts } from "@/src/hooks/useProducts";
import { useCompanies } from "@/src/hooks/useCompanies";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { usePurchaseOrderReport } from "@/src/hooks/usePurchaseOrderReport";
import TableSkeleton from "@/src/components/common/TableSkeleton";

const ALL = "all";

export default function PurchaseReportPage() {
  const { fetchPurchaseReport, fetchLoading, purchaseData, purchaseTotals } =
    usePurchaseOrderReport();

  const { categories, fetchCategories } = useProductCategories();
  const { products, fetchProducts } = useProducts();
  const { companies, fetchCompanies } = useCompanies();

  const [filters, setFilters] = useState({
    start_date: "",
    end_date: "",
    supplier_id: ALL,
    category_id: ALL,
    product_id: ALL,
  });

  const handleSearch = async () => {
    if (!filters.start_date || !filters.end_date) {
      toast.error("Start Date and End Date are required");
      return;
    }

    await fetchPurchaseReport({
      start_date: filters.start_date,
      end_date: filters.end_date,
      supplier_id:
        filters.supplier_id === ALL ? undefined : filters.supplier_id,
      category_id:
        filters.category_id === ALL ? undefined : filters.category_id,
      product_id: filters.product_id === ALL ? undefined : filters.product_id,
      page: 1,
      limit: 20,
    });
  };

  const handleReset = () => {
    setFilters({
      start_date: "",
      end_date: "",
      supplier_id: ALL,
      category_id: ALL,
      product_id: ALL,
    });
  };

  useEffect(() => {
    fetchCategories();
    fetchCompanies();
    fetchProducts();
  }, [fetchCategories, fetchCompanies, fetchProducts]);

  const suppliers = companies.filter(
    (supplier) => supplier.company_type === "supplier",
  );

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold">Purchase Report</h1>
        <p className="text-muted-foreground">
          Filter purchase data by supplier, category, product, and date.
        </p>
      </div>

      {/* FILTERS */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
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
            value={filters.supplier_id}
            onValueChange={(value) =>
              setFilters((p) => ({
                ...p,
                supplier_id: value,
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

        {/* Category */}
        <div className="space-y-2">
          <Label>Category</Label>
          <Select
            value={filters.category_id}
            onValueChange={(value) =>
              setFilters((p) => ({
                ...p,
                category_id: value,
              }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value={ALL}>All Categories</SelectItem>

              {categories?.map((cat: any) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Product */}
        <div className="space-y-2">
          <Label>Product</Label>
          <Select
            value={filters.product_id}
            onValueChange={(value) =>
              setFilters((p) => ({
                ...p,
                product_id: value,
              }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Products" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value={ALL}>All Products</SelectItem>

              {products?.map((p: any) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.name}
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
              <TableHead>PO Number</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Qty</TableHead>
              <TableHead className="text-right">Unit Cost</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {fetchLoading ? (
              <TableSkeleton />
            ) : purchaseData?.length ? (
              purchaseData.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell>
                    {new Date(item.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{item.po_number}</TableCell>
                  <TableCell>{item.supplier_name}</TableCell>
                  <TableCell>{item.product_name}</TableCell>
                  <TableCell>{item.category_name}</TableCell>
                  <TableCell className="text-right">
                    {item.purchase_qty}
                  </TableCell>
                  <TableCell className="text-right">{item.unit_cost}</TableCell>
                  <TableCell className="text-right">
                    {item.purchase_amount}
                  </TableCell>
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

      {/* TOTALS */}
      {purchaseTotals && (
        <div className="flex justify-end gap-6 text-sm font-medium">
          <div>Total Qty: {purchaseTotals.total_qty}</div>
          <div>Total Amount: {purchaseTotals.total_amount}</div>
        </div>
      )}
    </div>
  );
}
