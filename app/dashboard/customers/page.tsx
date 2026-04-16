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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Search,
  Plus,
  MoreHorizontal,
  Users,
  Phone,
  Mail,
  CreditCard,
  Gift,
  Edit,
  Trash2,
  Eye,
  ShoppingCart,
} from "lucide-react"
import { cn } from "@/lib/utils"

const customersData = [
  { id: 1, name: "John Doe", email: "john@email.com", phone: "+1 555-0201", totalOrders: 24, totalSpent: 1250.00, loyaltyPoints: 125, creditLimit: 500, status: "Regular" },
  { id: 2, name: "Sarah Wilson", email: "sarah@email.com", phone: "+1 555-0202", totalOrders: 56, totalSpent: 3450.00, loyaltyPoints: 345, creditLimit: 1000, status: "VIP" },
  { id: 3, name: "Mike Brown", email: "mike@email.com", phone: "+1 555-0203", totalOrders: 12, totalSpent: 580.00, loyaltyPoints: 58, creditLimit: 200, status: "Regular" },
  { id: 4, name: "Emily Davis", email: "emily@email.com", phone: "+1 555-0204", totalOrders: 8, totalSpent: 320.00, loyaltyPoints: 32, creditLimit: 0, status: "New" },
  { id: 5, name: "David Chen", email: "david@email.com", phone: "+1 555-0205", totalOrders: 89, totalSpent: 5680.00, loyaltyPoints: 568, creditLimit: 2000, status: "VIP" },
  { id: 6, name: "Lisa Anderson", email: "lisa@email.com", phone: "+1 555-0206", totalOrders: 15, totalSpent: 890.00, loyaltyPoints: 89, creditLimit: 300, status: "Regular" },
]

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [addModalOpen, setAddModalOpen] = useState(false)

  const filteredCustomers = customersData.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery)
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "VIP": return "bg-primary/10 text-primary"
      case "Regular": return "bg-green-100 text-green-700"
      case "New": return "bg-blue-100 text-blue-700"
      default: return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Customers</h1>
          <p className="text-muted-foreground">
            Manage customer profiles and loyalty programs
          </p>
        </div>
        <Dialog open={addModalOpen} onOpenChange={setAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Customer
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Add New Customer</DialogTitle>
              <DialogDescription>
                Create a new customer profile
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Full Name *</Label>
                <Input placeholder="Customer name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Phone *</Label>
                  <Input placeholder="+1 555-0000" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" placeholder="email@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Address</Label>
                <Textarea placeholder="Full address" rows={2} />
              </div>
              <div className="space-y-2">
                <Label>Credit Limit</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input type="number" className="pl-7" placeholder="0.00" />
                </div>
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90">
                Add Customer
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-4 gap-4">
        {[
          { label: "Total Customers", value: "1,245", icon: Users, color: "bg-primary/10 text-primary" },
          { label: "VIP Customers", value: "89", icon: Gift, color: "bg-yellow-500/10 text-yellow-600" },
          { label: "Total Credit Given", value: "$12,450", icon: CreditCard, color: "bg-blue-500/10 text-blue-500" },
          { label: "Avg. Spend", value: "$156", icon: ShoppingCart, color: "bg-green-500/10 text-green-500" },
        ].map((stat, index) => (
          <Card key={index} className="border-border">
            <CardContent className="p-6 flex items-center gap-4">
              <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", stat.color)}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search customers by name, email, or phone..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Customers Table */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle>All Customers</CardTitle>
          <CardDescription>
            {filteredCustomers.length} customers found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead className="text-right">Orders</TableHead>
                <TableHead className="text-right">Total Spent</TableHead>
                <TableHead className="text-right">Points</TableHead>
                <TableHead className="text-right">Credit Limit</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">
                          {customer.name.split(" ").map(n => n[0]).join("")}
                        </span>
                      </div>
                      <p className="font-medium">{customer.name}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {customer.email}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {customer.phone}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">{customer.totalOrders}</TableCell>
                  <TableCell className="text-right font-semibold text-primary">
                    ${customer.totalSpent.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                      <Gift className="w-3 h-3 mr-1" />
                      {customer.loyaltyPoints}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    ${customer.creditLimit.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Badge className={cn("border-0", getStatusColor(customer.status))}>
                      {customer.status}
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
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          View Orders
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
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
  )
}
