"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowLeft, Barcode, Loader2, Save, Sparkles } from "lucide-react"
import { toast } from "sonner"

const categories = ["Pain Relief", "Antibiotics", "Allergy", "Digestive", "Vitamins", "Diabetes", "Cardiovascular", "Respiratory"]
const brands = ["Tylenol", "Amoxil", "Zyrtec", "Prilosec", "Nature Made", "Advil", "Glucophage", "Bayer", "Generic"]
const suppliers = ["PharmaCorp", "MediSupply", "HealthDist", "VitaWholesale", "GlobalMeds"]

export default function AddMedicinePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

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
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
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
                    <Label htmlFor="generic">Generic Name</Label>
                    <Input id="generic" placeholder="e.g. Acetaminophen" />
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
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Enter medicine description, usage instructions, etc."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Stock & Pricing */}
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

                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="purchase">Purchase Price *</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <Input id="purchase" type="number" step="0.01" className="pl-7" placeholder="0.00" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mrp">MRP (Max Retail Price) *</Label>
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
                </div>

                <div className="grid sm:grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="minStock">Minimum Stock</Label>
                    <Input id="minStock" type="number" placeholder="50" min="0" />
                  </div>
                </div>

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
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Suggestion Card */}
            <Card className="border-border bg-gradient-to-br from-primary/5 to-primary/10">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-foreground">AI Assistant</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Need help? Our AI can suggest optimal pricing based on market data and your competitors.
                </p>
                <Button variant="outline" className="w-full" type="button">
                  Get AI Suggestions
                </Button>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card className="border-border">
              <CardContent className="p-6 space-y-3">
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
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
                <Button type="button" variant="outline" className="w-full" asChild>
                  <Link href="/dashboard/medicines">Cancel</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-base">Tips</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>- Ensure selling price is higher than purchase price</p>
                <p>- Set minimum stock level for auto-alerts</p>
                <p>- Use barcode scanner for faster entry</p>
                <p>- Expiry date should be at least 3 months away</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
