"use client";

import { useCompanies } from "@/src/hooks/useCompanies";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface CustomerFormProps {
  onSuccess: (customer: any) => void;
  onCancel?: () => void;
}

export default function CustomerForm({
  onSuccess,
  onCancel,
}: CustomerFormProps) {
  const { createCompany, createLoading } = useCompanies();

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
  });

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        name: formData.name,
        phone: formData.mobile,
        company_type: "customer",
      };

        await createCompany(payload);
        onSuccess(payload);
    } catch (error) {
      console.error("Error creating customer:", error);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="customer-name">Customer Name</Label>

        <Input
          id="customer-name"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="Enter customer name"
        />
      </div>

      <div>
        <Label htmlFor="customer-mobile">Mobile No</Label>

        <Input
          id="customer-mobile"
          value={formData.mobile}
          onChange={(e) => handleChange("mobile", e.target.value)}
          placeholder="Enter mobile number"
        />
      </div>

      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}

        <Button type="button" disabled={createLoading} onClick={handleSubmit}>
          {createLoading ? "Saving..." : "Save Customer"}
        </Button>
      </div>
    </div>
  );
}
