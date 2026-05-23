"use client";

import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Check } from "lucide-react";
import { cn } from "@/src/lib/utils";

const plans = [
  {
    name: "Starter",
    description: "Perfect for single pharmacy locations",
    price: "$49",
    period: "/month",
    features: [
      "1 Branch Location",
      "Up to 5 Users",
      "Basic POS System",
      "Inventory Management",
      "Sales Reports",
      "Email Support",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Business",
    description: "For growing pharmacy chains",
    price: "$129",
    period: "/month",
    features: [
      "Up to 5 Branches",
      "Up to 25 Users",
      "Advanced POS + Barcode",
      "AI Inventory Predictions",
      "Prescription OCR",
      "Multi-branch Analytics",
      "Priority Support",
      "API Access",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For large pharmacy networks",
    price: "Custom",
    period: "",
    features: [
      "Unlimited Branches",
      "Unlimited Users",
      "Full AI Suite",
      "Custom Integrations",
      "Dedicated Account Manager",
      "On-premise Option",
      "SLA Guarantee",
      "White-label Option",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">
            Pricing Plans
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Choose the plan that fits your pharmacy. All plans include a 14-day
            free trial.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={cn(
                "relative p-8 rounded-2xl border transition-all duration-300",
                plan.popular
                  ? "bg-card border-primary shadow-xl shadow-primary/10 scale-105"
                  : "bg-card border-border hover:border-primary/30 hover:shadow-lg",
              )}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1">
                  Most Popular
                </Badge>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {plan.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {plan.description}
                </p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                asChild
                className={cn(
                  "w-full",
                  plan.popular
                    ? "bg-primary hover:bg-primary/90"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                )}
              >
                <Link
                  href={plan.name === "Enterprise" ? "#contact" : "/signup"}
                >
                  {plan.cta}
                </Link>
              </Button>
            </div>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            All plans include SSL encryption, daily backups, and HIPAA
            compliance
          </p>
        </div>
      </div>
    </section>
  );
}
