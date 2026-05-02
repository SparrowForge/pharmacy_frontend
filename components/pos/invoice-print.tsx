"use client"

import React from "react"

interface InvoiceItem {
  id: number
  name: string
  quantity: number
  unit: string
  price: number
}

interface InvoicePrintProps {
  invoiceNumber: string
  date: string
  customerName: string
  items: InvoiceItem[]
  subtotal: number
  discount: number
  discountType: "percentage" | "fixed"
  total: number
  paymentMethod: string
  paidAmount: number
  change: number
}

export const InvoicePrint = React.forwardRef<HTMLDivElement, InvoicePrintProps>(
  (
    {
      invoiceNumber,
      date,
      customerName,
      items,
      subtotal,
      discount,
      discountType,
      total,
      paymentMethod,
      paidAmount,
      change,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className="bg-white p-8 print:p-0"
        style={{
          maxWidth: "80mm",
          margin: "0 auto",
          fontFamily: "monospace",
          fontSize: "12px",
          lineHeight: "1.5",
        }}
      >
        {/* Header */}
        <div className="text-center border-b pb-3 mb-3">
          <h1 className="text-lg font-bold">PharmaSmart</h1>
          <p className="text-xs text-gray-600">Pharmacy Management System</p>
          <p className="text-xs text-gray-600">Invoice Receipt</p>
        </div>

        {/* Invoice Number and Date */}
        <div className="mb-3 text-xs">
          <div className="flex justify-between">
            <span>Invoice:</span>
            <span className="font-semibold">{invoiceNumber}</span>
          </div>
          <div className="flex justify-between">
            <span>Date:</span>
            <span>{new Date(date).toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Customer:</span>
            <span className="font-semibold">{customerName || "Walk-in"}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-b mb-3"></div>

        {/* Items */}
        <div className="mb-3 text-xs">
          <div className="grid grid-cols-12 gap-1 font-semibold mb-2 pb-2 border-b">
            <div className="col-span-5">Item</div>
            <div className="col-span-2 text-right">Qty</div>
            <div className="col-span-2 text-right">Price</div>
            <div className="col-span-3 text-right">Total</div>
          </div>

          {items.map((item) => (
            <div key={item.id} className="grid grid-cols-12 gap-1 mb-2">
              <div className="col-span-5">
                <div className="font-semibold">{item.name}</div>
                <div className="text-gray-600 text-xs">{item.unit}</div>
              </div>
              <div className="col-span-2 text-right">{item.quantity}</div>
              <div className="col-span-2 text-right">${item.price.toFixed(2)}</div>
              <div className="col-span-3 text-right font-semibold">
                ${(item.quantity * item.price).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-b mb-3"></div>

        {/* Totals */}
        <div className="mb-3 text-xs space-y-1">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>
                Discount ({discountType === "percentage" ? `${discount}%` : `$${discount.toFixed(2)}`}):
              </span>
              <span>-${((discountType === "percentage" ? (subtotal * discount) / 100 : discount) || 0).toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between font-semibold text-sm pt-2 border-t">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment Details */}
        <div className="mb-3 text-xs border-b pb-3">
          <div className="flex justify-between">
            <span>Payment Method:</span>
            <span className="capitalize">{paymentMethod}</span>
          </div>
          <div className="flex justify-between">
            <span>Amount Paid:</span>
            <span>${paidAmount.toFixed(2)}</span>
          </div>
          {change > 0 && (
            <div className="flex justify-between font-semibold text-green-600">
              <span>Change:</span>
              <span>${change.toFixed(2)}</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-600 space-y-2">
          <p>Thank you for your purchase!</p>
          <p>Please keep this receipt for your records</p>
          <p className="text-xs pt-2 border-t">PharmaSmart © 2025</p>
        </div>

        {/* QR Code Placeholder */}
        <div className="text-center mt-4 pt-4 border-t">
          <div className="text-xs text-gray-600">QR Code</div>
          <div className="w-20 h-20 mx-auto bg-gray-100 flex items-center justify-center text-xs">
            [QR]
          </div>
        </div>

        {/* Print Styles */}
        <style>{`
          @media print {
            body {
              margin: 0;
              padding: 0;
            }
            .bg-white {
              background: white !important;
              padding: 0 !important;
            }
            * {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
          }
        `}</style>
      </div>
    )
  }
)

InvoicePrint.displayName = "InvoicePrint"
