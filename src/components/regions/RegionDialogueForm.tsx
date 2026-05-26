// components/regions/RegionDialogueForm.tsx

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

import { Textarea } from "@/src/components/ui/textarea";

import { Loader2, Plus } from "lucide-react";

import { toast } from "sonner";

import { useRegions } from "@/src/hooks/useRegion";

export default function RegionDialogueForm({
  regionId,
  onClose,
}: {
  regionId?: string | null;

  onClose?: () => void;
}) {
  const [open, setOpen] = useState(false);

  const {
    createRegion,
    createLoading,

    fetchSingleRegion,

    updateRegion,
    updateLoading,
  } = useRegions();

  const initialFormState = {
    name: "",
    description: "",
  };

  const [form, setForm] = useState(initialFormState);

  const isEditMode = Boolean(regionId);

  useEffect(() => {
    const loadRegion = async () => {
      if (!regionId) return;

      try {
        const res = await fetchSingleRegion(regionId);

        setForm({
          name: res.name ?? "",

          description: res.description ?? "",
        });

        setOpen(true);
      } catch (error) {
        toast.error("Failed to load region");
      }
    };

    loadRegion();
  }, [regionId]);

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const validate = () => {
    if (!form.name) return "Region name is required";

    if (!form.description) return "Description is required";

    return null;
  };

  const handleSubmit = async () => {
    const error = validate();

    if (error) {
      toast.error(error);

      return;
    }

    try {
      if (isEditMode && regionId) {
        await updateRegion(regionId, form);

        toast.success("Region updated successfully");
      } else {
        await createRegion(form);

        toast.success("Region created successfully");
      }

      setForm(initialFormState);

      setOpen(false);

      onClose?.();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

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
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Create Region
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Region" : "Create Region"}
          </DialogTitle>

          <DialogDescription>Manage region information</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* NAME */}

          <div className="space-y-2">
            <Label>Region Name *</Label>

            <Input
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Region name"
            />
          </div>

          {/* DESCRIPTION */}

          <div className="space-y-2">
            <Label>Description *</Label>

            <Textarea
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={4}
              placeholder="Region description"
            />
          </div>

          {/* SUBMIT */}

          <Button
            onClick={handleSubmit}
            className="w-full bg-primary hover:bg-primary/90"
            disabled={createLoading || updateLoading}
          >
            {createLoading || updateLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />

                {isEditMode ? "Updating..." : "Creating..."}
              </>
            ) : isEditMode ? (
              "Update Region"
            ) : (
              "Create Region"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
