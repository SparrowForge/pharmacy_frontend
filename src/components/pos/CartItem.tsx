"use client";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Minus, Plus, Trash2 } from "lucide-react";

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

interface CartItemProps {
  item: CartItem;
  onUpdateQty: (qty: number) => void;
  onRemove: () => void;
  maxStock: number;
}

export function CartItem({ item, onUpdateQty, onRemove, maxStock }: CartItemProps) {
  const itemSubtotal = item.sales_qty * item.unit_price;
  const itemTotal = itemSubtotal - item.discount + item.tax;

  return (
    <div className="flex gap-3 p-3 border rounded-lg bg-background hover:bg-accent/50">
      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm truncate">{item.name}</p>
        <p className="text-xs text-muted-foreground">
          ${item.unit_price.toFixed(2)} x {item.sales_qty}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-1">
        <Button
          size="icon"
          variant="ghost"
          className="h-7 w-7"
          onClick={() => onUpdateQty(Math.max(0, item.sales_qty - 1))}
        >
          <Minus className="w-3 h-3" />
        </Button>
        <Input
          type="number"
          min="0"
          max={maxStock}
          value={item.sales_qty}
          onChange={(e) => onUpdateQty(Math.min(maxStock, parseInt(e.target.value) || 0))}
          className="w-12 h-7 text-center text-xs"
        />
        <Button
          size="icon"
          variant="ghost"
          className="h-7 w-7"
          onClick={() => onUpdateQty(Math.min(maxStock, item.sales_qty + 1))}
          disabled={item.sales_qty >= maxStock}
        >
          <Plus className="w-3 h-3" />
        </Button>
      </div>

      {/* Total */}
      <div className="text-right min-w-20">
        <p className="font-semibold text-sm">${itemTotal.toFixed(2)}</p>
      </div>

      {/* Remove Button */}
      <Button
        size="icon"
        variant="ghost"
        className="h-7 w-7 text-destructive hover:text-destructive"
        onClick={onRemove}
      >
        <Trash2 className="w-3 h-3" />
      </Button>
    </div>
  );
}
