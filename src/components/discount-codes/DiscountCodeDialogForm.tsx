"use client";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";

import { Plus, Loader2 } from "lucide-react";

import { useDiscountCodes } from "@/src/hooks/useDiscountCodes";

export default function DiscountCodeDialogForm({
  discountId,
  onClose,
}: {
  discountId?: string | null;
  onClose?: () => void;
}) {
  const [open, setOpen] = useState(false);

  const {
    createDiscountCode,
    createLoading,
    fetchSingleDiscountCode,
    updateDiscountCode,
    updateLoading,
  } = useDiscountCodes();

  const isEditMode = Boolean(discountId);

  const initialState = {
    code: "",
    description: "",
    phar_discount_type: "percentage" as "percentage" | "fixed",
    discount_value: 0,
    max_usage: 0,
    usage_count: 0,
    min_purchase_amount: 0,
    valid_from: "",
    valid_until: "",
    is_active: true,
  };

  const [form, setForm] = useState(initialState);

  useEffect(() => {
    const load = async () => {
      if (!discountId) return;

      const res = await fetchSingleDiscountCode(discountId);

      setForm({
        code: res.code,
        description: res.description,
        phar_discount_type: res.phar_discount_type,
        discount_value: Number(res.discount_value),
        max_usage: res.max_usage,
        usage_count: res.usage_count,
        min_purchase_amount: Number(res.min_purchase_amount),
        valid_from: res.valid_from?.slice(0, 10),
        valid_until: res.valid_until?.slice(0, 10),
        is_active: res.is_active,
      });

      setOpen(true);
    };

    load();
  }, [discountId]);

  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (isEditMode && discountId) {
        await updateDiscountCode(discountId, form);
      } else {
        await createDiscountCode(form);
      }

      setForm(initialState);
      setOpen(false);
      onClose?.();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Discount
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Discount Code" : "Create Discount Code"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3 py-4">
          <div>
            <Label>Code</Label>
            <Input
              value={form.code}
              onChange={(e) => handleChange("code", e.target.value)}
            />
          </div>

          <div>
            <Label>Description</Label>
            <Textarea
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          <div>
            <Label>Discount Value</Label>
            <Input
              type="number"
              value={form.discount_value}
              onChange={(e) =>
                handleChange("discount_value", Number(e.target.value))
              }
            />
          </div>

          <div>
            <Label>Max Usage</Label>
            <Input
              type="number"
              value={form.max_usage}
              onChange={(e) =>
                handleChange("max_usage", Number(e.target.value))
              }
            />
          </div>

          <div>
            <Label>Valid From</Label>
            <Input
              type="date"
              value={form.valid_from}
              onChange={(e) => handleChange("valid_from", e.target.value)}
            />
          </div>

          <div>
            <Label>Valid Until</Label>
            <Input
              type="date"
              value={form.valid_until}
              onChange={(e) => handleChange("valid_until", e.target.value)}
            />
          </div>

          <Button
            onClick={handleSubmit}
            disabled={createLoading || updateLoading}
            className="w-full"
          >
            {createLoading || updateLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : isEditMode ? (
              "Update"
            ) : (
              "Create"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
