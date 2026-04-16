"use client"

import { 
  Package, 
  ShoppingCart, 
  BarChart3, 
  FileText, 
  Building2, 
  Truck,
  Sparkles,
  Shield
} from "lucide-react"

const features = [
  {
    icon: Package,
    title: "Inventory Management",
    description: "Real-time stock tracking with automated reorder points and batch management for complete control.",
  },
  {
    icon: ShoppingCart,
    title: "Smart POS System",
    description: "Lightning-fast point of sale with barcode scanning, smart search, and one-click checkout.",
  },
  {
    icon: Sparkles,
    title: "AI Demand Forecasting",
    description: "Predict inventory needs with machine learning algorithms analyzing sales patterns.",
  },
  {
    icon: FileText,
    title: "Prescription OCR",
    description: "Instantly digitize prescriptions with AI-powered optical character recognition.",
  },
  {
    icon: Building2,
    title: "Multi-Branch Control",
    description: "Manage multiple pharmacy locations from a single unified dashboard.",
  },
  {
    icon: Truck,
    title: "Delivery Management",
    description: "Complete order tracking with rider assignment and real-time delivery status.",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Comprehensive reports and insights to make data-driven business decisions.",
  },
  {
    icon: Shield,
    title: "Compliance & Security",
    description: "HIPAA-compliant data handling with enterprise-grade security protocols.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">
            Powerful Features
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            Everything You Need to Run a Modern Pharmacy
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            From inventory to delivery, our comprehensive suite of tools helps you streamline operations and boost profitability.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-xl bg-background border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
