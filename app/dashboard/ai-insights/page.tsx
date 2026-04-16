"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Sparkles,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Package,
  ShoppingCart,
  Brain,
  Lightbulb,
  Target,
  Clock,
  CheckCircle,
  ArrowRight,
  RefreshCw,
} from "lucide-react"
import { cn } from "@/lib/utils"

const predictions = [
  {
    type: "demand",
    title: "High Demand Expected",
    description: "Vitamin C and flu medicines will see 40% increased demand next week due to seasonal trends.",
    confidence: 92,
    action: "Order Now",
    icon: TrendingUp,
    color: "text-green-500",
  },
  {
    type: "stockout",
    title: "Potential Stock-Out Risk",
    description: "Amoxicillin 500mg may run out in 5 days based on current sales velocity.",
    confidence: 88,
    action: "Reorder",
    icon: AlertTriangle,
    color: "text-orange-500",
  },
  {
    type: "expiry",
    title: "Expiry Risk Alert",
    description: "8 products worth $450 will expire within 30 days. Consider promotional pricing.",
    confidence: 100,
    action: "View Items",
    icon: Clock,
    color: "text-red-500",
  },
  {
    type: "opportunity",
    title: "Bundle Opportunity",
    description: "Customers who buy Paracetamol often buy Vitamin C together. Create a bundle for 15% more sales.",
    confidence: 85,
    action: "Create Bundle",
    icon: Lightbulb,
    color: "text-blue-500",
  },
]

const suggestedOrders = [
  { name: "Vitamin C 1000mg", currentStock: 45, suggestedQty: 200, reason: "High demand predicted" },
  { name: "Amoxicillin 500mg", currentStock: 23, suggestedQty: 100, reason: "Below safety stock" },
  { name: "Paracetamol 500mg", currentStock: 180, suggestedQty: 300, reason: "Best seller, optimize" },
  { name: "Cetirizine 10mg", currentStock: 95, suggestedQty: 150, reason: "Seasonal increase" },
]

const insights = [
  { label: "Sales Increase", value: "+23%", description: "vs last month", trend: "up" },
  { label: "Stock Turnover", value: "4.2x", description: "healthy rate", trend: "up" },
  { label: "Waste Reduction", value: "-35%", description: "expired items", trend: "down" },
  { label: "Order Accuracy", value: "96%", description: "AI suggestions", trend: "up" },
]

export default function AIInsightsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Brain className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">AI Insights</h1>
            <p className="text-muted-foreground">
              Smart predictions and recommendations for your pharmacy
            </p>
          </div>
        </div>
        <Button variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh Insights
        </Button>
      </div>

      {/* AI Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {insights.map((insight, index) => (
          <Card key={index} className="border-border bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">{insight.label}</span>
                {insight.trend === "up" ? (
                  <TrendingUp className="w-4 h-4 text-green-500" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-green-500" />
                )}
              </div>
              <p className="text-3xl font-bold text-primary">{insight.value}</p>
              <p className="text-xs text-muted-foreground">{insight.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Predictions */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              AI Predictions
            </h2>
            <Badge className="bg-primary/10 text-primary border-0">
              4 New Insights
            </Badge>
          </div>

          <div className="space-y-4">
            {predictions.map((prediction, index) => (
              <Card key={index} className="border-border hover:border-primary/30 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
                      prediction.type === "demand" && "bg-green-100",
                      prediction.type === "stockout" && "bg-orange-100",
                      prediction.type === "expiry" && "bg-red-100",
                      prediction.type === "opportunity" && "bg-blue-100"
                    )}>
                      <prediction.icon className={cn("w-6 h-6", prediction.color)} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-foreground">{prediction.title}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {prediction.confidence}% confidence
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        {prediction.description}
                      </p>
                      <Button size="sm" className="bg-primary hover:bg-primary/90">
                        {prediction.action}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Suggested Orders */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Suggested Orders
          </h2>

          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardDescription>
                AI-optimized reorder suggestions based on sales patterns
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {suggestedOrders.map((order, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg bg-muted/50 border border-border hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">{order.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      +{order.suggestedQty}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Current: {order.currentStock}</span>
                    <span className="text-primary">{order.reason}</span>
                  </div>
                </div>
              ))}
              <Button className="w-full bg-primary hover:bg-primary/90">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Create Purchase Order
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-base">Quick AI Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { icon: Package, label: "Optimize Inventory", action: "Run Analysis" },
                { icon: TrendingUp, label: "Sales Forecast", action: "View Report" },
                { icon: AlertTriangle, label: "Risk Assessment", action: "Check Now" },
                { icon: Lightbulb, label: "Bundle Suggestions", action: "Explore" },
              ].map((item, i) => (
                <Button key={i} variant="outline" className="w-full justify-between h-12">
                  <span className="flex items-center gap-2">
                    <item.icon className="w-4 h-4 text-primary" />
                    {item.label}
                  </span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Demand Forecast Chart */}
      <Card className="border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>7-Day Demand Forecast</CardTitle>
              <CardDescription>AI-predicted sales volume for the coming week</CardDescription>
            </div>
            <Badge className="bg-green-100 text-green-700 border-0">
              <CheckCircle className="w-3 h-3 mr-1" />
              92% Accuracy
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-end gap-4">
            {[
              { day: "Mon", actual: 65, predicted: 68 },
              { day: "Tue", actual: 72, predicted: 75 },
              { day: "Wed", actual: 58, predicted: 60 },
              { day: "Thu", actual: 82, predicted: 85 },
              { day: "Fri", actual: 90, predicted: 88 },
              { day: "Sat", actual: 78, predicted: 80 },
              { day: "Sun", actual: 45, predicted: 48 },
            ].map((data, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex gap-1 items-end h-48">
                  <div
                    className="flex-1 bg-primary/30 rounded-t"
                    style={{ height: `${data.actual}%` }}
                    title={`Actual: ${data.actual}%`}
                  />
                  <div
                    className="flex-1 bg-primary rounded-t"
                    style={{ height: `${data.predicted}%` }}
                    title={`Predicted: ${data.predicted}%`}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{data.day}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-primary/30" />
              <span className="text-xs text-muted-foreground">Actual</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-primary" />
              <span className="text-xs text-muted-foreground">AI Predicted</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
