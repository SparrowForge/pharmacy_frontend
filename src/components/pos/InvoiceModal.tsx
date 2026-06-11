"use client";

import { Dialog, DialogContent } from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

interface InvoiceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoice?: any;
}

export function InvoiceModal({
  open,
  onOpenChange,
  invoice,
}: InvoiceModalProps) {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `Invoice-${invoice?.invoice_number}`,
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Printable Area */}
        <div ref={printRef} className="bg-white p-6 text-black">
          <div className="text-center border-b pb-4">
            <h2 className="text-xl font-bold">Medicine Shop</h2>
            <p>Sales Invoice</p>
          </div>

          <div className="mt-4 flex justify-between">
            <div>
              <p>Invoice: {invoice?.invoice_number}</p>
              <p>Date: {new Date(invoice?.invoice_date).toLocaleString()}</p>
            </div>

            <div>
              <p>Customer: {invoice?.customer_name}</p>
              <p>Sale Type: {invoice?.sale_type}</p>
            </div>
          </div>

          <table className="w-full mt-6 border">
            <thead>
              <tr className="border-b">
                <th className="p-2">Product</th>
                <th className="p-2">Qty</th>
                <th className="p-2">Unit Price</th>
                <th className="p-2">Total</th>
              </tr>
            </thead>

            <tbody>
              {invoice?.length > 0 &&
                invoice?.items.map((item: any) => (
                  <tr key={item.id} className="border-b">
                    <td className="p-2">{item.product_name}</td>
                    <td className="p-2">{item.quantity}</td>
                    <td className="p-2">{item.unit_price}</td>
                    <td className="p-2">{item.line_total}</td>
                  </tr>
                ))}
            </tbody>
          </table>

          <div className="mt-6 flex justify-end">
            <div className="w-64">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{invoice?.subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Discount</span>
                <span>{invoice?.discount_amount}</span>
              </div>

              <div className="flex justify-between">
                <span>Tax</span>
                <span>{invoice?.tax_amount}</span>
              </div>

              <div className="flex justify-between font-bold border-t pt-2">
                <span>Total</span>
                <span>{invoice?.total_amount}</span>
              </div>

              <div className="flex justify-between">
                <span>Paid</span>
                <span>{invoice?.paid_amount}</span>
              </div>

              <div className="flex justify-between">
                <span>Due</span>
                <span>{invoice?.due_amount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>

          <Button onClick={handlePrint}>Print Invoice</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
