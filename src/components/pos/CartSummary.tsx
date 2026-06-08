"use client";

import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import { AlertCircle, Trash2 } from "lucide-react";
import { Alert, AlertDescription } from "@/src/components/ui/alert";
import { CartItem } from "./CartItem";

interface CartItem {
  product_id: string;
  name: string;
  product_batch_id?: string;
  sales_unit_id: string;
  sales_qty: number;
  unit_price: number;
  discount: number;
  tax: number;
}

interface CartSummaryProps {
  cart: CartItem[];
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  total: number;
  onUpdateItem: (productId: string, qty: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  maxStock?: { [key: string]: number };
}

export function CartSummary({
  cart,
  subtotal,
  discountAmount,
  taxAmount,
  total,
  onUpdateItem,
  onRemoveItem,
  onClearCart,
  maxStock = {},
}: CartSummaryProps) {
  return (
    <Card className="border-border flex flex-col h-full">
      <CardHeader className="pb-3 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Cart ({cart.length})</CardTitle>
          {cart.length > 0 && (
            <Button
              size="sm"
              variant="ghost"
              className="text-destructive hover:text-destructive"
              onClick={onClearCart}
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col min-h-0 p-0">
        {cart.length === 0 ? (
          <div className="flex-1 flex items-center justify-center mx-3">
            <Alert className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-xs">
                No items in cart. Add products to get started.
              </AlertDescription>
            </Alert>
          </div>
        ) : (
          <>
            {/* Items List */}
            <ScrollArea className="flex-1 w-full border-b">
              <div className="p-3 space-y-2">
                {cart.map((item) => (
                  <CartItem
                    key={item.product_id}
                    item={item}
                    onUpdateQty={(qty) => onUpdateItem(item.product_id, qty)}
                    onRemove={() => onRemoveItem(item.product_id)}
                    maxStock={maxStock[item.product_id] || 999}
                  />
                ))}
              </div>
            </ScrollArea>

            {/* Summary Section */}
            <div className="p-3 space-y-2 border-t bg-muted/30">
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount:</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                {taxAmount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax:</span>
                    <span>${taxAmount.toFixed(2)}</span>
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="flex justify-between text-base font-bold pt-2 border-t">
                <span>Total:</span>
                <span className="text-lg">${total.toFixed(2)}</span>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
