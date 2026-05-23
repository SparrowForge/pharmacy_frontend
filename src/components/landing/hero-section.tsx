"use client";

import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { ArrowRight, Play, Sparkles, Cloud, Building2 } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23d09062%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badges */}
            <div className="flex flex-wrap gap-3">
              <Badge
                variant="secondary"
                className="px-3 py-1.5 text-xs font-medium bg-primary/10 text-primary border-primary/20 hover:bg-primary/15"
              >
                <Sparkles className="w-3 h-3 mr-1.5" />
                AI Enabled
              </Badge>
              <Badge
                variant="secondary"
                className="px-3 py-1.5 text-xs font-medium bg-secondary text-secondary-foreground"
              >
                <Cloud className="w-3 h-3 mr-1.5" />
                Cloud SaaS
              </Badge>
              <Badge
                variant="secondary"
                className="px-3 py-1.5 text-xs font-medium bg-secondary text-secondary-foreground"
              >
                <Building2 className="w-3 h-3 mr-1.5" />
                Multi-Branch
              </Badge>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-balance">
                Smart AI-Powered{" "}
                <span className="text-primary">Pharmacy Management</span> System
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-xl text-pretty leading-relaxed">
                Manage inventory, sales, prescriptions, and delivery — all in
                one powerful SaaS platform designed for modern pharmacies.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                asChild
                className="bg-primary hover:bg-primary/90 text-lg px-8 h-14 shadow-lg shadow-primary/20"
              >
                <Link href="/signup">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 h-14 group"
              >
                <Play className="w-5 h-5 mr-2 group-hover:text-primary transition-colors" />
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-4 flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span>99.9% Uptime</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span>500+ Pharmacies</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Right Content - Dashboard Preview */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 border border-border bg-card">
              {/* Mock Dashboard */}
              <div className="p-4 bg-muted/50 border-b border-border flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="h-6 bg-background rounded-md px-3 flex items-center text-xs text-muted-foreground">
                    dashboard.pharmasmart.io
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* KPI Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10">
                    <p className="text-xs text-muted-foreground mb-1">
                      Today&apos;s Sales
                    </p>
                    <p className="text-2xl font-bold text-foreground">$4,825</p>
                    <p className="text-xs text-green-600 mt-1">
                      +12.5% from yesterday
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/10">
                    <p className="text-xs text-muted-foreground mb-1">
                      Total Orders
                    </p>
                    <p className="text-2xl font-bold text-foreground">156</p>
                    <p className="text-xs text-green-600 mt-1">+8 new orders</p>
                  </div>
                </div>

                {/* Chart Placeholder */}
                <div className="h-32 rounded-lg bg-muted/50 border border-border flex items-end p-4 gap-2">
                  {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-primary/60 rounded-t"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>

                {/* Recent Items */}
                <div className="space-y-2">
                  {[
                    { name: "Amoxicillin 500mg", status: "In Stock", qty: 450 },
                    { name: "Paracetamol 650mg", status: "Low Stock", qty: 23 },
                    { name: "Vitamin D3", status: "In Stock", qty: 180 },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/50"
                    >
                      <span className="text-sm font-medium text-foreground">
                        {item.name}
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground">
                          {item.qty} units
                        </span>
                        <Badge
                          variant={
                            item.status === "Low Stock"
                              ? "destructive"
                              : "secondary"
                          }
                          className="text-xs"
                        >
                          {item.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating AI Badge */}
            <div className="absolute -top-4 -right-4 p-4 bg-card rounded-xl shadow-lg border border-border animate-pulse-glow">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">AI Insights Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
