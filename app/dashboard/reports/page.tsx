"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Download,
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  PieChart,
  FileText,
  Printer,
} from "lucide-react"
import { cn } from "@/lib/utils"

const salesData = [
  { date: "2026-04-01", orders: 45, revenue: 2450, profit: 612, items: 156 },
  { date: "2026-03-31", orders: 52, revenue: 2890, profit: 722, items: 189 },
  { date: "2026-03-30", orders: 38, revenue: 1980, profit: 495, items: 112 },
  { date: "2026-03-29", orders: 61, revenue: 3250, profit: 812, items: 234 },
  { date: "2026-03-28", orders: 47, revenue: 2560, profit: 640, items: 167 },
]

const topProducts = [
  { name: "Paracetamol 500mg", sold: 245, revenue: 612.50, growth: 12 },
  { name: "Amoxicillin 500mg", sold: 189, revenue: 945.00, growth: -5 },
  { name: "Cetirizine 10mg", sold: 156, revenue: 390.00, growth: 8 },
  { name: "Omeprazole 20mg", sold: 134, revenue: 670.00, growth: 15 },
  { name: "Vitamin D3 1000IU", sold: 112, revenue: 560.00, growth: 22 },
]

const stats = [
  { label: "Total Revenue", value: "$45,280", change: "+12.5%", trend: "up", icon: DollarSign },
  { label: "Total Orders", value: "1,245", change: "+8.2%", trend: "up", icon: ShoppingCart },
  { label: "Avg. Order Value", value: "$36.37", change: "+3.1%", trend: "up", icon: TrendingUp },
  { label: "Total Customers", value: "892", change: "+15.3%", trend: "up", icon: Users },
]

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState("this-month")
  const [branch, setBranch] = useState("all")

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground">
            Comprehensive insights into your pharmacy performance
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Printer className="w-4 h-4 mr-2" />
            Print
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="border-border">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="yesterday">Yesterday</SelectItem>
                  <SelectItem value="this-week">This Week</SelectItem>
                  <SelectItem value="this-month">This Month</SelectItem>
                  <SelectItem value="last-month">Last Month</SelectItem>
                  <SelectItem value="this-year">This Year</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Select value={branch} onValueChange={setBranch}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select Branch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Branches</SelectItem>
                <SelectItem value="main">Main Branch</SelectItem>
                <SelectItem value="downtown">Downtown</SelectItem>
                <SelectItem value="westside">Westside</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2 ml-auto">
              <Input type="date" className="w-40" />
              <span className="flex items-center text-muted-foreground">to</span>
              <Input type="date" className="w-40" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <Badge className={cn(
                  "border-0 flex items-center gap-1",
                  stat.trend === "up" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                )}>
                  {stat.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {stat.change}
                </Badge>
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Report Tabs */}
      <Tabs defaultValue="sales" className="space-y-6">
        <TabsList className="bg-muted">
          <TabsTrigger value="sales" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Sales Report
          </TabsTrigger>
          <TabsTrigger value="inventory" className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            Inventory Report
          </TabsTrigger>
          <TabsTrigger value="products" className="flex items-center gap-2">
            <PieChart className="w-4 h-4" />
            Product Analysis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="space-y-6">
          {/* Sales Chart Placeholder */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Sales Overview</CardTitle>
              <CardDescription>Daily sales for the selected period</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-72 flex items-end gap-2 pt-8">
                {[45, 62, 38, 75, 55, 82, 68, 90, 72, 85, 78, 92, 65, 88, 70, 95, 80, 87, 73, 91, 84, 76, 89, 82, 94, 77, 86, 79, 93, 85].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-primary/60 rounded-t hover:bg-primary transition-colors cursor-pointer relative group"
                    style={{ height: `${h}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      ${(h * 50).toFixed(0)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-4 text-xs text-muted-foreground">
                <span>1</span>
                <span>5</span>
                <span>10</span>
                <span>15</span>
                <span>20</span>
                <span>25</span>
                <span>30</span>
              </div>
            </CardContent>
          </Card>

          {/* Sales Table */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Daily Sales Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Orders</TableHead>
                    <TableHead className="text-right">Items Sold</TableHead>
                    <TableHead className="text-right">Revenue</TableHead>
                    <TableHead className="text-right">Profit</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {salesData.map((day, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{day.date}</TableCell>
                      <TableCell className="text-right">{day.orders}</TableCell>
                      <TableCell className="text-right">{day.items}</TableCell>
                      <TableCell className="text-right font-semibold text-primary">
                        ${day.revenue.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right text-green-600">
                        ${day.profit.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Inventory Status</CardTitle>
              <CardDescription>Current stock levels by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { category: "Pain Relief", stock: 1250, value: 3125, percentage: 85 },
                  { category: "Antibiotics", stock: 450, value: 2250, percentage: 45 },
                  { category: "Vitamins", stock: 890, value: 4450, percentage: 72 },
                  { category: "Digestive", stock: 320, value: 1600, percentage: 55 },
                  { category: "Allergy", stock: 560, value: 1400, percentage: 68 },
                ].map((cat, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{cat.category}</span>
                      <span className="text-muted-foreground">{cat.stock} units (${cat.value.toLocaleString()})</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={cn(
                          "h-full rounded-full transition-all",
                          cat.percentage >= 70 ? "bg-green-500" :
                          cat.percentage >= 40 ? "bg-orange-500" : "bg-red-500"
                        )}
                        style={{ width: `${cat.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Top Selling Products</CardTitle>
              <CardDescription>Best performers this period</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rank</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead className="text-right">Units Sold</TableHead>
                    <TableHead className="text-right">Revenue</TableHead>
                    <TableHead className="text-right">Growth</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topProducts.map((product, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                          {i + 1}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell className="text-right">{product.sold}</TableCell>
                      <TableCell className="text-right font-semibold text-primary">
                        ${product.revenue.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge className={cn(
                          "border-0",
                          product.growth >= 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        )}>
                          {product.growth >= 0 ? "+" : ""}{product.growth}%
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
