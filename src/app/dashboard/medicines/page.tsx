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
  Filter,
  Download,
  MoreHorizontal,
  Package,
  Edit,
  Trash2,
  Eye,
  Copy,
} from "lucide-react";
import { cn } from "@/src/lib/utils";

const medicinesData = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    generic: "Acetaminophen",
    brand: "Tylenol",
    category: "Pain Relief",
    supplier: "PharmaCorp",
    price: 2.5,
    stock: 450,
    barcode: "MED001",
  },
  {
    id: 2,
    name: "Amoxicillin 500mg",
    generic: "Amoxicillin",
    brand: "Amoxil",
    category: "Antibiotics",
    supplier: "MediSupply",
    price: 5.0,
    stock: 23,
    barcode: "MED002",
  },
  {
    id: 3,
    name: "Cetirizine 10mg",
    generic: "Cetirizine",
    brand: "Zyrtec",
    category: "Allergy",
    supplier: "PharmaCorp",
    price: 2.5,
    stock: 180,
    barcode: "MED003",
  },
  {
    id: 4,
    name: "Omeprazole 20mg",
    generic: "Omeprazole",
    brand: "Prilosec",
    category: "Digestive",
    supplier: "HealthDist",
    price: 5.0,
    stock: 95,
    barcode: "MED004",
  },
  {
    id: 5,
    name: "Vitamin D3 1000IU",
    generic: "Cholecalciferol",
    brand: "Nature Made",
    category: "Vitamins",
    supplier: "VitaWholesale",
    price: 5.0,
    stock: 8,
    barcode: "MED005",
  },
  {
    id: 6,
    name: "Ibuprofen 400mg",
    generic: "Ibuprofen",
    brand: "Advil",
    category: "Pain Relief",
    supplier: "PharmaCorp",
    price: 3.0,
    stock: 320,
    barcode: "MED006",
  },
  {
    id: 7,
    name: "Metformin 500mg",
    generic: "Metformin",
    brand: "Glucophage",
    category: "Diabetes",
    supplier: "MediSupply",
    price: 4.5,
    stock: 150,
    barcode: "MED007",
  },
  {
    id: 8,
    name: "Aspirin 100mg",
    generic: "Acetylsalicylic acid",
    brand: "Bayer",
    category: "Pain Relief",
    supplier: "HealthDist",
    price: 2.0,
    stock: 500,
    barcode: "MED008",
  },
];

const categories = [
  "All Categories",
  "Pain Relief",
  "Antibiotics",
  "Allergy",
  "Digestive",
  "Vitamins",
  "Diabetes",
];

export default function MedicinesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const filteredMedicines = medicinesData.filter((medicine) => {
    const matchesSearch =
      medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      medicine.generic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      medicine.barcode.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All Categories" ||
      medicine.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Medicines</h1>
          <p className="text-muted-foreground">
            Manage your medicine catalog and pricing
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link href="/dashboard/medicines/new">
              <Plus className="w-4 h-4 mr-2" />
              Add Medicine
            </Link>
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="border-border">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, generic name, or barcode..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
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

      {/* Medicines Table */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle>Medicine Catalog</CardTitle>
          <CardDescription>
            Showing {filteredMedicines.length} of {medicinesData.length}{" "}
            medicines
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Medicine</TableHead>
                <TableHead>Generic Name</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Stock</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMedicines.map((medicine) => (
                <TableRow key={medicine.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Package className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{medicine.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {medicine.barcode}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {medicine.generic}
                  </TableCell>
                  <TableCell>{medicine.brand}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{medicine.category}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {medicine.supplier}
                  </TableCell>
                  <TableCell className="text-right font-semibold text-primary">
                    ${medicine.price.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    <span
                      className={cn(
                        "font-medium",
                        medicine.stock < 50 && "text-red-600",
                      )}
                    >
                      {medicine.stock}
                    </span>
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
                          <Copy className="w-4 h-4 mr-2" />
                          Duplicate
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
