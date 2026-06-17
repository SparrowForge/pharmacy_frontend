"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { ArrowLeft, Barcode, Loader2, Save, Plus, X, Eye } from "lucide-react";
import { toast } from "sonner";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/src/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Textarea } from "@/src/components/ui/textarea";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { useProductBrands } from "@/src/hooks/useProductBrands";
import { useProductCategories } from "@/src/hooks/useProductCategories";
import { useCompanies } from "@/src/hooks/useCompanies";
import { useProductUnits } from "@/src/hooks/useProductUnits";
import FileUpload from "@/src/components/files/FileUpload";
import { useProducts } from "@/src/hooks/useProducts";
import {
  defaultMedicineData,
  IMedicineFormData,
} from "@/src/constants/prodcucts.constant";
import { useProductBadges } from "@/src/hooks/useProductBadges";
import { useProductImages } from "@/src/hooks/useProductImages";
import { useProductTags } from "@/src/hooks/useProductTags";
import { IProductUnit } from "@/src/types/productUnit.types";

export default function AddMedicinePage() {
  const tabOrder = ["basic", "business", "seo"] as const;
  type TabType = (typeof tabOrder)[number];
  const [activeTab, setActiveTab] = useState<TabType>("basic");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [badges, setBadges] = useState<string[]>([]);
  const [badgeInput, setBadgeInput] = useState("");
  const [selectedUnit, setSelectedUnit] = useState<IProductUnit>();
  const [formData, setFormData] =
    useState<IMedicineFormData>(defaultMedicineData);

  const { brands, fetchBrands } = useProductBrands();
  const { categories, fetchCategories } = useProductCategories();
  const { companies, fetchCompanies } = useCompanies();
  const { units, fetchProductUnits } = useProductUnits();
  const { createProduct, createLoading } = useProducts();
  const { createProductBadge } = useProductBadges();
  const { createProductImage } = useProductImages();
  const { createProductTag } = useProductTags();

  const handleInputChange = (field: keyof IMedicineFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };
  const handleAddBadge = () => {
    if (badgeInput.trim() && !badges.includes(badgeInput.trim())) {
      setBadges([...badges, badgeInput.trim()]);
      setBadgeInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleRemoveBadge = (badge: string) => {
    setBadges(tags.filter((t) => t !== badge));
  };

  const suppliers = companies?.filter((c) => c.company_type === "supplier");

  const manufacturers = companies?.filter(
    (c) => c.company_type === "manufacturer",
  );

  const distributors = companies?.filter(
    (c) => c.company_type === "distributor",
  );

  useEffect(() => {
    fetchBrands({
      page: 1,
      limit: 100,
    });

    fetchCategories({
      page: 1,
      limit: 100,
    });

    fetchProductUnits({
      page: 1,
      limit: 100,
    });

    fetchCompanies({
      page: 1,
      limit: 100,
    });
  }, []);

  const goNext = () => {
    const currentIndex = tabOrder.indexOf(activeTab);
    if (currentIndex < tabOrder.length - 1) {
      setActiveTab(tabOrder[currentIndex + 1]);
    }
  };

  const goPrev = () => {
    const currentIndex = tabOrder.indexOf(activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabOrder[currentIndex - 1]);
    }
  };

  const isLastTab = activeTab === tabOrder[tabOrder.length - 1];
  const isFirstTab = activeTab === tabOrder[0];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        preview_media_id: formData.preview_media_id ?? null,
      };
      const res = await createProduct(payload);

      if (res.id) {
        const badgePayload = {
          product_id: res.id,
          badge: badges,
        };
        const tagsPaylod = {
          product_id: res.id,
          tag: tags,
        };
        const productImagePayload = {
          product_id: res.id,
          media_id: formData.preview_media_id
            ? formData.preview_media_id
            : null,
          sort_order: 1,
          is_primary: true,
        };

        await createProductBadge(badgePayload);
        await createProductTag(tagsPaylod);

        if (formData.preview_media_id) {
          await createProductImage(productImagePayload);
        }
      }

      // toast.success("Medicine added successfully!");
    } catch (error) {
      // toast.error("Failed to save medicine");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="">
        {/* Page Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/medicines">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Add New Medicine
            </h1>
            <p className="text-muted-foreground mt-1">
              Enter medicine details to add to your catalog
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Tabs for Different Sections */}
            <Tabs
              value={activeTab}
              onValueChange={(value) => setActiveTab(value as TabType)}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Basic</TabsTrigger>
                <TabsTrigger value="business">Business</TabsTrigger>
                <TabsTrigger value="seo">SEO & Media</TabsTrigger>
              </TabsList>

              {/* BASIC TAB */}
              <TabsContent value="basic" className="space-y-6">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription>
                      Enter the medicine details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Medicine Name *</Label>
                        <Input
                          id="name"
                          placeholder="e.g. Paracetamol 500mg"
                          value={formData.name}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="calling_name">Calling Name</Label>
                        <Input
                          id="calling_name"
                          placeholder="e.g. Generic Name"
                          value={formData.calling_name}
                          onChange={(e) =>
                            handleInputChange("calling_name", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="generic">Generic Name</Label>
                        <Input
                          id="generic"
                          placeholder="e.g. Acetaminophen"
                          value={formData.generic_name}
                          onChange={(e) =>
                            handleInputChange("generic_name", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="productNo">Product Number</Label>
                        <Input
                          id="productNo"
                          placeholder="e.g. PROD-2024-001"
                          value={formData.product_number}
                          onChange={(e) =>
                            handleInputChange("product_number", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="sku">SKU</Label>
                        <Input
                          id="sku"
                          placeholder="e.g. SKU-001"
                          value={formData.sku}
                          onChange={(e) =>
                            handleInputChange("sku", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="brand">Brand</Label>
                        <Select
                          value={formData.brand_id}
                          onValueChange={(value) =>
                            handleInputChange("brand_id", value)
                          }
                        >
                          <SelectTrigger className="w-full" id="brand">
                            <SelectValue placeholder="Select brand" />
                          </SelectTrigger>
                          <SelectContent>
                            {brands.map((brand, idx) => (
                              <SelectItem key={idx} value={brand.id}>
                                {brand.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Category *</Label>
                        <Select
                          value={formData.category_id}
                          onValueChange={(value) =>
                            handleInputChange("category_id", value)
                          }
                        >
                          <SelectTrigger className="w-full" id="category">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category, idx) => (
                              <SelectItem key={idx} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="supplier">Supplier *</Label>
                        <Select
                          value={formData.supplier_id}
                          onValueChange={(value) =>
                            handleInputChange("supplier_id", value)
                          }
                        >
                          <SelectTrigger className="w-full" id="supplier">
                            <SelectValue placeholder="Select supplier" />
                          </SelectTrigger>
                          <SelectContent>
                            {suppliers.map((supplier, idx) => (
                              <SelectItem key={idx} value={supplier.id}>
                                {supplier.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="manufacturer">Manufacturer *</Label>
                        <Select
                          value={formData.manufacturer_id}
                          onValueChange={(value) =>
                            handleInputChange("manufacturer_id", value)
                          }
                        >
                          <SelectTrigger className="w-full" id="manufacturer">
                            <SelectValue placeholder="Select manufacturer" />
                          </SelectTrigger>
                          <SelectContent>
                            {manufacturers.map((manufacture, idx) => (
                              <SelectItem key={idx} value={manufacture.id}>
                                {manufacture.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="Distributor">Distributor *</Label>
                        <Select
                          value={formData.distributor_id}
                          onValueChange={(value) =>
                            handleInputChange("distributor_id", value)
                          }
                        >
                          <SelectTrigger className="w-full" id="Distributor">
                            <SelectValue placeholder="Select Distributor" />
                          </SelectTrigger>
                          <SelectContent>
                            {distributors.map((distributor, idx) => (
                              <SelectItem key={idx} value={distributor.id}>
                                {distributor.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">
                        Description / Overview
                      </Label>
                      <Textarea
                        id="description"
                        placeholder="Enter medicine description, usage instructions, side effects, etc."
                        value={formData.description}
                        onChange={(e) =>
                          handleInputChange("description", e.target.value)
                        }
                        rows={4}
                      />
                    </div>

                    {/* Tags */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Tags</Label>
                        <div className="flex gap-2 mb-2">
                          <Input
                            placeholder="Add a tag and press Enter"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                handleAddTag();
                              }
                            }}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={handleAddTag}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="gap-2"
                            >
                              {tag}
                              <button
                                type="button"
                                onClick={() => handleRemoveTag(tag)}
                                className="hover:text-destructive"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Badge</Label>
                        <div className="flex gap-2 mb-2">
                          <Input
                            placeholder="Add a badge and press Enter"
                            value={badgeInput}
                            onChange={(e) => setBadgeInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                handleAddBadge();
                              }
                            }}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={handleAddBadge}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {badges.map((badge) => (
                            <Badge
                              key={badge}
                              variant="secondary"
                              className="gap-2"
                            >
                              {badge}
                              <button
                                type="button"
                                onClick={() => handleRemoveBadge(badge)}
                                className="hover:text-destructive"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select
                          value={formData.status}
                          onValueChange={(value) =>
                            handleInputChange("status", value)
                          }
                        >
                          <SelectTrigger className="w-full" id="status">
                            <SelectValue placeholder="Select Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                            <SelectItem value="discontinued">
                              Discontinued
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="unit_id">Units</Label>
                          <Select
                            value={formData.unit_id}
                            onValueChange={(value) => {
                              const selected = units.find(
                                (u) => String(u.id) === value,
                              );

                              handleInputChange("unit_id", value);
                              setSelectedUnit(selected);
                            }}
                          >
                            <SelectTrigger className="w-full" id="unit_id">
                              <SelectValue placeholder="Select Units" />
                            </SelectTrigger>

                            <SelectContent>
                              {units.map((unit) => (
                                <SelectItem
                                  key={unit.id}
                                  value={String(unit.id)}
                                >
                                  {unit.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="unit_id">Selling Unit</Label>
                          <Select
                            value={formData.default_unit_id}
                            onValueChange={(value) =>
                              handleInputChange("default_unit_id", value)
                            }
                          >
                            <SelectTrigger className="w-full" id="unit_id">
                              <SelectValue placeholder="Select default Unit" />
                            </SelectTrigger>
                            <SelectContent>
                              {units
                                .filter(
                                  (d) =>
                                    d.unit_type === selectedUnit?.unit_type,
                                )
                                .map((unit, idx) => (
                                  <SelectItem key={idx} value={unit.id}>
                                    {unit.name}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="rackNo">
                          Rack Number (Physical Location)
                        </Label>
                        <Input
                          id="rackNo"
                          placeholder="e.g. A-12-B3"
                          value={formData.rack_no}
                          onChange={(e) =>
                            handleInputChange("rack_no", e.target.value)
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="barcode">Barcode</Label>
                        <div className="flex gap-2">
                          <Input
                            id="barcode"
                            placeholder="Scan or enter barcode"
                            value={formData.barcode}
                            onChange={(e) =>
                              handleInputChange("barcode", e.target.value)
                            }
                            className="flex-1"
                          />
                          <Button type="button" variant="outline">
                            <Barcode className="w-4 h-4 mr-2" />
                            Scan
                          </Button>
                        </div>
                      </div>
                    </div>
                    {/* Barcode */}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* BUSINESS SETTINGS TAB */}
              <TabsContent value="business" className="space-y-6">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle>Business Settings</CardTitle>
                    <CardDescription>
                      Configure pricing, stock, and special offers
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Pricing Section */}
                    <div>
                      <h3 className="font-semibold text-foreground mb-4">
                        Pricing
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <Label htmlFor="purchasePrice">
                            Purchase Per Unit Price 
                          </Label>
                          <Input
                            id="purchasePrice"
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            value={formData.purchase_price}
                            onChange={(e) =>
                              handleInputChange(
                                "purchase_price",
                                parseFloat(e.target.value) || 0,
                              )
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="mrp">MRP </Label>
                          <Input
                            id="mrp"
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            value={formData.mrp}
                            onChange={(e) =>
                              handleInputChange(
                                "mrp",
                                parseFloat(e.target.value) || 0,
                              )
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="sellingPrice">
                            Selling Per Unit Price 
                          </Label>
                          <Input
                            id="sellingPrice"
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            value={formData.selling_price}
                            onChange={(e) =>
                              handleInputChange(
                                "selling_price",
                                parseFloat(e.target.value) || 0,
                              )
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="offeredPrice">
                            Offered Per Unit Price 
                          </Label>
                          <Input
                            id="offeredPrice"
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            value={formData.offered_price}
                            onChange={(e) =>
                              handleInputChange(
                                "offered_price",
                                parseFloat(e.target.value) || 0,
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>

                    {/* Stock Management */}
                    <div>
                      <h3 className="font-semibold text-foreground mb-4">
                        Stock Management
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <Label htmlFor="currentStock">
                            Current Stock (Units)
                          </Label>
                          <Input
                            id="currentStock"
                            type="number"
                            step="0.1"
                            placeholder="0"
                            value={formData.current_stock}
                            onChange={(e) =>
                              handleInputChange(
                                "current_stock",
                                parseFloat(e.target.value) || 0,
                              )
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="minimumStock">
                            Minimum Stock (Units)
                          </Label>
                          <Input
                            id="minimumStock"
                            type="number"
                            step="0.1"
                            placeholder="0"
                            value={formData.minimum_stock}
                            onChange={(e) =>
                              handleInputChange(
                                "minimum_stock",
                                parseFloat(e.target.value) || 0,
                              )
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="maximumStock">
                            Maximum Stock (Units)
                          </Label>
                          <Input
                            id="maximumStock"
                            type="number"
                            step="0.1"
                            placeholder="0"
                            value={formData.maximum_stock}
                            onChange={(e) =>
                              handleInputChange(
                                "maximum_stock",
                                parseFloat(e.target.value) || 0,
                              )
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="reorderLevel">
                            Reorder Level (Units)
                          </Label>
                          <Input
                            id="reorderLevel"
                            type="number"
                            step="0.1"
                            placeholder="0"
                            value={formData.reorder_level}
                            onChange={(e) =>
                              handleInputChange(
                                "reorder_level",
                                parseFloat(e.target.value) || 0,
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>

                    {/* Shipping & Tax */}
                    <div>
                      <h3 className="font-semibold text-foreground mb-4">
                        Shipping & Vat
                      </h3>
                      <div className="grid sm:grid-cols-3 gap-4 mb-4">
                        <div className="space-y-2">
                          <Label htmlFor="tax">Vat Rate (%)</Label>
                          <Input
                            id="tax"
                            type="number"
                            step="0.01"
                            placeholder="0"
                            value={formData.tax_rate}
                            onChange={(e) =>
                              handleInputChange(
                                "tax_rate",
                                parseFloat(e.target.value) || 0,
                              )
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="shippingCost">
                            Shipping Cost 
                          </Label>
                          <Input
                            id="shippingCost"
                            type="number"
                            step="0.01"
                            placeholder="0"
                            value={formData.shipping_cost}
                            onChange={(e) =>
                              handleInputChange(
                                "shipping_cost",
                                parseFloat(e.target.value) || 0,
                              )
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="weight">Weight (kg)</Label>
                          <Input
                            id="weight"
                            type="number"
                            step="0.1"
                            placeholder="0.1"
                            value={formData.weight}
                            onChange={(e) =>
                              handleInputChange(
                                "weight",
                                parseFloat(e.target.value) || 0,
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>

                    {/* Flags for business logic */}
                    <div>
                      <h3 className="font-semibold text-foreground mb-4">
                        Settings
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Track Expiry Alerts</Label>
                          <Select
                            value={
                              formData.track_expiry_alert ? "true" : "false"
                            }
                            onValueChange={(value) =>
                              handleInputChange(
                                "track_expiry_alert",
                                value === "true",
                              )
                            }
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="true">
                                Yes, Alert when expiring
                              </SelectItem>
                              <SelectItem value="false">No</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Allow Warranty Claims</Label>
                          <Select
                            value={
                              formData.allow_warranty_claim ? "true" : "false"
                            }
                            onValueChange={(value) =>
                              handleInputChange(
                                "allow_warranty_claim",
                                value === "true",
                              )
                            }
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="true">Yes</SelectItem>
                              <SelectItem value="false">No</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Allow Returns</Label>
                          <Select
                            value={formData.allow_return ? "true" : "false"}
                            onValueChange={(value) =>
                              handleInputChange(
                                "allow_return",
                                value === "true",
                              )
                            }
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="true">Yes</SelectItem>
                              <SelectItem value="false">No</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        {formData.allow_return === true && (
                          <div className="space-y-2">
                            <Label htmlFor="returnPeriod">
                              Return Period (Days)
                            </Label>
                            <Input
                              id="returnPeriod"
                              type="number"
                              placeholder="30"
                              value={formData.return_period_days}
                              onChange={(e) =>
                                handleInputChange(
                                  "return_period_days",
                                  parseFloat(e.target.value) || 0,
                                )
                              }
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bundleOffer">
                        Bundle Offer / Combo Pack
                      </Label>
                      <Input
                        id="bundleOffer"
                        placeholder="e.g. Buy 2 Get 1 Free"
                        value={formData.bundle_offer}
                        onChange={(e) =>
                          handleInputChange("bundle_offer", e.target.value)
                        }
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* SEO & MEDIA TAB */}
              <TabsContent value="seo" className="space-y-6">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle>SEO & Media</CardTitle>
                    <CardDescription>
                      Optimize for search engines and add media
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* SEO Section */}
                    <div className="space-y-4 pb-4 border-b">
                      <h3 className="font-semibold text-foreground">
                        Search Engine Optimization
                      </h3>

                      <div className="space-y-2">
                        <Label htmlFor="metaTitle">Meta Title</Label>
                        <Input
                          id="metaTitle"
                          placeholder="SEO title (50-60 characters)"
                          maxLength={60}
                          value={formData.meta_title}
                          onChange={(e) =>
                            handleInputChange("meta_title", e.target.value)
                          }
                        />
                        <p className="text-xs text-muted-foreground">
                          Recommended: 50-60 characters
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="metaKeywords">Meta Keywords</Label>
                        <Input
                          id="metaKeywords"
                          placeholder="Comma separated keywords"
                          value={formData.meta_keyword}
                          onChange={(e) =>
                            handleInputChange("meta_keyword", e.target.value)
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="metaDesc">Meta Description</Label>
                        <Textarea
                          id="metaDesc"
                          placeholder="SEO description (150-160 characters)"
                          rows={3}
                          maxLength={160}
                          value={formData.meta_description}
                          onChange={(e) =>
                            handleInputChange(
                              "meta_description",
                              e.target.value,
                            )
                          }
                        />
                        <p className="text-xs text-muted-foreground">
                          Recommended: 150-160 characters
                        </p>
                      </div>
                    </div>

                    {/* Media Section */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-foreground">Media</h3>

                      <FileUpload
                        value={formData.preview_media_id ?? undefined}
                        label="Medicine Media"
                        onChange={(fileId) =>
                          handleInputChange("preview_media_id", fileId)
                        }
                      />

                      <div className="space-y-2">
                        <Label htmlFor="productVideo">Product Video URL</Label>
                        <Input
                          id="productVideo"
                          placeholder="https://youtube.com/watch?v=..."
                          type="url"
                          value={formData.product_video_url}
                          onChange={(e) =>
                            handleInputChange(
                              "product_video_url",
                              e.target.value,
                            )
                          }
                        />
                        <p className="text-xs text-muted-foreground">
                          YouTube or Vimeo URL
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Bottom Actions */}
            <div className="flex gap-3 justify-between">
              <div className="flex gap-2">
                {!isFirstTab && (
                  <Button type="button" variant="outline" onClick={goPrev}>
                    Previous
                  </Button>
                )}

                {!isLastTab && (
                  <Button type="button" onClick={goNext}>
                    Next
                  </Button>
                )}
              </div>

              {isLastTab && (
                <Button type="submit" disabled={createLoading}>
                  {createLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Medicine
                    </>
                  )}
                </Button>
              )}

              {isLastTab && (
                <Button type="button" variant="outline" asChild>
                  <Link href="/dashboard/medicines">Cancel</Link>
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
