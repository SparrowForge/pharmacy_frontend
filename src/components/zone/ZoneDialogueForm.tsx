// components/zones/ZoneDialogueForm.tsx

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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

import { Loader2, Plus } from "lucide-react";

import { toast } from "sonner";

import { useZones } from "@/src/hooks/useZones";
import { useRegions } from "@/src/hooks/useRegion";

export default function ZoneDialogueForm({
  zoneId,
  onClose,
}: {
  zoneId?: string | null;

  onClose?: () => void;
}) {
  const [open, setOpen] = useState(false);

  const {
    createZone,
    createLoading,

    fetchSingleZone,

    updateZone,
    updateLoading,
  } = useZones();

  const { regions, fetchRegions } = useRegions();

  const initialFormState = {
    region_id: "",
    name: "",
    description: "",
  };

  const [form, setForm] = useState(initialFormState);

  const isEditMode = Boolean(zoneId);

  useEffect(() => {
    fetchRegions();
  }, []);

  useEffect(() => {
    const loadZone = async () => {
      if (!zoneId) return;

      try {
        const res = await fetchSingleZone(zoneId);

        setForm({
          region_id: res.region_id ?? "",

          name: res.name ?? "",

          description: res.description ?? "",
        });

        setOpen(true);
      } catch (error) {
        toast.error("Failed to load zone");
      }
    };

    loadZone();
  }, [zoneId]);

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const validate = () => {
    if (!form.region_id) return "Region is required";

    if (!form.name) return "Zone name is required";

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
      if (isEditMode && zoneId) {
        await updateZone(zoneId, form);

        toast.success("Zone updated successfully");
      } else {
        await createZone(form);

        toast.success("Zone created successfully");
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
          Create Zone
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Edit Zone" : "Create Zone"}</DialogTitle>

          <DialogDescription>Manage zone information</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* REGION */}

          <div className="space-y-2">
            <Label>Region *</Label>

            <Select
              value={form.region_id}
              onValueChange={(value) => handleChange("region_id", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select region" />
              </SelectTrigger>

              <SelectContent>
                {regions.map((region) => (
                  <SelectItem key={region.id} value={region.id}>
                    {region.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* NAME */}

          <div className="space-y-2">
            <Label>Zone Name *</Label>

            <Input
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Zone name"
            />
          </div>

          {/* DESCRIPTION */}

          <div className="space-y-2">
            <Label>Description *</Label>

            <Textarea
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={4}
              placeholder="Zone description"
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
              "Update Zone"
            ) : (
              "Create Zone"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
