"use client";

import { useState } from "react";
import Link from "next/link";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import {
  Search,
  Plus,
  MoreHorizontal,
  ClipboardList,
  Clock,
  CheckCircle,
  Truck,
  Package,
  Eye,
  Edit,
  XCircle,
} from "lucide-react";
import { cn } from "@/src/lib/utils";

const ordersData = [
  {
    id: "ORD-1234",
    customer: "John Doe",
    items: 5,
    total: 125.0,
    date: "2026-04-01 10:30",
    status: "Completed",
    payment: "Cash",
  },
  {
    id: "ORD-1235",
    customer: "Sarah Wilson",
    items: 3,
    total: 89.5,
    date: "2026-04-01 11:15",
    status: "Processing",
    payment: "Card",
  },
  {
    id: "ORD-1236",
    customer: "Mike Brown",
    items: 8,
    total: 245.0,
    date: "2026-04-01 12:00",
    status: "Pending",
    payment: "Credit",
  },
  {
    id: "ORD-1237",
    customer: "Emily Davis",
    items: 2,
    total: 45.0,
    date: "2026-04-01 13:45",
    status: "Delivered",
    payment: "Cash",
  },
  {
    id: "ORD-1238",
    customer: "David Chen",
    items: 12,
    total: 380.0,
    date: "2026-04-01 14:20",
    status: "Shipped",
    payment: "Card",
  },
  {
    id: "ORD-1239",
    customer: "Lisa Anderson",
    items: 1,
    total: 15.0,
    date: "2026-04-01 15:00",
    status: "Cancelled",
    payment: "Cash",
  },
  {
    id: "ORD-1240",
    customer: "James Miller",
    items: 6,
    total: 178.5,
    date: "2026-04-01 15:30",
    status: "Processing",
    payment: "Mobile",
  },
];

const stats = [
  {
    label: "Total Orders",
    value: "156",
    change: "+12",
    icon: ClipboardList,
    color: "bg-primary/10 text-primary",
  },
  {
    label: "Pending",
    value: "8",
    change: "-2",
    icon: Clock,
    color: "bg-orange-500/10 text-orange-500",
  },
  {
    label: "Completed",
    value: "142",
    change: "+10",
    icon: CheckCircle,
    color: "bg-green-500/10 text-green-500",
  },
  {
    label: "In Transit",
    value: "6",
    change: "+3",
    icon: Truck,
    color: "bg-blue-500/10 text-blue-500",
  },
];

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredOrders = ordersData.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      order.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="w-3 h-3" />;
      case "Processing":
        return <Clock className="w-3 h-3" />;
      case "Pending":
        return <Clock className="w-3 h-3" />;
      case "Shipped":
        return <Truck className="w-3 h-3" />;
      case "Delivered":
        return <Package className="w-3 h-3" />;
      case "Cancelled":
        return <XCircle className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Processing":
        return "bg-blue-100 text-blue-700";
      case "Pending":
        return "bg-orange-100 text-orange-700";
      case "Shipped":
        return "bg-purple-100 text-purple-700";
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Orders</h1>
          <p className="text-muted-foreground">
            Track and manage customer orders
          </p>
        </div>
        <Button asChild className="bg-primary hover:bg-primary/90">
          <Link href="/dashboard/orders/new">
            <Plus className="w-4 h-4 mr-2" />
            New Order
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="border-border">
            <CardContent className="p-6 flex items-center gap-4">
              <div
                className={cn(
                  "w-12 h-12 rounded-lg flex items-center justify-center",
                  stat.color,
                )}
              >
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="border-border">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by order ID or customer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>
            {filteredOrders.length} orders found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead className="text-center">Items</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono font-medium">
                    {order.id}
                  </TableCell>
                  <TableCell className="font-medium">
                    {order.customer}
                  </TableCell>
                  <TableCell className="text-center">{order.items}</TableCell>
                  <TableCell className="text-right font-semibold text-primary">
                    ${order.total.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {order.date}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{order.payment}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        "border-0 flex items-center gap-1 w-fit",
                        getStatusColor(order.status),
                      )}
                    >
                      {getStatusIcon(order.status)}
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Update Status
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Truck className="w-4 h-4 mr-2" />
                          Assign Rider
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <XCircle className="w-4 h-4 mr-2" />
                          Cancel Order
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
