"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const PricingPage = () => {
  const [badges, setBadges] = useState<string[]>([]);
  const [badgeInput, setBadgeInput] = useState("");

  const addBadge = () => {
    const value = badgeInput.trim();
    if (!value) return;
    setBadges((prev) => [...prev, value]);
    setBadgeInput("");
  };

  const removeBadge = (value: string) => {
    setBadges((prev) => prev.filter((b) => b !== value));
  };

  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-lg">Stock & Pricing Management</CardTitle>
        <CardDescription>
          Manage inventory levels, batch details, and pricing strategy
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* STOCK SECTION */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Stock Information
          </h3>

          <div className="grid sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Batch Number *</Label>
              <Input placeholder="e.g. B2024-001" />
            </div>

            <div className="space-y-2">
              <Label>Expiry Date *</Label>
              <Input type="date" />
            </div>

            <div className="space-y-2">
              <Label>Initial Stock *</Label>
              <Input type="number" min="0" placeholder="0" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Minimum Stock Level</Label>
              <Input type="number" min="0" placeholder="e.g. 50" />
            </div>

            <div className="space-y-2">
              <Label>Maximum Stock Level</Label>
              <Input type="number" min="0" placeholder="e.g. 500" />
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t" />

        {/* PRICING SECTION */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Pricing Details
          </h3>

          <div className="grid sm:grid-cols-4 gap-4">
            {[
              { id: "purchase", label: "Purchase Price *" },
              { id: "mrp", label: "MRP *" },
              { id: "selling", label: "Selling Price *" },
              { id: "offered", label: "Offered Price" },
            ].map((field) => (
              <div key={field.id} className="space-y-2">
                <Label>{field.label}</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    $
                  </span>
                  <Input
                    type="number"
                    step="0.01"
                    className="pl-7"
                    placeholder="0.00"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t" />

        {/* BADGES SECTION */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Product Labels
          </h3>

          <div className="flex gap-2">
            <Input
              value={badgeInput}
              onChange={(e) => setBadgeInput(e.target.value)}
              placeholder="Add label (e.g. New, Sale, Popular)"
              onKeyDown={(e) => e.key === "Enter" && addBadge()}
            />

            <Button type="button" variant="outline" onClick={addBadge}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {badges.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {badges.map((badge) => (
                <Badge
                  key={badge}
                  className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary border border-primary/20"
                >
                  {badge}
                  <button onClick={() => removeBadge(badge)}>
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PricingPage;