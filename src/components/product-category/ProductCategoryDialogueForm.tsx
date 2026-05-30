"use client";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";

import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Button } from "@/src/components/ui/button";
import { Label } from "@/src/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

import { Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { useProductCategories } from "@/src/hooks/useProductCategories";

import FileUpload from "../files/FileUpload";

export default function ProductCategoryDialog({
  categoryId,
  onClose,
}: {
  categoryId?: string | null;
  onClose?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const isEdit = Boolean(categoryId);

  const {
    categories,
    fetchCategories,

    createCategory,
    updateCategory,
    fetchSingleCategory,

    createLoading,
    updateLoading,
  } = useProductCategories();

  const [form, setForm] = useState({
    parent_id: null as string | null,
    name: "",
    slug: "",
    description: "",
    icon: "",
  });

  const handle = (key: string, value: any) => {
    setForm((p) => ({ ...p, [key]: value }));
  };

  /* LOAD ALL CATEGORIES FOR DROPDOWN */
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  /* LOAD SINGLE */
  useEffect(() => {
    if (!categoryId) return;

    (async () => {
      const res = await fetchSingleCategory(categoryId);

      setForm({
        parent_id: res.parent_id ?? null,
        name: res.name || "",
        slug: res.slug || "",
        description: res.description || "",
        icon: res.icon || "",
      });

      setOpen(true);
    })();
  }, [categoryId]);

  const submit = async () => {
    try {
      const payload = {
        ...form,
        parent_id: form.parent_id || null, // IMPORTANT
      };

      if (isEdit && categoryId) {
        await updateCategory(categoryId, payload);
        toast.success("Updated");
      } else {
        await createCategory(payload);
        toast.success("Created");
      }

      setOpen(false);
      onClose?.();
    } catch {
      toast.error("Failed");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Category
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Category" : "Create Category"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* NAME */}
          <div>
            <Label>Name *</Label>
            <Input
              value={form.name}
              onChange={(e) => handle("name", e.target.value)}
            />
          </div>

          {/* SLUG */}
          <div>
            <Label>Slug *</Label>
            <Input
              value={form.slug}
              onChange={(e) => handle("slug", e.target.value)}
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <Label>Description</Label>
            <Textarea
              value={form.description}
              onChange={(e) => handle("description", e.target.value)}
            />
          </div>

          {/* PARENT CATEGORY DROPDOWN */}
          <div>
            <Label>Parent Category</Label>

            <Select
              value={form.parent_id ?? ""}
              onValueChange={(value) =>
                handle("parent_id", value === "null" ? null : value)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select parent (optional)" />
              </SelectTrigger>

              <SelectContent>
                {/* ROOT OPTION */}
                <SelectItem value="null">None (Root Category)</SelectItem>

                {categories?.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* ICON UPLOAD */}
          <FileUpload
            value={form.icon}
            label="Category Icon"
            onChange={(fileId) => handle("icon", fileId)}
          />

          {/* SUBMIT */}
          <Button
            className="w-full"
            onClick={submit}
            disabled={createLoading || updateLoading}
          >
            {createLoading || updateLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : isEdit ? (
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
