"use client";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { AlertCircle, Plus, Trash2 } from "lucide-react";
import { Alert, AlertDescription } from "@/src/components/ui/alert";
import { useState } from "react";

interface PaymentMethod {
  id: string;
  name: string;
  icon?: React.ReactNode;
}

interface PaymentEntry {
  method_id: string;
  amount: string;
}

interface PaymentSectionProps {
  saleType: "credit" | "cash";
  total: number;
  paymentMethods: PaymentMethod[];
  selectedMethods: PaymentEntry[];
  onMethodsChange: (methods: PaymentEntry[]) => void;
  onPaymentComplete: () => void;
  isProcessing?: boolean;
}

export function PaymentSection({
  saleType,
  total,
  paymentMethods,
  selectedMethods,
  onMethodsChange,
  onPaymentComplete,
  isProcessing,
}: PaymentSectionProps) {
  const [errorMessage, setErrorMessage] = useState("");
  const isFreeOrder = total <= 0;

  const totalPaid = selectedMethods.reduce(
    (sum, m) => sum + (parseFloat(m.amount) || 0),
    0,
  );
  const change = totalPaid - total;

  // Validate that at least one payment method is selected
  const hasPaymentMethod = selectedMethods.some(
    (m) => m.method_id && parseFloat(m.amount || "0") > 0,
  );

  const isPaymentValid =
    isFreeOrder ||
    (saleType === "credit"
      ? selectedMethods.some(
          (m) => m.method_id && parseFloat(m.amount || "0") >= 0,
        )
      : selectedMethods.some(
          (m) => m.method_id && parseFloat(m.amount || "0") > 0,
        ) && totalPaid >= total);

  const handleAddPaymentMethod = () => {
    onMethodsChange([...selectedMethods, { method_id: "", amount: "" }]);
    setErrorMessage("");
  };

  const handleRemovePaymentMethod = (index: number) => {
    if (selectedMethods.length === 1) {
      setErrorMessage("At least one payment method is required");
      return;
    }

    const updated = selectedMethods.filter((_, i) => i !== index);
    onMethodsChange(updated);
    setErrorMessage("");
  };

  const handleMethodChange = (index: number, methodId: string) => {
    const updated = [...selectedMethods];
    updated[index].method_id = methodId;
    onMethodsChange(updated);
  };

  const handleAmountChange = (index: number, amount: string) => {
    const updated = [...selectedMethods];
    updated[index].amount = amount;

    console.log(updated)
    onMethodsChange(updated);
  };

  return (
    <Card className="border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Payment Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Sale Type Info */}
        <div className="p-2 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded">
          <p className="text-xs font-semibold text-blue-900 dark:text-blue-100 capitalize">
            {saleType === "credit"
              ? "Credit Sale - Payment Optional"
              : "Cash Sale - Full Payment Required"}
          </p>
        </div>

        {/* Multiple Payment Methods */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label className="text-xs font-semibold">Payment Methods *</Label>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={handleAddPaymentMethod}
              className="h-7 text-xs"
            >
              <Plus className="w-3 h-3 mr-1" />
              Add Method
            </Button>
          </div>

          {errorMessage && (
            <Alert className="bg-destructive/10 border-destructive/30 py-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-xs">
                {errorMessage}
              </AlertDescription>
            </Alert>
          )}

          {selectedMethods.map((payment, index) => (
            <div
              key={index}
              className="flex gap-2 items-end p-3 bg-muted rounded border border-border"
            >
              <div className="flex-1 space-y-1">
                <Label className="text-xs">Method</Label>
                <Select
                  value={payment.method_id}
                  onValueChange={(value) => handleMethodChange(index, value)}
                >
                  <SelectTrigger className="h-8 text-sm">
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentMethods.map((method) => (
                      <SelectItem key={method.id} value={method.id}>
                        {method.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1 space-y-1">
                <Label className="text-xs">Amount</Label>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={payment.amount}
                  onChange={(e) => handleAmountChange(index, e.target.value)}
                  className="h-8 text-sm"
                />
              </div>

              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => handleRemovePaymentMethod(index)}
                className="h-8 w-8 p-0 text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>

        {/* Payment Summary */}
        <div className="space-y-2 p-3 bg-muted rounded">
          <div className="flex justify-between text-sm">
            <span>Total Amount:</span>
            <span className="font-semibold">${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Total Paid:</span>
            <span className="font-semibold">${totalPaid.toFixed(2)}</span>
          </div>
          {change !== 0 && (
            <div
              className={`flex justify-between text-sm font-semibold ${
                change >= 0 ? "text-green-600" : "text-destructive"
              }`}
            >
              <span>{change >= 0 ? "Change" : "Shortfall"}:</span>
              <span>${Math.abs(change).toFixed(2)}</span>
            </div>
          )}
        </div>

        {/* Validation Message for Cash Sales */}
        {saleType === "cash" && totalPaid > 0 && totalPaid < total && (
          <Alert className="bg-destructive/10 border-destructive/30">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-xs">
              Insufficient payment. Need ${(total - totalPaid).toFixed(2)} more.
            </AlertDescription>
          </Alert>
        )}

        {/* Credit Sale Info */}
        {saleType === "credit" && (
          <Alert className="bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-xs">
              Payment can be completed later for credit sales.
            </AlertDescription>
          </Alert>
        )}

        {/* Action Button */}
        <Button
          onClick={onPaymentComplete}
          disabled={!isPaymentValid || isProcessing}
          className="w-full h-10 font-semibold"
        >
          {isProcessing ? (
            <div className="flex items-center gap-2">
              <span className="animate-spin">⏳</span>
              Completing...
            </div>
          ) : (
            "Complete Payment"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
