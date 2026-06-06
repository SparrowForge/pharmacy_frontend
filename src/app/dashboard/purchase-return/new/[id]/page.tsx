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

import { useProductBatches } from "@/src/hooks/useProductBatches";
import { useEnum } from "@/src/hooks/useEnum";

import { usePurchaseReturn } from "@/src/hooks/usePurchaseReturn";
import { ICreatePurchaseReturnPayload } from "@/src/types/purchaseReturn.types";
import Loading from "@/src/components/common/Loading";

interface ReturnItem {
  purchase_order_item_id: string;
  product_batch_id: string;
  return_unit_id: string;
  return_qty: number;
  unit_cost: number;
  reason: string;
}

export default function PurchaseOrderReturnForm() {
  const { id } = useParams();
  const {
    singlePurchaseOrder,
    fetchSinglePurchaseOrder,
    singlePurchaseOrderLoading,
  } = usePurchaseOrders();
  const { createPurchaseReturn, createLoading } = usePurchaseReturn();
  const { purchaseOrderStatuses, fetchPurchaseOrderStatuses } = useEnum();
  const { batches, fetchProductBatches } = useProductBatches();
  const [formData, setFormData] = useState<ICreatePurchaseReturnPayload>({
    return_number: "",
    purchase_order_id: "",
    status: "pending",
    reason: "",
    notes: "",
    items: [],
  });

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
        return_unit_id: item.purchase_unit_id || "",
        return_qty: 0,
        unit_cost: Number(item.unit_cost),
        reason: "",
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
    const payload: ICreatePurchaseReturnPayload = {
      ...formData,
      purchase_order_id: String(id),
    };

    await createPurchaseReturn(payload);
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

      {/* Reason */}
      <div>
        <Label>Reason</Label>
        <Textarea
          value={formData.reason}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              reason: e.target.value,
            }))
          }
          placeholder="Enter reason for return"
        />
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
          placeholder="Enter additional notes"
        />
      </div>

      {/* Items */}
      <div className="space-y-4">
        <h2 className="font-semibold text-lg">Return Items</h2>

        {singlePurchaseOrder?.items?.map((poItem, index) => {
          const returnItem = formData.items[index] as ReturnItem;

          if (!returnItem) return null;

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
                  <Label>Return Quantity</Label>
                  <Input
                    type="number"
                    value={returnItem.return_qty || ""}
                    onChange={(e) =>
                      updateItem(index, "return_qty", Number(e.target.value))
                    }
                  />
                </div>

                <div>
                  <Label>Unit Cost</Label>
                  <Input
                    type="number"
                    value={returnItem.unit_cost}
                    onChange={(e) =>
                      updateItem(index, "unit_cost", Number(e.target.value))
                    }
                  />
                </div>

                <div>
                  <Label>Batch</Label>

                  <Select
                    value={returnItem.product_batch_id || ""}
                    onValueChange={(value) =>
                      updateItem(index, "product_batch_id", value)
                    }
                  >
                    <SelectTrigger className="w-full">
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
                  <Label>Reason for Return</Label>
                  <Input
                    value={returnItem.reason || ""}
                    onChange={(e) =>
                      updateItem(index, "reason", e.target.value)
                    }
                    placeholder="Enter reason for this item"
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
        {createLoading ? "Submitting..." : "Submit Return"}
      </Button>
    </div>
  );
}
