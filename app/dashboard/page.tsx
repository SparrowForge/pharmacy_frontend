"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DollarSign,
  ShoppingCart,
  Package,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Plus,
  Users,
  ArrowRight,
  Clock,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"

const kpiCards = [
  {
    title: "Today's Sales",
    value: "$4,825.00",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "bg-primary/10 text-primary",
  },
  {
    title: "Total Orders",
    value: "156",
    change: "+8",
    trend: "up",
    icon: ShoppingCart,
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    title: "Low Stock Items",
    value: "12",
    change: "-3",
    trend: "down",
    icon: Package,
    color: "bg-orange-500/10 text-orange-500",
  },
  {
    title: "Expiring Soon",
    value: "8",
    change: "7 days",
    trend: "neutral",
    icon: AlertTriangle,
    color: "bg-red-500/10 text-red-500",
  },
]

const quickActions = [
  { label: "New Sale", href: "/dashboard/pos", icon: Plus },
  { label: "Add Medicine", href: "/dashboard/medicines/new", icon: Package },
  { label: "New Order", href: "/dashboard/orders/new", icon: ShoppingCart },
  { label: "Add Customer", href: "/dashboard/customers/new", icon: Users },
]

const recentActivity = [
  {
    id: 1,
    action: "Sale completed",
    description: "Order #1234 - $125.00",
    user: "John Doe",
    time: "2 min ago",
    status: "success",
  },
  {
    id: 2,
    action: "Low stock alert",
    description: "Amoxicillin 500mg - 23 units",
    user: "System",
    time: "15 min ago",
    status: "warning",
  },
  {
    id: 3,
    action: "New customer",
    description: "Sarah Wilson registered",
    user: "POS Terminal",
    time: "1 hour ago",
    status: "info",
  },
  {
    id: 4,
    action: "Medicine added",
    description: "Paracetamol 650mg - 500 units",
    user: "Jane Smith",
    time: "2 hours ago",
    status: "success",
  },
  {
    id: 5,
    action: "Order delivered",
    description: "Order #1230 delivered",
    user: "Rider: Mike",
    time: "3 hours ago",
    status: "success",
  },
]

const topSellingMedicines = [
  { name: "Paracetamol 500mg", sold: 245, revenue: "$612.50" },
  { name: "Amoxicillin 500mg", sold: 189, revenue: "$945.00" },
  { name: "Cetirizine 10mg", sold: 156, revenue: "$390.00" },
  { name: "Omeprazole 20mg", sold: 134, revenue: "$670.00" },
  { name: "Vitamin D3", sold: 112, revenue: "$560.00" },
]

const aiInsights = [
  {
    type: "prediction",
    message: "High demand predicted for Vitamin C next week",
    action: "Order now",
  },
  {
    type: "warning",
    message: "5 medicines expiring within 30 days",
    action: "Review",
  },
  {
    type: "opportunity",
    message: "Bundle Paracetamol + Vitamin C for 15% more sales",
    action: "Create bundle",
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s what&apos;s happening today.
          </p>
        </div>
        <Button asChild className="bg-primary hover:bg-primary/90">
          <Link href="/dashboard/pos">
            <Plus className="w-4 h-4 mr-2" />
            New Sale
          </Link>
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi, index) => (
          <Card key={index} className="border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", kpi.color)}>
                  <kpi.icon className="w-6 h-6" />
                </div>
                <div className={cn(
                  "flex items-center gap-1 text-sm font-medium",
                  kpi.trend === "up" && "text-green-600",
                  kpi.trend === "down" && "text-red-600",
                  kpi.trend === "neutral" && "text-muted-foreground"
                )}>
                  {kpi.trend === "up" && <TrendingUp className="w-4 h-4" />}
                  {kpi.trend === "down" && <TrendingDown className="w-4 h-4" />}
                  {kpi.change}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
                <p className="text-sm text-muted-foreground">{kpi.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <Card className="lg:col-span-2 border-border">
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>Daily sales for the current month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end gap-2">
              {[45, 62, 38, 75, 55, 82, 68, 90, 72, 85, 78, 92, 65, 88, 70, 95, 80, 87, 73, 91, 84, 76, 89, 82, 94, 77, 86, 79, 93, 85].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 bg-primary/60 rounded-t hover:bg-primary transition-colors cursor-pointer"
                  style={{ height: `${h}%` }}
                  title={`Day ${i + 1}: $${(h * 50).toFixed(0)}`}
                />
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

        {/* Quick Actions */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                asChild
                className="w-full justify-between h-12 group"
              >
                <Link href={action.href}>
                  <span className="flex items-center gap-2">
                    <action.icon className="w-4 h-4 text-primary" />
                    {action.label}
                  </span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </Link>
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Second Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Top Selling Medicines */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Top Selling</CardTitle>
            <CardDescription>Best performers this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topSellingMedicines.map((medicine, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{medicine.name}</p>
                      <p className="text-xs text-muted-foreground">{medicine.sold} sold</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-primary">{medicine.revenue}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card className="border-border bg-gradient-to-br from-primary/5 to-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              AI Insights
            </CardTitle>
            <CardDescription>Smart recommendations for your pharmacy</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {aiInsights.map((insight, index) => (
              <div
                key={index}
                className="p-3 rounded-lg bg-card border border-border"
              >
                <p className="text-sm text-foreground mb-2">{insight.message}</p>
                <Button size="sm" variant="outline" className="h-7 text-xs">
                  {insight.action}
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Alerts</CardTitle>
            <CardDescription>Items requiring attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <span className="text-sm font-medium text-red-600">Low Stock</span>
              </div>
              <p className="text-xs text-muted-foreground">
                12 medicines are below minimum stock level
              </p>
              <Button size="sm" variant="link" className="h-6 px-0 text-xs text-red-600">
                View all
              </Button>
            </div>
            <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-medium text-orange-600">Expiring Soon</span>
              </div>
              <p className="text-xs text-muted-foreground">
                8 medicines expiring within 30 days
              </p>
              <Button size="sm" variant="link" className="h-6 px-0 text-xs text-orange-600">
                View all
              </Button>
            </div>
            <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <div className="flex items-center gap-2 mb-1">
                <ShoppingCart className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium text-blue-600">Pending Orders</span>
              </div>
              <p className="text-xs text-muted-foreground">
                5 orders awaiting processing
              </p>
              <Button size="sm" variant="link" className="h-6 px-0 text-xs text-blue-600">
                View all
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Table */}
      <Card className="border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest actions across your pharmacy</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Action</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentActivity.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell className="font-medium">{activity.action}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {activity.description}
                  </TableCell>
                  <TableCell>{activity.user}</TableCell>
                  <TableCell className="text-muted-foreground">{activity.time}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={cn(
                        activity.status === "success" && "bg-green-100 text-green-700",
                        activity.status === "warning" && "bg-orange-100 text-orange-700",
                        activity.status === "info" && "bg-blue-100 text-blue-700"
                      )}
                    >
                      {activity.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
