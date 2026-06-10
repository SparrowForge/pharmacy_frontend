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
import { Card, CardContent } from "@/src/components/ui/card";
import { Label } from "@radix-ui/react-label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Button } from "@/src/components/ui/button";
import { Plus } from "lucide-react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import CustomerForm from "@/src/components/pos/CustomerForm";

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

export default function POSPage() {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  // ================= FILTERS
  // =================
  const [search, setSearch] = useState("");
  const [barcodeInput, setBarcodeInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [status, setStatus] = useState("");
  const [shopId, setShopId] = useState("");
  const [branchId, setBranchId] = useState("");
  const [saleType, setSaleType] = useState("");

  // ================= CART (KEEP UI)
  // =================
  const [cart, setCart] = useState<CartItem[]>([]);
  const [discountInfo, setDiscountInfo] = useState<any>(null);

  // ================= PAYMENT (KEEP UI)
  // =================
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paidAmount, setPaidAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // ================= CUSTOMER (KEEP UI)
  // =================
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  // ================= HOOKS
  // =================
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
  const { createSalesInvoice } = useSalesInvoice();

  // ================= TOTALS
  // =================
  const subtotal = cart.reduce((sum, i) => sum + i.unit_price * i.sales_qty, 0);
  const discountAmount = discountInfo?.amount || 0;
  const taxAmount = cart.reduce((sum, i) => sum + i.tax, 0);
  const total = subtotal - discountAmount + taxAmount;

  // ================= ADD TO CART (FIXED)
  // =================
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
  // =================
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

  const handleClearCart = () => {
    setCart([]);
    setDiscountInfo(null);
    setPaymentMethod("");
    setPaidAmount("");
  };

  // ================= PAYMENT (FIXED PAYLOAD)
  // =================
  const handleCompletePayment = async () => {
    if (!selectedCustomer) {
      toast.error("Select customer");
      return;
    }

    if (!paymentMethod) {
      toast.error("Select payment method");
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
      paid_amount: Number(paidAmount) || 0,

      invoice_date: new Date().toISOString(),
      notes: "",

      payments: [
        {
          payment_method_id: paymentMethod,
          amount: Number(paidAmount) || 0,
          shop_id: shopId,
          branch_id: branchId,

          reference_type: "invoice",
          reference_id: null,

          status: "pending",
          paid_at: new Date().toISOString(),
          notes: "",
        },
      ],

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

    await createSalesInvoice(payload);

    toast.success("Invoice created");

    handleClearCart();
  };

  // ================= BARCODE (SAFE)
  // =================
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
  // =================
  useEffect(() => {
    fetchCategories();
    fetchShops();
    fetchBranches();
    fetchPaymentMethods();
    fetchSaleTypes();
    fetchSalesStatus();
  }, []);

  useEffect(() => {
    if (!startDate || !endDate) return;

    if (startDate > endDate) {
      alert("Start date cannot be greater than end date");
      return;
    }

    const payload: any = {
      start_date: startDate,
      end_date: endDate,
    };

    // 👇 only add category when it exists
    if (selectedCategory) {
      payload.category_id = selectedCategory;
    }

    fetchStockReport(payload);
  }, [selectedCategory, startDate, endDate]);


  return (
    <div className="flex flex-col gap-4 h-[calc(100vh-7rem)] bg-background h-full overflow-hidden">
      <div className="flex gap-4 flex-1 overflow-hidden">
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
            startDate={startDate}
            onStartDateChange={setStartDate}
            endDate={endDate}
            onEndDateChange={setEndDate}
            selectedCustomer={selectedCustomer}
            onSelectedCustomerChange={setSelectedCustomer}
          />

          <ProductList
            products={stockReportData}
            loading={fetchLoading}
            onAddToCart={handleAddToCart}
          />
        </div>

        <ScrollArea className="w-96 h-full overflow-hidden">
          <div className="flex flex-col gap-4 pr-4">
            {/* CUSTOMER (UNCHANGED) */}
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
                {/* DISCOUNT (UNCHANGED UI) */}
                <DiscountSection
                  subtotal={subtotal}
                  onApplyDiscount={setDiscountInfo}
                  onClearDiscount={() => setDiscountInfo(null)}
                  currentDiscount={discountInfo}
                />

                {/* PAYMENT (UNCHANGED UI) */}
                <PaymentSection
                  saleType={saleType as any}
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
    </div>
  );
}
