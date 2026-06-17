"use client";

import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { AlertTriangle, Clock, ShoppingCart } from "lucide-react";
import Link from "next/link";

interface AlertsCardProps {
  lowStockCount?: number;
  expiringCount?: number;
  pendingOrdersCount?: number;
  isLoading?: boolean;
}

export function AlertsCard({
  lowStockCount = 12,
  expiringCount = 8,
  pendingOrdersCount = 5,
  isLoading = false,
}: AlertsCardProps) {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>Alerts</CardTitle>
        <CardDescription>Items requiring attention</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {isLoading ? (
          <div className="flex items-center justify-center py-8 text-muted-foreground">
            Loading...
          </div>
        ) : (
          <>
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <span className="text-sm font-medium text-red-600">
                  Low Stock
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {lowStockCount} medicines are below minimum stock level
              </p>
              <Link href="/dashboard/low-stock">
                <Button
                  size="sm"
                  variant="link"
                  className="h-6 px-0 text-xs text-red-600"
                >
                  View all
                </Button>
              </Link>
            </div>
            <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-medium text-orange-600">
                  Expiring Soon
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {expiringCount} medicines expiring within 30 days
              </p>
              <Link href="/dashboard/expiring">
                <Button
                  size="sm"
                  variant="link"
                  className="h-6 px-0 text-xs text-orange-600"
                >
                  View all
                </Button>
              </Link>
            </div>
            <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <div className="flex items-center gap-2 mb-1">
                <ShoppingCart className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium text-blue-600">
                  Pending Orders
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {pendingOrdersCount} orders awaiting processing
              </p>
              <Button
                size="sm"
                variant="link"
                className="h-6 px-0 text-xs text-blue-600"
              >
                View all
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
