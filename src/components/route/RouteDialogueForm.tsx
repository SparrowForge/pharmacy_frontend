// components/routes/RouteDialogueForm.tsx

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

import { useRoutes } from "@/src/hooks/useRoutes";
import { useZones } from "@/src/hooks/useZones";

export default function RouteDialogueForm({
  routeId,
  onClose,
}: {
  routeId?: string | null;

  onClose?: () => void;
}) {
  const [open, setOpen] = useState(false);

  const {
    createRoute,
    createLoading,

    fetchSingleRoute,

    updateRoute,
    updateLoading,
  } = useRoutes();

  const { zones, fetchZones } = useZones();

  const initialFormState = {
    zone_id: "",
    name: "",
    description: "",
  };

  const [form, setForm] = useState(initialFormState);

  const isEditMode = Boolean(routeId);

  useEffect(() => {
    fetchZones();
  }, []);

  useEffect(() => {
    const loadRoute = async () => {
      if (!routeId) return;

      try {
        const res = await fetchSingleRoute(routeId);

        setForm({
          zone_id: res.zone_id ?? "",

          name: res.name ?? "",

          description: res.description ?? "",
        });

        setOpen(true);
      } catch (error) {
        toast.error("Failed to load route");
      }
    };

    loadRoute();
  }, [routeId]);

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const validate = () => {
    if (!form.zone_id) return "Zone is required";

    if (!form.name) return "Route name is required";

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
      if (isEditMode && routeId) {
        await updateRoute(routeId, form);

        toast.success("Route updated successfully");
      } else {
        await createRoute(form);

        toast.success("Route created successfully");
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
          Create Route
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Route" : "Create Route"}
          </DialogTitle>

          <DialogDescription>Manage route information</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* ZONE */}

          <div className="space-y-2">
            <Label>Zone *</Label>

            <Select
              value={form.zone_id}
              onValueChange={(value) => handleChange("zone_id", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select zone" />
              </SelectTrigger>

              <SelectContent>
                {zones.map((zone) => (
                  <SelectItem key={zone.id} value={zone.id}>
                    {zone.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* NAME */}

          <div className="space-y-2">
            <Label>Route Name *</Label>

            <Input
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Route name"
            />
          </div>

          {/* DESCRIPTION */}

          <div className="space-y-2">
            <Label>Description *</Label>

            <Textarea
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={4}
              placeholder="Route description"
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
              "Update Route"
            ) : (
              "Create Route"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
