"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import {
  ISinglePurchaseReceiptItem,
  ISinglePurchaseReceiptResponse,
} from "@/src/types/purchaseOrderReceive.types";
import { usePurchaseOrderReceive } from "@/src/hooks/usePurchaseOrderReceive";
import Loading from "../common/Loading";
import {
  Download,
  FileText,
  Calendar,
  User,
  Package,
  DollarSign,
  Check,
} from "lucide-react";

interface PurchaseReceiptViewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  receipt: ISinglePurchaseReceiptResponse | null;
}

export default function PurchaseReceiptViewModal({
  open,
  onOpenChange,
  receipt,
}: PurchaseReceiptViewModalProps) {
  if (!receipt) return null;

  const { singlePurchaseReceiveOrderLoading } = usePurchaseOrderReceive();

  if (singlePurchaseReceiveOrderLoading) {
    return <Loading text="Loading receipt details..." />;
  }

  const handlePrint = () => {
    window.print();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "received":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "pending":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold">
                Purchase Receipt
              </DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Receipt #{receipt.receipt_number}
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status Banner */}
          <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-emerald-50 to-emerald-100/50 border border-emerald-200 rounded-lg">
            <Check className="w-5 h-5 text-emerald-600" />
            <div>
              <p className="font-semibold text-emerald-900">Receipt Status</p>
              <p className="text-sm text-emerald-700">
                This purchase receipt has been successfully processed
              </p>
            </div>
          </div>

          {/* Key Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <InfoCardWithIcon
              icon={<FileText className="w-5 h-5" />}
              label="Receipt Number"
              value={receipt.receipt_number}
            />
            <InfoCardWithIcon
              icon={<Calendar className="w-5 h-5" />}
              label="Received Date"
              value={new Date(receipt.received_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            />
            <InfoCardWithIcon
              icon={<User className="w-5 h-5" />}
              label="Received By"
              value={receipt.received_by}
            />
            <InfoCardWithIcon
              icon={<FileText className="w-5 h-5" />}
              label="Purchase Order ID"
              value={receipt.purchase_order_id}
            />
            <InfoCardWithIcon
              icon={<Package className="w-5 h-5" />}
              label="Total Items"
              value={receipt.items.length.toString()}
            />
            <InfoCardWithIcon
              icon={<DollarSign className="w-5 h-5" />}
              label="Total Amount"
              value={`৳${Number(receipt.total_amount).toFixed(2)}`}
              highlight
            />
          </div>

          {/* Notes Section */}
          {receipt.notes && (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <h4 className="font-semibold text-slate-900 mb-2">Notes</h4>
              <p className="text-sm text-slate-700">{receipt.notes}</p>
            </div>
          )}

          {/* Items Table */}
          <div className="space-y-3">
            <h4 className="font-semibold text-lg">Received Items</h4>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-200">
                      <th className="px-4 py-3 text-left font-semibold text-slate-700">
                        Product
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-700">
                        Batch
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-700">
                        Unit
                      </th>
                      <th className="px-4 py-3 text-right font-semibold text-slate-700">
                        Qty
                      </th>
                      <th className="px-4 py-3 text-right font-semibold text-slate-700">
                        Stock Qty
                      </th>
                      <th className="px-4 py-3 text-right font-semibold text-slate-700">
                        Unit Cost
                      </th>
                      <th className="px-4 py-3 text-right font-semibold text-slate-700">
                        Total
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-700">
                        Expiry Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {receipt.items.map((item, index) => (
                      <tr
                        key={item.id}
                        className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${
                          index % 2 === 0 ? "bg-white" : "bg-slate-50"
                        }`}
                      >
                        <td className="px-4 py-3 font-medium text-slate-900">
                          {item.product_name}
                        </td>
                        <td className="px-4 py-3 text-slate-600">
                          {item.batch_number || (
                            <span className="text-slate-400">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-slate-600">
                          {item.purchase_unit_name}
                        </td>
                        <td className="px-4 py-3 text-right text-slate-900 font-medium">
                          {item.quantity_received_purchase}
                        </td>
                        <td className="px-4 py-3 text-right text-slate-900">
                          {item.quantity_received_stock}
                        </td>
                        <td className="px-4 py-3 text-right text-slate-600">
                          ৳{Number(item.unit_cost).toFixed(2)}
                        </td>
                        <td className="px-4 py-3 text-right font-semibold text-slate-900">
                          ৳{Number(item.line_total).toFixed(2)}
                        </td>
                        <td className="px-4 py-3 text-slate-600">
                          {item.expiry_date ? (
                            new Date(item.expiry_date).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              },
                            )
                          ) : (
                            <span className="text-slate-400">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Summary Section */}
          <div className="flex justify-end">
            <div className="w-full md:w-80 space-y-3 p-4 bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Subtotal</span>
                <span className="text-slate-900">
                  ৳{Number(receipt.total_amount).toFixed(2)}
                </span>
              </div>
              <div className="border-t border-slate-200 pt-3">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-900">
                    Grand Total
                  </span>
                  <span className="text-xl font-bold text-slate-900">
                    ৳{Number(receipt.total_amount).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface InfoCardWithIconProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
}

function InfoCardWithIcon({
  icon,
  label,
  value,
  highlight = false,
}: InfoCardWithIconProps) {
  return (
    <div
      className={`p-4 rounded-lg border transition-all ${
        highlight
          ? "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200"
          : "bg-slate-50 border-slate-200"
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex-shrink-0 ${highlight ? "text-blue-600" : "text-slate-600"}`}
        >
          {icon}
        </div>
        <div className="flex-1">
          <p
            className={`text-xs font-semibold uppercase tracking-wide ${
              highlight ? "text-blue-700" : "text-slate-600"
            }`}
          >
            {label}
          </p>
          <p
            className={`mt-1 font-semibold text-sm break-all ${
              highlight ? "text-blue-900 text-lg" : "text-slate-900"
            }`}
          >
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}
