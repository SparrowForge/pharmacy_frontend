"use client";

import { useEffect, useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Plus } from "lucide-react";
import { Badge } from "@/src/components/ui/badge";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import { toast } from "sonner";
import { FiltersSection } from "@/src/components/pos/FiltersSection";
import { ProductList } from "@/src/components/pos/ProductList";
import { CartSummary } from "@/src/components/pos/CartSummary";
import { DiscountSection } from "@/src/components/pos/DiscountSection";
import { PaymentSection } from "@/src/components/pos/PaymentSection";
import { InvoicePayload } from "@/src/components/pos/InvoiceData";
import { useProducts } from "@/src/hooks/useProducts";
import { useProductCategories } from "@/src/hooks/useProductCategories";
import { usePaymentMethods } from "@/src/hooks/usePaymentMethods";
import { useShops } from "@/src/hooks/useShops";
import { useBranches } from "@/src/hooks/useBranches";
import { useEnum } from "@/src/hooks/useEnum";
import { Label } from "@/src/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { useCompanies } from "@/src/hooks/useCompanies";
import { Card, CardContent } from "@/src/components/ui/card";
import CustomerForm from "@/src/components/pos/CustomerForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { useSalesInvoice } from "@/src/hooks/useSalesInvoice";
import { useProductBatches } from "@/src/hooks/useProductBatches";

interface CartItem {
  product_id: string;
  name: string;
  product_batch_id?: string;
  sales_unit_id: string;
  sales_qty: number;
  unit_price: number;
  discount: number;
  tax: number;
}

