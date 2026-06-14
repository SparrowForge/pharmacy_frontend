// components/companies/CompanyDialogueForm.tsx

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

import { useCompanies } from "@/src/hooks/useCompanies";
import { useCountries } from "@/src/hooks/useCountries";
import { useDivisions } from "@/src/hooks/useDivisions";
import { useDistricts } from "@/src/hooks/useDistricts";
import { useThanas } from "@/src/hooks/useThanas";

import { useZones } from "@/src/hooks/useZones";
import { useRoutes } from "@/src/hooks/useRoutes";
import { useLines } from "@/src/hooks/useLines";
import { useRegions } from "@/src/hooks/useRegion";
import { useEnum } from "@/src/hooks/useEnum";

export default function CompanyDialogueForm({
  companyId,
  onClose,
}: {
  companyId?: string | null;

  onClose?: () => void;
}) {
  const [open, setOpen] = useState(false);

  const {
    createCompany,
    createLoading,

    fetchSingleCompany,

    updateCompany,
    updateLoading,
  } = useCompanies();

  const { countries, fetchCountries } = useCountries();
  const { divisions, fetchDivisions } = useDivisions();
  const { districts, fetchDistricts } = useDistricts();
  const { thanas, fetchThanas } = useThanas();
  const { regions, fetchRegions } = useRegions();
  const { zones, fetchZones } = useZones();
  const { routes, fetchRoutes } = useRoutes();
  const { lines, fetchLines } = useLines();
  const { companyTypes, getCompanyTypes } = useEnum();

  useEffect(() => {
    getCompanyTypes();
  }, []);

  const initialFormState = {
    company_type: "",

    name: "",
    code: "",

    contact_person: "",

    email: "",
    phone: "",

    website: "",

    address: "",
    city: "",
    postal_code: "",

    country_id: "",
    division_id: "",
    district_id: "",
    thana_id: "",

    route_id: "",
    line_id: "",

    established_year: new Date().getFullYear(),

    credit_limit: 0,
    payment_terms: "",

    lead_time_days: 0,

    loyalty_points: 0,

    total_orders: 0,

    total_spent: 0,

    status: "active",

    notes: "",
  };

  const [form, setForm] = useState(initialFormState);

  const isEditMode = Boolean(companyId);

  useEffect(() => {
    fetchCountries();
    fetchDivisions();
    fetchDistricts();
    fetchThanas();
    fetchRegions();
    fetchZones();
    fetchRoutes();
    fetchLines();
  }, []);

  useEffect(() => {
    const loadCompany = async () => {
      if (!companyId) return;

      try {
        const res = await fetchSingleCompany(companyId);

        setForm({
          company_type: res.company_type ?? "",
          name: res.name ?? "",
          code: res.code ?? "",
          contact_person: res.contact_person ?? "",
          email: res.email ?? "",
          phone: res.phone ?? "",
          website: res.website ?? "",
          address: res.address ?? "",
          city: res.city ?? "",
          postal_code: res.postal_code ?? "",
          country_id: res.country_id ?? "",
          division_id: res.division_id ?? "",
          district_id: res.district_id ?? "",
          thana_id: res.thana_id ?? "",
          route_id: res.route_id ?? "",
          line_id: res.line_id ?? "",
          established_year: res.established_year ?? new Date().getFullYear(),
          credit_limit: res.credit_limit ?? 0,
          payment_terms: res.payment_terms ?? "",
          lead_time_days: res.lead_time_days ?? 0,
          loyalty_points: res.loyalty_points ?? 0,
          total_orders: res.total_orders ?? 0,
          total_spent: res.total_spent ?? 0,
          status: res.status ?? "active",
          notes: res.notes ?? "",
        });

        setOpen(true);
      } catch (error) {
        toast.error("Failed to load company");
      }
    };

    loadCompany();
  }, [companyId]);

  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const validate = () => {
    if (!form.company_type) return "Company type is required";
    if (!form.name) return "Company name is required";
    if (!form.phone) return "Phone is required";
    return null;
  };

  const buildPayload = (): any => {
    const payload: Record<string, any> = {};

    // Always include mandatory fields
    payload.company_type = form.company_type;
    payload.name = form.name;
    payload.phone = form.phone;

    // Include optional fields only if they have values
    if (form.code) payload.code = form.code;
    if (form.contact_person) payload.contact_person = form.contact_person;
    if (form.email) payload.email = form.email;
    if (form.website) payload.website = form.website;
    if (form.address) payload.address = form.address;
    if (form.city) payload.city = form.city;
    if (form.postal_code) payload.postal_code = form.postal_code;
    if (form.country_id) payload.country_id = form.country_id;
    if (form.division_id) payload.division_id = form.division_id;
    if (form.district_id) payload.district_id = form.district_id;
    if (form.thana_id) payload.thana_id = form.thana_id;
    if (form.route_id) payload.route_id = form.route_id;
    if (form.line_id) payload.line_id = form.line_id;
    if (form.established_year !== new Date().getFullYear()) {
      payload.established_year = form.established_year;
    }
    if (form.credit_limit > 0) payload.credit_limit = form.credit_limit;
    if (form.payment_terms) payload.payment_terms = form.payment_terms;
    if (form.lead_time_days > 0) payload.lead_time_days = form.lead_time_days;
    if (form.status !== "active") payload.status = form.status;
    if (form.notes) payload.notes = form.notes;

    return payload;
  };

  const handleSubmit = async () => {
    const error = validate();

    if (error) {
      toast.error(error);

      return;
    }

    try {
      const payload = buildPayload();
      if (isEditMode && companyId) {
        await updateCompany(companyId, payload);
        toast.success("Company updated successfully");
      } else {
        await createCompany(payload);

        // toast.success("Company created successfully");
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
          Create Company
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Company" : "Create Company"}
          </DialogTitle>

          <DialogDescription>Manage company information</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <Label>Company Type *</Label>

            <Select
              value={form.company_type}
              onValueChange={(value) => handleChange("company_type", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select company type" />
              </SelectTrigger>

              <SelectContent>
                {companyTypes?.map((type: string) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Company Name *</Label>

            <Input
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Company name"
            />
          </div>
          <div className="space-y-2">
            <Label>Code</Label>

            <Input
              value={form.code}
              onChange={(e) => handleChange("code", e.target.value)}
              placeholder="Code"
            />
          </div>
          <div className="space-y-2">
            <Label>Contact Person</Label>

            <Input
              value={form.contact_person}
              onChange={(e) => handleChange("contact_person", e.target.value)}
              placeholder="Contact person"
            />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>

            <Input
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="Email"
            />
          </div>
          <div className="space-y-2">
            <Label>Phone *</Label>

            <Input
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="Phone"
            />
          </div>
          <div className="space-y-2">
            <Label>Website</Label>

            <Input
              value={form.website}
              onChange={(e) => handleChange("website", e.target.value)}
              placeholder="Website"
            />
          </div>
          <div className="space-y-2">
            <Label>Established Year</Label>

            <Input
              type="number"
              value={form.established_year}
              onChange={(e) =>
                handleChange("established_year", Number(e.target.value))
              }
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Address</Label>

            <Textarea
              rows={2}
              value={form.address}
              onChange={(e) => handleChange("address", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>City</Label>

            <Input
              value={form.city}
              onChange={(e) => handleChange("city", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Postal Code</Label>

            <Input
              value={form.postal_code}
              onChange={(e) => handleChange("postal_code", e.target.value)}
            />
          </div>
          {/* COUNTRY */}
          <div className="space-y-2">
            <Label>Country</Label>

            <Select
              value={form.country_id}
              onValueChange={(value) => handleChange("country_id", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Country" />
              </SelectTrigger>

              <SelectContent>
                {countries.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* DIVISION */}
          <div className="space-y-2">
            <Label>Division</Label>

            <Select
              value={form.division_id}
              onValueChange={(value) => handleChange("division_id", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Division" />
              </SelectTrigger>

              <SelectContent>
                {divisions.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* DISTRICT */}
          <div className="space-y-2">
            <Label>District</Label>

            <Select
              value={form.district_id}
              onValueChange={(value) => handleChange("district_id", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select District" />
              </SelectTrigger>

              <SelectContent>
                {districts.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* THANA */}
          <div className="space-y-2">
            <Label>Thana</Label>

            <Select
              value={form.thana_id}
              onValueChange={(value) => handleChange("thana_id", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Thana" />
              </SelectTrigger>

              <SelectContent>
                {thanas.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* ROUTE */}
          <div className="space-y-2">
            <Label>Route</Label>

            <Select
              value={form.route_id}
              onValueChange={(value) => handleChange("route_id", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Route" />
              </SelectTrigger>

              <SelectContent>
                {routes.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* LINE */}
          <div className="space-y-2">
            <Label>Line</Label>

            <Select
              value={form.line_id}
              onValueChange={(value) => handleChange("line_id", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Line" />
              </SelectTrigger>

              <SelectContent>
                {lines.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Credit Limit</Label>

            <Input
              type="number"
              value={form.credit_limit}
              onChange={(e) =>
                handleChange("credit_limit", Number(e.target.value))
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Payment Terms</Label>

            <Input
              value={form.payment_terms}
              onChange={(e) => handleChange("payment_terms", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Lead Time Days</Label>

            <Input
              type="number"
              value={form.lead_time_days}
              onChange={(e) =>
                handleChange("lead_time_days", Number(e.target.value))
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Loyalty Points</Label>

            <Input
              type="number"
              value={form.loyalty_points}
              onChange={(e) =>
                handleChange("loyalty_points", Number(e.target.value))
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Total Orders</Label>

            <Input
              type="number"
              value={form.total_orders}
              onChange={(e) =>
                handleChange("total_orders", Number(e.target.value))
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Total Spent</Label>

            <Input
              type="number"
              value={form.total_spent}
              onChange={(e) =>
                handleChange("total_spent", Number(e.target.value))
              }
            />
          </div>
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
          <div className="space-y-2 md:col-span-2">
            <Label>Notes</Label>

            <Textarea
              rows={3}
              value={form.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
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
                "Update Company"
              ) : (
                "Create Company"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
