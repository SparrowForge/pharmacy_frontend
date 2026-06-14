"use client";

import { useEffect, useState } from "react";

import { useCompanies } from "@/src/hooks/useCompanies";

import { useCountries } from "@/src/hooks/useCountries";
import { useDivisions } from "@/src/hooks/useDivisions";
import { useDistricts } from "@/src/hooks/useDistricts";
import { useThanas } from "@/src/hooks/useThanas";

import { useRoutes } from "@/src/hooks/useRoutes";
import { useLines } from "@/src/hooks/useLines";

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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";

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
import Loading from "../common/Loading";

export default function ShopDialogueForm({
  shopId,
  onClose,
}: {
  shopId?: string | null;
  onClose?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const { companies, fetchCompanies } = useCompanies();
  const { countries, fetchCountries } = useCountries();
  const { divisions, fetchDivisions } = useDivisions();
  const { districts, fetchDistricts } = useDistricts();
  const { thanas, fetchThanas } = useThanas();
  const { routes, fetchRoutes } = useRoutes();
  const { lines, fetchLines } = useLines();
  const {
    createShop,
    createLoading,
    fetchSingleShop,
    singleShopLoading,
    updateShop,
    updateLoading,
  } = useShops();
  const { shopPlans, getShopPlans } = useEnum();
  const initialFormState = {
    company_id: "",

    name: "",

    owner_name: "",
    owner_email: "",
    owner_phone: "",

    address: "",
    city: "",
    postal_code: "",

    country_id: "",
    division_id: "",
    district_id: "",
    thana_id: "",

    route_id: "",
    line_id: "",

    plan: "",
    status: "active",

    branch_limit: 1,
  };
  const [form, setForm] = useState(initialFormState);
  const isEditMode = Boolean(shopId);
  useEffect(() => {
    getShopPlans();
  }, []);

  useEffect(() => {
    fetchCompanies();
    fetchCountries();
    fetchDivisions();
    fetchDistricts();
    fetchThanas();
    fetchRoutes();
    fetchLines();
  }, []);

  // LOAD SINGLE SHOP WHEN EDITING
  useEffect(() => {
    const loadShop = async () => {
      if (!shopId) return;
      try {
        const res = await fetchSingleShop(shopId);
        setForm({
          company_id: res.company_id ?? "",
          name: res.name ?? "",
          owner_name: res.owner_name ?? "",
          owner_email: res.owner_email ?? "",
          owner_phone: res.owner_phone ?? "",
          address: res.address ?? "",
          city: res.city ?? "",
          postal_code: res.postal_code ?? "",
          country_id: res.country_id ?? "",
          division_id: res.division_id ?? "",
          district_id: res.district_id ?? "",
          thana_id: res.thana_id ?? "",
          route_id: res.route_id ?? "",
          line_id: res.line_id ?? "",
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
    if (!form.company_id) return "Company is required";

    return null;
  };

  const handleSubmit = async () => {
    const error = validate();
    if (error) return toast.error(error);
    try {
      const payload = {
        company_id: form.company_id,
        name: form.name,
        owner_name: form.owner_name,
        owner_email: form.owner_email,
        owner_phone: form.owner_phone,
        address: form.address,
        city: form.city,
        postal_code: form.postal_code,
        country_id: form.country_id || null,
        division_id: form.division_id || null,
        district_id: form.district_id || null,
        thana_id: form.thana_id || null,
        route_id: form.route_id || null,
        line_id: form.line_id || null,
        plan: form.plan as "starter" | "business" | "enterprise",
        status: form.status,
        branch_limit: Number(form.branch_limit),
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

  if (singleShopLoading) {
    return <Loading text="Loading Shop Data..." />;
  }

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
          Create Shop
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Shop" : "Create New Shop"}
          </DialogTitle>

          <DialogDescription>
            Set up a new pharmacy in the system
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="basic" className="w-full overflow-hidden">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="location">Location</TabsTrigger>
            <TabsTrigger value="route">Route</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <div className="max-h-[65vh] overflow-y-auto pr-2 mt-4">
            {/* BASIC TAB */}
            <TabsContent value="basic" className="space-y-4">
              {/* COMPANY */}
              <div className="space-y-2">
                <Label>Company *</Label>

                <Select
                  value={form.company_id}
                  onValueChange={(value) => handleChange("company_id", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select company" />
                  </SelectTrigger>

                  <SelectContent>
                    {companies.map((company) => (
                      <SelectItem key={company.id} value={company.id}>
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

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
                    onChange={(e) =>
                      handleChange("owner_email", e.target.value)
                    }
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
            </TabsContent>

            {/* LOCATION TAB */}
            <TabsContent value="location" className="space-y-4">
              {/* ADDRESS */}
              <div className="space-y-2">
                <Label>Address</Label>

                <Textarea
                  value={form.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  rows={3}
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
                    onChange={(e) =>
                      handleChange("postal_code", e.target.value)
                    }
                    placeholder="12345"
                  />
                </div>
              </div>

              {/* COUNTRY + DIVISION */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Country</Label>

                  <Select
                    value={form.country_id}
                    onValueChange={(value) => handleChange("country_id", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>

                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.id} value={country.id}>
                          {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Division</Label>

                  <Select
                    value={form.division_id}
                    onValueChange={(value) =>
                      handleChange("division_id", value)
                    }
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
              </div>

              {/* DISTRICT + THANA */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>District</Label>

                  <Select
                    value={form.district_id}
                    onValueChange={(value) =>
                      handleChange("district_id", value)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select district" />
                    </SelectTrigger>

                    <SelectContent>
                      {districts.map((district) => (
                        <SelectItem key={district.id} value={district.id}>
                          {district.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Thana</Label>

                  <Select
                    value={form.thana_id}
                    onValueChange={(value) => handleChange("thana_id", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select thana" />
                    </SelectTrigger>

                    <SelectContent>
                      {thanas.map((thana) => (
                        <SelectItem key={thana.id} value={thana.id}>
                          {thana.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            {/* ROUTE TAB */}
            <TabsContent value="route" className="space-y-4">
              {/* ROUTE + LINE */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Route</Label>

                  <Select
                    value={form.route_id}
                    onValueChange={(value) => handleChange("route_id", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select route" />
                    </SelectTrigger>

                    <SelectContent>
                      {routes.map((route) => (
                        <SelectItem key={route.id} value={route.id}>
                          {route.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Line</Label>

                  <Select
                    value={form.line_id}
                    onValueChange={(value) => handleChange("line_id", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select line" />
                    </SelectTrigger>

                    <SelectContent>
                      {lines.map((line) => (
                        <SelectItem key={line.id} value={line.id}>
                          {line.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            {/* SETTINGS TAB */}
            <TabsContent value="settings" className="space-y-4">
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
            </TabsContent>
          </div>

          {/* SUBMIT BUTTON */}
          <div className="pt-4 border-t mt-4">
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
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
