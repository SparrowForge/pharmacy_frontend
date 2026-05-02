"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ArrowLeft, Plus, Trash2, Save, Loader2 } from "lucide-react"
import { toast } from "sonner"

// Sample suppliers
const suppliers = [
  { id: 1, name: "ABC Pharma Ltd", contact: "contact@abcpharma.com" },
  { id: 2, name: "XYZ Medicines", contact: "info@xyzmeds.com" },
  { id: 3, name: "Global Health Co", contact: "sales@globalhealth.com" },
  { id: 4, name: "Prime Pharma", contact: "orders@primepharma.com" },
]

// Sample medicines for PO
const availableMedicines = [
  { id: 1, name: "Paracetamol 500mg", unit: "Piece", minOrder: 100 },
  { id: 2, name: "Amoxicillin 500mg", unit: "Strip", minOrder: 10 },
  { id: 3, name: "Cetirizine 10mg", unit: "Piece", minOrder: 100 },
  { id: 4, name: "Omeprazole 20mg", unit: "Strip", minOrder: 5 },
  { id: 5, name: "Vitamin D3 1000IU", unit: "Box", minOrder: 10 },
  { id: 6, name: "Ibuprofen 400mg", unit: "Piece", minOrder: 50 },
]

interface POLineItem {
  id: string
  medicineId: number
  medicineName: string
  quantity: number
  unit: string
  unitPrice: number
  minOrder: number
}

