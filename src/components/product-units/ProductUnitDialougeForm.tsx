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

import { Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { useProductUnits } from "@/src/hooks/useProductUnits";

export default function ProductUnitDialog({
  unitId,
  onClose,
}: {
  unitId?: string | null;
  onClose?: () => void;
}) {
  const [open, setOpen] = useState(false);

  const isEdit = Boolean(unitId);

  const {
    createUnit,
    updateUnit,
    fetchSingleUnit,
    createLoading,
    updateLoading,
  } = useProductUnits();

  const [form, setForm] = useState({
    name: "",
    short_name: "",
    description: "",
  });

  const handle = (key: string, value: any) => {
    setForm((p) => ({ ...p, [key]: value }));
  };

  /* LOAD SINGLE */
  useEffect(() => {
    if (!unitId) return;

    (async () => {
      try {
        const res = await fetchSingleUnit(unitId);

        setForm({
          name: res.name || "",
          short_name: res.short_name || "",
          description: res.description || "",
        });

        setOpen(true);
      } catch {
        toast.error("Failed to load unit");
      }
    })();
  }, [unitId]);

  const submit = async () => {
    try {
      const payload = {
        ...form,
      };

      if (isEdit && unitId) {
        await updateUnit(unitId, payload);
        toast.success("Unit updated");
      } else {
        await createUnit(payload);
        toast.success("Unit created");
      }

      setOpen(false);
      onClose?.();

      setForm({
        name: "",
        short_name: "",
        description: "",
      });
    } catch {
      toast.error("Failed to save");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Unit
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Unit" : "Create Unit"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* NAME */}
          <div>
            <Label>Name *</Label>
            <Input
              value={form.name}
              onChange={(e) => handle("name", e.target.value)}
              placeholder="Kilogram"
            />
          </div>

          {/* SHORT NAME */}
          <div>
            <Label>Short Name *</Label>
            <Input
              value={form.short_name}
              onChange={(e) => handle("short_name", e.target.value)}
              placeholder="kg"
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <Label>Description</Label>
            <Textarea
              value={form.description}
              onChange={(e) => handle("description", e.target.value)}
              placeholder="Optional description"
            />
          </div>

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