export default function POSPage() {
  const { products, fetchProducts, fetchLoading } = useProducts(); // Replace with actual data fetching hooks
  const { categories, fetchCategories } = useProductCategories();
  const { shops, fetchShops } = useShops();
  const { branches, fetchBranches } = useBranches();
  const { paymentMethods, fetchPaymentMethods } = usePaymentMethods();
  const { saleTypes, fetchSaleTypes, salesStatus, fetchSalesStatus } =
    useEnum();
  const { companies, fetchCompanies } = useCompanies();
  const { createSalesInvoice, createLoading } = useSalesInvoice()
  const {batches, fetchProductBatches} = useProductBatches()


  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [customerModalOpen, setCustomerModalOpen] = useState(false);

  // Search and Filters
  const [search, setSearch] = useState("");
  const [barcodeInput, setBarcodeInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [status, setStatus] = useState("");
  const [shopId, setShopId] = useState("");
  const [branchId, setBranchId] = useState("");
  const [saleType, setSaleType] = useState("");

  // Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [discountInfo, setDiscountInfo] = useState<{
    code: string;
    value: number;
    amount: number;
  } | null>(null);

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paidAmount, setPaidAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);


  // Transaction Tabs
  const [transactions, setTransactions] = useState<
    Array<{ id: string; cart: CartItem[]; discount: any }>
  >([{ id: "1", cart: [], discount: null }]);
  const [activeTransactionId, setActiveTransactionId] = useState("1");

  // Calculate totals
  const subtotal = cart.reduce(
    (sum, item) => sum + item.unit_price * item.sales_qty,
    0,
  );
  const discountAmount = discountInfo?.amount || 0;
  const taxAmount = cart.reduce((sum, item) => sum + item.tax, 0);
  const total = subtotal - discountAmount + taxAmount;


  // Add to cart
  const handleAddToCart = (product: any) => {
    const existingItem = cart.find((item) => item.product_id === product.id);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.product_id === product.id
            ? {
                ...item,
                sales_qty: item.sales_qty + 1,
              }
            : item,
        ),
      );
    } else {
      setCart([
        ...cart,
        {
          product_id: product.id,
          name: product.name,
          product_batch_id: "",
          sales_unit_id: product.unit_id,
          sales_qty: 1,
          unit_price: parseFloat(product.selling_price),
          discount: 0,
          tax: parseFloat(product.tax_rate),
        },
      ]);
    }
    toast.success(`Added ${product.name} to cart`);
  };

  // Update quantity
  const handleUpdateQuantity = (productId: string, qty: number) => {
    if (qty === 0) {
      handleRemoveFromCart(productId);
    } else {
      setCart(
        cart.map((item) =>
          item.product_id === productId ? { ...item, sales_qty: qty } : item,
        ),
      );
    }
  };

  // Remove from cart
  const handleRemoveFromCart = (productId: string) => {
    setCart(cart.filter((item) => item.product_id !== productId));
  };

  // Clear cart
  const handleClearCart = () => {
    setCart([]);
    setDiscountInfo(null);
    setPaymentMethod("");
    setPaidAmount("");
  };

  // Apply discount
  const handleApplyDiscount = (discountData: any) => {
    setDiscountInfo(discountData);
  };

  // Clear discount
  const handleClearDiscount = () => {
    setDiscountInfo(null);
  };

  // Complete payment
  const handleCompletePayment = async () => {
    if (!paymentMethod) {
      toast.error("Please select payment method");
      return;
    }

    if (
      saleType === "cash" &&
      (!paidAmount || parseFloat(paidAmount) < total)
    ) {
      toast.error("Please enter valid paid amount");
      return;
    }

    setIsProcessing(true);

    try {
      // Submit invoice
      const invoicePayload: InvoicePayload = {
        invoice_number: Date.now().toString(),
        customer_id: selectedCustomer.id,
        shop_id: shopId,
        branch_id: branchId,
        status: status,
        sale_type: saleType as "credit" | "cash",
        discount_amount: discountAmount,
        tax_amount: taxAmount,
        paid_amount: parseFloat(paidAmount) || 0,
        invoice_date: new Date().toISOString(),
        notes: "",
        payments: [
          {
            payment_method_id: paymentMethod,
            amount: parseFloat(paidAmount) || 0,
            company_id: "",
            shop_id: shopId,
            branch_id: branchId,
            reference_type: "",
            reference_id: "",
            status: "pending",
            paid_at: new Date().toISOString(),
            notes: "",
          },
        ],
        items: cart,
      };

      // await createSalesInvoice(invoicePayload)
      // API call here
      console.log("[v0] Submitting Invoice:", invoicePayload);
      toast.success("Invoice created successfully!");
      // handleClearCart();
    } catch (error) {
      console.error("[v0] Payment error:", error);
      // toast.error("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle barcode
  const handleBarcodeScan = () => {
    if (barcodeInput.trim()) {
      const product = products.find((p) => p.sku === barcodeInput);
      if (product) {
        handleAddToCart(product);
        setBarcodeInput("");
      } else {
        toast.error("Product not found");
      }
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchShops();
    fetchBranches();
    fetchPaymentMethods();
    fetchSaleTypes();
    fetchSalesStatus();
    fetchCompanies();
  }, []);

  const customerOptions = companies.filter(
    (comp) => comp.company_type === "customer",
  );

  console.log("Cart ITEM",cart)

  return (
    <div className="flex flex-col gap-4 h-[calc(100vh-7rem)] bg-background">
      {/* Transaction Tabs */}
      <div className="flex items-center gap-2">
        <div className="flex gap-2 overflow-x-auto">
          {transactions.map((txn, idx) => (
            <div key={txn.id} className="relative group">
              <Button
                variant={activeTransactionId === txn.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTransactionId(txn.id)}
              >
                Txn #{idx + 1}
                <Badge className="ml-2 bg-orange-500">{txn.cart.length}</Badge>
              </Button>
            </div>
          ))}
        </div>
        <Button size="sm" variant="outline" onClick={() => {}}>
          <Plus className="w-4 h-4" />
          New
        </Button>
      </div>

      {/* Main Layout */}
      <div className="flex gap-4 flex-1 overflow-hidden">
        {/* Left Panel - Products */}
        <div className="flex-1 flex flex-col gap-4 min-w-0">
          <FiltersSection
            search={search}
            onSearchChange={setSearch}
            barcodeInput={barcodeInput}
            onBarcodeInputChange={setBarcodeInput}
            onBarcodeSubmit={handleBarcodeScan}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            categories={categories}
            status={status}
            onStatusChange={setStatus}
            statuses={salesStatus}
            shopId={shopId}
            onShopChange={setShopId}
            shops={shops}
            branchId={branchId}
            onBranchChange={setBranchId}
            branches={branches}
            saleType={saleType}
            onSaleTypeChange={setSaleType}
            saleTypes={saleTypes}
          />
          <ProductList
            products={products}
            loading={fetchLoading}
            onAddToCart={handleAddToCart}
          />
        </div>

        {/* Right Panel - Cart & Payment */}
        <ScrollArea className="w-96 flex flex-col gap-4 overflow-hidden">
          <div className="flex flex-col gap-4 pr-4">

            {/* Customer  */}
            <Card>
              <CardContent>
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
              </CardContent>
            </Card>

            <CartSummary
              cart={cart}
              subtotal={subtotal}
              discountAmount={discountAmount}
              taxAmount={taxAmount}
              total={total}
              onUpdateItem={handleUpdateQuantity}
              onRemoveItem={handleRemoveFromCart}
              onClearCart={handleClearCart}
            />

            {cart.length > 0 && (
              <>
                <DiscountSection
                  subtotal={subtotal}
                  onApplyDiscount={handleApplyDiscount}
                  onClearDiscount={handleClearDiscount}
                  currentDiscount={discountInfo}
                />

                <PaymentSection
                  saleType={saleType as "credit" | "cash"}
                  total={total}
                  paymentMethods={paymentMethods}
                  selectedMethod={paymentMethod}
                  paidAmount={paidAmount}
                  onMethodChange={setPaymentMethod}
                  onPaidAmountChange={setPaidAmount}
                  onPaymentComplete={handleCompletePayment}
                  isProcessing={isProcessing}
                />
              </>
            )}
          </div>
        </ScrollArea>
      </div>

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