export default function CreatePurchaseOrderPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [supplierId, setSupplierId] = useState("")
  const [deliveryDate, setDeliveryDate] = useState("")
  const [paymentTerms, setPaymentTerms] = useState("net30")
  const [notes, setNotes] = useState("")
  const [lineItems, setLineItems] = useState<POLineItem[]>([])
  const [selectedMedicine, setSelectedMedicine] = useState("")
  const [quantity, setQuantity] = useState("")
  const [unitPrice, setUnitPrice] = useState("")

  // Calculate totals
  const subtotal = lineItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
  const taxRate = 0.15 // 15% tax
  const taxAmount = subtotal * taxRate
  const totalAmount = subtotal + taxAmount

  // Add line item
  const handleAddLineItem = () => {
    if (!selectedMedicine || !quantity || !unitPrice) {
      toast.error("Please fill all fields")
      return
    }

    const medicine = availableMedicines.find((m) => m.id === parseInt(selectedMedicine))
    if (!medicine) return

    const newItem: POLineItem = {
      id: Date.now().toString(),
      medicineId: medicine.id,
      medicineName: medicine.name,
      quantity: parseInt(quantity),
      unit: medicine.unit,
      unitPrice: parseFloat(unitPrice),
      minOrder: medicine.minOrder,
    }

    // Validate minimum order quantity
    if (newItem.quantity < newItem.minOrder) {
      toast.error(`Minimum order quantity is ${newItem.minOrder} ${medicine.unit}(s)`)
      return
    }

    setLineItems([...lineItems, newItem])
    setSelectedMedicine("")
    setQuantity("")
    setUnitPrice("")
    toast.success("Item added to order")
  }

  // Remove line item
  const handleRemoveLineItem = (id: string) => {
    setLineItems(lineItems.filter((item) => item.id !== id))
  }

  // Submit PO
  const handleSubmitOrder = async () => {
    if (!supplierId) {
      toast.error("Please select a supplier")
      return
    }
    if (lineItems.length === 0) {
      toast.error("Please add at least one item")
      return
    }
    if (!deliveryDate) {
      toast.error("Please set delivery date")
      return
    }

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      const poNumber = `PO-${new Date().getFullYear()}-${Math.floor(Math.random() * 9999)}`
      toast.success(`Purchase Order ${poNumber} created successfully`)
      
      // Reset form
      setSupplierId("")
      setDeliveryDate("")
      setPaymentTerms("net30")
      setNotes("")
      setLineItems([])
      
      // Redirect after 1 second
      setTimeout(() => {
        router.push("/dashboard/purchase-orders")
      }, 1000)
    } catch (error) {
      toast.error("Failed to create purchase order")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" asChild>
          <Link href="/dashboard/purchase-orders">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Create Purchase Order</h1>
          <p className="text-muted-foreground">Add items and confirm the order details</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Supplier Selection */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Supplier Information</CardTitle>
              <CardDescription>Select supplier and delivery details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="supplier">Supplier *</Label>
                <Select value={supplierId} onValueChange={setSupplierId}>
                  <SelectTrigger id="supplier">
                    <SelectValue placeholder="Select supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    {suppliers.map((supplier) => (
                      <SelectItem key={supplier.id} value={supplier.id.toString()}>
                        <div>
                          <div className="font-medium">{supplier.name}</div>
                          <div className="text-xs text-muted-foreground">{supplier.contact}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="delivery">Expected Delivery Date *</Label>
                  <Input
                    id="delivery"
                    type="date"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="payment">Payment Terms</Label>
                  <Select value={paymentTerms} onValueChange={setPaymentTerms}>
                    <SelectTrigger id="payment">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cod">Cash on Delivery</SelectItem>
                      <SelectItem value="net15">Net 15 Days</SelectItem>
                      <SelectItem value="net30">Net 30 Days</SelectItem>
                      <SelectItem value="net60">Net 60 Days</SelectItem>
                      <SelectItem value="prepaid">Prepaid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Special Notes / Instructions</Label>
                <Textarea
                  id="notes"
                  placeholder="Add any special instructions for this order..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Add Line Items */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Add Items</CardTitle>
              <CardDescription>Select medicines and quantities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-4 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="medicine">Medicine *</Label>
                  <Select value={selectedMedicine} onValueChange={setSelectedMedicine}>
                    <SelectTrigger id="medicine">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableMedicines.map((med) => (
                        <SelectItem key={med.id} value={med.id.toString()}>
                          {med.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="qty">Quantity *</Label>
                  <Input
                    id="qty"
                    type="number"
                    placeholder="Qty"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    min="1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Unit Price *</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="Price"
                    value={unitPrice}
                    onChange={(e) => setUnitPrice(e.target.value)}
                    step="0.01"
                    min="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">&nbsp;</Label>
                  <Button
                    onClick={handleAddLineItem}
                    className="w-full bg-primary hover:bg-primary/90"
                    type="button"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Line Items Table */}
          {lineItems.length > 0 && (
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Order Items ({lineItems.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Medicine</TableHead>
                        <TableHead className="text-right">Qty</TableHead>
                        <TableHead className="text-right">Unit Price</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead className="w-10"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {lineItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{item.medicineName}</p>
                              <p className="text-xs text-muted-foreground">
                                Min order: {item.minOrder} {item.unit}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            {item.quantity} {item.unit}
                          </TableCell>
                          <TableCell className="text-right">${item.unitPrice.toFixed(2)}</TableCell>
                          <TableCell className="text-right font-semibold">
                            ${(item.quantity * item.unitPrice).toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive hover:text-destructive"
                              onClick={() => handleRemoveLineItem(item.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Summary Sidebar */}
        <div className="lg:col-span-1">
          <Card className="border-border sticky top-4">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Items Summary */}
              <div className="space-y-2 pb-4 border-b">
                <p className="text-sm text-muted-foreground">Items: {lineItems.length}</p>
                <p className="text-sm text-muted-foreground">
                  Total Units: {lineItems.reduce((sum, item) => sum + item.quantity, 0)}
                </p>
              </div>

              {/* Totals */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (15%):</span>
                  <span className="font-medium">${taxAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t text-base font-bold">
                  <span>Total:</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
              </div>

              {/* Status Badge */}
              <Badge variant="outline" className="w-full justify-center py-1">
                Status: Draft
              </Badge>

              {/* Action Buttons */}
              <div className="space-y-2 pt-4">
                <Button
                  onClick={handleSubmitOrder}
                  disabled={isLoading || lineItems.length === 0}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Create Order
                    </>
                  )}
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/dashboard/purchase-orders">Cancel</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
