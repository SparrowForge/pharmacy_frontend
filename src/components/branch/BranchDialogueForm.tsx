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

import { useBranches } from "@/src/hooks/useBranches";
import { useShops } from "@/src/hooks/useShops";

export default function BranchDialogueForm({
  branchId,
  onClose,
}: {
  branchId?: string | null;
  onClose?: () => void;
}) {
  const [open, setOpen] = useState(false);

  const {
    createBranch,
    updateBranch,
    getSingleBranch,

    createLoading,
    updateLoading,
  } = useBranches();

  const { fetchShops, shops } = useShops();
  const isEditMode = Boolean(branchId);
  const initialFormState = {
    shop_id: "",
      
    name: "",

    address: "",
    city: "",
    postal_code: "",

    country_id: "",
    division_id: "",
    district_id: "",
    thana_id: "",

    route_id: "",
    line_id: "",

    email: "",
    phone: "",

    status: "active",
  };

  const [form, setForm] = useState(initialFormState);

  /* LOAD SHOPS */
  useEffect(() => {
    fetchShops({
      page: 1,
      limit: 100,
    });
  }, [fetchShops]);

  /* LOAD SINGLE BRANCH */
  useEffect(() => {
    const loadBranch = async () => {
      if (!branchId) return;

      try {
        const res = await getSingleBranch(branchId);

        setForm({
          shop_id: res.shop_id ?? "",

          name: res.name ?? "",

          address: res.address ?? "",
          city: res.city ?? "",
          postal_code: res.postal_code ?? "",

          country_id: res.country_id ?? "",
          division_id: res.division_id ?? "",
          district_id: res.district_id ?? "",
          thana_id: res.thana_id ?? "",

          route_id: res.route_id ?? "",
          line_id: res.line_id ?? "",

          email: res.email ?? "",
          phone: res.phone ?? "",

          status: res.status ?? "active",
        });

        setOpen(true);
      } catch (error) {
        toast.error("Failed to load branch");
      }
    };

    loadBranch();
  }, [branchId]);

  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const validate = () => {
    if (!form.shop_id) return "Shop is required";
    if (!form.name) return "Branch name is required";
    if (!form.email) return "Email is required";
    if (!form.phone) return "Phone is required";

    return null;
  };

  /* SUBMIT */
  const handleSubmit = async () => {
    const error = validate();

    if (error) {
      return toast.error(error);
    }

    try {
      const payload = {
        shop_id: form.shop_id,

        name: form.name,

        address: form.address,
        city: form.city,
        postal_code: form.postal_code,

        country_id: form.country_id || null,
        division_id: form.division_id || null,
        district_id: form.district_id || null,
        thana_id: form.thana_id || null,

        route_id: form.route_id || null,
        line_id: form.line_id || null,

        email: form.email,
        phone: form.phone,

        status: form.status,
      };

      if (isEditMode && branchId) {
        await updateBranch(branchId, payload);

        toast.success("Branch updated successfully");
      } else {
        await createBranch(payload);

        toast.success("Branch created successfully");
      }

      setForm(initialFormState);

      setOpen(false);

      onClose?.();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const loading =
  isEditMode ? updateLoading : createLoading;

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
      {!isEditMode && (
        <DialogTrigger asChild>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Create Branch
          </Button>
        </DialogTrigger>
      )}

      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Branch" : "Create New Branch"}
          </DialogTitle>

          <DialogDescription>
            Manage pharmacy branch information
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* SHOP */}
          <div className="space-y-2">
            <Label>Shop *</Label>

            <Select
              value={form.shop_id}
              onValueChange={(value) => handleChange("shop_id", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select shop" />
              </SelectTrigger>

              <SelectContent>
                {shops?.map((shop) => (
                  <SelectItem key={shop.id} value={shop.id}>
                    {shop.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* BRANCH NAME */}
          <div className="space-y-2">
            <Label>Branch Name *</Label>

            <Input
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Branch name"
            />
          </div>

          {/* EMAIL + PHONE */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Email *</Label>

              <Input
                type="email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="branch@email.com"
              />
            </div>

            <div className="space-y-2">
              <Label>Phone *</Label>

              <Input
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="+880..."
              />
            </div>
          </div>

          {/* ADDRESS */}
          <div className="space-y-2">
            <Label>Address</Label>

            <Textarea
              value={form.address}
              onChange={(e) => handleChange("address", e.target.value)}
              placeholder="Full address"
              rows={2}
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
                placeholder="1200"
              />
            </div>
          </div>

          {/* COUNTRY + DIVISION */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Country</Label>

              <Input
                value={form.country_id}
                onChange={(e) => handleChange("country_id", e.target.value)}
                placeholder="Country"
              />
            </div>

            <div className="space-y-2">
              <Label>Division</Label>

              <Input
                value={form.division_id}
                onChange={(e) => handleChange("division_id", e.target.value)}
                placeholder="Division"
              />
            </div>
          </div>

          {/* DISTRICT + THANA */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>District</Label>

              <Input
                value={form.district_id}
                onChange={(e) => handleChange("district_id", e.target.value)}
                placeholder="District"
              />
            </div>

            <div className="space-y-2">
              <Label>Thana</Label>

              <Input
                value={form.thana_id}
                onChange={(e) => handleChange("thana_id", e.target.value)}
                placeholder="Thana"
              />
            </div>
          </div>

          {/* ROUTE + LINE */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Route</Label>

              <Input
                value={form.route_id}
                onChange={(e) => handleChange("route_id", e.target.value)}
                placeholder="Route"
              />
            </div>

            <div className="space-y-2">
              <Label>Line</Label>

              <Input
                value={form.line_id}
                onChange={(e) => handleChange("line_id", e.target.value)}
                placeholder="Line"
              />
            </div>
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

                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* SUBMIT */}
          <Button
            onClick={handleSubmit}
            className="w-full bg-primary hover:bg-primary/90"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />

                {isEditMode
                  ? "Updating..."
                  : "Creating..."}
              </>
            ) : isEditMode ? (
              "Update Branch"
            ) : (
              "Create Branch"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
