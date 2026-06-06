"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

import { usePurchaseOrders } from "@/src/hooks/usePurchaseOrders";
import { usePurchaseOrderReceive } from "@/src/hooks/usePurchaseOrderReceive";
import { useProductBatches } from "@/src/hooks/useProductBatches";
import { useEnum } from "@/src/hooks/useEnum";

import { IReceivePurchaseOrderPayload } from "@/src/types/purchaseOrderReceive.types";
import Loading from "../common/Loading";

export default function PurchaseOrderReceiveForm() {
  const { id } = useParams();
  const {
    singlePurchaseOrder,
    fetchSinglePurchaseOrder,
    singlePurchaseOrderLoading,
  } = usePurchaseOrders();
  const { receivePurchaseOrder, createLoading } = usePurchaseOrderReceive();
  const { purchaseOrderStatuses, fetchPurchaseOrderStatuses } = useEnum();
  const { batches, fetchProductBatches } = useProductBatches();
  const [formData, setFormData] = useState<IReceivePurchaseOrderPayload>({
    receipt_number: "",
    received_at: new Date().toISOString(),
    status: "received",
    notes: "",
    purchase_order_id: "",
    items: [],
  });

  const toDateTimeLocal = (iso: string) => {
    const date = new Date(iso);
    const offset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - offset).toISOString().slice(0, 16);
  };

  useEffect(() => {
    fetchPurchaseOrderStatuses();
    if (id) {
      fetchSinglePurchaseOrder(String(id));
    }
  }, [id, fetchPurchaseOrderStatuses, fetchSinglePurchaseOrder]);

  useEffect(() => {
    if (!singlePurchaseOrder?.items?.length) return;

    singlePurchaseOrder.items.forEach((item) => {
      fetchProductBatches({
        page: 1,
        limit: 100,
        q: "",
        product_id: item.product_id,
      });
    });
  }, [singlePurchaseOrder]);

  useEffect(() => {
    if (!singlePurchaseOrder?.items?.length) return;

    setFormData((prev) => ({
      ...prev,
      items: singlePurchaseOrder.items.map((item) => ({
        purchase_order_item_id: item.id,
        product_batch_id: item.product_batch_id || "",
        quantity_receive: 0,
        unit_cost: Number(item.unit_cost),
        expiry_date: "",
        lot_number: item?.lot_number || "",
      })),
    }));
  }, [singlePurchaseOrder]);

  const updateItem = (index: number, field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    }));
  };

  const batchesByProduct = useMemo(() => {
    return batches.reduce((acc: Record<string, any[]>, batch) => {
      if (!acc[batch.product_id]) {
        acc[batch.product_id] = [];
      }
      acc[batch.product_id].push(batch);
      return acc;
    }, {});
  }, [batches]);

  const getBatchesByProduct = (productId: string) => {
    return batchesByProduct[productId] || [];
  };
  const handleSubmit = async () => {
    if (!id) return;
    const payload: IReceivePurchaseOrderPayload = {
      ...formData,
      purchase_order_id: String(id),
    };

    await receivePurchaseOrder(payload);
  };

  console.log("Form Data:", singlePurchaseOrder, batches);

  useEffect(() => {
    if (!singlePurchaseOrder?.items?.length) return;
    if (!batches.length) return;

    setFormData((prev) => {
      const updatedItems = prev.items.map((item, index) => {
        const poItem = singlePurchaseOrder.items[index];

        if (!poItem) return item;

        if (item.product_batch_id) return item;

        const productBatches = batches.filter(
          (b) => b.product_id === poItem.product_id,
        );

        return {
          ...item,
          product_batch_id: productBatches[0]?.id || "",
        };
      });

      return {
        ...prev,
        items: updatedItems,
      };
    });
  }, [batches, singlePurchaseOrder]);

  if (singlePurchaseOrderLoading) {
    return <Loading text="Loading Data ..." />;
  }

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Received At</Label>

          <Input
            type="datetime-local"
            value={toDateTimeLocal(formData.received_at)}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                received_at: new Date(e.target.value).toISOString(),
              }))
            }
          />
        </div>

        <div>
          <Label>Status</Label>

          <Select
            value={formData.status}
            onValueChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                status: value,
              }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>

            <SelectContent>
              {purchaseOrderStatuses.map((status: string) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Notes */}
      <div>
        <Label>Notes</Label>

        <Textarea
          value={formData.notes}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              notes: e.target.value,
            }))
          }
        />
      </div>

      {/* Items */}
      <div className="space-y-4">
        <h2 className="font-semibold text-lg">Receive Items</h2>

        {singlePurchaseOrder?.items?.map((poItem, index) => {
          const receiveItem = formData.items[index];

          if (!receiveItem) return null;

          return (
            <div key={poItem.id} className="border rounded-lg p-4 space-y-4">
              {/* Product Info */}
              <div>
                <h3 className="font-medium">{poItem.product_name}</h3>

                <p className="text-xs text-muted-foreground">
                  SKU: {poItem.product?.sku}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label>Ordered Quantity</Label>
                  <Input value={poItem.quantity_purchase} disabled />
                </div>

                <div>
                  <Label>Already Received</Label>
                  <Input value={poItem.quantity_received_purchase} disabled />
                </div>

                <div>
                  <Label>Remaining Quantity</Label>
                  <Input value={poItem.quantity_purchase_remaining} disabled />
                </div>

                <div>
                  <Label>Receive Quantity</Label>
                  <Input
                    type="number"
                    min={0}
                    max={poItem.quantity_purchase_remaining}
                    value={receiveItem.quantity_receive || ""}
                    onChange={(e) =>
                      updateItem(
                        index,
                        "quantity_receive",
                        Number(e.target.value),
                      )
                    }
                  />
                </div>

                <div>
                  <Label>Unit Cost</Label>
                  <Input
                    type="number"
                    value={receiveItem.unit_cost}
                    onChange={(e) =>
                      updateItem(index, "unit_cost", Number(e.target.value))
                    }
                  />
                </div>

                <div>
                  <Label>Batch</Label>

                  <Select
                    value={receiveItem.product_batch_id || ""}
                    onValueChange={(value) =>
                      updateItem(index, "product_batch_id", value)
                    }
                  >
                    <SelectTrigger className="w-full" disabled>
                      <SelectValue placeholder="Select batch" />
                    </SelectTrigger>

                    <SelectContent>
                      {getBatchesByProduct(poItem.product_id).map((batch) => (
                        <SelectItem key={batch.id} value={batch.id}>
                          {batch.batch_number}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Expiry Date</Label>

                  <Input
                    type="date"
                    value={receiveItem.expiry_date || ""}
                    onChange={(e) =>
                      updateItem(index, "expiry_date", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Submit */}
      <Button
        onClick={handleSubmit}
        disabled={createLoading}
        className="w-full"
      >
        {createLoading ? "Submitting..." : "Submit Receive"}
      </Button>
    </div>
  );
}
