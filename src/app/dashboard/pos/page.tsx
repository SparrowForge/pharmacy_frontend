"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Badge } from "@/src/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import {
  Search,
  Barcode,
  Plus,
  Minus,
  Trash2,
  CreditCard,
  Banknote,
  Smartphone,
  Check,
  Printer,
  Package,
  X,
  Building2,
  Receipt,
  FileText,
  CircleHelp,
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import { toast } from "sonner";
import { generateUniqueInvoiceNumber } from "@/src/lib/invoice-generator";
import { InvoicePrint } from "@/src/components/pos/invoice-print";
import { useProducts } from "@/src/hooks/useProducts";
import { initialLimit, initialPage } from "@/src/constants/utils";
import { useProductCategories } from "@/src/hooks/useProductCategories";
import { useEnum } from "@/src/hooks/useEnum";
import Loading from "@/src/components/common/Loading";
import { useCompanies } from "@/src/hooks/useCompanies";
import CustomerForm from "@/src/components/pos/CustomerForm";
import { useShops } from "@/src/hooks/useShops";
import { useBranches } from "@/src/hooks/useBranches";

interface CartItem {
  name: string;
  product_id: string;
  product_batch_id?: string;
  sales_unit_id: string;
  sales_qty: number;
  unit_price: number;
  discount: number
  tax:number
}

interface Transaction {
  id: string;
  cart: CartItem[];
  discount: number;
  discountType: "percentage" | "fixed";
  customerName: string;
}

export default function POSPage() {
  const paymentMethodIcons = {
    cash: Banknote,
    card: CreditCard,
    mobile: Smartphone,
    bank_transfer: Building2,
    check: Receipt,
    credit: FileText,
    other: CircleHelp,
  };
  const [shopId, setShopId] = useState("");
  const [branchId, setBranchId] = useState("");
  const [saleType, setSaleTypes] = useState("cash");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [barcodeInput, setBarcodeInput] = useState("");
  const [discountType, setDiscountType] = useState<"percentage" | "fixed">(
    "percentage",
  );
  const [discount, setDiscount] = useState(0);
  const [discountCode, setDiscountCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [paidAmount, setPaidAmount] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [generatedInvoice, setGeneratedInvoice] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      cart: [],
      discount: 0,
      discountType: "percentage",
      customerName: "",
    },
  ]);
  const [activeTransactionId, setActiveTransactionId] = useState("1");
  const printRef = useRef<HTMLDivElement>(null);

  const [page, setPage] = useState(initialPage);
  const [limit] = useState(initialLimit);
  const [search, setSearch] = useState("");
  const [includeDeleted, setIncludeDeleted] = useState(false);

  const { fetchProducts, products, fetchLoading } = useProducts();
  const { fetchCategories, categories } = useProductCategories();
  const {
    fetchSalesStatus,
    salesStatus,
    fetchPaymentMethodTypes,
    paymentMethodTypes,
    saleTypes,
    fetchSaleTypes
  } = useEnum();
  const { companies, fetchCompanies, createCompany } = useCompanies();
  const { fetchShops, shops } = useShops();
  const { fetchBranches, branches } = useBranches();

  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [customerModalOpen, setCustomerModalOpen] = useState(false);

  const [status, setStatus] = useState("");

  // Handle barcode scan
  const handleBarcodeScan = (barcode: string) => {
    const medicine = products.find((m) => m.barcode === barcode);
    if (medicine) {
      // addToCart(medicine);
      setBarcodeInput("");
      toast.success(`Scanned: ${medicine.name}`);
    } else {
      toast.error(`Barcode not found: ${barcode}`);
    }
  };

  // Cart calculations
  const subtotal = cart.reduce(
    (sum, item) => sum + item.selling_price * item.quantity,
    0,
  );
  const discountAmount =
    discountType === "percentage" ? (subtotal * discount) / 100 : discount;
  const total = subtotal - discountAmount;
  const change = paidAmount ? parseFloat(paidAmount) - total : 0;

  const addToCart = (product: (typeof products)[0]) => {
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      if (existingItem.quantity >= product.current_stock) {
        toast.error("Cannot add more than available stock");
        return;
      }

      setCart(
        cart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        ),
      );
    } else {
      setCart([
        ...cart,
        {
          id: product.id,
          name: product.name,
          selling_price: Number(product.selling_price),
          quantity: 1,
          unit: "Piece",
          stock: product.current_stock,
        },
      ]);
    }

    toast.success(`Added ${product.name} to cart`);
  };

  // Update quantity
  const updateQuantity = (id: string, change: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id !== id) return item;

          const newQuantity = item.quantity + change;

          if (newQuantity > item.stock) {
            toast.error("Cannot exceed available stock");
            return item;
          }

          return {
            ...item,
            quantity: Math.max(0, newQuantity),
          };
        })
        .filter((item) => item.quantity > 0),
    );
  };

  // Update unit
  const updateUnit = (id: number, unit: "Piece" | "Strip" | "Box") => {
    setCart(
      cart.map((item) => (item.id === String(id) ? { ...item, unit } : item)),
    );
  };

  // Remove from cart
  const removeFromCart = (id: number) => {
    setCart(cart.filter((item) => item.id != String(id)));
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
    setDiscount(0);
    setDiscountCode("");
    setPaymentMethod("");
    setPaidAmount("");
    setCustomerName("");
  };

  // Remove transaction
  const removeTransaction = (id: string) => {
    const updatedTransactions = transactions.filter((t) => t.id !== id);
    if (updatedTransactions.length === 0) {
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        cart: [],
        discount: 0,
        discountType: "percentage",
        customerName: "",
      };
      setTransactions([newTransaction]);
      setActiveTransactionId(newTransaction.id);
      clearCart();
    } else {
      setTransactions(updatedTransactions);
      if (activeTransactionId === id) {
        setActiveTransactionId(updatedTransactions[0].id);
        const activeTransaction = updatedTransactions[0];
        setCart(activeTransaction.cart);
        setDiscount(activeTransaction.discount);
        setCustomerName(activeTransaction.customerName);
        setDiscountType(activeTransaction.discountType);
      }
    }
  };

  // Add new transaction
  const addNewTransaction = () => {
    // Save current transaction before creating new one
    const updatedTransactions = transactions.map((t) =>
      t.id === activeTransactionId
        ? { ...t, cart, discount, customerName, discountType }
        : t,
    );

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      cart: [],
      discount: 0,
      discountType: "percentage",
      customerName: "",
    };
    setTransactions([...updatedTransactions, newTransaction]);
    setActiveTransactionId(newTransaction.id);
    clearCart();
  };

  // Switch transaction
  const switchTransaction = (id: string) => {
    // Save current transaction
    const updatedTransactions = transactions.map((t) =>
      t.id === activeTransactionId
        ? { ...t, cart, discount, customerName, discountType }
        : t,
    );
    setTransactions(updatedTransactions);

    // Load selected transaction
    const selectedTransaction = updatedTransactions.find((t) => t.id === id);
    if (selectedTransaction) {
      setActiveTransactionId(id);
      setCart(selectedTransaction.cart);
      setDiscount(selectedTransaction.discount);
      setCustomerName(selectedTransaction.customerName);
      setDiscountType(selectedTransaction.discountType);
      setPaymentMethod("");
      setPaidAmount("");
    }
  };

  // Process payment
  const processPayment = () => {
    if (!paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }
    if (!paidAmount || parseFloat(paidAmount) < total) {
      toast.error("Insufficient payment amount");
      return;
    }

    const invoiceNumber = generateUniqueInvoiceNumber();
    setGeneratedInvoice(invoiceNumber);
    setShowPaymentModal(false);
    setShowSuccessModal(true);
    toast.success("Payment processed successfully");
  };

  // Handle print
  const handlePrint = () => {
    if (printRef.current) {
      window.print();
    }
  };

  const handleNewTransaction = () => {
    clearCart();
    setShowSuccessModal(false);
    setGeneratedInvoice("");
    addNewTransaction();
  };

  /* ================= FETCH ================= */
  useEffect(() => {
    fetchProducts({
      page,
      limit,
      q: search,
      includeDeleted,
    });
    fetchCategories();
    fetchSalesStatus();
    fetchSaleTypes();
    fetchPaymentMethodTypes();
    fetchCompanies();
    fetchShops();
    fetchBranches();
  }, [
    page,
    limit,
    search,
    includeDeleted,
    fetchProducts,
    fetchSalesStatus,
    fetchSaleTypes,
    fetchPaymentMethodTypes,
    fetchCategories,
    fetchCompanies,
    fetchShops,
    fetchBranches,
  ]);
  const customerOptions = companies.filter(
    (comp) => comp.company_type === "customer",
  );

  return (
    <div className="flex flex-col gap-6 h-[calc(100vh-7rem)]">
      {/* Customer Transaction Tabs */}
      <div className="flex items-center gap-2 px-6 pt-4">
        <div className="flex gap-2 flex-1 overflow-x-auto">
          {transactions.map((transaction, index) => (
            <div key={transaction.id} className="relative group">
              <Button
                variant={
                  activeTransactionId === transaction.id ? "default" : "outline"
                }
                size="sm"
                onClick={() => switchTransaction(transaction.id)}
                className="whitespace-nowrap"
              >
                Txn #{index + 1}
                <Badge className="ml-2 bg-orange-500">
                  {transaction.cart.length}
                </Badge>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-destructive hover:bg-destructive/90 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeTransaction(transaction.id)}
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          ))}
        </div>
        <Button size="sm" variant="outline" onClick={addNewTransaction}>
          <Plus className="w-4 h-4 mr-1" />
          New
        </Button>
      </div>

      {/* Main Content - 2 Column Layout */}
      <div className="flex gap-6 h-full px-6 pb-6 overflow-hidden">
        {/* LEFT PANEL - Products & Search (2/3) */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Search and Filters - Sticky */}
          <div className="sticky top-0 z-10 mb-4">
            <Card className="border-border">
              <CardContent className="p-4 space-y-3">
                {/* Search Bar */}
                <div className="space-y-2">
                  <Label className="text-xs">Search</Label>
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Medicine name..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
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
                        placeholder="Scan here..."
                        value={barcodeInput}
                        onChange={(e) => setBarcodeInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && barcodeInput.trim()) {
                            handleBarcodeScan(barcodeInput.trim());
                          }
                        }}
                        className="pl-8 h-9 text-sm"
                      />
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        if (barcodeInput.trim()) {
                          handleBarcodeScan(barcodeInput.trim());
                        }
                      }}
                      className="h-9"
                    >
                      <Barcode className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs">Category</Label>
                    <Select
                      value={selectedCategory}
                      onValueChange={setSelectedCategory}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.name}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Status*</Label>

                    <Select value={status} onValueChange={setStatus}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>

                      <SelectContent>
                        {salesStatus?.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="shop">Shop *</Label>
                    <Select value={shopId} onValueChange={setShopId}>
                      <SelectTrigger id="shop" className="w-full">
                        <SelectValue placeholder="Select Shop" />
                      </SelectTrigger>
                      <SelectContent>
                        {shops.map((shop) => (
                          <SelectItem key={shop.id} value={shop.id}>
                            <div>
                              <div className="font-medium">{shop.name}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="branch">Branch *</Label>
                    <Select value={branchId} onValueChange={setBranchId}>
                      <SelectTrigger id="branch" className="w-full">
                        <SelectValue placeholder="Select branch" />
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

                  <div className="space-y-2">
                    <Label htmlFor="saleType">Sale Types *</Label>
                    <Select value={saleType} onValueChange={setSaleTypes}>
                      <SelectTrigger id="saleType" className="w-full">
                        <SelectValue placeholder="Select Sale Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {saleTypes?.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid - Responsive 2-3 Columns */}
          <Card className="border-border flex-1 flex flex-col min-h-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">
                Products ({products.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden p-0">
              {products.length > 0 ? (
                <ScrollArea className="h-full w-full">
                  <div className="p-4">
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                      {fetchLoading ? (
                        <Loading text="Loading products..." />
                      ) : (
                        products.map((product) => (
                          <Button
                            key={product.id}
                            onClick={() => addToCart(product)}
                            variant="outline"
                            className="h-auto justify-start p-3 hover:bg-primary/10 flex-col items-start"
                            disabled={product.current_stock === 0}
                          >
                            <div className="text-left w-full">
                              <div className="font-semibold text-xs line-clamp-2">
                                {product.name}
                              </div>

                              <div className="text-xs text-muted-foreground line-clamp-1 mt-1">
                                {product.generic_name || "-"}
                              </div>

                              <div className="flex justify-between items-center mt-2 gap-1">
                                <Badge variant="secondary" className="text-xs">
                                  ${Number(product.purchase_price).toFixed(2)}
                                </Badge>

                                <span
                                  className={cn(
                                    "text-xs font-medium",
                                    product.current_stock < 50
                                      ? "text-orange-600"
                                      : "text-green-600",
                                  )}
                                >
                                  {product.current_stock}
                                </span>
                              </div>
                            </div>
                          </Button>
                        ))
                      )}
                    </div>
                  </div>
                </ScrollArea>
              ) : (
                <p className="text-muted-foreground text-sm p-4">
                  No products available.
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* RIGHT PANEL - Cart + Billing (1/3) */}
        <div className="w-96 flex flex-col min-w-0 gap-4 overflow-y-auto">
          {/* Shopping Cart - Dynamic Height */}
          <Card className="border-border flex flex-col">
            <CardHeader className="pb-3 flex-shrink-0">
              <CardTitle className="text-sm">
                Shopping Cart ({cart.length} items)
              </CardTitle>
            </CardHeader>

            {cart.length > 0 && (
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-3">
                  {cart.map((item, index) => (
                    <div
                      key={item.product_id}
                      className="flex flex-col gap-2 p-3 rounded-lg bg-muted/50 border border-border"
                    >
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold line-clamp-2">
                            {item.name}
                          </p>

                          <p className="text-xs text-muted-foreground mt-1">
                            ${Number(item.unit_price).toFixed(2)}
                          </p>
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-destructive hover:text-destructive flex-shrink-0"
                          onClick={() => removeFromCart(index)}
                        >
                          <Trash2 className="w-2.5 h-2.5" />
                        </Button>
                      </div>

                      <div className="flex gap-1 items-center text-xs">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6 flex-shrink-0 p-0"
                          onClick={() => updateQuantity(item.product_id, -1)}
                        >
                          <Minus className="w-2 h-2" />
                        </Button>

                        <span className="font-semibold w-5 text-center">
                          {item.sales_qty}
                        </span>

                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6 flex-shrink-0 p-0"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <Plus className="w-2 h-2" />
                        </Button>
                      </div>

                      {/* <Select
                        value={item.unit}
                        onValueChange={(value) => updateUnit(item.id, value)}
                      >
                        <SelectTrigger className="h-6 text-xs">
                          <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="Piece">Piece</SelectItem>
                          <SelectItem value="Strip">Strip</SelectItem>
                          <SelectItem value="Box">Box</SelectItem>
                        </SelectContent>
                      </Select> */}

                      <div className="flex justify-between items-center text-xs font-bold pt-1 border-t">
                        <span>Total:</span>

                        <span>
                          $
                          {(Number(item.selling_price) * item.quantity).toFixed(
                            2,
                          )}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            )}

            {cart.length === 0 && (
              <CardContent className="flex items-center justify-center text-muted-foreground p-4 min-h-20">
                <div className="text-center">
                  <Package className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No items in cart</p>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Billing Section */}
          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Billing</CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              {/* Customer Name */}
              <div className="space-y-1">
                <Label className="text-xs">Customer Name</Label>

                <div className="flex gap-2">
                  <Select
                    value={selectedCustomer?.id?.toString() || ""}
                    onValueChange={(value) => {
                      const customer = customerOptions.find(
                        (item) => item.id.toString() === value,
                      );
                      setSelectedCustomer(customer || null);
                    }}
                  >
                    <SelectTrigger className="h-8 flex-1">
                      <SelectValue placeholder="Select customer" />
                    </SelectTrigger>

                    <SelectContent>
                      {customerOptions.map((customer) => (
                        <SelectItem
                          key={customer.id}
                          value={customer.id.toString()}
                        >
                          {customer.name}
                          {customer.phone ? ` (${customer.phone})` : ""}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setCustomerModalOpen(true)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Discount */}
              <div className="space-y-1">
                <Label className="text-xs">Discount</Label>

                <div className="flex gap-2">
                  <Select
                    value={discountType}
                    onValueChange={(value) => {
                      setDiscountType(value as "percentage" | "fixed");
                      setDiscount(0);
                    }}
                  >
                    <SelectTrigger className="w-20 h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">%</SelectItem>
                      <SelectItem value="fixed">$</SelectItem>
                    </SelectContent>
                  </Select>

                  <Input
                    type="number"
                    min={0}
                    value={discount}
                    onChange={(e) => {
                      const val = Number(e.target.value) || 0;

                      if (discountType === "percentage") {
                        setDiscount(Math.min(100, Math.max(0, val)));
                      } else {
                        setDiscount(Math.max(0, val));
                      }
                    }}
                    className="flex-1 h-8 text-sm"
                    placeholder="0"
                  />
                </div>
              </div>

              {/* Discount Code */}
              <div className="space-y-1">
                <Label className="text-xs">Discount Code</Label>

                <div className="flex gap-2">
                  <Input
                    placeholder="Enter code"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    className="h-8 text-sm flex-1"
                  />

                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 px-2 text-xs"
                    onClick={() => {
                      if (!discountCode.trim()) {
                        toast.error("Please enter a code");
                        return;
                      }

                      toast.success(`Code "${discountCode}" applied!`);
                      setDiscountCode("");
                    }}
                  >
                    Apply
                  </Button>
                </div>
              </div>

              {/* Totals */}
              <div className="space-y-2 py-3 border-y">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span className="font-semibold">
                    ${Number(subtotal || 0).toFixed(2)}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount:</span>
                    <span>-${Number(discountAmount || 0).toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-base font-bold pt-2 border-t">
                  <span>Total:</span>
                  <span>${Number(total || 0).toFixed(2)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-2">
                <Button
                  onClick={() => setShowPaymentModal(true)}
                  disabled={cart.length === 0 || total <= 0}
                  className="w-full bg-primary hover:bg-primary/90 h-9"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Checkout
                </Button>

                <Button
                  onClick={clearCart}
                  variant="outline"
                  className="w-full h-9"
                  disabled={cart.length === 0}
                >
                  Clear Cart
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Payment Modal */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Payment</DialogTitle>
            <DialogDescription>
              Total Amount: ${total.toFixed(2)}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Payment Method - Icon-Based Buttons */}
            <div className="space-y-2">
              <Label>Payment Method *</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {paymentMethodTypes?.map((method) => {
                  const Icon =
                    paymentMethodIcons[
                      method as keyof typeof paymentMethodIcons
                    ] || CircleHelp;

                  return (
                    <Button
                      key={method}
                      variant={paymentMethod === method ? "default" : "outline"}
                      onClick={() => setPaymentMethod(method)}
                      className="h-auto flex-col gap-2 p-3"
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-xs capitalize">
                        {method.replace(/_/g, " ")}
                      </span>
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Amount Paid */}
            <div className="space-y-2">
              <Label>Amount Paid *</Label>
              <Input
                type="number"
                placeholder="Enter amount"
                value={paidAmount}
                onChange={(e) => setPaidAmount(e.target.value)}
                step="0.01"
                min="0"
              />
              {paidAmount && parseFloat(paidAmount) >= total && (
                <div className="text-sm font-semibold text-green-600">
                  Change: ${(parseFloat(paidAmount) - total).toFixed(2)}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-4">
              <Button
                onClick={processPayment}
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                <Check className="w-4 h-4 mr-2" />
                Complete Payment
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowPaymentModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Modal with Invoice Print */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Payment Successful</DialogTitle>
            <DialogDescription>Invoice: {generatedInvoice}</DialogDescription>
          </DialogHeader>

          {/* Printable Invoice Preview */}
          <div className="border rounded-lg p-4 bg-muted/30">
            <InvoicePrint
              ref={printRef}
              invoiceNumber={generatedInvoice}
              date={new Date().toISOString()}
              customerName={customerName}
              items={cart}
              subtotal={subtotal}
              discount={discount}
              discountType={discountType}
              total={total}
              paymentMethod={paymentMethod}
              paidAmount={parseFloat(paidAmount)}
              change={change}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button
              onClick={handlePrint}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              <Printer className="w-4 h-4 mr-2" />
              Print Invoice
            </Button>
            <Button
              onClick={handleNewTransaction}
              variant="outline"
              className="flex-1"
            >
              New Transaction
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={customerModalOpen} onOpenChange={setCustomerModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Customer</DialogTitle>
          </DialogHeader>

          <CustomerForm
            onSuccess={(customer) => {
              setSelectedCustomer(customer);
              setCustomerModalOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
