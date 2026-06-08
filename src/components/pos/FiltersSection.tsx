"use client";

import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Search, Barcode } from "lucide-react";

interface FiltersSectionProps {
  search: string;
  onSearchChange: (value: string) => void;
  barcodeInput: string;
  onBarcodeInputChange: (value: string) => void;
  onBarcodeSubmit: () => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  categories: { id: string; name: string }[];
  status: string;
  onStatusChange: (value: string) => void;
  statuses: string[];
  shopId: string;
  onShopChange: (value: string) => void;
  shops: { id: string; name: string }[];
  branchId: string;
  onBranchChange: (value: string) => void;
  branches: { id: string; name: string }[];
  saleType: string;
  onSaleTypeChange: (value: string) => void;
  saleTypes: string[];
}

export function FiltersSection({
  search,
  onSearchChange,
  barcodeInput,
  onBarcodeInputChange,
  onBarcodeSubmit,
  selectedCategory,
  onCategoryChange,
  categories,
  status,
  onStatusChange,
  statuses,
  shopId,
  onShopChange,
  shops,
  branchId,
  onBranchChange,
  branches,
  saleType,
  onSaleTypeChange,
  saleTypes,
}: FiltersSectionProps) {
  return (
    <Card className="border-border sticky top-0 z-10">
      <CardContent className="p-4 space-y-3">
        {/* Search Bar */}
        <div className="space-y-2">
          <Label className="text-xs">Search Product</Label>
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Medicine name, SKU..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-8 h-9 text-sm"
            />
          </div>
        </div>

        {/* Barcode Scan */}
        <div className="space-y-2">
          <Label className="text-xs">Barcode Scan</Label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Barcode className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Scan barcode..."
                value={barcodeInput}
                onChange={(e) => onBarcodeInputChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onBarcodeSubmit();
                  }
                }}
                className="pl-8 h-9 text-sm"
              />
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={onBarcodeSubmit}
              className="h-9"
            >
              <Barcode className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Category and Status */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label className="text-xs">Category</Label>
            <Select value={selectedCategory} onValueChange={onCategoryChange}>
              <SelectTrigger className="h-9 text-sm w-full">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.name}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-xs">Status</Label>
            <Select value={status} onValueChange={onStatusChange}>
              <SelectTrigger className="h-9 text-sm w-full">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((st) => (
                  <SelectItem key={st} value={st}>
                    {st}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Shop and Branch */}
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="shop" className="text-xs">
              Shop *
            </Label>
            <Select value={shopId} onValueChange={onShopChange}>
              <SelectTrigger id="shop" className="h-9 text-sm w-full">
                <SelectValue placeholder="Select Shop" />
              </SelectTrigger>
              <SelectContent>
                {shops.map((shop) => (
                  <SelectItem key={shop.id} value={shop.id}>
                    {shop.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="branch" className="text-xs">
              Branch *
            </Label>
            <Select value={branchId} onValueChange={onBranchChange}>
              <SelectTrigger id="branch" className="h-9 text-sm w-full">
                <SelectValue placeholder="Select Branch" />
              </SelectTrigger>
              <SelectContent>
                {branches.map((branch) => (
                  <SelectItem key={branch.id} value={branch.id}>
                    {branch.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Sale Type */}
        <div className="space-y-2">
          <Label htmlFor="saleType" className="text-xs">
            Sale Type *
          </Label>
          <Select value={saleType} onValueChange={onSaleTypeChange}>
            <SelectTrigger id="saleType" className="h-9 text-sm w-full">
              <SelectValue placeholder="Select Sale Type" />
            </SelectTrigger>
            <SelectContent>
              {saleTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
