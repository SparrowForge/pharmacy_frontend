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
import { Textarea } from "@/src/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

import { Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { useProducts } from "@/src/hooks/useProducts";
import { useCompanies } from "@/src/hooks/useCompanies";
import { useProductBatches } from "@/src/hooks/useProductBatches";

const initialState = {
  product_id: "",

  batch_number: "",
  barcode: "",

  supplier_id: "",
  manufacturer_id: "",

  manufacturing_date: "",
  expiry_date: "",
  received_date: "",

  quantity_on_hand: 1,

  purchase_price: 1,
  selling_price: 1,

  status: "active",
  location_description: "",
};

export default function ProductBatchFormDialog({
  batchId,
  onClose,
}: {
  batchId?: string | null;
  onClose?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialState);

  const isEditMode = Boolean(batchId);

  const { products, fetchProducts } = useProducts();
  const { companies, fetchCompanies } = useCompanies();

  const {
    createProductBatch,
    updateProductBatch,
    fetchSingleProductBatch,
    createLoading,
    updateLoading,
  } = useProductBatches();

  /* ================= LOAD DROPDOWNS ================= */
  useEffect(() => {
    fetchProducts();
    fetchCompanies();
  }, []);

  /* ================= LOAD SINGLE ================= */
  useEffect(() => {
    const load = async () => {
      if (!batchId) return;

      try {
        const res = await fetchSingleProductBatch(batchId);

        setForm({
          product_id: res.product_id ?? "",
          batch_number: res.batch_number ?? "",
          barcode: res.barcode ?? "",
          supplier_id: res.supplier_id ?? "",
          manufacturer_id: res.manufacturer_id ?? "",

          manufacturing_date: formatDate(res.manufacturing_date),
          expiry_date: formatDate(res.expiry_date),
          received_date: formatDate(res.received_date),

          quantity_on_hand: res.quantity_on_hand ?? 0,
          purchase_price: Number(res.purchase_price) ?? 0,
          selling_price: Number(res.selling_price) ?? 0,

          status: res.status ?? "active",
          location_description: res.location_description ?? "",
        });
        setOpen(true);
      } catch {
        toast.error("Failed to load batch");
      }
    };

    load();
  }, [batchId]);

  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const formatDate = (date?: string | null) => {
    if (!date) return "";
    return date.split("T")[0]; // converts ISO → YYYY-MM-DD
  };

  const validate = () => {
    if (!form.product_id) return "Product is required";
    if (!form.batch_number) return "Batch number is required";
    if (!form.barcode) return "Barcode is required";
    if (!form.manufacturer_id) return "Manufacturer is required";
    return null;
  };

  const handleSubmit = async () => {
    const error = validate();
    if (error) return toast.error(error);

    try {
      const payload = {
        product_id: form.product_id,

        batch_number: form.batch_number,
        barcode: form.barcode,

        supplier_id: form.supplier_id,
        manufacturer_id: form.manufacturer_id,

        manufacturing_date: form.manufacturing_date,
        expiry_date: form.expiry_date,
        received_date: form.received_date,

        quantity_on_hand: Number(form.quantity_on_hand),

        purchase_price: Number(form.purchase_price),
        selling_price: Number(form.selling_price),

        status: form.status,
        location_description: form.location_description || null,
      };

      if (isEditMode && batchId) {
        await updateProductBatch(batchId, payload);
        toast.success("Batch updated successfully");
      } else {
        await createProductBatch(payload);
        toast.success("Batch created successfully");
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
        if (!val && !isEditMode) setForm(initialState);
      }}
    >
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Batch
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Product Batch" : "Create Product Batch"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4">
          {/* PRODUCT */}
          <div className="space-y-2">
            <Label>Product *</Label>
            <Select
              value={form.product_id}
              onValueChange={(v) => handleChange("product_id", v)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select product" />
              </SelectTrigger>
              <SelectContent>
                {products?.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* MANUFACTURER */}
          <div className="space-y-2">
            <Label>Manufacturer *</Label>
            <Select
              value={form.manufacturer_id}
              onValueChange={(v) => handleChange("manufacturer_id", v)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select manufacturer" />
              </SelectTrigger>
              <SelectContent>
                {companies
                  ?.filter((c) => c.company_type === "manufacturer")
                  .map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          {/* SUPPLIER */}
          <div className="space-y-2">
            <Label>Supplier</Label>
            <Select
              value={form.supplier_id}
              onValueChange={(v) => handleChange("supplier_id", v)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select supplier" />
              </SelectTrigger>
              <SelectContent>
                {companies
                  ?.filter((c) => c.company_type === "supplier")
                  .map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          {/* BATCH NUMBER */}
          <div className="space-y-2">
            <Label>Batch Number *</Label>
            <Input
              value={form.batch_number}
              onChange={(e) => handleChange("batch_number", e.target.value)}
            />
          </div>

          {/* BARCODE */}
          <div className="space-y-2">
            <Label>Barcode *</Label>
            <Input
              value={form.barcode}
              onChange={(e) => handleChange("barcode", e.target.value)}
            />
          </div>

          {/* QUANTITY */}
          <div className="space-y-2">
            <Label>Quantity</Label>
            <Input
              type="number"
              value={form.quantity_on_hand}
              onChange={(e) =>
                handleChange("quantity_on_hand", Number(e.target.value))
              }
            />
          </div>

          {/* PURCHASE */}
          <div className="space-y-2">
            <Label>Purchase Price</Label>
            <Input
              type="number"
              value={form.purchase_price}
              onChange={(e) =>
                handleChange("purchase_price", Number(e.target.value))
              }
            />
          </div>

          {/* SELLING */}
          <div className="space-y-2">
            <Label>Selling Price</Label>
            <Input
              type="number"
              value={form.selling_price}
              onChange={(e) =>
                handleChange("selling_price", Number(e.target.value))
              }
            />
          </div>

          {/* DATES */}
          <div className="space-y-2">
            <Label>Manufacturing Date</Label>
            <Input
              type="date"
              value={form.manufacturing_date}
              onChange={(e) =>
                handleChange("manufacturing_date", e.target.value)
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Expiry Date</Label>
            <Input
              type="date"
              value={form.expiry_date}
              onChange={(e) => handleChange("expiry_date", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Received Date</Label>
            <Input
              type="date"
              value={form.received_date}
              onChange={(e) => handleChange("received_date", e.target.value)}
            />
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="mt-4 space-y-2">
          <Label>Location Description</Label>
          <Textarea
            value={form.location_description}
            onChange={(e) =>
              handleChange("location_description", e.target.value)
            }
          />
        </div>

        {/* SUBMIT */}
        <div className="mt-6">
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
              "Update Batch"
            ) : (
              "Create Batch"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
