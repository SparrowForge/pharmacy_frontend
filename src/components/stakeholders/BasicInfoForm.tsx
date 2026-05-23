"use client";

import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/src/components/ui/select";

export function BasicInfoForm() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-muted-foreground uppercase">
          Basic Information
        </h4>

        <div className="space-y-2">
          <Label>Full Name *</Label>
          <Input placeholder="Enter full name" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Phone *</Label>
            <Input placeholder="+880 1XXXXXXXXX" />
          </div>

          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" placeholder="email@example.com" />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Brand</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select brand" />
          </SelectTrigger>
          <SelectContent>{/* map brands */}</SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Address</Label>
        <Textarea placeholder="Full address" rows={3} />
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-muted-foreground uppercase">
          Financial Details
        </h4>

        <div className="space-y-2">
          <Label>Credit Limit</Label>
          <Input type="number" placeholder="0.00" />
        </div>
      </div>
    </div>
  );
}
