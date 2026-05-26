// components/districts/DistrictDialogueForm.tsx

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

import { useDistricts } from "@/src/hooks/useDistricts";
import { useDivisions } from "@/src/hooks/useDivisions";

export default function DistrictDialogueForm({
  districtId,
  onClose,
}: {
  districtId?: string | null;

  onClose?: () => void;
}) {
  const [open, setOpen] = useState(false);

  const {
    createDistrict,
    createLoading,

    fetchSingleDistrict,

    updateDistrict,
    updateLoading,
  } = useDistricts();

  const { divisions, fetchDivisions } = useDivisions();

  const initialFormState = {
    division_id: "",
    code: "",
    name: "",
  };

  const [form, setForm] = useState(initialFormState);

  const isEditMode = Boolean(districtId);

  useEffect(() => {
    fetchDivisions();
  }, []);

  useEffect(() => {
    const loadDistrict = async () => {
      if (!districtId) return;

      try {
        const res = await fetchSingleDistrict(districtId);

        setForm({
          division_id: res.division_id ?? "",

          code: res.code ?? "",

          name: res.name ?? "",
        });

        setOpen(true);
      } catch (error) {
        toast.error("Failed to load district");
      }
    };

    loadDistrict();
  }, [districtId]);

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const validate = () => {
    if (!form.division_id) return "Division is required";

    if (!form.code) return "Code is required";

    if (!form.name) return "Name is required";

    return null;
  };

  const handleSubmit = async () => {
    const error = validate();

    if (error) {
      toast.error(error);

      return;
    }

    try {
      if (isEditMode && districtId) {
        await updateDistrict(districtId, form);

        toast.success("District updated successfully");
      } else {
        await createDistrict(form);

        toast.success("District created successfully");
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
          Create District
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit District" : "Create District"}
          </DialogTitle>

          <DialogDescription>Manage district information</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* DIVISION */}

          <div className="space-y-2">
            <Label>Division *</Label>

            <Select
              value={form.division_id}
              onValueChange={(value) => handleChange("division_id", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select division" />
              </SelectTrigger>

              <SelectContent>
                {divisions.map((division) => (
                  <SelectItem key={division.id} value={division.id}>
                    {division.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* CODE */}

          <div className="space-y-2">
            <Label>District Code *</Label>

            <Input
              value={form.code}
              onChange={(e) => handleChange("code", e.target.value)}
              placeholder="District code"
            />
          </div>

          {/* NAME */}

          <div className="space-y-2">
            <Label>District Name *</Label>

            <Input
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="District name"
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
              "Update District"
            ) : (
              "Create District"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
