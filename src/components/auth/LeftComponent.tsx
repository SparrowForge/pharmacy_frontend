"use client";

import Link from "next/link";
import { Pill } from "lucide-react";

export default function LeftComponent() {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-foreground text-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary/30 via-transparent to-transparent" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <div className="relative z-10 flex flex-col justify-between p-12 w-full">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary">
            <Pill className="w-5 h-5 text-primary-foreground" />
          </div>

          <span className="text-xl font-semibold">
            Pharma
            <span className="text-primary">Smart</span>
          </span>
        </Link>

        {/* Content */}
        <div className="space-y-6 max-w-md">
          <h1 className="text-4xl font-bold leading-tight text-balance">
            Smart AI-Powered Pharmacy Management
          </h1>

          <p className="text-background/70 text-lg leading-relaxed">
            Streamline your pharmacy operations with intelligent inventory
            management, fast POS, and AI-powered insights.
          </p>

          <div className="flex items-center gap-6 text-sm text-background/60">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span>500+ Pharmacies</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span>99.9% Uptime</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-sm text-background/50">
          &copy; 2026 PharmaSmart by Sparrow Forge Ltd. All rights reserved.
        </p>
      </div>
    </div>
  );
}