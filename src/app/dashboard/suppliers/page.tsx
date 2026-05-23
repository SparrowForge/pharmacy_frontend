"use client";

import { useState } from "react";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
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
  Truck,
  Phone,
  Mail,
  MapPin,
  Edit,
  Trash2,
  Eye,
  Building2,
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import { toast } from "sonner";

const suppliersData = [
  {
    id: 1,
    name: "PharmaCorp",
    contact: "John Smith",
    email: "john@pharmacorp.com",
    phone: "+1 555-0101",
    address: "123 Medical Drive, NY",
    products: 45,
    status: "Active",
  },
  {
    id: 2,
    name: "MediSupply",
    contact: "Sarah Johnson",
    email: "sarah@medisupply.com",
    phone: "+1 555-0102",
    address: "456 Health Ave, CA",
    products: 32,
    status: "Active",
  },
  {
    id: 3,
    name: "HealthDist",
    contact: "Mike Brown",
    email: "mike@healthdist.com",
    phone: "+1 555-0103",
    address: "789 Wellness Blvd, TX",
    products: 28,
    status: "Active",
  },
  {
    id: 4,
    name: "VitaWholesale",
    contact: "Emily Davis",
    email: "emily@vitawholesale.com",
    phone: "+1 555-0104",
    address: "321 Vitamin St, FL",
    products: 18,
    status: "Inactive",
  },
  {
    id: 5,
    name: "GlobalMeds",
    contact: "David Wilson",
    email: "david@globalmeds.com",
    phone: "+1 555-0105",
    address: "654 Pharma Lane, WA",
    products: 56,
    status: "Active",
  },
];

export default function SuppliersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");

  const filteredSuppliers = suppliersData.filter(
    (supplier) =>
      supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.contact.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Suppliers</h1>
          <p className="text-muted-foreground">
            Manage your medicine suppliers and vendors
          </p>
        </div>
        <Dialog open={addModalOpen} onOpenChange={setAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Supplier
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Supplier</DialogTitle>
              <DialogDescription>
                Enter supplier details with location information
              </DialogDescription>
            </DialogHeader>

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="location">Location Details</TabsTrigger>
              </TabsList>

              {/* BASIC INFO TAB */}
              <TabsContent value="basic" className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Company Name *</Label>
                    <Input placeholder="Supplier name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Contact Person *</Label>
                    <Input placeholder="Contact name" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Email *</Label>
                    <Input type="email" placeholder="email@company.com" />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone *</Label>
                    <Input placeholder="+1 555-0000" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Street Address</Label>
                  <Input placeholder="Street address" />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea placeholder="Company description" rows={2} />
                </div>
              </TabsContent>

              {/* LOCATION DETAILS TAB */}
              <TabsContent value="location" className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Division/State *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select division" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dhaka">Dhaka</SelectItem>
                        <SelectItem value="chittagong">Chittagong</SelectItem>
                        <SelectItem value="rajshahi">Rajshahi</SelectItem>
                        <SelectItem value="khulna">Khulna</SelectItem>
                        <SelectItem value="barishal">Barishal</SelectItem>
                        <SelectItem value="sylhet">Sylhet</SelectItem>
                        <SelectItem value="rangpur">Rangpur</SelectItem>
                        <SelectItem value="mymensingh">Mymensingh</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>District *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select district" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dhaka">Dhaka</SelectItem>
                        <SelectItem value="narayanganj">Narayanganj</SelectItem>
                        <SelectItem value="gazipur">Gazipur</SelectItem>
                        <SelectItem value="faridpur">Faridpur</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Upazila *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select upazila" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gulshan">Gulshan</SelectItem>
                        <SelectItem value="banani">Banani</SelectItem>
                        <SelectItem value="motijheel">Motijheel</SelectItem>
                        <SelectItem value="dhanmondi">Dhanmondi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Union</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select union" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="union1">Union 1</SelectItem>
                        <SelectItem value="union2">Union 2</SelectItem>
                        <SelectItem value="union3">Union 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Thana/Police Station</Label>
                    <Input placeholder="Thana name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Zone/Area</Label>
                    <Input placeholder="Zone name" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Postal Code</Label>
                  <Input placeholder="Postal code" />
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex gap-2 pt-4">
              <Button
                className="flex-1 bg-primary hover:bg-primary/90"
                onClick={() => {
                  toast.success("Supplier added successfully");
                  setAddModalOpen(false);
                  setActiveTab("basic");
                }}
              >
                Add Supplier
              </Button>
              <Button variant="outline" onClick={() => setAddModalOpen(false)}>
                Cancel
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-4 gap-4">
        {[
          { label: "Total Suppliers", value: "12", icon: Building2 },
          { label: "Active", value: "10", icon: Truck },
          { label: "Total Products", value: "179", icon: Truck },
          { label: "Pending Orders", value: "5", icon: Truck },
        ].map((stat, index) => (
          <Card key={index} className="border-border">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-primary" />
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

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search suppliers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Suppliers Table */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle>All Suppliers</CardTitle>
          <CardDescription>
            {filteredSuppliers.length} suppliers found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Supplier</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSuppliers.map((supplier) => (
                <TableRow key={supplier.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{supplier.name}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {supplier.address.split(",")[0]}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {supplier.contact}
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Mail className="w-3 h-3" />
                      {supplier.email}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Phone className="w-3 h-3" />
                      {supplier.phone}
                    </span>
                  </TableCell>
                  <TableCell className="font-medium">
                    {supplier.products}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        "border-0",
                        supplier.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700",
                      )}
                    >
                      {supplier.status}
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
  );
}
