"use client";

import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { ArrowRight, Sparkles } from "lucide-react";

const aiInsights = [
  {
    type: "prediction",
    message: "High demand predicted for Vitamin C next week",
    action: "Order now",
  },
  {
    type: "warning",
    message: "5 medicines expiring within 30 days",
    action: "Review",
  },
  {
    type: "opportunity",
    message: "Bundle Paracetamol + Vitamin C for 15% more sales",
    action: "Create bundle",
  },
];

export function AIInsightsCard() {
  return (
    <Card className="border-border bg-gradient-to-br from-primary/5 to-primary/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          AI Insights
        </CardTitle>
        <CardDescription>
          Smart recommendations for your pharmacy
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {aiInsights.map((insight, index) => (
          <div
            key={index}
            className="p-3 rounded-lg bg-card border border-border"
          >
            <p className="text-sm text-foreground mb-2">{insight.message}</p>
            <Button size="sm" variant="outline" className="h-7 text-xs">
              {insight.action}
              <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
