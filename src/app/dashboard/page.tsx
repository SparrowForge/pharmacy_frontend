"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/src/components/ui/button";
import {
  Plus,
  DollarSign,
  ShoppingCart,
  Package,
  AlertTriangle,
} from "lucide-react";
import { useDashboard } from "@/src/hooks/useDashboard";
import { KPICard } from "@/src/components/dashboard/KPICard";
import { SalesChart } from "@/src/components/dashboard/SalesChart";
import { QuickActionsCard } from "@/src/components/dashboard/QuickActionCard";
import { TopSellingCard } from "@/src/components/dashboard/TopSellingCard";
import { AIInsightsCard } from "@/src/components/dashboard/AIInsightCard";
import { AlertsCard } from "@/src/components/dashboard/AlertsCard";
import { RecentActivityTable } from "@/src/components/dashboard/RecentActivityTable";

export default function DashboardPage() {
  const {
    summary,
    summaryLoading,
    todaySales,
    todaySalesLoading,
    lowStockItems,
    lowStockLoading,
    expiringSoonItems,
    expiringSoonLoading,
    fetchSummary,
    fetchTodaySales,
    fetchLowStock,
    fetchExpiringSoon,
  } = useDashboard();

  useEffect(() => {
    fetchSummary(30);
    fetchTodaySales(1, 20);
    fetchLowStock(1, 20);
    fetchExpiringSoon(30, 1, 20);
  }, [fetchSummary, fetchTodaySales, fetchLowStock, fetchExpiringSoon]);

  const kpiCards = [
    {
      title: "Today's Sales",
      value: summary?.today_sales || 0,
      change: "+12.5%",
      trend: "up" as const,
      icon: <DollarSign className="w-6 h-6" />,
      color: "bg-primary/10 text-primary",
    },
    {
      title: "Total Orders",
      value: summary?.total_orders || 0,
      change: "+8",
      trend: "up" as const,
      icon: <ShoppingCart className="w-6 h-6" />,
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      title: "Low Stock Items",
      value: summary?.low_stock_items || 0,
      change: "-3",
      trend: "down" as const,
      icon: <Package className="w-6 h-6" />,
      color: "bg-orange-500/10 text-orange-500",
    },
    {
      title: "Expiring Soon",
      value: summary?.expiring_soon || 0,
      change: "7 days",
      trend: "neutral" as const,
      icon: <AlertTriangle className="w-6 h-6" />,
      color: "bg-red-500/10 text-red-500",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s what&apos;s happening today.
          </p>
        </div>
        <Button asChild className="bg-primary hover:bg-primary/90">
          <Link href="/dashboard/pos">
            <Plus className="w-4 h-4 mr-2" />
            New Sale
          </Link>
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi, index) => (
          <KPICard
            key={index}
            title={kpi.title}
            value={kpi.value}
            change={kpi.change}
            trend={kpi.trend}
            icon={kpi.icon}
            color={kpi.color}
          />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        <SalesChart isLoading={summaryLoading} />
        <QuickActionsCard />
      </div>

      {/* Second Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        <TopSellingCard data={todaySales} isLoading={todaySalesLoading} />
        <AIInsightsCard />
        <AlertsCard
          lowStockCount={lowStockItems.length}
          expiringCount={expiringSoonItems.length}
          isLoading={lowStockLoading || expiringSoonLoading}
        />
      </div>

      {/* Recent Activity Table */}
      <RecentActivityTable data={todaySales} isLoading={todaySalesLoading} />
    </div>
  );
}
