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

import { Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { useEnum } from "@/src/hooks/useEnum";
import { useShops } from "@/src/hooks/useShops";

export default function ShopDialogueForm({
  shopId,
  onClose,
}: {
  shopId?: string | null;
  onClose?: () => void;
}) {
  const [open, setOpen] = useState(false);

  const {
    createShop,
    createLoading,
    fetchSingleShop, 
    updateShop,
    updateLoading
  } = useShops();

  const { shopPlans, getShopPlans } = useEnum();

  const initialFormState = {
    name: "",
    owner_name: "",
    owner_email: "",
    owner_phone: "",
    address: "",
    city: "",
    postal_code: "",
    plan: "",
    status: "active",
    branch_limit: 1,
  };

  const [form, setForm] = useState(initialFormState);
  const isEditMode = Boolean(shopId);

  useEffect(() => {
    getShopPlans();
  }, []);

  // ✅ LOAD SINGLE SHOP WHEN EDITING
  useEffect(() => {
    const loadShop = async () => {
      if (!shopId) return;

      try {
        const res = await fetchSingleShop(shopId);

        setForm({
          name: res.name ?? "",
          owner_name: res.owner_name ?? "",
          owner_email: res.owner_email ?? "",
          owner_phone: res.owner_phone ?? "",
          address: res.address ?? "",
          city: res.city ?? "",
          postal_code: res.postal_code ?? "",
          plan: res.plan ?? "",
          status: res.status ?? "active",
          branch_limit: res.branch_limit ?? 1,
        });

        setOpen(true);
      } catch (err) {
        toast.error("Failed to load shop data");
      }
    };

    loadShop();
  }, [shopId]);

  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const validate = () => {
    if (!form.name) return "Shop name is required";
    if (!form.owner_name) return "Owner name is required";
    if (!form.owner_email) return "Email is required";
    if (!form.owner_phone) return "Phone is required";
    if (!form.plan) return "Plan is required";
    return null;
  };

  // ✅ CREATE + UPDATE HANDLER
  const handleSubmit = async () => {
    const error = validate();
    if (error) return toast.error(error);

    try {
      const payload = {
        ...form,
        plan: form.plan as "starter" | "business" | "enterprise",
        country_id: null,
        division_id: null,
        district_id: null,
        thana_id: null,
        route_id: null,
        line_id: null,
      };

      if (isEditMode && shopId) {
        await updateShop(shopId, payload);
        toast.success("Shop updated successfully");
      } else {
        await createShop(payload);
        toast.success("Shop created successfully");
      }

      setForm(initialFormState);
      setOpen(false);
      onClose?.();
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        setOpen(val);

        // reset ONLY when closing manually in create mode
        if (!val && !isEditMode) {
          setForm(initialFormState);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Create Shop
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Shop" : "Create New Shop"}
          </DialogTitle>
          <DialogDescription>
            Set up a new pharmacy in the system
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* SHOP NAME */}
          <div className="space-y-2">
            <Label>Shop Name *</Label>
            <Input
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Pharmacy name"
            />
          </div>

          {/* OWNER */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Owner Name *</Label>
              <Input
                value={form.owner_name}
                onChange={(e) => handleChange("owner_name", e.target.value)}
                placeholder="Owner full name"
              />
            </div>

            <div className="space-y-2">
              <Label>Email *</Label>
              <Input
                value={form.owner_email}
                onChange={(e) => handleChange("owner_email", e.target.value)}
                type="email"
                placeholder="owner@email.com"
              />
            </div>
          </div>

          {/* PHONE */}
          <div className="space-y-2">
            <Label>Phone *</Label>
            <Input
              value={form.owner_phone}
              onChange={(e) => handleChange("owner_phone", e.target.value)}
              placeholder="+1 555-0000"
            />
          </div>

          {/* ADDRESS */}
          <div className="space-y-2">
            <Label>Address</Label>
            <Textarea
              value={form.address}
              onChange={(e) => handleChange("address", e.target.value)}
              rows={2}
              placeholder="Full address"
            />
          </div>

          {/* CITY + POSTAL */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>City</Label>
              <Input
                value={form.city}
                onChange={(e) => handleChange("city", e.target.value)}
                placeholder="City"
              />
            </div>

            <div className="space-y-2">
              <Label>Postal Code</Label>
              <Input
                value={form.postal_code}
                onChange={(e) => handleChange("postal_code", e.target.value)}
                placeholder="12345"
              />
            </div>
          </div>

          {/* PLAN */}
          <div className="space-y-2">
            <Label>Subscription Plan *</Label>

            <Select
              value={form.plan}
              onValueChange={(value) => handleChange("plan", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select plan" />
              </SelectTrigger>

              <SelectContent>
                {shopPlans.map((plan) => (
                  <SelectItem key={plan} value={plan}>
                    {plan}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* BRANCH LIMIT */}
          <div className="space-y-2">
            <Label>Branch Limit</Label>
            <Input
              type="number"
              min={1}
              value={form.branch_limit}
              onChange={(e) =>
                handleChange("branch_limit", Number(e.target.value))
              }
            />
          </div>

          {/* STATUS */}
          <div className="space-y-2">
            <Label>Status</Label>

            <Select
              value={form.status}
              onValueChange={(value) => handleChange("status", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
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
              "Update Shop"
            ) : (
              "Create Shop"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}