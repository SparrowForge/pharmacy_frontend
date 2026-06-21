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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

import { Search, RotateCcw } from "lucide-react";

import { useSalesReport } from "@/src/hooks/useSalesReport";
import { useProductCategories } from "@/src/hooks/useProductCategories";
import { useProducts } from "@/src/hooks/useProducts";
import { useCompanies } from "@/src/hooks/useCompanies";
import TableSkeleton from "@/src/components/common/TableSkeleton";
import Loading from "@/src/components/common/Loading";

const ALL = "all";

export default function SalesReportPage() {
  const { fetchSalesReport, fetchLoading, salesData, salesTotals } =
    useSalesReport();

  const { categories, fetchCategories, loading } = useProductCategories();
  const { products, fetchProducts } = useProducts();
  const { companies, fetchCompanies } = useCompanies();

  const [filters, setFilters] = useState({
    start_date: "",
    end_date: "",
    category_id: ALL,
    product_id: ALL,
    customer_id: ALL,
  });

  const handleSearch = async () => {
    if (!filters.start_date || !filters.end_date) {
      toast.error("Start Date and End Date are required");
      return;
    }

    await fetchSalesReport({
      start_date: filters.start_date,
      end_date: filters.end_date,
      category_id:
        filters.category_id === ALL ? undefined : filters.category_id,
      product_id: filters.product_id === ALL ? undefined : filters.product_id,
      customer_id:
        filters.customer_id === ALL ? undefined : filters.customer_id,
      page: 1,
      limit: 20,
    });
  };

  const handleReset = () => {
    setFilters({
      start_date: "",
      end_date: "",
      category_id: ALL,
      product_id: ALL,
      customer_id: ALL,
    });
  };

  useEffect(() => {
    fetchCategories();
    fetchCompanies();
    fetchProducts();
  }, [fetchCategories, fetchCompanies, fetchProducts]);

  if (loading) {
    return <Loading text="Loading page..." />;
  }

  const customers = companies.filter(customer=>customer.company_type === "customer")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Sales Report</h1>
        <p className="text-muted-foreground">
          Filter sales data by date, category, product, and customer.
        </p>
      </div>

      {/* Filters */}
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

        {/* Category */}
        <div className="space-y-2">
          <Label>Category</Label>
          <Select
            value={filters.category_id}
            onValueChange={(value) =>
              setFilters((prev) => ({
                ...prev,
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
              setFilters((prev) => ({
                ...prev,
                product_id: value,
              }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Products" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value={ALL}>All Products</SelectItem>

              {products?.map((product: any) => (
                <SelectItem key={product.id} value={product.id}>
                  {product.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Customer */}
        <div className="space-y-2">
          <Label>Customer</Label>
          <Select
            value={filters.customer_id}
            onValueChange={(value) =>
              setFilters((prev) => ({
                ...prev,
                customer_id: value,
              }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Customers" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value={ALL}>All Customers</SelectItem>

              {customers?.map((c: any) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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

      {/* TABLE */}
      <div className="rounded-md border mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Invoice</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Qty</TableHead>
              <TableHead className="text-right">Unit Price</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {fetchLoading ? (
              <TableSkeleton />
            ) : salesData?.length > 0 ? (
              salesData.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell>
                    {new Date(item.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{item.invoice_number}</TableCell>
                  <TableCell>{item.customer_name}</TableCell>
                  <TableCell>{item.product_name}</TableCell>
                  <TableCell>{item.category_name}</TableCell>
                  <TableCell className="text-right">{item.sales_qty}</TableCell>
                  <TableCell className="text-right">
                    {item.unit_price}
                  </TableCell>
                  <TableCell className="text-right">
                    {item.sales_amount}
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
    </div>
  );
}
