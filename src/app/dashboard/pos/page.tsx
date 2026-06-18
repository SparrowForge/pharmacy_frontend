"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FiltersSection } from "@/src/components/pos/FiltersSection";
import { ProductList } from "@/src/components/pos/ProductList";
import { CartSummary } from "@/src/components/pos/CartSummary";
import { DiscountSection } from "@/src/components/pos/DiscountSection";
import { PaymentSection } from "@/src/components/pos/PaymentSection";
import { useProductCategories } from "@/src/hooks/useProductCategories";
import { usePaymentMethods } from "@/src/hooks/usePaymentMethods";
import { useShops } from "@/src/hooks/useShops";
import { useBranches } from "@/src/hooks/useBranches";
import { useEnum } from "@/src/hooks/useEnum";
import { useCompanies } from "@/src/hooks/useCompanies";
import { useSalesInvoice } from "@/src/hooks/useSalesInvoice";
import { useStockReport } from "@/src/hooks/useStockReport";
import { usePurchaseOrderReceive } from "@/src/hooks/usePurchaseOrderReceive";
import { InvoicePayload } from "@/src/components/pos/InvoiceData";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { InvoiceModal } from "@/src/components/pos/InvoiceModal";
import { salesInvoiceService } from "@/src/services/salesInvoice.service";
import { Button } from "@/src/components/ui/button";
import { SalesWatch } from "@/src/components/pos/SalesWatch";

interface CartItem {
  product_id: string;
  product_batch_id: string;
  sales_unit_id: string;

  sales_qty: number;
  unit_price: number;

  discount: number;
  tax: number;

  name: string;
}

interface PaymentEntry {
  method_id: string;
  amount: string;
}

