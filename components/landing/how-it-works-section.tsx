"use client"

import { Building2, UserPlus, Package, Zap } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: Building2,
    title: "Create Your Shop",
    description: "Super Admin sets up your pharmacy in minutes with all the essential details and subscription plan.",
  },
  {
    number: "02",
    icon: UserPlus,
    title: "Add Your Team",
    description: "Invite staff members, assign roles, and configure branch access for seamless collaboration.",
  },
  {
    number: "03",
    icon: Package,
    title: "Setup Inventory",
    description: "Import your medicine catalog, set stock levels, and configure automated alerts.",
  },
  {
    number: "04",
    icon: Zap,
    title: "Start Selling",
    description: "Go live with our lightning-fast POS system and start processing sales instantly.",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">
            Getting Started
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            Up and Running in 4 Simple Steps
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Our streamlined onboarding process gets your pharmacy operational in no time.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-border" />
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Step Card */}
                <div className="p-6 rounded-xl bg-background border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                  {/* Step Number */}
                  <div className="relative z-10 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg mb-6 mx-auto lg:mx-0">
                    {step.number}
                  </div>
                  
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <step.icon className="w-7 h-7 text-primary" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
