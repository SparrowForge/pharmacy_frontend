"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import ReturnItemsTable from "./ReturnItemsTable";
import { useEnum } from "@/src/hooks/useEnum";
import { useProductUnits } from "@/src/hooks/useProductUnits";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/src/components/ui/select";
import { useSalesReturns } from "@/src/hooks/useSalesReturns";

interface InvoiceItem {
  id: string;
  sales_invoice_id: string;
  product_name: string;
  sales_unit_id: string;
  sales_unit_name: string;
  unit_price: string;
  quantity: number;
  [key: string]: any;
}

interface SalesReturnFormProps {
  invoiceData: {
    id: string;
    invoice_number: string;
    items: InvoiceItem[];
    [key: string]: any;
  };
}

interface ReturnItem {
  sales_invoice_item_id: string;
  return_unit_id: string;
  return_qty: number;
  unit_price: number;
  reason: string;
}

export default function SalesReturnForm({ invoiceData }: SalesReturnFormProps) {
  const router = useRouter();

  const [status, setStatus] = useState("pending");
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");
  const [returnItems, setReturnItems] = useState<ReturnItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const { fetchReturnStatuses, returnStatuses } = useEnum();
  const { fetchProductUnits, units } = useProductUnits();
  const { createSalesReturn, createLoading } = useSalesReturns();

  useEffect(() => {
    fetchReturnStatuses();
    fetchProductUnits();
  }, []);

  useEffect(() => {
    if (!invoiceData?.items) return;

    const items = invoiceData.items.map((item: InvoiceItem) => ({
      sales_invoice_item_id: item.id,
      return_unit_id: item.sales_unit_id,
      return_qty: 0,
      unit_price: Number(item.unit_price),
      reason: "",
    }));

    setReturnItems(items);
    setLoading(false);
  }, [invoiceData]);

  const handleItemChange = (index: number, field: string, value: any) => {
    const updated = [...returnItems];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    setReturnItems(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validItems = returnItems.filter((item) => item.return_qty > 0);

    if (!validItems.length) {
      setError("Please add at least one item to return");
      return;
    }

    const payload = {
      sales_invoice_id: invoiceData.id,
      return_number: "",
      status,
      reason,
      notes,
      return_date: new Date().toISOString().split("T")[0],
      items: validItems,
    };

    await createSalesReturn(payload);
    router.push("/dashboard/sales-returns")
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <p>Loading form data...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Return Information</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* ✅ SHADCN SELECT */}
          <div>
            <label className="block text-sm font-medium mb-2">Status</label>

            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>

              <SelectContent>
                {(returnStatuses || []).map((s: any, i: number) => (
                  <SelectItem key={i} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Reason */}
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Reason"
            className="w-full px-3 py-2 border rounded-lg"
          />

          {/* Notes */}
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Notes"
            className="w-full px-3 py-2 border rounded-lg"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Return Items</CardTitle>
        </CardHeader>

        <CardContent>
          <ReturnItemsTable
            invoiceItems={invoiceData.items}
            returnItems={returnItems}
            productUnits={units || []}
            onItemChange={handleItemChange}
          />
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button type="submit" disabled={createLoading}>
          {createLoading ? "Creating..." : "Create Return"}
        </Button>

        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
