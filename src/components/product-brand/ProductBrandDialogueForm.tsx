"use client";

import { useEffect, useState } from "react";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Label } from "@/src/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";

import { Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { useProductBrands } from "@/src/hooks/useProductBrands";
import { useCompanies } from "@/src/hooks/useCompanies";

export default function ProductBrandDialogForm({
  brandId,
  onClose,
}: {
  brandId?: string | null;
  onClose?: () => void;
}) {
  const [open, setOpen] = useState(false);

  const isEditMode = Boolean(brandId);

  const {
    createBrand,
    updateBrand,
    fetchSingleBrand,
    createLoading,
    updateLoading,
  } = useProductBrands();

  const { companies, fetchCompanies } = useCompanies();

  const initialState = {
    name: "",
    slug: "",
    description: "",
    manufacturer_id: "",
    logo_media_id: "",
  };

  const [form, setForm] = useState(initialState);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  useEffect(() => {
    const load = async () => {
      if (!brandId) return;

      try {
        const res = await fetchSingleBrand(brandId);

        setForm({
          name: res.name ?? "",
          slug: res.slug ?? "",
          description: res.description ?? "",
          manufacturer_id: res.manufacturer_id ?? "",
          logo_media_id: res.logo_media_id ?? "",
        });

        setOpen(true);
      } catch {
        toast.error("Failed to load brand");
      }
    };

    load();
  }, [brandId]);

  const handle = (key: string, value: any) => {
    setForm((p) => ({ ...p, [key]: value }));
  };

  const validate = () => {
    if (!form.name) return "Name required";
    if (!form.slug) return "Slug required";
    if (!form.manufacturer_id) return "Manufacturer required";
    return null;
  };

  const submit = async () => {
    const error = validate();
    if (error) return toast.error(error);

    try {
      const payload = {
        ...form,
      };

      if (isEditMode && brandId) {
        await updateBrand(brandId, payload);
        toast.success("Updated");
      } else {
        await createBrand(payload);
        toast.success("Created");
      }

      setForm(initialState);
      setOpen(false);
      onClose?.();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>

      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Brand
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-xl">

        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Brand" : "Create Brand"}
          </DialogTitle>
        </DialogHeader>

        {/* NAME */}
        <div className="space-y-2">
          <Label>Name</Label>
          <Input
            value={form.name}
            onChange={(e) => handle("name", e.target.value)}
          />
        </div>

        {/* SLUG */}
        <div className="space-y-2">
          <Label>Slug</Label>
          <Input
            value={form.slug}
            onChange={(e) => handle("slug", e.target.value)}
          />
        </div>

        {/* DESCRIPTION */}
        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea
            value={form.description}
            onChange={(e) => handle("description", e.target.value)}
          />
        </div>

        {/* MANUFACTURER (COMPANY DROPDOWN) */}
        <div className="space-y-2">
          <Label>Manufacturer</Label>

          <Select
            value={form.manufacturer_id}
            onValueChange={(v) => handle("manufacturer_id", v)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select company" />
            </SelectTrigger>

            <SelectContent>
              {companies.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>

          </Select>
        </div>

        {/* LOGO */}
        <div className="space-y-2">
          <Label>Logo Media ID</Label>
          <Input
            value={form.logo_media_id}
            onChange={(e) => handle("logo_media_id", e.target.value)}
          />
        </div>

        {/* SUBMIT */}
        <Button
          className="w-full mt-4"
          onClick={submit}
          disabled={createLoading || updateLoading}
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

      </DialogContent>
    </Dialog>
  );
}