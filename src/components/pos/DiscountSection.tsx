"use client";

import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Card, CardContent } from "@/src/components/ui/card";
import { Check, X } from "lucide-react";
import { toast } from "sonner";
import { IDiscountCode } from "@/src/types/discountCode.types";

interface DiscountSectionProps {
  subtotal: number;
  onApplyDiscount: (discountData: {
    code: string;
    type: "percentage" | "fixed";
    value: number;
    amount: number;
  }) => void;
  onClearDiscount: () => void;
  currentDiscount?: {
    code: string;
    value: number;
    amount: number;
  } | null;
}

export function DiscountSection({
  subtotal,
  onApplyDiscount,
  onClearDiscount,
  currentDiscount,
}: DiscountSectionProps) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [validatedCode, setValidatedCode] = useState<IDiscountCode | null>(
    null,
  );

  const handleApplyDiscount = async () => {
    if (!code.trim()) {
      toast.error("Please enter a discount code");
      return;
    }

    setLoading(true);
    try {
      // API call to fetch discount code
      const response = await fetch(`/api/discount-codes?q=${code}`);
      const data = await response.json();

      console.log("[v0] Discount API Response:", data);

      if (!data.data || data.data.length === 0) {
        toast.error("Invalid discount code");
        setLoading(false);
        return;
      }

      const discountCode = data.data[0];

      // Validate discount code
      if (!discountCode.is_active) {
        toast.error("This discount code is inactive");
        setLoading(false);
        return;
      }

      const now = new Date();
      const validFrom = new Date(discountCode.valid_from);
      const validUntil = new Date(discountCode.valid_until);

      if (now < validFrom || now > validUntil) {
        toast.error("This discount code has expired");
        setLoading(false);
        return;
      }

      if (discountCode.usage_count >= discountCode.max_usage) {
        toast.error("This discount code has reached its usage limit");
        setLoading(false);
        return;
      }

      if (subtotal < parseFloat(discountCode.min_purchase_amount)) {
        toast.error(
          `Minimum purchase amount of $${discountCode.min_purchase_amount} required`,
        );
        setLoading(false);
        return;
      }

      // Calculate discount amount
      let discountAmount = 0;
      if (discountCode.phar_discount_type === "percentage") {
        discountAmount =
          (subtotal * parseFloat(discountCode.discount_value)) / 100;
      } else {
        discountAmount = parseFloat(discountCode.discount_value);
      }

      setValidatedCode(discountCode);
      onApplyDiscount({
        code: discountCode.code,
        type: discountCode.phar_discount_type,
        value: parseFloat(discountCode.discount_value),
        amount: discountAmount,
      });

      toast.success(`Discount applied: ${discountCode.code}`);
    } catch (error) {
      console.error("[v0] Error applying discount:", error);
      toast.error("Failed to apply discount code");
    } finally {
      setLoading(false);
    }
  };

  const handleClearDiscount = () => {
    setCode("");
    setValidatedCode(null);
    onClearDiscount();
    toast.success("Discount removed");
  };

  return (
    <Card className="border-border">
      <CardContent className="p-4 space-y-3">
        <Label className="text-xs font-semibold">Discount Code</Label>

        {validatedCode ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <div>
                  <p className="font-semibold text-sm">{validatedCode.code}</p>
                  <p className="text-xs text-muted-foreground">
                    {validatedCode.phar_discount_type === "percentage"
                      ? `${validatedCode.discount_value}% off`
                      : `$${validatedCode.discount_value} off`}
                  </p>
                </div>
              </div>
              <Button
                size="icon"
                variant="ghost"
                className="h-6 w-6"
                onClick={handleClearDiscount}
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex gap-2">
            <Input
              placeholder="Enter code..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="h-9 text-sm"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleApplyDiscount();
                }
              }}
              disabled={loading}
            />
            <Button
              size="sm"
              onClick={handleApplyDiscount}
              disabled={loading || !code.trim()}
              className="h-9"
            >
              {loading ? "..." : "Apply"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
