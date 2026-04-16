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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Search,
  Plus,
  Filter,
  Download,
  MoreHorizontal,
  Package,
  AlertTriangle,
  Clock,
  TrendingUp,
  ArrowUpDown,
  Edit,
  Trash2,
  Eye,
} from "lucide-react"
import { cn } from "@/lib/utils"

const inventoryData = [
  { id: 1, name: "Paracetamol 500mg", batch: "B2024001", category: "Pain Relief", stock: 450, minStock: 100, expiry: "2025-12-15", price: 2.50, status: "In Stock" },
  { id: 2, name: "Amoxicillin 500mg", batch: "B2024002", category: "Antibiotics", stock: 23, minStock: 50, expiry: "2025-06-20", price: 5.00, status: "Low Stock" },
  { id: 3, name: "Cetirizine 10mg", batch: "B2024003", category: "Allergy", stock: 180, minStock: 80, expiry: "2025-09-10", price: 2.50, status: "In Stock" },
  { id: 4, name: "Omeprazole 20mg", batch: "B2024004", category: "Digestive", stock: 95, minStock: 60, expiry: "2025-08-05", price: 5.00, status: "In Stock" },
  { id: 5, name: "Vitamin D3 1000IU", batch: "B2024005", category: "Vitamins", stock: 8, minStock: 30, expiry: "2026-05-01", price: 5.00, status: "Critical" },
  { id: 6, name: "Ibuprofen 400mg", batch: "B2024006", category: "Pain Relief", stock: 320, minStock: 100, expiry: "2025-11-25", price: 3.00, status: "In Stock" },
  { id: 7, name: "Metformin 500mg", batch: "B2024007", category: "Diabetes", stock: 0, minStock: 80, expiry: "2025-10-15", price: 4.50, status: "Out of Stock" },
  { id: 8, name: "Aspirin 100mg", batch: "B2024008", category: "Pain Relief", stock: 500, minStock: 150, expiry: "2026-03-20", price: 2.00, status: "In Stock" },
  { id: 9, name: "Loratadine 10mg", batch: "B2024009", category: "Allergy", stock: 200, minStock: 70, expiry: "2025-07-30", price: 3.50, status: "In Stock" },
  { id: 10, name: "Pantoprazole 40mg", batch: "B2024010", category: "Digestive", stock: 15, minStock: 40, expiry: "2026-04-15", price: 6.00, status: "Low Stock" },
]

const categories = ["All Categories", "Pain Relief", "Antibiotics", "Allergy", "Digestive", "Vitamins", "Diabetes"]

const stats = [
  { label: "Total Products", value: "1,245", change: "+12", icon: Package, color: "bg-primary/10 text-primary" },
  { label: "Low Stock Items", value: "23", change: "-5", icon: AlertTriangle, color: "bg-orange-500/10 text-orange-500" },
  { label: "Expiring Soon", value: "8", change: "+2", icon: Clock, color: "bg-red-500/10 text-red-500" },
  { label: "Total Value", value: "$45,280", change: "+8%", icon: TrendingUp, color: "bg-green-500/10 text-green-500" },
]

export default function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [stockModalOpen, setStockModalOpen] = useState(false)

  const filteredInventory = inventoryData.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.batch.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All Categories" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock": return "bg-green-100 text-green-700"
      case "Low Stock": return "bg-orange-100 text-orange-700"
      case "Critical": return "bg-red-100 text-red-700"
      case "Out of Stock": return "bg-gray-100 text-gray-700"
      default: return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Inventory Management</h1>
          <p className="text-muted-foreground">
            Track and manage your pharmacy stock levels
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Dialog open={stockModalOpen} onOpenChange={setStockModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Add Stock
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add Stock</DialogTitle>
                <DialogDescription>
                  Quickly add stock to an existing medicine
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Select Medicine</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose medicine" />
                    </SelectTrigger>
                    <SelectContent>
                      {inventoryData.map((item) => (
                        <SelectItem key={item.id} value={item.id.toString()}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Quantity</Label>
                    <Input type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label>Batch No.</Label>
                    <Input placeholder="B2024XXX" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Expiry Date</Label>
                  <Input type="date" />
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Add Stock
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", stat.color)}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <span className="text-sm text-green-600 font-medium">{stat.change}</span>
              </div>
              <div className="mt-3">
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
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
                placeholder="Search by name or batch number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Table */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle>Inventory Items</CardTitle>
          <CardDescription>
            Showing {filteredInventory.length} of {inventoryData.length} items
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Button variant="ghost" className="h-8 p-0 hover:bg-transparent">
                    Medicine Name
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                  </Button>
                </TableHead>
                <TableHead>Batch</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Stock</TableHead>
                <TableHead>Expiry</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInventory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="text-muted-foreground">{item.batch}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{item.category}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={cn(
                      "font-medium",
                      item.stock <= item.minStock && "text-red-600"
                    )}>
                      {item.stock}
                    </span>
                    <span className="text-muted-foreground text-xs"> / {item.minStock} min</span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{item.expiry}</TableCell>
                  <TableCell className="text-right font-medium">${item.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge className={cn("border-0", getStatusColor(item.status))}>
                      {item.status}
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
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Plus className="w-4 h-4 mr-2" />
                          Add Stock
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
