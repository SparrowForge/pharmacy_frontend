"use client";

import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { ArrowRight, Plus, Package, ShoppingCart, Users } from "lucide-react";

const quickActions = [
  { label: "New Sale", href: "/dashboard/pos", icon: Plus },
  { label: "Add Medicine", href: "/dashboard/medicines/new", icon: Package },
  { label: "New Order", href: "/dashboard/orders/new", icon: ShoppingCart },
  { label: "Add Customer", href: "/dashboard/customers/new", icon: Users },
];

export function QuickActionsCard() {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Frequently used actions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {quickActions.map((action, index) => (
          <Button
            key={index}
            variant="outline"
            asChild
            className="w-full justify-between h-12 group"
          >
            <Link href={action.href}>
              <span className="flex items-center gap-2">
                <action.icon className="w-4 h-4 text-primary" />
                {action.label}
              </span>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
