"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { ITodaySale } from "@/src/types/dashboard.types";

interface TopSellingCardProps {
  data?: ITodaySale[];
  isLoading?: boolean;
}

export function TopSellingCard({
  data = [],
  isLoading = false,
}: TopSellingCardProps) {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>Top Selling</CardTitle>
        <CardDescription>Best performers this month</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-8 text-muted-foreground">
            Loading...
          </div>
        ) : data.length === 0 ? (
          <div className="flex items-center justify-center py-8 text-muted-foreground">
            No data available
          </div>
        ) : (
          <div className="space-y-4">
            {data.slice(0, 5).map((item, index) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {item.customer_name || "Customer"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Invoice: {item.invoice_number}
                    </p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-primary">
                  ${item.total_amount}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
