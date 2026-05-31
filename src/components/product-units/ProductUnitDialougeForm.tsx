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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

import { Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { useProductUnits } from "@/src/hooks/useProductUnits";
import { useEnum } from "@/src/hooks/useEnum";

const initialState = {
  name: "",
  short_name: "",
  description: "",

  unit_type: "",

  is_deafult_unit: false,
  convert_rate: 0,
};

export default function ProductUnitDialogForm({
  unitId,
  onClose,
}: {
  unitId?: string | null;
  onClose?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialState);

  const isEditMode = Boolean(unitId);
  const { unitTypes, fetchProductUnitTypes } = useEnum();

  useEffect(() => {
    fetchProductUnitTypes();
  }, [fetchProductUnitTypes]);

  const {
    createProductUnit,
    updateProductUnit,
    fetchSingleProductUnit,
    createLoading,
    updateLoading,
  } = useProductUnits();

  /* ================= LOAD SINGLE ================= */
  useEffect(() => {
    const load = async () => {
      if (!unitId) return;

      try {
        const res = await fetchSingleProductUnit(unitId);

        setForm({
          name: res.name ?? "",
          short_name: res.short_name ?? "",
          description: res.description ?? "",

          unit_type: res.unit_type ?? "",

          is_deafult_unit: res.is_deafult_unit ?? false,
          convert_rate: Number(res.convert_rate) ?? 0,
        });

        setOpen(true);
      } catch {
        toast.error("Failed to load unit");
      }
    };

    load();
  }, [unitId]);

  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const validate = () => {
    if (!form.name) return "Name is required";
    if (!form.short_name) return "Short name is required";
    if (!form.unit_type) return "Unit type is required";
    if (form.convert_rate < 0) return "Invalid convert rate";
    return null;
  };

  const handleSubmit = async () => {
    const error = validate();
    if (error) return toast.error(error);

    try {
      const payload = {
        name: form.name,
        short_name: form.short_name,
        description: form.description || undefined,

        unit_type: form.unit_type,

        is_deafult_unit: form.is_deafult_unit,
        convert_rate: Number(form.convert_rate),
      };

      if (isEditMode && unitId) {
        await updateProductUnit(unitId, payload);
        toast.success("Unit updated successfully");
      } else {
        await createProductUnit(payload);
        toast.success("Unit created successfully");
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

        if (!val && !isEditMode) {
          setForm(initialState);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Unit
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Unit" : "Create Product Unit"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* NAME */}
          <div className="space-y-2">
            <Label>Name *</Label>
            <Input
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>

          {/* SHORT NAME */}
          <div className="space-y-2">
            <Label>Short Name *</Label>
            <Input
              value={form.short_name}
              onChange={(e) => handleChange("short_name", e.target.value)}
            />
          </div>

          {/* DESCRIPTION */}
          <div className="space-y-2">
            <Label>Description</Label>
            <Input
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          {/* UNIT TYPE */}
          <div className="space-y-2">
            <Label>Unit Type *</Label>

            <Select
              value={form.unit_type}
              onValueChange={(v) => handleChange("unit_type", v)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>

              <SelectContent>
                {unitTypes?.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* CONVERT RATE */}
          <div className="space-y-2">
            <Label>Convert Rate</Label>
            <Input
              type="number"
              value={form.convert_rate}
              onChange={(e) =>
                handleChange("convert_rate", Number(e.target.value))
              }
            />
          </div>

          {/* DEFAULT UNIT */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.is_deafult_unit}
              onChange={(e) =>
                handleChange("is_deafult_unit", e.target.checked)
              }
            />
            <Label>Default Unit</Label>
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
              "Update Unit"
            ) : (
              "Create Unit"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
