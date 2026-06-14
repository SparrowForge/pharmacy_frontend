"use client";

import { Card, CardContent } from "@/src/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface KPICardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon: React.ReactNode;
  color: string;
}

export function KPICard({
  title,
  value,
  change,
  trend = "neutral",
  icon,
  color,
}: KPICardProps) {
  return (
    <Card className="border-border">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div
            className={cn(
              "w-12 h-12 rounded-lg flex items-center justify-center",
              color,
            )}
          >
            {icon}
          </div>
          {change && (
            <div
              className={cn(
                "flex items-center gap-1 text-sm font-medium",
                trend === "up" && "text-green-600",
                trend === "down" && "text-red-600",
                trend === "neutral" && "text-muted-foreground",
              )}
            >
              {trend === "up" && <TrendingUp className="w-4 h-4" />}
              {trend === "down" && <TrendingDown className="w-4 h-4" />}
              {change}
            </div>
          )}
        </div>
        <div className="mt-4">
          <p className="text-2xl font-bold text-foreground">{value}</p>
          <p className="text-sm text-muted-foreground">{title}</p>
        </div>
      </CardContent>
    </Card>
  );
}
