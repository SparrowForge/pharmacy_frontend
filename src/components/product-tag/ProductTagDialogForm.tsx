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

import { useProductTags } from "@/src/hooks/useProductTags";
import { useProducts } from "@/src/hooks/useProducts";

export default function ProductTagDialog({
  tagId,
  onClose,
}: {
  tagId?: string | null;
  onClose?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const isEdit = Boolean(tagId);

  const {
    createProductTag,
    updateProductTag,
    fetchSingleProductTag,
    clearProductTag,
    fetchProductTags,
  } = useProductTags();

  const { products, fetchProducts } = useProducts();

  const [form, setForm] = useState({
    product_id: "",
    tag: "",
  });

  /* LOAD PRODUCTS */
  useEffect(() => {
    fetchProducts({ page: 1, limit: 100 });
  }, []);

  /* LOAD SINGLE FOR EDIT */
  useEffect(() => {
    const load = async () => {
      if (!tagId) return;

      const data = await fetchSingleProductTag(tagId);

      if (data) {
        setForm({
          product_id: data.product_id,
          tag: data.tag,
        });

        setOpen(true);
      }
    };

    load();
  }, [tagId]);

  const handleSubmit = async () => {
    if (!form.product_id) return toast.error("Select product");
    if (!form.tag) return toast.error("Tag required");

    try {
      if (isEdit && tagId) {
        await updateProductTag(tagId, form);
      } else {
        await createProductTag(form);
      }

      await fetchProductTags({ page: 1, limit: 10 });

      setForm({ product_id: "", tag: "" });
      setOpen(false);
      clearProductTag();
      onClose?.();
    } catch {}
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);

        if (!v) {
          setForm({ product_id: "", tag: "" });
          clearProductTag();
        }
      }}
    >
      {!isEdit && (
        <DialogTrigger asChild>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Tag
          </Button>
        </DialogTrigger>
      )}

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Tag" : "Add Tag"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* PRODUCT DROPDOWN */}
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

          {/* TAG */}
          <div className="space-y-2">
            <Label>Tag</Label>

            <Input
              value={form.tag}
              onChange={(e) => setForm((p) => ({ ...p, tag: e.target.value }))}
            />
          </div>

          <Button onClick={handleSubmit} className="w-full">
            {isEdit ? "Update" : "Create"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
