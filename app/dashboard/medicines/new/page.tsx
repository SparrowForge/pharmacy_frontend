"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { ArrowLeft, Barcode, Loader2, Save, Sparkles, Plus, X, Eye } from "lucide-react"
import { toast } from "sonner"

const categories = ["Pain Relief", "Antibiotics", "Allergy", "Digestive", "Vitamins", "Diabetes", "Cardiovascular", "Respiratory"]
const brands = ["Tylenol", "Amoxil", "Zyrtec", "Prilosec", "Nature Made", "Advil", "Glucophage", "Bayer", "Generic"]
const suppliers = ["PharmaCorp", "MediSupply", "HealthDist", "VitaWholesale", "GlobalMeds"]

export default function AddMedicinePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("basic")
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  const [badges, setBadges] = useState<string[]>([])
  const [badgeInput, setBadgeInput] = useState("")
  const [rackNumber, setRackNumber] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    toast.success("Medicine added successfully!")
    router.push("/dashboard/medicines")
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/medicines">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Add New Medicine</h1>
          <p className="text-muted-foreground">
            Enter medicine details to add to your catalog
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Tabs for Different Sections */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
              <TabsTrigger value="business">Business</TabsTrigger>
              <TabsTrigger value="seo">SEO & Media</TabsTrigger>
            </TabsList>

            {/* BASIC TAB */}
            <TabsContent value="basic" className="space-y-6">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Enter the medicine details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Medicine Name *</Label>
                      <Input id="name" placeholder="e.g. Paracetamol 500mg" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="slug">Product Slug *</Label>
                      <Input id="slug" placeholder="e.g. paracetamol-500mg" required />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="generic">Generic Name</Label>
                      <Input id="generic" placeholder="e.g. Acetaminophen" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="productNo">Product Number</Label>
                      <Input id="productNo" placeholder="e.g. PROD-2024-001" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rackNo">Rack Number (Physical Location)</Label>
                      <Input 
                        id="rackNo" 
                        placeholder="e.g. A-12-B3" 
                        value={rackNumber}
                        onChange={(e) => setRackNumber(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="brand">Brand</Label>
                      <Select>
                        <SelectTrigger id="brand">
                          <SelectValue placeholder="Select brand" />
                        </SelectTrigger>
                        <SelectContent>
                          {brands.map((brand) => (
                            <SelectItem key={brand} value={brand.toLowerCase()}>
                              {brand}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select required>
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category.toLowerCase()}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="supplier">Supplier *</Label>
                    <Select required>
                      <SelectTrigger id="supplier">
                        <SelectValue placeholder="Select supplier" />
                      </SelectTrigger>
                      <SelectContent>
                        {suppliers.map((supplier) => (
                          <SelectItem key={supplier} value={supplier.toLowerCase()}>
                            {supplier}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description / Overview</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Enter medicine description, usage instructions, side effects, etc."
                      rows={4}
                    />
                  </div>

                  {/* Tags */}
                  <div className="space-y-2">
                    <Label>Tags</Label>
                    <div className="flex gap-2 mb-2">
                      <Input
                        placeholder="Add a tag and press Enter"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && tagInput.trim()) {
                            setTags([...tags, tagInput.trim()])
                            setTagInput("")
                          }
                        }}
                      />
                      <Button type="button" variant="outline" onClick={() => {
                        if (tagInput.trim()) {
                          setTags([...tags, tagInput.trim()])
                          setTagInput("")
                        }
                      }}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="gap-2">
                          {tag}
                          <button
                            type="button"
                            onClick={() => setTags(tags.filter((t) => t !== tag))}
                            className="hover:text-destructive"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Status */}
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select defaultValue="active">
                      <SelectTrigger id="status">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="discontinued">Discontinued</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Barcode */}
                  <div className="space-y-2">
                    <Label htmlFor="barcode">Barcode</Label>
                    <div className="flex gap-2">
                      <Input id="barcode" placeholder="Scan or enter barcode" className="flex-1" />
                      <Button type="button" variant="outline">
                        <Barcode className="w-4 h-4 mr-2" />
                        Scan
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* PRICING TAB */}
            <TabsContent value="pricing" className="space-y-6">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Stock & Pricing</CardTitle>
                  <CardDescription>Set inventory and pricing details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="batch">Batch Number *</Label>
                      <Input id="batch" placeholder="B2024XXX" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date *</Label>
                      <Input id="expiry" type="date" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="stock">Initial Stock *</Label>
                      <Input id="stock" type="number" placeholder="0" min="0" required />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="purchase">Purchase Price *</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                        <Input id="purchase" type="number" step="0.01" className="pl-7" placeholder="0.00" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mrp">MRP *</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                        <Input id="mrp" type="number" step="0.01" className="pl-7" placeholder="0.00" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="selling">Selling Price *</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                        <Input id="selling" type="number" step="0.01" className="pl-7" placeholder="0.00" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="offeredPrice">Offered Price</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                        <Input id="offeredPrice" type="number" step="0.01" className="pl-7" placeholder="0.00" />
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="minStock">Minimum Stock Level</Label>
                      <Input id="minStock" type="number" placeholder="50" min="0" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxStock">Maximum Stock Level</Label>
                      <Input id="maxStock" type="number" placeholder="500" min="0" />
                    </div>
                  </div>

                  {/* Badges for Pricing */}
                  <div className="space-y-2">
                    <Label>Product Badges</Label>
                    <div className="flex gap-2 mb-2">
                      <Input
                        placeholder="e.g. New, Sale, Popular, Limited"
                        value={badgeInput}
                        onChange={(e) => setBadgeInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && badgeInput.trim()) {
                            setBadges([...badges, badgeInput.trim()])
                            setBadgeInput("")
                          }
                        }}
                      />
                      <Button type="button" variant="outline" onClick={() => {
                        if (badgeInput.trim()) {
                          setBadges([...badges, badgeInput.trim()])
                          setBadgeInput("")
                        }
                      }}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {badges.map((badge) => (
                        <Badge key={badge} className="gap-2 bg-primary hover:bg-primary/90">
                          {badge}
                          <button
                            type="button"
                            onClick={() => setBadges(badges.filter((b) => b !== badge))}
                            className="hover:text-destructive"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* BUSINESS SETTINGS TAB */}
            <TabsContent value="business" className="space-y-6">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Business Settings</CardTitle>
                  <CardDescription>Configure tax, shipping, and special offers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="tax">Tax Rate (%)</Label>
                      <Input id="tax" type="number" step="0.01" placeholder="0" min="0" max="100" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="shippingCost">Shipping Cost ($)</Label>
                      <Input id="shippingCost" type="number" step="0.01" placeholder="0" min="0" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="weight">Weight (kg)</Label>
                      <Input id="weight" type="number" step="0.1" placeholder="0.1" min="0" />
                    </div>
                  </div>

                  {/* Flags for business logic */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Track Expiry Alerts</Label>
                      <Select defaultValue="true">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="true">Yes, Alert when expiring</SelectItem>
                          <SelectItem value="false">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Allow Warranty Claims</Label>
                      <Select defaultValue="false">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="true">Yes</SelectItem>
                          <SelectItem value="false">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Allow Returns</Label>
                      <Select defaultValue="true">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="true">Yes</SelectItem>
                          <SelectItem value="false">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Return Period (Days)</Label>
                      <Input type="number" placeholder="30" min="0" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bundleOffer">Bundle Offer / Combo Pack</Label>
                    <Input id="bundleOffer" placeholder="e.g. Buy 2 Get 1 Free" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* SEO & MEDIA TAB */}
            <TabsContent value="seo" className="space-y-6">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>SEO & Media</CardTitle>
                  <CardDescription>Optimize for search engines and add media</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* SEO Section */}
                  <div className="space-y-4 pb-4 border-b">
                    <h3 className="font-semibold text-foreground">Search Engine Optimization</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="metaTitle">Meta Title</Label>
                      <Input 
                        id="metaTitle" 
                        placeholder="SEO title (50-60 characters)" 
                        maxLength={60}
                      />
                      <p className="text-xs text-muted-foreground">Recommended: 50-60 characters</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="metaKeywords">Meta Keywords</Label>
                      <Input 
                        id="metaKeywords" 
                        placeholder="Comma separated keywords"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="metaDesc">Meta Description</Label>
                      <Textarea 
                        id="metaDesc" 
                        placeholder="SEO description (150-160 characters)" 
                        rows={3}
                        maxLength={160}
                      />
                      <p className="text-xs text-muted-foreground">Recommended: 150-160 characters</p>
                    </div>
                  </div>

                  {/* Media Section */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-foreground">Media</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="previewImage">Product Preview Image</Label>
                      <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition">
                        <Eye className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Click to upload or drag & drop</p>
                        <p className="text-xs text-muted-foreground">PNG, JPG up to 2MB</p>
                        <Input id="previewImage" type="file" accept="image/*" className="hidden" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="productVideo">Product Video URL</Label>
                      <Input 
                        id="productVideo" 
                        placeholder="https://youtube.com/watch?v=..." 
                        type="url"
                      />
                      <p className="text-xs text-muted-foreground">YouTube or Vimeo URL</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Bottom Actions */}
          <div className="flex gap-3">
            <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90" disabled={isLoading}>
              {isLoading ? (
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
            <Button type="button" variant="outline" asChild>
              <Link href="/dashboard/medicines">Cancel</Link>
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
