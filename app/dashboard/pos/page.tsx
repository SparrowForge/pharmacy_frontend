"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Search,
  Barcode,
  Plus,
  Minus,
  Trash2,
  User,
  CreditCard,
  Banknote,
  Smartphone,
  Check,
  Printer,
  Sparkles,
  Package,
  AlertTriangle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

// Sample medicine data
const medicineData = [
  { id: 1, name: "Paracetamol 500mg", generic: "Acetaminophen", category: "Pain Relief", price: 2.50, stock: 450, barcode: "MED001" },
  { id: 2, name: "Amoxicillin 500mg", generic: "Amoxicillin", category: "Antibiotics", price: 5.00, stock: 23, barcode: "MED002" },
  { id: 3, name: "Cetirizine 10mg", generic: "Cetirizine", category: "Allergy", price: 2.50, stock: 180, barcode: "MED003" },
  { id: 4, name: "Omeprazole 20mg", generic: "Omeprazole", category: "Digestive", price: 5.00, stock: 95, barcode: "MED004" },
  { id: 5, name: "Vitamin D3 1000IU", generic: "Cholecalciferol", category: "Vitamins", price: 5.00, stock: 8, barcode: "MED005" },
  { id: 6, name: "Ibuprofen 400mg", generic: "Ibuprofen", category: "Pain Relief", price: 3.00, stock: 320, barcode: "MED006" },
  { id: 7, name: "Metformin 500mg", generic: "Metformin", category: "Diabetes", price: 4.50, stock: 150, barcode: "MED007" },
  { id: 8, name: "Aspirin 100mg", generic: "Acetylsalicylic acid", category: "Pain Relief", price: 2.00, stock: 500, barcode: "MED008" },
  { id: 9, name: "Loratadine 10mg", generic: "Loratadine", category: "Allergy", price: 3.50, stock: 200, barcode: "MED009" },
  { id: 10, name: "Pantoprazole 40mg", generic: "Pantoprazole", category: "Digestive", price: 6.00, stock: 80, barcode: "MED010" },
]

const categories = ["All", "Pain Relief", "Antibiotics", "Allergy", "Digestive", "Vitamins", "Diabetes"]

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  stock: number
}

