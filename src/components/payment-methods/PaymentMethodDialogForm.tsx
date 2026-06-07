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

import { Loader2, Plus } from "lucide-react";

import { usePaymentMethods } from "@/src/hooks/usePaymentMethods";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { useEnum } from "@/src/hooks/useEnum";

type PaymentMethodForm = {
  name: string;
  method_type: string;
  description: string;
  icon: string;
  is_active: boolean;
};

export default function PaymentMethodDialogForm({
  paymentId,
  onClose,
}: {
  paymentId?: string | null;
  onClose?: () => void;
}) {
  const [open, setOpen] = useState(false);

  const { saleTypes, fetchSaleTypes } = useEnum();

  const {
    createPaymentMethod,
    createLoading,
    fetchSinglePaymentMethod,
    updatePaymentMethod,
    updateLoading,
  } = usePaymentMethods();

  const isEditMode = Boolean(paymentId);

  const initialState: PaymentMethodForm = {
    name: "",
    method_type: "",
    description: "",
    icon: "",
    is_active: true,
  };

  const [form, setForm] = useState<PaymentMethodForm>(initialState);

  useEffect(() => {
    const load = async () => {
      if (!paymentId) return;

      const res = await fetchSinglePaymentMethod(paymentId);

      setForm({
        name: res.name,
        method_type: res.method_type,
        description: res.description,
        icon: res.icon ?? "",
        is_active: res.is_active,
      });

      setOpen(true);
    };

    load();
  }, [paymentId, fetchSinglePaymentMethod]);

  const handleChange = <K extends keyof PaymentMethodForm>(
    key: K,
    value: PaymentMethodForm[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (isEditMode && paymentId) {
        await updatePaymentMethod(paymentId, form);
      } else {
        await createPaymentMethod(form);
      }

      setForm(initialState);
      setOpen(false);
      onClose?.();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSaleTypes();
  }, [fetchSaleTypes]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Payment Method
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Payment Method" : "Create Payment Method"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* NAME */}
          <div>
            <Label>Name</Label>
            <Input
              value={form.name}
              onChange={(e) =>
                handleChange("name", e.target.value)
              }
            />
          </div>

          {/* TYPE */}
          <div className="space-y-2">
            <Label>Method Type *</Label>

            <Select
              value={form.method_type}
              onValueChange={(value) =>
                handleChange("method_type", value)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>

              <SelectContent>
                {saleTypes?.map((type: string) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* DESCRIPTION */}
          <div>
            <Label>Description</Label>
            <Textarea
              value={form.description}
              onChange={(e) =>
                handleChange("description", e.target.value)
              }
            />
          </div>

          {/* ICON */}
          <div>
            <Label>Icon URL</Label>
            <Input
              value={form.icon}
              onChange={(e) =>
                handleChange("icon", e.target.value)
              }
              placeholder="https://..."
            />
          </div>

          {/* ACTIVE */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.is_active}
              onChange={(e) =>
                handleChange("is_active", e.target.checked)
              }
            />
            <Label>Active</Label>
          </div>

          {/* SUBMIT */}
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