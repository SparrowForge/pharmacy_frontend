"use client"

import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Dr. Sarah Mitchell",
    role: "Owner, CareFirst Pharmacy",
    content: "PharmaSmart transformed our operations. The AI predictions alone saved us thousands in overstock costs. Our checkout time dropped by 60%.",
    rating: 5,
  },
  {
    name: "James Chen",
    role: "Operations Manager, MedPlus Chain",
    content: "Managing 12 branches used to be a nightmare. Now I can monitor everything from one dashboard. The multi-branch analytics are game-changing.",
    rating: 5,
  },
  {
    name: "Maria Rodriguez",
    role: "Pharmacist, Community Health Rx",
    content: "The prescription OCR feature is incredibly accurate. It&apos;s reduced our data entry errors to nearly zero and patients love the faster service.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">
            Testimonials
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            Trusted by Pharmacies Worldwide
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            See what pharmacy owners and managers are saying about PharmaSmart.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl bg-background border border-border hover:border-primary/20 hover:shadow-lg transition-all duration-300"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground leading-relaxed mb-6">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-lg font-semibold text-primary">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Row */}
        <div className="mt-16 grid sm:grid-cols-4 gap-8 p-8 rounded-2xl bg-background border border-border">
          {[
            { value: "500+", label: "Active Pharmacies" },
            { value: "50K+", label: "Daily Transactions" },
            { value: "99.9%", label: "Uptime SLA" },
            { value: "4.9/5", label: "Customer Rating" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-3xl font-bold text-primary mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
