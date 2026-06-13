"use client";

import { useState } from "react";

interface InvoiceItem {
  id: string;
  product_name: string;
  sales_unit_id: string;
  sales_unit_name: string;
  unit_price: string;
  quantity: number;
  [key: string]: any;
}

interface ReturnItem {
  sales_invoice_item_id: string;
  return_unit_id: string;
  return_qty: number;
  unit_price: number;
  reason: string;
}

interface ReturnItemsTableProps {
  invoiceItems: InvoiceItem[];
  returnItems: ReturnItem[];
  productUnits: any[];
  onItemChange: (index: number, field: string, value: any) => void;
}

export default function ReturnItemsTable({
  invoiceItems,
  returnItems,
  productUnits,
  onItemChange,
}: ReturnItemsTableProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const getUnitName = (unitId: string) => {
    const unit = productUnits.find((u) => u.id === unitId);
    return unit?.name || "Unknown";
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-4 py-3 text-left font-semibold text-gray-700">
              Product
            </th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">
              Qty in Invoice
            </th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">
              Return Unit
            </th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">
              Return Qty
            </th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">
              Unit Price
            </th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {invoiceItems.map((invoiceItem, index) => {
            const returnItem = returnItems[index];
            const isExpanded = expandedIndex === index;

            return (
              <div key={invoiceItem.id}>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-3">{invoiceItem.product_name}</td>
                  <td className="px-4 py-3">{invoiceItem.quantity}</td>
                  <td className="px-4 py-3">
                    <select
                      value={returnItem?.return_unit_id || ""}
                      onChange={(e) =>
                        onItemChange(index, "return_unit_id", e.target.value)
                      }
                      className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Unit</option>
                      {productUnits.map((unit) => (
                        <option key={unit.id} value={unit.id}>
                          {unit.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      min="0"
                      max={invoiceItem.quantity}
                      value={returnItem?.return_qty || 0}
                      onChange={(e) =>
                        onItemChange(
                          index,
                          "return_qty",
                          parseFloat(e.target.value) || 0,
                        )
                      }
                      className="w-20 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-4 py-3">
                    ${returnItem?.unit_price.toFixed(2)}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedIndex(isExpanded ? null : index)
                      }
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      {isExpanded ? "Hide" : "Details"}
                    </button>
                  </td>
                </tr>

                {/* Expanded Row for Item Reason */}
                {isExpanded && (
                  <tr className="bg-blue-50 border-b border-gray-200">
                    <td colSpan={6} className="px-4 py-4">
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Return Reason (Item-specific)
                          </label>
                          <textarea
                            value={returnItem?.reason || ""}
                            onChange={(e) =>
                              onItemChange(index, "reason", e.target.value)
                            }
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter reason for returning this item"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </div>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
