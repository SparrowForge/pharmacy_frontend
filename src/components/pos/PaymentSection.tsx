"use client";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/src/components/ui/alert";

interface PaymentMethod {
  id: string;
  name: string;
  icon?: React.ReactNode;
}

interface PaymentSectionProps {
  saleType: "credit" | "cash";
  total: number;
  paymentMethods: PaymentMethod[];
  selectedMethod: string;
  paidAmount: string;
  onMethodChange: (method: string) => void;
  onPaidAmountChange: (amount: string) => void;
  onPaymentComplete: () => void;
  isProcessing?: boolean;
}

export function PaymentSection({
  saleType,
  total,
  paymentMethods,
  selectedMethod,
  paidAmount,
  onMethodChange,
  onPaidAmountChange,
  onPaymentComplete,
  isProcessing = false,
}: PaymentSectionProps) {
  const paidAmountNum = parseFloat(paidAmount) || 0;
  const change = paidAmountNum - total;
  const isPaymentValid = 
    saleType === "credit" 
      ? selectedMethod !== "" 
      : selectedMethod !== "" && paidAmountNum >= total;

  return (
    <Card className="border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Payment Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Sale Type Info */}
        <div className="p-2 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded">
          <p className="text-xs font-semibold text-blue-900 dark:text-blue-100 capitalize">
            {saleType === "credit" ? "Credit Sale - Payment Optional" : "Cash Sale - Full Payment Required"}
          </p>
        </div>

        {/* Payment Method */}
        <div className="space-y-2">
          <Label className="text-xs">Payment Method *</Label>
          <Select value={selectedMethod} onValueChange={onMethodChange}>
            <SelectTrigger className="h-9 w-full">
              <SelectValue placeholder="Select payment method" />
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

        {/* Paid Amount - Only for cash sales */}
        {saleType === "cash" && (
          <>
            <div className="space-y-2">
              <Label className="text-xs">Amount Paid *</Label>
              <Input
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={paidAmount}
                onChange={(e) => onPaidAmountChange(e.target.value)}
                className="h-9"
              />
            </div>

            {/* Summary */}
            <div className="space-y-2 p-3 bg-muted rounded">
              <div className="flex justify-between text-sm">
                <span>Total:</span>
                <span className="font-semibold">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Paid:</span>
                <span className="font-semibold">${paidAmountNum.toFixed(2)}</span>
              </div>
              {change !== 0 && (
                <div className={`flex justify-between text-sm font-semibold ${
                  change >= 0 ? 'text-green-600' : 'text-destructive'
                }`}>
                  <span>Change:</span>
                  <span>${Math.abs(change).toFixed(2)}</span>
                </div>
              )}
            </div>

            {/* Validation Message */}
            {paidAmountNum > 0 && paidAmountNum < total && (
              <Alert className="bg-destructive/10 border-destructive/30">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-xs">
                  Insufficient payment. Require ${(total - paidAmountNum).toFixed(2)} more.
                </AlertDescription>
              </Alert>
            )}
          </>
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
          {isProcessing ? "Processing..." : "Complete Payment"}
        </Button>
      </CardContent>
    </Card>
  );
}
