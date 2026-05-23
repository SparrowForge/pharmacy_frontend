"use client";

import { useState } from "react";
import { cn } from "@/src/lib/utils";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  FileBarChart,
  ChevronRight,
} from "lucide-react";

const tabs = [
  {
    id: "dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
    description:
      "Get a bird's-eye view of your pharmacy operations with real-time KPIs and insights.",
  },
  {
    id: "pos",
    icon: ShoppingCart,
    label: "POS System",
    description:
      "Lightning-fast checkout with smart search, barcode scanning, and one-click actions.",
  },
  {
    id: "inventory",
    icon: Package,
    label: "Inventory",
    description:
      "Complete inventory management with batch tracking, expiry alerts, and auto-reorder.",
  },
  {
    id: "reports",
    icon: FileBarChart,
    label: "Reports",
    description:
      "Comprehensive analytics with customizable reports and export options.",
  },
];

export function SystemPreviewSection() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const activeTabData = tabs.find((t) => t.id === activeTab);

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">
            System Preview
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            Designed for Speed and Simplicity
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Every screen is optimized for pharmacy workflows, reducing clicks
            and maximizing efficiency.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-5 py-3 rounded-lg font-medium text-sm transition-all",
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "bg-card text-muted-foreground hover:text-foreground hover:bg-muted border border-border",
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Preview Window */}
        <div className="rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 border border-border bg-card">
          {/* Browser Chrome */}
          <div className="p-4 bg-muted/50 border-b border-border flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 mx-4">
              <div className="h-8 bg-background rounded-lg px-4 flex items-center text-sm text-muted-foreground">
                app.pharmasmart.io/{activeTab}
              </div>
            </div>
          </div>

          {/* Preview Content */}
          <div className="p-8 min-h-[400px]">
            {activeTab === "dashboard" && <DashboardPreview />}
            {activeTab === "pos" && <POSPreview />}
            {activeTab === "inventory" && <InventoryPreview />}
            {activeTab === "reports" && <ReportsPreview />}
          </div>
        </div>

        {/* Tab Description */}
        <div className="mt-8 text-center">
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {activeTabData?.description}
          </p>
        </div>
      </div>
    </section>
  );
}

