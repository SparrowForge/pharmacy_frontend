// components/countries/CountryDialogueForm.tsx

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

import { Loader2, Plus } from "lucide-react";

import { toast } from "sonner";

import { useCountries } from "@/src/hooks/useCountries";

export default function CountryDialogueForm({
  countryId,
  onClose,
}: {
  countryId?: string | null;

  onClose?: () => void;
}) {
  const [open, setOpen] = useState(false);

  const {
    createCountry,
    createLoading,

    fetchSingleCountry,

    updateCountry,
    updateLoading,
  } = useCountries();

  const initialFormState = {
    code: "",
    name: "",
  };

  const [form, setForm] = useState(initialFormState);

  const isEditMode = Boolean(countryId);

  useEffect(() => {
    const loadCountry = async () => {
      if (!countryId) return;

      try {
        const res = await fetchSingleCountry(countryId);

        setForm({
          code: res.code ?? "",

          name: res.name ?? "",
        });

        setOpen(true);
      } catch (error) {
        toast.error("Failed to load country");
      }
    };

    loadCountry();
  }, [countryId]);

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const validate = () => {
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
      if (isEditMode && countryId) {
        await updateCountry(countryId, form);

        toast.success("Country updated successfully");
      } else {
        await createCountry(form);

        toast.success("Country created successfully");
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
          Create Country
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Country" : "Create Country"}
          </DialogTitle>

          <DialogDescription>Manage country information</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* CODE */}

          <div className="space-y-2">
            <Label>Country Code *</Label>

            <Input
              value={form.code}
              onChange={(e) => handleChange("code", e.target.value)}
              placeholder="Code"
            />
          </div>

          {/* NAME */}

          <div className="space-y-2">
            <Label>Country Name *</Label>

            <Input
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Country name"
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
              "Update Country"
            ) : (
              "Create Country"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
