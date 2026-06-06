"use client";

import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Label } from "@/src/components/ui/label";

import { usePurchaseReturn } from "@/src/hooks/usePurchaseReturn";
import { ICreatePurchaseReturnPayload } from "@/src/types/purchaseReturn.types";

export default function PurchaseReturnForm() {
  const { createPurchaseReturn, createLoading } = usePurchaseReturn();

  const [formData, setFormData] =
    useState<ICreatePurchaseReturnPayload>({
      purchase_order_id: "",
      return_number: "",
      status: "pending",
      reason: "",
      notes: "",
      items: [],
    });

  const updateItem = (index: number, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    }));
  };

  const handleSubmit = async () => {
    await createPurchaseReturn(formData);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Return Number</Label>
        <Input
          value={formData.return_number}
          onChange={(e) =>
            setFormData((p) => ({
              ...p,
              return_number: e.target.value,
            }))
          }
        />
      </div>

      <div>
        <Label>Reason</Label>
        <Input
          value={formData.reason}
          onChange={(e) =>
            setFormData((p) => ({
              ...p,
              reason: e.target.value,
            }))
          }
        />
      </div>

      <div>
        <Label>Notes</Label>
        <Textarea
          value={formData.notes}
          onChange={(e) =>
            setFormData((p) => ({
              ...p,
              notes: e.target.value,
            }))
          }
        />
      </div>

      <Button onClick={handleSubmit} disabled={createLoading}>
        {createLoading ? "Submitting..." : "Submit Return"}
      </Button>
    </div>
  );
}