function DashboardPreview() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Today Sales", value: "$4,825", change: "+12.5%" },
          { label: "Total Orders", value: "156", change: "+8" },
          { label: "Low Stock", value: "12", change: "Alert" },
          { label: "Expiring Soon", value: "8", change: "7 days" },
        ].map((kpi, i) => (
          <div
            key={i}
            className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10"
          >
            <p className="text-xs text-muted-foreground">{kpi.label}</p>
            <p className="text-2xl font-bold text-foreground mt-1">
              {kpi.value}
            </p>
            <p className="text-xs text-primary mt-1">{kpi.change}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 p-6 rounded-xl border border-border">
          <p className="text-sm font-medium mb-4">Sales Overview</p>
          <div className="h-40 flex items-end gap-3">
            {[60, 80, 45, 90, 70, 85, 95, 75, 88, 92, 78, 85].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-primary/60 rounded-t hover:bg-primary transition-colors"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
        <div className="p-6 rounded-xl border border-border">
          <p className="text-sm font-medium mb-4">Quick Actions</p>
          <div className="space-y-2">
            {["New Sale", "Add Medicine", "New Order", "Add Customer"].map(
              (action, i) => (
                <button
                  key={i}
                  className="w-full p-3 text-left text-sm rounded-lg bg-muted/50 hover:bg-muted flex items-center justify-between group"
                >
                  {action}
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                </button>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function POSPreview() {
  return (
    <div className="grid grid-cols-5 gap-6 h-[360px]">
      {/* Left - Product Search */}
      <div className="col-span-3 space-y-4">
        <div className="flex gap-3">
          <div className="flex-1 h-10 rounded-lg bg-muted/50 border border-border px-4 flex items-center text-sm text-muted-foreground">
            Search medicines...
          </div>
          <div className="h-10 px-4 rounded-lg bg-primary text-primary-foreground flex items-center text-sm font-medium">
            Scan Barcode
          </div>
        </div>
        <div className="space-y-2">
          {[
            { name: "Amoxicillin 500mg", price: "$12.50", stock: 450 },
            { name: "Paracetamol 650mg", price: "$5.99", stock: 320 },
            { name: "Cetirizine 10mg", price: "$8.25", stock: 180 },
            { name: "Omeprazole 20mg", price: "$15.00", stock: 95 },
          ].map((item, i) => (
            <div
              key={i}
              className="p-3 rounded-lg border border-border hover:border-primary/30 hover:bg-primary/5 cursor-pointer flex items-center justify-between"
            >
              <div>
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-muted-foreground">
                  {item.stock} in stock
                </p>
              </div>
              <p className="font-semibold text-primary">{item.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right - Cart */}
      <div className="col-span-2 p-4 rounded-xl bg-muted/30 border border-border flex flex-col">
        <p className="font-semibold mb-3">Cart (3 items)</p>
        <div className="flex-1 space-y-2 overflow-auto">
          {[
            { name: "Amoxicillin 500mg", qty: 2, price: "$25.00" },
            { name: "Paracetamol 650mg", qty: 1, price: "$5.99" },
            { name: "Vitamin D3", qty: 1, price: "$18.50" },
          ].map((item, i) => (
            <div
              key={i}
              className="p-2 rounded bg-card border border-border text-sm flex justify-between"
            >
              <span>
                {item.name} x{item.qty}
              </span>
              <span className="font-medium">{item.price}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-border pt-3 mt-3 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>$49.49</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span className="text-primary">$49.49</span>
          </div>
          <button className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-medium mt-2">
            Complete Sale
          </button>
        </div>
      </div>
    </div>
  );
}

function InventoryPreview() {
  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex gap-3">
        <div className="h-10 px-4 rounded-lg bg-muted/50 border border-border flex items-center text-sm text-muted-foreground flex-1">
          Search inventory...
        </div>
        <div className="h-10 px-4 rounded-lg border border-border flex items-center text-sm gap-2">
          Category <ChevronRight className="w-4 h-4 rotate-90" />
        </div>
        <div className="h-10 px-4 rounded-lg border border-border flex items-center text-sm gap-2">
          Status <ChevronRight className="w-4 h-4 rotate-90" />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr className="text-left text-xs font-medium text-muted-foreground">
              <th className="p-3">Medicine Name</th>
              <th className="p-3">Batch</th>
              <th className="p-3">Expiry</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {[
              {
                name: "Amoxicillin 500mg",
                batch: "AMX-2024-001",
                expiry: "Dec 2025",
                stock: 450,
                status: "In Stock",
              },
              {
                name: "Paracetamol 650mg",
                batch: "PCM-2024-015",
                expiry: "Mar 2025",
                stock: 23,
                status: "Low Stock",
              },
              {
                name: "Cetirizine 10mg",
                batch: "CTZ-2024-008",
                expiry: "Jun 2025",
                stock: 180,
                status: "In Stock",
              },
              {
                name: "Vitamin D3",
                batch: "VTD-2024-022",
                expiry: "Jan 2025",
                stock: 8,
                status: "Expiring",
              },
            ].map((item, i) => (
              <tr key={i} className="text-sm">
                <td className="p-3 font-medium">{item.name}</td>
                <td className="p-3 text-muted-foreground">{item.batch}</td>
                <td className="p-3 text-muted-foreground">{item.expiry}</td>
                <td className="p-3">{item.stock}</td>
                <td className="p-3">
                  <span
                    className={cn(
                      "px-2 py-1 rounded text-xs font-medium",
                      item.status === "In Stock" &&
                        "bg-green-100 text-green-700",
                      item.status === "Low Stock" && "bg-red-100 text-red-700",
                      item.status === "Expiring" &&
                        "bg-orange-100 text-orange-700",
                    )}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ReportsPreview() {
  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="p-6 rounded-xl border border-border">
        <p className="text-sm font-medium mb-4">Revenue by Category</p>
        <div className="space-y-3">
          {[
            { category: "Antibiotics", value: 35 },
            { category: "Pain Relief", value: 25 },
            { category: "Vitamins", value: 20 },
            { category: "Skincare", value: 15 },
            { category: "Other", value: 5 },
          ].map((item, i) => (
            <div key={i} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{item.category}</span>
                <span className="text-muted-foreground">{item.value}%</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${item.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="p-6 rounded-xl border border-border">
        <p className="text-sm font-medium mb-4">Monthly Trends</p>
        <div className="h-48 flex items-end gap-2">
          {[45, 62, 38, 75, 55, 82, 68, 90, 72, 85, 78, 92].map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full bg-primary/60 rounded-t hover:bg-primary transition-colors"
                style={{ height: `${h}%` }}
              />
              <span className="text-[10px] text-muted-foreground">
                {
                  ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"][
                    i
                  ]
                }
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
