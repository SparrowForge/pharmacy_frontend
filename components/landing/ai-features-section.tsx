"use client"

import { Badge } from "@/components/ui/badge"
import { 
  TrendingUp, 
  AlertTriangle, 
  MessageSquare, 
  Zap,
  Brain,
  Target,
  Shield,
  LineChart
} from "lucide-react"

const aiFeatures = [
  {
    icon: TrendingUp,
    title: "AI Stock Prediction",
    description: "Machine learning algorithms analyze historical data to predict future inventory needs with 95% accuracy.",
    highlight: "95% Accuracy",
  },
  {
    icon: Target,
    title: "Smart Reorder Suggestions",
    description: "Automated recommendations for optimal reorder quantities based on sales velocity and lead times.",
    highlight: "Auto-Optimize",
  },
  {
    icon: AlertTriangle,
    title: "Drug Interaction Alerts",
    description: "Real-time warnings for potential drug interactions when processing prescriptions.",
    highlight: "Safety First",
  },
  {
    icon: MessageSquare,
    title: "AI Chat Assistant",
    description: "24/7 intelligent support for quick answers about inventory, orders, and system operations.",
    highlight: "24/7 Support",
  },
]

export function AIFeaturesSection() {
  return (
    <section id="ai-features" className="py-24 bg-foreground text-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary mb-4">
            <Brain className="w-4 h-4" />
            <span className="text-sm font-medium">Powered by AI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-balance">
            Intelligent Features That Set Us Apart
          </h2>
          <p className="text-lg text-background/70 text-pretty">
            Leverage cutting-edge artificial intelligence to automate decisions, predict trends, and enhance patient safety.
          </p>
        </div>

        {/* AI Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {aiFeatures.map((feature, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-background/5 border border-background/10 hover:bg-background/10 hover:border-primary/30 transition-all duration-300 backdrop-blur-sm"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/30 transition-colors">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <Badge className="bg-primary/20 text-primary border-0 text-xs">
                      {feature.highlight}
                    </Badge>
                  </div>
                  <p className="text-background/70 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Row */}
        <div className="grid sm:grid-cols-4 gap-8 p-8 rounded-2xl bg-background/5 border border-background/10 backdrop-blur-sm">
          {[
            { icon: Zap, value: "3x", label: "Faster Operations" },
            { icon: LineChart, value: "40%", label: "Cost Reduction" },
            { icon: Shield, value: "99.9%", label: "Data Accuracy" },
            { icon: Target, value: "95%", label: "Prediction Rate" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="text-3xl font-bold text-primary mb-1">{stat.value}</p>
              <p className="text-sm text-background/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
