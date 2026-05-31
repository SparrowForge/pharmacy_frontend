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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

import { Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { useProducts } from "@/src/hooks/useProducts";
import { useProductOffers } from "@/src/hooks/useProductOffers";

const initialState = {
  product_id: "",

  title: "",
  description: "",

  phar_discount_type: "percentage",
  discount_value: 0,

  starts_at: "",
  ends_at: "",

  is_active: true,
};

/* ================= DATE FORMAT FIX ================= */
const formatDate = (date?: string | null) => {
  if (!date) return "";
  return date.split("T")[0];
};

export default function ProductOfferDialogForm({
  offerId,
  onClose,
}: {
  offerId?: string | null;
  onClose?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialState);

  const isEditMode = Boolean(offerId);

  const { products, fetchProducts } = useProducts();

  const {
    createProductOffer,
    updateProductOffer,
    fetchSingleProductOffer,
    createLoading,
    updateLoading,
  } = useProductOffers();

  /* ================= LOAD PRODUCTS ================= */
  useEffect(() => {
    fetchProducts();
  }, []);

  /* ================= LOAD SINGLE ================= */
  useEffect(() => {
    const load = async () => {
      if (!offerId) return;

      try {
        const res = await fetchSingleProductOffer(offerId);

        setForm({
          product_id: res.product_id ?? "",
          title: res.title ?? "",
          description: res.description ?? "",

          phar_discount_type: res.phar_discount_type ?? "percentage",
          discount_value: Number(res.discount_value) ?? 0,

          starts_at: formatDate(res.starts_at),
          ends_at: formatDate(res.ends_at),

          is_active: res.is_active ?? true,
        });

        setOpen(true);
      } catch {
        toast.error("Failed to load offer");
      }
    };

    load();
  }, [offerId]);

  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const validate = () => {
    if (!form.product_id) return "Product is required";
    if (!form.title) return "Title is required";
    if (!form.discount_value) return "Discount is required";
    if (!form.starts_at) return "Start date is required";
    if (!form.ends_at) return "End date is required";

    return null;
  };

  const handleSubmit = async () => {
    const error = validate();
    if (error) return toast.error(error);

    try {
      const payload = {
        product_id: form.product_id,

        title: form.title,
        description: form.description,

        phar_discount_type: form.phar_discount_type as "percentage" | "fixed",

        discount_value: Number(form.discount_value),

        starts_at: form.starts_at,
        ends_at: form.ends_at,

        is_active: form.is_active,
      };

      if (isEditMode && offerId) {
        await updateProductOffer(offerId, payload);
        toast.success("Offer updated successfully");
      } else {
        await createProductOffer(payload);
        toast.success("Offer created successfully");
      }

      setForm(initialState);
      setOpen(false);
      onClose?.();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        setOpen(val);
        if (!val && !isEditMode) setForm(initialState);
      }}
    >
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Offer
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Offer" : "Create Product Offer"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* PRODUCT */}
          <div className="space-y-2">
            <Label>Product *</Label>
            <Select
              value={form.product_id}
              onValueChange={(v) => handleChange("product_id", v)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select product" />
              </SelectTrigger>

              <SelectContent>
                {products?.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* TITLE */}
          <div className="space-y-2">
            <Label>Title *</Label>
            <Input
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>

          {/* DESCRIPTION */}
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          {/* DISCOUNT TYPE */}
          <div className="space-y-2">
            <Label>Discount Type</Label>
            <Select
              value={form.phar_discount_type}
              onValueChange={(v) => handleChange("phar_discount_type", v)}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="percentage">Percentage</SelectItem>
                <SelectItem value="fixed">Fixed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* DISCOUNT VALUE */}
          <div className="space-y-2">
            <Label>Discount Value *</Label>
            <Input
              type="number"
              value={form.discount_value}
              onChange={(e) =>
                handleChange("discount_value", Number(e.target.value))
              }
            />
          </div>

          {/* DATES */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date *</Label>
              <Input
                type="date"
                value={form.starts_at}
                onChange={(e) => handleChange("starts_at", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>End Date *</Label>
              <Input
                type="date"
                value={form.ends_at}
                onChange={(e) => handleChange("ends_at", e.target.value)}
              />
            </div>
          </div>

          {/* STATUS */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.is_active}
              onChange={(e) => handleChange("is_active", e.target.checked)}
            />
            <Label>Active</Label>
          </div>

          {/* SUBMIT */}
          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={createLoading || updateLoading}
          >
            {createLoading || updateLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : isEditMode ? (
              "Update Offer"
            ) : (
              "Create Offer"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
