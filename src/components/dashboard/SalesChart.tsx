"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

interface SalesChartProps {
  data?: number[];
  isLoading?: boolean;
}

export function SalesChart({ data, isLoading = false }: SalesChartProps) {
  const chartData = data || [
    45, 62, 38, 75, 55, 82, 68, 90, 72, 85, 78, 92, 65, 88, 70, 95, 80, 87, 73,
    91, 84, 76, 89, 82, 94, 77, 86, 79, 93, 85,
  ];

  return (
    <Card className="lg:col-span-2 border-border">
      <CardHeader>
        <CardTitle>Sales Overview</CardTitle>
        <CardDescription>Daily sales for the current month</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-64 flex items-center justify-center text-muted-foreground">
            Loading...
          </div>
        ) : (
          <>
            <div className="h-64 flex items-end gap-2">
              {chartData.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 bg-primary/60 rounded-t hover:bg-primary transition-colors cursor-pointer"
                  style={{ height: `${h}%` }}
                  title={`Day ${i + 1}: $${(h * 50).toFixed(0)}`}
                />
              ))}
            </div>
            <div className="flex justify-between mt-4 text-xs text-muted-foreground">
              <span>1</span>
              <span>5</span>
              <span>10</span>
              <span>15</span>
              <span>20</span>
              <span>25</span>
              <span>30</span>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
