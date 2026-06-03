"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { ArrowLeft, Plus, Trash2, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { IBranch } from "@/src/types/branch.types";
import { usePurchaseOrders } from "@/src/hooks/usePurchaseOrders";
import {
  ICreatePurchaseOrderPayload,
  IPurchaseOrder,
  IPurchaseOrderItem,
} from "@/src/types/purchaseOrder.types";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { useBranches } from "@/src/hooks/useBranches";
import { useCompanies } from "@/src/hooks/useCompanies";
import { ICompany } from "@/src/types/company.types";
import { Label } from "@radix-ui/react-label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { useProducts } from "@/src/hooks/useProducts";
import { useShops } from "@/src/hooks/useShops";
import { useEnum } from "@/src/hooks/useEnum";

interface PurchaseOrderFormProps {
  initialData?: IPurchaseOrder;
  isEditing?: boolean;
  onSuccess?: (data: IPurchaseOrder) => void;
}

// Sample medicines for PO

export default function PurchaseOrderForm({
  initialData,
  isEditing = false,
  onSuccess,
}: PurchaseOrderFormProps) {
  const router = useRouter();
  const { createLoading, createPurchaseOrder, updatePurchaseOrder } =
    usePurchaseOrders();
  const { fetchBranches, branches } = useBranches();
  const { fetchCompanies, companies } = useCompanies();
  const { fetchProducts, products } = useProducts();
  const { shops, fetchShops } = useShops();

  const [branchId, setBranchId] = useState(initialData?.branch_id || "");
  const [supplierId, setSupplierId] = useState(initialData?.supplier_id || "");
  const [shopId, setShopId] = useState(initialData?.shop_id || "");
  const [deliveryDate, setDeliveryDate] = useState(
    initialData?.expected_delivery_date || "",
  );
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState(
    initialData?.expected_delivery_date || "",
  );
  const [notes, setNotes] = useState(initialData?.notes || "");
  const [lineItems, setLineItems] = useState<IPurchaseOrderItem[]>(
    initialData?.items || [],
  );
  const [selectedMedicine, setSelectedMedicine] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [discount, setDiscount] = useState("0");

  const [shippingCost, setShippingCost] = useState(
    initialData?.shipping_cost?.toString() || "0",
  );
  const {
    fetchPurchaseOrderStatuses,
    purchaseOrderStatuses,
    fetchPaymentStatuses,
    paymentStatuses,
  } = useEnum();
  const [status, setStatus] = useState(initialData?.status || "partial");
  const [paymentStatus, setPaymentStatus] = useState(
    initialData?.phar_payment_status || "pending",
  );
  const [batchNumber, setBatchNumber] = useState("");
  const [poNumber, setPoNumber] = useState("");

  const [expiryDate, setExpiryDate] = useState("");
  const [itemDiscount, setItemDiscount] = useState("0");
  const [itemTax, setItemTax] = useState("0");
  const [selectedUnitId, setSelectedUnitId] = useState("");

  // Fetch data on mount
  useEffect(() => {
    fetchBranches();
    fetchCompanies();
    fetchProducts();
    fetchShops();
    fetchPurchaseOrderStatuses();
    fetchPaymentStatuses();
  }, [
    fetchBranches,
    fetchCompanies,
    fetchProducts,
    fetchShops,
    fetchPurchaseOrderStatuses,
  ]);

  // Calculate totals
  const subtotal = lineItems.reduce(
    (sum, item) => sum + item.quantity_purchase * item.unit_cost,
    0,
  );
  const totalDiscount =
    lineItems.reduce((sum, item) => sum + Math.abs(item.discount), 0) +
    parseFloat(discount || "0");
  const totalTax =
    lineItems.reduce((sum, item) => sum + Number(item.tax || 0), 0) +
    Number(itemTax || 0);
  const shipping = parseFloat(shippingCost || "0");
  const totalAmount = subtotal - totalDiscount + totalTax + shipping;

  // Add line item
  const handleAddLineItem = () => {
    if (!selectedMedicine) {
      toast.error("Select a product");
      return;
    }

    const product = products.find((p) => p.id === selectedMedicine);

    if (!product) {
      toast.error("Product not found");
      return;
    }

    const qty = Number(quantity);
    const cost = Number(unitPrice);

    if (qty <= 0) {
      toast.error("Invalid quantity");
      return;
    }

    if (cost <= 0) {
      toast.error("Invalid unit price");
      return;
    }

    const newItem: IPurchaseOrderItem = {
      product_id: product.id,

      product_batch_id: null, // or null if backend allows
      purchase_unit_id: selectedUnitId || product.unit_id,

      quantity_purchase: qty,
      unit_cost: cost,

      discount: Number(itemDiscount || 0),
      tax: Number(itemTax || 0),

      batch_number: batchNumber ,
      expected_expiry_date: null,
    };

    setLineItems((prev) => [...prev, newItem]);

    // reset
    setSelectedMedicine("");
    setQuantity("");
    setUnitPrice("");
    setBatchNumber("");
    setExpiryDate("");
    setItemDiscount("0");
    setItemTax("0");
    setSelectedUnitId("");
  };
  // Remove line item
  const handleRemoveLineItem = (index: number) => {
    setLineItems((prev) => prev.filter((_, i) => i !== index));
  };

  const generatePoNumber = (shopCode: string, lastNumber = 0) => {
    const date = new Date();

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    const dateStr = `${yyyy}${mm}${dd}`;
    const seq = String(lastNumber + 1).padStart(4, "0");

    return `${shopCode}-${dateStr}-${seq}`;
  };

  // Submit
  const handleSubmit = async () => {
    if (!branchId) {
      toast.error("Please select a branch");
      return;
    }
    if (!supplierId) {
      toast.error("Please select a supplier");
      return;
    }
    if (lineItems.length === 0) {
      toast.error("Please add at least one item");
      return;
    }
    if (!deliveryDate) {
      toast.error("Please set delivery date");
      return;
    }

    const shop = shops.find((s) => s.id === shopId);

    const generatedPO = generatePoNumber(
      shop?.name || "SHOP",
      0, // replace later with backend last number
    );

    setPoNumber(generatedPO);

    const payload: ICreatePurchaseOrderPayload = {
      po_number: poNumber,
      shop_id: shopId,
      branch_id: branchId,
      supplier_id: supplierId,
      expected_delivery_date: expectedDeliveryDate,
      phar_payment_status: "pending",
      status: "pending",
      delivery_date: deliveryDate,
      discount_amount: parseFloat(discount || "0"),
      tax_amount: parseFloat(itemTax || "0"),
      shipping_cost: parseFloat(shippingCost || "0"),
      notes,
      items: lineItems,
    };


    await createPurchaseOrder(payload);
  };

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
          <h1 className="text-2xl font-bold text-foreground">
            {isEditing ? "Edit" : "Create"} Purchase Order
          </h1>
          <p className="text-muted-foreground">
            {isEditing ? "Update" : "Add"} items and confirm the order details
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Branch & Supplier Selection */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Supplier Information</CardTitle>
              <CardDescription>
                Select branch, supplier and delivery details
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-3 gap-4">
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
                  <Label htmlFor="supplier">Supplier *</Label>
                  <Select value={supplierId} onValueChange={setSupplierId}>
                    <SelectTrigger id="supplier" className="w-full">
                      <SelectValue placeholder="Select supplier" />
                    </SelectTrigger>
                    <SelectContent>
                      {companies
                        .filter((item) => item.company_type === "supplier")
                        .map((supplier) => (
                          <SelectItem key={supplier.id} value={supplier.id}>
                            <div>
                              <div className="font-medium">{supplier.name}</div>
                            </div>
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="delivery"> Delivery Date *</Label>
                  <Input
                    id="delivery"
                    type="date"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expectedDeliveryDate">
                    Expected Delivery Date *
                  </Label>
                  <Input
                    id="expectedDeliveryDate"
                    type="date"
                    value={expectedDeliveryDate}
                    onChange={(e) => setExpectedDeliveryDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="shipping">Shipping Cost</Label>
                  <Input
                    id="shipping"
                    type="number"
                    value={shippingCost}
                    onChange={(e) => setShippingCost(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="discount">Discount *</Label>
                  <Input
                    id="discount"
                    type="number"
                    value={discount}
                    placeholder=""
                    onChange={(e) => setDiscount(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tax">Tax</Label>
                  <Input
                    id="tax"
                    type="number"
                    value={itemTax}
                    onChange={(e) => setItemTax(e.target.value)}
                  />
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
                  <Select
                    value={selectedMedicine}
                    onValueChange={setSelectedMedicine}
                  >
                    <SelectTrigger id="medicine" className="w-full">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((med) => (
                        <SelectItem key={med.id} value={med.id}>
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
                      {lineItems.map((item, index) => (
                        <TableRow key={item.product_id}>
                          <TableCell>
                            <p className="font-medium">{item.product_id}</p>
                          </TableCell>
                          <TableCell className="text-right">
                            {item.quantity_purchase}
                          </TableCell>
                          <TableCell className="text-right">
                            ${item.unit_cost.toFixed(2)}
                          </TableCell>
                          <TableCell className="text-right font-semibold">
                            $
                            {(item.quantity_purchase * item.unit_cost).toFixed(
                              2,
                            )}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive hover:text-destructive"
                              onClick={() => handleRemoveLineItem(index)}
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
                <p className="text-sm text-muted-foreground">
                  Items: {lineItems.length}
                </p>
                <p className="text-sm text-muted-foreground">
                  Total Units:{" "}
                  {lineItems.reduce(
                    (sum, item) => sum + item.quantity_purchase,
                    0,
                  )}
                </p>
              </div>

              {/* Totals */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                {totalDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount:</span>
                    <span className="font-medium">
                      -${totalDiscount.toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span className="font-medium">${totalTax.toFixed(2)}</span>
                </div>
                {shipping !== 0 && (
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span className="font-medium">${shipping.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t text-base font-bold">
                  <span>Total:</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
              </div>

              {/* Status Badge */}
              <Badge variant="outline" className="w-full justify-center py-1">
                Status: {status && status}
              </Badge>

              {/* Action Buttons */}
              <div className="space-y-2 pt-4">
                <Button
                  onClick={handleSubmit}
                  disabled={createLoading || lineItems.length === 0}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  {createLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {isEditing ? "Updating..." : "Creating..."}
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      {isEditing ? "Update Order" : "Create Order"}
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
  );
}