export default function POSPage() {
  const [trigger, setTrigger] = useState(false);
  const [invoiceData, setInvoiceData] = useState({});
  const [showInvoice, setShowInvoice] = useState(false);

  // ================= FILTERS
  const [search, setSearch] = useState("");
  const [barcodeInput, setBarcodeInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [status, setStatus] = useState("");
  const [shopId, setShopId] = useState("");
  const [branchId, setBranchId] = useState("");
  const [saleType, setSaleType] = useState("");

  // ================= CART
  const [cart, setCart] = useState<CartItem[]>([]);
  const [discountInfo, setDiscountInfo] = useState<any>(null);

  // ================= PAYMENT
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState<
    PaymentEntry[]
  >([{ method_id: "", amount: "" }]);

  const [isProcessing, setIsProcessing] = useState(false);

  // ================= CUSTOMER
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  // ================= TRANSACTIONS
  const [transactions, setTransactions] = useState<any[]>([]);
  const [activeTransactionIndex, setActiveTransactionIndex] = useState<
    number | null
  >(null);

  // ================= FIXED: MISSING FUNCTION =================
  const handleClearCart = () => {
    setCart([]);
    setDiscountInfo(null);
    setSelectedPaymentMethods([{ method_id: "", amount: "" }]);
  };

  const handleHoldTransaction = () => {
    if (cart.length === 0 && !selectedCustomer) {
      toast.error("Nothing to hold");
      return;
    }

    const transaction = {
      id: Date.now(),
      cart,
      selectedCustomer,
      discountInfo,
      selectedPaymentMethods,
      shopId,
      branchId,
      saleType,
    };

    setTransactions((prev) => [...prev, transaction]);

    handleClearCart();
    setSelectedCustomer(null);
    setDiscountInfo(null);
    setActiveTransactionIndex(null);

    toast.success("Transaction saved");
  };

  const handleResumeTransaction = (index: number) => {
    const t = transactions[index];
    if (!t) return;

    setCart(t.cart);
    setSelectedCustomer(t.selectedCustomer);
    setDiscountInfo(t.discountInfo);
    setSelectedPaymentMethods(t.selectedPaymentMethods);
    setShopId(t.shopId);
    setBranchId(t.branchId);
    setSaleType(t.saleType);

    setActiveTransactionIndex(index);

    toast.success("Transaction resumed");
  };

  const handleRemoveTransaction = (index: number) => {
    setTransactions((prev) => prev.filter((_, i) => i !== index));
  };

  // ================= HOOKS
  const { categories, fetchCategories } = useProductCategories();
  const { shops, fetchShops } = useShops();
  const { branches, fetchBranches } = useBranches();
  const { paymentMethods, fetchPaymentMethods } = usePaymentMethods();
  const { saleTypes, fetchSaleTypes, salesStatus, fetchSalesStatus } =
    useEnum();

  const {
    data: stockReportData,
    fetchStockReport,
    fetchLoading,
  } = useStockReport();

  const { fetchAvailablePurchaseReceiptItems } = usePurchaseOrderReceive();

  // ================= TOTALS
  const subtotal = cart.reduce((sum, i) => sum + i.unit_price * i.sales_qty, 0);

  const discountAmount = discountInfo?.amount || 0;
  const taxAmount = cart.reduce((sum, i) => sum + i.tax, 0);
  const total = subtotal - discountAmount + taxAmount;

  // ================= ADD TO CART
  const handleAddToCart = async (product: any) => {
    try {
      const existing = cart.find((i) => i.product_id === product.product_id);

      const batches = await fetchAvailablePurchaseReceiptItems(
        product.product_id,
      );

      const batch = batches?.[0];

      if (!batch) {
        toast.error("No batch available");
        return;
      }

      if (existing) {
        setCart((prev) =>
          prev.map((i) =>
            i.product_id === product.product_id
              ? { ...i, sales_qty: i.sales_qty + 1 }
              : i,
          ),
        );
        return;
      }

      setCart((prev) => [
        ...prev,
        {
          product_id: product.product_id,
          product_batch_id: batch.product_batch_id,
          sales_unit_id: batch.purchase_unit_id || "",
          sales_qty: 1,
          unit_price: batch.selling_price || 0,
          discount: 0,
          tax: 0,
          name: product.name,
        },
      ]);

      toast.success(`${product.name} added`);
    } catch (e) {
      toast.error("Failed to add product");
    }
  };

  // ================= CART UPDATE
  const handleUpdateQuantity = (productId: string, qty: number) => {
    if (qty <= 0) {
      setCart((prev) => prev.filter((i) => i.product_id !== productId));
      return;
    }

    setCart((prev) =>
      prev.map((i) =>
        i.product_id === productId ? { ...i, sales_qty: qty } : i,
      ),
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((i) => i.product_id !== productId));
  };

  // ================= PAYMENT
  const handleCompletePayment = async () => {
    if (!selectedCustomer) {
      toast.error("Select customer");
      return;
    }

    if (!selectedPaymentMethods.some((m) => m.method_id)) {
      toast.error("Select at least one payment method");
      return;
    }

    const payments = selectedPaymentMethods
      .filter((m) => m.method_id && parseFloat(m.amount) > 0)
      .map((m) => ({
        payment_method_id: m.method_id,
        amount: parseFloat(m.amount) || 0,
        shop_id: shopId,
        branch_id: branchId,
        reference_type: "invoice",
        reference_id: null,
        status: "pending",
        paid_at: new Date().toISOString(),
        notes: "",
      }));

    const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);

    if (saleType === "cash" && totalPaid < total) {
      toast.error(
        `Insufficient payment. Need $${(total - totalPaid).toFixed(2)} more.`,
      );
      return;
    }

    const payload: InvoicePayload = {
      invoice_number: Date.now().toString(),
      customer_id: selectedCustomer.id,
      shop_id: shopId,
      branch_id: branchId,
      status,
      sale_type: saleType,
      discount_amount: discountAmount,
      tax_amount: taxAmount,
      paid_amount: totalPaid,
      invoice_date: new Date().toISOString(),
      notes: "",
      payments,
      items: cart.map((i) => ({
        product_id: i.product_id,
        product_batch_id: i.product_batch_id,
        sales_unit_id: i.sales_unit_id,
        sales_qty: i.sales_qty,
        unit_price: i.unit_price,
        discount: i.discount,
        tax: i.tax,
      })),
    };

    try {
      setIsProcessing(true);

      const res = await salesInvoiceService.createSalesInvoiceService(payload);

      if (res?.id) {
        toast.success("Invoice created successfully");
        setInvoiceData(res);
        setShowInvoice(true);
        setIsProcessing(false);
      } else {
        toast.error("Invoice creation failed");
        setIsProcessing(false);
      }
    } catch (error: any) {
      toast.error(
        error?.message || "Something went wrong while creating invoice",
      );
      setIsProcessing(false);
    }

    setTrigger(!trigger);
    handleClearCart();
  };

  // ================= BARCODE
  const handleBarcodeScan = () => {
    const product = stockReportData.find((p) => p.barcode === barcodeInput);

    if (!product) {
      toast.error("Product not found");
      return;
    }

    handleAddToCart(product);
    setBarcodeInput("");
  };

  // ================= INIT
  useEffect(() => {
    fetchCategories();
    fetchShops();
    fetchBranches();
    fetchPaymentMethods();
    fetchSaleTypes();
    fetchSalesStatus();
  }, []);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];

    fetchStockReport({
      start_date: today,
      end_date: today,
    });
  }, [selectedCategory, trigger]);

  return (
    <div className="flex flex-col gap-4 bg-background">
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_420px] xl:flex-1 xl:overflow-hidden">
        {/* Left Section */}
        <div className="flex flex-col gap-4 min-w-0">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between p-2 border-b">
            <h2 className="font-semibold">POS</h2>

            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                onClick={handleHoldTransaction}
                className="w-full sm:w-auto"
              >
                Hold Transaction
              </Button>

              <Button className="w-full sm:w-auto">
                Queue ({transactions.length})
              </Button>
            </div>
          </div>

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
            selectedCustomer={selectedCustomer}
            onSelectedCustomerChange={setSelectedCustomer}
          />

          <div className="xl:flex-1 xl:overflow-hidden">
            <ProductList
              products={stockReportData}
              loading={fetchLoading}
              onAddToCart={handleAddToCart}
              search={search}
            />
          </div>
        </div>

        {/* Cart Section */}
        <div className="border rounded-lg bg-card xl:overflow-hidden">
          <ScrollArea className="xl:h-full">
            <div className="flex flex-col gap-4 p-4">
              <SalesWatch />

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
                    onApplyDiscount={setDiscountInfo}
                    onClearDiscount={() => setDiscountInfo(null)}
                    currentDiscount={discountInfo}
                  />

                  <PaymentSection
                    saleType={saleType as any}
                    total={total}
                    paymentMethods={paymentMethods}
                    selectedMethods={selectedPaymentMethods}
                    onMethodsChange={setSelectedPaymentMethods}
                    onPaymentComplete={handleCompletePayment}
                    isProcessing={isProcessing}
                  />
                </>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>

      {invoiceData && (
        <InvoiceModal
          open={showInvoice}
          onOpenChange={setShowInvoice}
          invoice={invoiceData}
        />
      )}

      {transactions.length > 0 && (
        <div className="border rounded-lg p-4 space-y-3">
          <h3 className="font-medium">Held Transactions</h3>

          {transactions.map((t, index) => (
            <div
              key={t.id}
              className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border p-3 rounded-lg"
            >
              <div>
                <p className="font-medium">
                  {t.selectedCustomer?.name || "Guest"}
                </p>

                <p className="text-sm text-muted-foreground">
                  Items: {t.cart.length}
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => handleResumeTransaction(index)}
                >
                  Resume
                </Button>

                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleRemoveTransaction(index)}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
