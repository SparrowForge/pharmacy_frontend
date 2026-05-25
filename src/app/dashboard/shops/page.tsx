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
  Building2,
  MapPin,
  Phone,
  Mail,
  Users,
  Edit,
  Trash2,
  Eye,
  Settings,
  Crown,
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import ShopDialogueForm from "@/src/components/shops/ShopDialogueForm";

const shopsData = [
  {
    id: 1,
    name: "PharmaSmart Main",
    owner: "John Doe",
    email: "john@pharmasmart.com",
    phone: "+1 555-0101",
    address: "123 Medical Drive, NY",
    plan: "Business",
    branches: 3,
    users: 12,
    status: "Active",
    created: "2025-01-15",
  },
  {
    id: 2,
    name: "HealthCare Plus",
    owner: "Sarah Wilson",
    email: "sarah@healthcareplus.com",
    phone: "+1 555-0102",
    address: "456 Health Ave, CA",
    plan: "Enterprise",
    branches: 8,
    users: 45,
    status: "Active",
    created: "2024-11-20",
  },
  {
    id: 3,
    name: "MediStore Express",
    owner: "Mike Brown",
    email: "mike@medistore.com",
    phone: "+1 555-0103",
    address: "789 Wellness Blvd, TX",
    plan: "Starter",
    branches: 1,
    users: 5,
    status: "Active",
    created: "2026-02-01",
  },
  {
    id: 4,
    name: "City Pharmacy",
    owner: "Emily Davis",
    email: "emily@citypharmacy.com",
    phone: "+1 555-0104",
    address: "321 Urban St, FL",
    plan: "Business",
    branches: 2,
    users: 8,
    status: "Suspended",
    created: "2025-06-10",
  },
  {
    id: 5,
    name: "Wellness Hub",
    owner: "David Chen",
    email: "david@wellnesshub.com",
    phone: "+1 555-0105",
    address: "654 Care Lane, WA",
    plan: "Business",
    branches: 5,
    users: 22,
    status: "Active",
    created: "2025-03-25",
  },
];

const plans = ["Starter", "Business", "Enterprise"];

export default function ShopsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [addModalOpen, setAddModalOpen] = useState(false);

  const filteredShops = shopsData.filter(
    (shop) =>
      shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.owner.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "Enterprise":
        return "bg-primary/10 text-primary";
      case "Business":
        return "bg-blue-100 text-blue-700";
      case "Starter":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Crown className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Shop Management
            </h1>
            <p className="text-muted-foreground">
              Super Admin: Manage all pharmacy shops
            </p>
          </div>
        </div>
        <ShopDialogueForm />
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-4 gap-4">
        {[
          {
            label: "Total Shops",
            value: "125",
            icon: Building2,
            color: "bg-primary/10 text-primary",
          },
          {
            label: "Active Shops",
            value: "118",
            icon: Building2,
            color: "bg-green-500/10 text-green-500",
          },
          {
            label: "Total Branches",
            value: "342",
            icon: MapPin,
            color: "bg-blue-500/10 text-blue-500",
          },
          {
            label: "Total Users",
            value: "1,245",
            icon: Users,
            color: "bg-purple-500/10 text-purple-500",
          },
        ].map((stat, index) => (
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

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search shops..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Shops Table */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle>All Shops</CardTitle>
          <CardDescription>{filteredShops.length} shops found</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Shop</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead className="text-center">Branches</TableHead>
                <TableHead className="text-center">Users</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredShops.map((shop) => (
                <TableRow key={shop.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{shop.name}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {shop.address.split(",")[0]}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{shop.owner}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {shop.email}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={cn("border-0", getPlanColor(shop.plan))}>
                      {shop.plan}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center font-medium">
                    {shop.branches}
                  </TableCell>
                  <TableCell className="text-center font-medium">
                    {shop.users}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {shop.created}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        "border-0",
                        shop.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700",
                      )}
                    >
                      {shop.status}
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
                          Edit Shop
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Settings className="w-4 h-4 mr-2" />
                          Manage Plan
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
