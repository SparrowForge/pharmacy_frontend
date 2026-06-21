"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
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

import { usePurchaseOrderPayment } from "@/src/hooks/usePurchaseOrderPayment";
import { usePaymentMethods } from "@/src/hooks/usePaymentMethods";
import { useEnum } from "@/src/hooks/useEnum";
import { usePurchaseOrders } from "@/src/hooks/usePurchaseOrders";
import { useParams } from "next/navigation";
import Loading from "@/src/components/common/Loading";

export default function PurchaseOrderPaymentForm() {
  const { id } = useParams();
  const {
    fetchSinglePurchaseOrder,
    singlePurchaseOrder,
    singlePurchaseOrderLoading,
  } = usePurchaseOrders();
  const { addPayment, fetchLoading } = usePurchaseOrderPayment();
  const {
    paymentMethods,
    fetchPaymentMethods,
    fetchLoading: loading,
  } = usePaymentMethods();
  const { paymentStatuses, fetchPaymentStatuses } = useEnum();

  const [form, setForm] = useState({
    payment_method_id: "",
    amount: 0,
    status: "",
    notes: "",
    paid_at: new Date().toISOString(),
  });

  useEffect(() => {
    if (id) {
      fetchSinglePurchaseOrder(String(id));
    }
  }, [id]);

  useEffect(() => {
    fetchPaymentMethods();
    fetchPaymentStatuses();
  }, [fetchPaymentMethods, fetchPaymentStatuses]);

  const handleSubmit = async () => {
    if (!form.payment_method_id) {
      toast.error("Select payment method");
      return;
    }

    if (!form.amount || form.amount <= 0) {
      toast.error("Enter valid amount");
      return;
    }

    if (!form.status) {
      toast.error("Select status");
      return;
    }

    try {
      if (!singlePurchaseOrder?.id) {
        toast.error("Purchase order not found");
        return;
      }

      await addPayment(singlePurchaseOrder.id, {
        payments: [
          {
            payment_method_id: form.payment_method_id,
            amount: form.amount,
            shop_id: singlePurchaseOrder?.shop_id,
            branch_id: singlePurchaseOrder?.branch_id,
            status: form.status,
            paid_at: form.paid_at,
            notes: form.notes,
          },
        ],
      });
    } catch {
      // handled in hook
    }
  };

  if (loading || singlePurchaseOrderLoading) {
    return <Loading text="loading data..." />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* ================= LEFT: FORM ================= */}
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Add Payment</CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="grid  grid-cols-2 gap-4">
              {/* Payment Method */}
              <div className="space-y-2">
                <Label>Payment Method</Label>
                <Select
                  value={form.payment_method_id}
                  onValueChange={(value) =>
                    setForm((prev: any) => ({
                      ...prev,
                      payment_method_id: value,
                    }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>

                  <SelectContent>
                    {paymentMethods?.map((pm: any) => (
                      <SelectItem key={pm.id} value={pm.id}>
                        {pm.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Amount */}
              <div className="space-y-2">
                <Label>Amount</Label>
                <Input
                  type="number"
                  value={form.amount}
                  onChange={(e) =>
                    setForm((prev: any) => ({
                      ...prev,
                      amount: Number(e.target.value),
                    }))
                  }
                />
              </div>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={form.status}
                onValueChange={(value) =>
                  setForm((prev: any) => ({
                    ...prev,
                    status: value,
                  }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>

                <SelectContent>
                  {paymentStatuses?.map((st: any) => (
                    <SelectItem key={st.value} value={st}>
                      {st}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label>Notes</Label>
              <Textarea
                value={form.notes}
                onChange={(e) =>
                  setForm((prev: any) => ({
                    ...prev,
                    notes: e.target.value,
                  }))
                }
                placeholder="Optional notes..."
              />
            </div>

            {/* Submit */}
            <Button
              onClick={handleSubmit}
              disabled={fetchLoading}
              className="w-full"
            >
              {fetchLoading ? "Processing..." : "Submit Payment"}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* ================= RIGHT: SUMMARY ================= */}
      <div className="space-y-4">
        {/* PO INFO CARD */}
        <Card>
          <CardHeader>
            <CardTitle>Purchase Order</CardTitle>
          </CardHeader>

          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">PO Number</span>
              <span className="font-medium">
                {singlePurchaseOrder?.po_number}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Supplier</span>
              <span className="font-medium">
                {singlePurchaseOrder?.supplier_name}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Status</span>
              <span className="capitalize font-medium">
                {singlePurchaseOrder?.status}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* FINANCIAL SUMMARY */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Summary</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Amount</span>
              <span className="font-semibold">
                {singlePurchaseOrder?.total_amount}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Paid Amount</span>
              <span className="text-green-600 font-semibold">
                {singlePurchaseOrder?.paid_amount}
              </span>
            </div>

            <div className="flex justify-between border-t pt-2">
              <span className="text-muted-foreground">Due Amount</span>
              <span className="text-red-600 font-bold">
                {singlePurchaseOrder?.due_amount}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* QUICK ITEMS PREVIEW */}
        <Card>
          <CardHeader>
            <CardTitle>Items ({singlePurchaseOrder?.items?.length})</CardTitle>
          </CardHeader>

          <CardContent className="space-y-2 text-sm max-h-52 overflow-auto">
            {singlePurchaseOrder?.items?.map((item: any) => (
              <div key={item.id} className="flex justify-between border-b pb-2">
                <span className="truncate">{item.product_name}</span>
                <span className="font-medium">{item.line_total}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
