"use client";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

import { Loader2, Plus } from "lucide-react";
import { toast } from "sonner";

import { useProducts } from "@/src/hooks/useProducts";
import { useProductBadges } from "@/src/hooks/useProductBadges";

export default function ProductBadgeDialogForm({
  badgeId,
  onClose,
}: {
  badgeId?: string | null;
  onClose?: () => void;
}) {
  const [open, setOpen] = useState(false);

  const {
    createProductBadge,
    updateProductBadge,
    getSingleProductBadge,

    createLoading,
    updateLoading,
  } = useProductBadges();

  const { fetchProducts, products } = useProducts();

  const isEditMode = Boolean(badgeId);

  const initialFormState = {
    product_id: "",
    badge: "",
  };

  const [form, setForm] = useState(initialFormState);

  useEffect(() => {
    fetchProducts({
      page: 1,
      limit: 100,
    });
  }, [fetchProducts]);

  useEffect(() => {
    const loadData = async () => {
      if (!badgeId) return;

      try {
        const res = await getSingleProductBadge(badgeId);

        setForm({
          product_id: res.product_id ?? "",
          badge: res.badge ?? "",
        });

        setOpen(true);
      } catch {
        toast.error("Failed to load badge");
      }
    };

    loadData();
  }, [badgeId]);

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const validate = () => {
    if (!form.product_id) return "Product is required";

    if (!form.badge) return "Badge is required";

    return null;
  };

  const handleSubmit = async () => {
    const error = validate();

    if (error) {
      return toast.error(error);
    }

    try {
      const payload = {
        product_id: form.product_id,
        badge: form.badge,
      };

      if (isEditMode && badgeId) {
        await updateProductBadge(badgeId, payload);

        toast.success("Product badge updated successfully");
      } else {
        await createProductBadge(payload);

        toast.success("Product badge created successfully");
      }

      setForm(initialFormState);

      setOpen(false);

      onClose?.();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const loading = isEditMode ? updateLoading : createLoading;

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        setOpen(val);

        if (!val && !isEditMode) {
          setForm(initialFormState);
        }
      }}
    >
      {!isEditMode && (
        <DialogTrigger asChild>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Badge
          </Button>
        </DialogTrigger>
      )}

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Product Badge" : "Create Product Badge"}
          </DialogTitle>

          <DialogDescription>Manage product badges</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Product *</Label>

            <Select
              value={form.product_id}
              onValueChange={(value) => handleChange("product_id", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Product" />
              </SelectTrigger>

              <SelectContent>
                {products?.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Badge *</Label>

            <Input
              value={form.badge}
              onChange={(e) => handleChange("badge", e.target.value)}
              placeholder="Badge"
            />
          </div>

          <Button className="w-full" onClick={handleSubmit} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isEditMode ? "Updating..." : "Creating..."}
              </>
            ) : isEditMode ? (
              "Update Badge"
            ) : (
              "Create Badge"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