export default function POSPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [cart, setCart] = useState<CartItem[]>([])
  const [discount, setDiscount] = useState(0)
  const [discountCode, setDiscountCode] = useState("")
  const [paymentMethod, setPaymentMethod] = useState<string>("")
  const [paidAmount, setPaidAmount] = useState("")
  const [customerName, setCustomerName] = useState("")
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  // Filter medicines based on search and category
  const filteredMedicines = useMemo(() => {
    return medicineData.filter((med) => {
      const matchesSearch =
        med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        med.generic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        med.barcode.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory =
        selectedCategory === "All" || med.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  // Cart calculations
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discountAmount = (subtotal * discount) / 100
  const total = subtotal - discountAmount
  const change = paidAmount ? parseFloat(paidAmount) - total : 0

  // Add item to cart
  const addToCart = (medicine: typeof medicineData[0]) => {
    const existingItem = cart.find((item) => item.id === medicine.id)
    
    if (existingItem) {
      if (existingItem.quantity >= medicine.stock) {
        toast.error("Cannot add more than available stock")
        return
      }
      setCart(
        cart.map((item) =>
          item.id === medicine.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      )
    } else {
      setCart([
        ...cart,
        {
          id: medicine.id,
          name: medicine.name,
          price: medicine.price,
          quantity: 1,
          stock: medicine.stock,
        },
      ])
    }
    toast.success(`Added ${medicine.name} to cart`)
  }

  // Update quantity
  const updateQuantity = (id: number, change: number) => {
    setCart(
      cart
        .map((item) => {
          if (item.id === id) {
            const newQuantity = item.quantity + change
            if (newQuantity > item.stock) {
              toast.error("Cannot exceed available stock")
              return item
            }
            return { ...item, quantity: Math.max(0, newQuantity) }
          }
          return item
        })
        .filter((item) => item.quantity > 0)
    )
  }

  // Remove item from cart
  const removeFromCart = (id: number) => {
    setCart(cart.filter((item) => item.id !== id))
  }

  // Clear cart
  const clearCart = () => {
    setCart([])
    setDiscount(0)
    setCustomerName("")
  }

  // Process payment
  const processPayment = () => {
    if (cart.length === 0) {
      toast.error("Cart is empty")
      return
    }
    setShowPaymentModal(true)
  }

  // Complete sale
  const completeSale = () => {
    if (!paymentMethod) {
      toast.error("Please select a payment method")
      return
    }
    if (paymentMethod === "cash" && (!paidAmount || parseFloat(paidAmount) < total)) {
      toast.error("Paid amount must be equal to or greater than total")
      return
    }
    
    setShowPaymentModal(false)
    setShowSuccessModal(true)
    
    // Reset after success
    setTimeout(() => {
      setShowSuccessModal(false)
      clearCart()
      setPaidAmount("")
      setPaymentMethod("")
    }, 3000)
  }

  return (
    <div className="flex gap-6 h-[calc(100vh-7rem)]">
      {/* Left Panel - Product Search */}
      <div className="flex-1 flex flex-col">
        {/* Search and Filters */}
        <div className="space-y-4 mb-4">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search medicine, generic name, or barcode..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
                autoFocus
              />
            </div>
            <Button variant="outline" className="h-12 px-4">
              <Barcode className="w-5 h-5 mr-2" />
              Scan
            </Button>
          </div>

          {/* Category Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "whitespace-nowrap",
                  selectedCategory === category && "bg-primary hover:bg-primary/90"
                )}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Medicine Grid */}
        <ScrollArea className="flex-1">
          <div className="grid grid-cols-2 xl:grid-cols-3 gap-3 pr-4">
            {filteredMedicines.map((medicine) => (
              <button
                key={medicine.id}
                onClick={() => addToCart(medicine)}
                className={cn(
                  "p-4 rounded-xl border text-left transition-all hover:shadow-md",
                  medicine.stock <= 10
                    ? "border-orange-200 bg-orange-50/50 hover:border-orange-300"
                    : "border-border bg-card hover:border-primary/30"
                )}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Package className="w-5 h-5 text-primary" />
                  </div>
                  {medicine.stock <= 10 && (
                    <Badge variant="destructive" className="text-[10px]">
                      Low Stock
                    </Badge>
                  )}
                </div>
                <h3 className="font-semibold text-foreground text-sm mb-1 line-clamp-1">
                  {medicine.name}
                </h3>
                <p className="text-xs text-muted-foreground mb-2">
                  {medicine.generic}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">
                    ${medicine.price.toFixed(2)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {medicine.stock} in stock
                  </span>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Right Panel - Cart */}
      <Card className="w-96 flex flex-col border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Current Sale</CardTitle>
            {cart.length > 0 && (
              <Button variant="ghost" size="sm" onClick={clearCart} className="text-destructive hover:text-destructive">
                Clear
              </Button>
            )}
          </div>
          {/* Customer */}
          <div className="flex items-center gap-2 mt-2">
            <div className="flex-1 relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Customer name (optional)"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="pl-9 h-9 text-sm"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          {/* Cart Items */}
          <ScrollArea className="flex-1 px-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 text-muted-foreground">
                <Package className="w-12 h-12 mb-3 opacity-50" />
                <p className="text-sm">No items in cart</p>
                <p className="text-xs">Search and click on medicines to add</p>
              </div>
            ) : (
              <div className="space-y-3 py-2">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        ${item.price.toFixed(2)} each
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateQuantity(item.id, -1)}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                    <div className="text-right w-16">
                      <p className="text-sm font-semibold text-foreground">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-destructive hover:text-destructive"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>

          {/* Cart Summary */}
          <div className="border-t border-border p-4 space-y-3">
            {/* AI Suggestion */}
            {cart.length > 0 && (
              <div className="p-2 rounded-lg bg-primary/5 border border-primary/10 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-primary mt-0.5" />
                <p className="text-xs text-muted-foreground">
                  Consider suggesting Vitamin C - often bought with these items
                </p>
              </div>
            )}

            {/* Discount */}
            <div className="flex items-center gap-2">
              <Label className="text-sm text-muted-foreground whitespace-nowrap">
                Discount %
              </Label>
              <Input
                type="number"
                min="0"
                max="100"
                value={discount}
                onChange={(e) => setDiscount(Math.min(100, Math.max(0, parseFloat(e.target.value) || 0)))}
                className="h-9 text-sm"
              />
            </div>

            {/* Discount Code */}
            <div className="flex items-center gap-2">
              <Input
                type="text"
                placeholder="Enter discount code"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                className="h-9 text-sm flex-1"
              />
              <Button 
                size="sm"
                variant="outline"
                onClick={() => {
                  if (discountCode.trim()) {
                    toast.success(`Discount code "${discountCode}" applied!`)
                    setDiscountCode("")
                  } else {
                    toast.error("Please enter a discount code")
                  }
                }}
                className="bg-gradient-to-r from-primary/20 to-primary/10 hover:from-primary/30 hover:to-primary/20 border-primary/30"
              >
                Apply
              </Button>
            </div>

            <Separator />

            {/* Totals */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount ({discount}%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Pay Button */}
            <Button
              className="w-full h-12 bg-primary hover:bg-primary/90 text-lg"
              onClick={processPayment}
              disabled={cart.length === 0}
            >
              <CreditCard className="w-5 h-5 mr-2" />
              Pay ${total.toFixed(2)}
            </Button>

            {/* Keyboard Shortcuts */}
            <div className="flex justify-center gap-4 text-[10px] text-muted-foreground">
              <span><kbd className="px-1 py-0.5 bg-muted rounded text-[10px]">F2</kbd> Pay</span>
              <span><kbd className="px-1 py-0.5 bg-muted rounded text-[10px]">F4</kbd> Clear</span>
              <span><kbd className="px-1 py-0.5 bg-muted rounded text-[10px]">F5</kbd> Search</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Modal */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Payment</DialogTitle>
            <DialogDescription>
              Total amount: <span className="font-bold text-primary">${total.toFixed(2)}</span>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Payment Method */}
            <div className="space-y-2">
              <Label>Payment Method</Label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "cash", label: "Cash", icon: Banknote },
                  { id: "card", label: "Card", icon: CreditCard },
                  { id: "mobile", label: "Mobile", icon: Smartphone },
                ].map((method) => (
                  <Button
                    key={method.id}
                    variant={paymentMethod === method.id ? "default" : "outline"}
                    className={cn(
                      "h-16 flex-col gap-1",
                      paymentMethod === method.id && "bg-primary hover:bg-primary/90"
                    )}
                    onClick={() => setPaymentMethod(method.id)}
                  >
                    <method.icon className="w-5 h-5" />
                    <span className="text-xs">{method.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Paid Amount (for cash) */}
            {paymentMethod === "cash" && (
              <div className="space-y-2">
                <Label>Paid Amount</Label>
                <Input
                  type="number"
                  placeholder="Enter amount received"
                  value={paidAmount}
                  onChange={(e) => setPaidAmount(e.target.value)}
                  className="h-12 text-lg"
                  autoFocus
                />
                {paidAmount && parseFloat(paidAmount) >= total && (
                  <div className="flex justify-between p-3 rounded-lg bg-green-50 border border-green-200">
                    <span className="text-sm text-green-700">Change</span>
                    <span className="font-bold text-green-700">${change.toFixed(2)}</span>
                  </div>
                )}
                {/* Quick amounts */}
                <div className="flex gap-2">
                  {[50, 100, 200].map((amount) => (
                    <Button
                      key={amount}
                      variant="outline"
                      size="sm"
                      onClick={() => setPaidAmount(amount.toString())}
                      className="flex-1"
                    >
                      ${amount}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <Button
              className="w-full h-12 bg-primary hover:bg-primary/90"
              onClick={completeSale}
            >
              Complete Sale
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-sm text-center">
          <div className="py-8">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <DialogTitle className="text-xl mb-2">Payment Successful!</DialogTitle>
            <DialogDescription>
              Transaction completed. Receipt is ready to print.
            </DialogDescription>
            <Button variant="outline" className="mt-6">
              <Printer className="w-4 h-4 mr-2" />
              Print Receipt
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
