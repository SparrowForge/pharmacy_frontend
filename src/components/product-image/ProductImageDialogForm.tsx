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

import { Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { useProductImages } from "@/src/hooks/useProductImages";
import { useProducts } from "@/src/hooks/useProducts";
import FileUpload from "../files/FileUpload";

export default function ProductImageDialog({
  productImageId,
  onClose,
}: {
  productImageId?: string | null;
  onClose?: () => void;
}) {
  const [open, setOpen] = useState(false);

  const {
    createProductImage,
    updateProductImage,
    getSingleProductImage,
    clearSingle,
    fetchProductImages,
  } = useProductImages();
  const { products, fetchProducts } = useProducts();

  /* LOAD PRODUCTS */
  useEffect(() => {
    fetchProducts({ page: 1, limit: 100 });
  }, []);

  const isEditMode = Boolean(productImageId);

  const initialState = {
    product_id: "",
    media_id: "",
    sort_order: 0,
    is_primary: false,
  };

  const [form, setForm] = useState(initialState);

  /* OPEN EDIT */
  useEffect(() => {
    const load = async () => {
      if (!productImageId) return;

      const data = await getSingleProductImage(productImageId);

      if (data) {
        setForm({
          product_id: data.product_id,
          media_id: data.media_id,
          sort_order: data.sort_order,
          is_primary: data.is_primary,
        });

        setOpen(true);
      }
    };

    load();
  }, [productImageId]);

  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (isEditMode && productImageId) {
        await updateProductImage(productImageId, form);
        toast.success("Updated successfully");
      } else {
        await createProductImage(form);
        toast.success("Created successfully");
      }

      setOpen(false);
      setForm(initialState);
      clearSingle();
      fetchProductImages();
      onClose?.();
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        setOpen(val);

        if (!val) {
          setForm(initialState);
          clearSingle();
          onClose?.();
        }
      }}
    >
      {!isEditMode && (
        <DialogTrigger asChild>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Product Image
          </Button>
        </DialogTrigger>
      )}

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Product Image" : "Add Product Image"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <div className="space-y-2">
            <Label>Product</Label>

            <select
              className="w-full border rounded p-2"
              value={form.product_id}
              onChange={(e) =>
                setForm((p) => ({
                  ...p,
                  product_id: e.target.value,
                }))
              }
            >
              <option value="">Select product</option>

              {products?.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <FileUpload
            value={form.media_id}
            label="Brand Logo *"
            onChange={(fileId) => {
              handleChange("logo_media_id", fileId);
            }}
          />
          <div>
            <Label>Sort Order</Label>
            <Input
              type="number"
              value={form.sort_order}
              onChange={(e) =>
                handleChange("sort_order", Number(e.target.value))
              }
            />
          </div>

          <Button onClick={handleSubmit} className="w-full">
            {isEditMode ? "Update" : "Create"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
