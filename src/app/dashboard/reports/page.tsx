"use client";

import { useState, useEffect } from "react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Badge } from "@/src/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
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

import {
  Download,
  Calendar,
  Package,
  Printer,
  BarChart3,
  TrendingUp,
} from "lucide-react";
import { useProducts } from "@/src/hooks/useProducts";
import { useProductCategories } from "@/src/hooks/useProductCategories";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { useStockReport } from "@/src/hooks/useStockReport";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function StockReportPage() {
  const [startDate, setStartDate] = useState("2026-06-01");
  const [endDate, setEndDate] = useState("2026-06-06");
  const [selectedProductId, setSelectedProductId] = useState<
    string | undefined
  >(undefined);
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    string | undefined
  >(undefined);
  const { products, fetchProducts } = useProducts();
  const { categories, fetchCategories } = useProductCategories();

  // Fetch data using hooks
  const { data, totals, fetchLoading, error, filters, fetchStockReport } =
    useStockReport();

  useEffect(() => {
    fetchProducts({ limit: 100 });
    fetchCategories({ limit: 100 });
    fetchStockReport({
      start_date: startDate,
      end_date: endDate,
      category_id: selectedCategoryId || undefined,
      product_id: selectedProductId || undefined,
    });
  }, [
    fetchProducts,
    fetchCategories,
    fetchStockReport,
    startDate,
    endDate,
    selectedProductId,
    selectedCategoryId,
  ]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Stock Report</h1>
          <p className="text-muted-foreground">
            Monitor your inventory levels and movement
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Printer className="w-4 h-4 mr-2" />
            Print
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="border-border">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Start Date */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Start Date
              </label>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>

            {/* End Date */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                End Date
              </label>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>

            {/* Product Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Product
              </label>
              <Select
                value={selectedProductId ?? ""}
                onValueChange={(value) => setSelectedProductId(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Products" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="all">All Products</SelectItem>

                  {products.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Category
              </label>
              <Select
                value={selectedCategoryId ?? ""}
                onValueChange={(value) => setSelectedCategoryId(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>

                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      {data && (
        <div className="grid sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card className="border-border">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Opening Stock</p>
              <p className="text-2xl font-bold text-foreground">
                {totals?.opening_stock || 0}
              </p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Receive Qty</p>
              <p className="text-2xl font-bold text-foreground">
                {totals?.receive_qty || 0}
              </p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Purchase Return</p>
              <p className="text-2xl font-bold text-foreground">
                {totals?.purchase_return_qty || 0}
              </p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Sales Qty</p>
              <p className="text-2xl font-bold text-foreground">
                {totals?.sales_qty || 0}
              </p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Sales Return</p>
              <p className="text-2xl font-bold text-foreground">
                {totals?.sales_return_qty || 0}
              </p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Closing Stock</p>
              <p className="text-2xl font-bold text-primary">
                {totals?.closing_stock || 0}
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {data && data.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Stock Movement Bar Chart */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Stock Movement Overview
              </CardTitle>
              <CardDescription>
                Summary of all stock movements across products
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={[
                    {
                      name: "Overview",
                      opening: totals?.opening_stock || 0,
                      receive: totals?.receive_qty || 0,
                      sales: totals?.sales_qty || 0,
                      closing: totals?.closing_stock || 0,
                    },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="opening" fill="#8b5cf6" name="Opening Stock" />
                  <Bar dataKey="receive" fill="#10b981" name="Received" />
                  <Bar dataKey="sales" fill="#ef4444" name="Sales" />
                  <Bar dataKey="closing" fill="#3b82f6" name="Closing Stock" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Product Stock Status Chart */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Top Products by Stock
              </CardTitle>
              <CardDescription>
                Top 5 products by closing stock quantity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={data
                    .sort((a, b) => b.closing_stock - a.closing_stock)
                    .slice(0, 5)
                    .map((item) => ({
                      name: item.name.substring(0, 15),
                      stock: item.closing_stock,
                    }))}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip />
                  <Bar dataKey="stock" fill="#06b6d4" name="Stock Level" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Stock Report Table */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Stock Details
          </CardTitle>
          <CardDescription>
            {/* Total Records: {totals || 0} */}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="p-4 mb-4 bg-red-50 text-red-700 rounded-lg">
              {error}
            </div>
          )}
          {fetchLoading ? (
            <div className="text-center py-8 text-muted-foreground">
              Loading report data...
            </div>
          ) : data && data.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product Code</TableHead>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Barcode</TableHead>
                    <TableHead className="text-right">Opening Stock</TableHead>
                    <TableHead className="text-right">Receive Qty</TableHead>
                    <TableHead className="text-right">
                      Purchase Return
                    </TableHead>
                    <TableHead className="text-right">Sales Qty</TableHead>
                    <TableHead className="text-right">Sales Return</TableHead>
                    <TableHead className="text-right">Closing Stock</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map(
                    (
                      item: {
                        code: any;
                        name: any;
                        category_name: any;
                        barcode: any;
                        opening_stock: any;
                        receive_qty: any;
                        purchase_return_qty: any;
                        sales_qty: any;
                        sales_return_qty: any;
                        closing_stock: any;
                      },
                      index: any,
                    ) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {item.code}
                        </TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{item.category_name}</Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {item.barcode}
                        </TableCell>
                        <TableCell className="text-right">
                          {item.opening_stock}
                        </TableCell>
                        <TableCell className="text-right text-green-600 font-semibold">
                          {item.receive_qty}
                        </TableCell>
                        <TableCell className="text-right text-orange-600">
                          {item.purchase_return_qty}
                        </TableCell>
                        <TableCell className="text-right text-red-600 font-semibold">
                          {item.sales_qty}
                        </TableCell>
                        <TableCell className="text-right text-blue-600">
                          {item.sales_return_qty}
                        </TableCell>
                        <TableCell className="text-right font-semibold text-primary">
                          {item.closing_stock}
                        </TableCell>
                      </TableRow>
                    ),
                  )}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No stock data available for the selected filters
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
