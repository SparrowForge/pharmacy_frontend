"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import {
  Pill,
  LayoutDashboard,
  ShoppingCart,
  Package,
  PackageOpen,
  Users,
  Truck,
  FileText,
  BarChart3,
  Settings,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Building2,
  UserCog,
  ClipboardList,
  RotateCcw,
} from "lucide-react"

const mainNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "POS",
    href: "/dashboard/pos",
    icon: ShoppingCart,
    badge: "Fast",
  },
  {
    title: "Orders",
    href: "/dashboard/orders",
    icon: ClipboardList,
  },
]

const inventoryNavItems = [
  {
    title: "Inventory",
    href: "/dashboard/inventory",
    icon: Package,
  },
  {
    title: "Medicines",
    href: "/dashboard/medicines",
    icon: PackageOpen,
  },
]

const peopleNavItems = [
  {
    title: "Customers",
    href: "/dashboard/customers",
    icon: Users,
  },
  {
    title: "Users",
    href: "/dashboard/users",
    icon: UserCog,
  },
  {
    title: "Suppliers",
    href: "/dashboard/suppliers",
    icon: Truck,
  },
  {
    title: "Manufacturers",
    href: "/dashboard/manufacturers",
    icon: Building2,
  },
]

const operationsNavItems = [
  {
    title: "Invoices",
    href: "/dashboard/invoices",
    icon: FileText,
  },
  {
    title: "Returns",
    href: "/dashboard/returns",
    icon: RotateCcw,
  },
  {
    title: "Purchase Orders",
    href: "/dashboard/purchase-orders",
    icon: ClipboardList,
  },
]

const moreNavItems = [
  {
    title: "Prescriptions",
    href: "/dashboard/prescriptions",
    icon: FileText,
  },
  {
    title: "Reports",
    href: "/dashboard/reports",
    icon: BarChart3,
  },
  {
    title: "AI Insights",
    href: "/dashboard/ai-insights",
    icon: Sparkles,
    badge: "AI",
  },
]

const adminNavItems = [
  {
    title: "Shops",
    href: "/dashboard/shops",
    icon: Building2,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

interface SidebarProps {
  isCollapsed: boolean
  onToggle: () => void
}

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const pathname = usePathname()

  const NavSection = ({
    title,
    items,
  }: {
    title?: string
    items: typeof mainNavItems
  }) => (
    <div className="space-y-1">
      {title && !isCollapsed && (
        <p className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
          {title}
        </p>
      )}
      {items.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            <item.icon className={cn("w-5 h-5 shrink-0", isCollapsed && "mx-auto")} />
            {!isCollapsed && (
              <>
                <span className="flex-1">{item.title}</span>
                {item.badge && (
                  <Badge
                    variant="secondary"
                    className={cn(
                      "text-[10px] px-1.5 py-0",
                      isActive
                        ? "bg-primary-foreground/20 text-primary-foreground"
                        : "bg-primary/10 text-primary"
                    )}
                  >
                    {item.badge}
                  </Badge>
                )}
              </>
            )}
          </Link>
        )
      })}
    </div>
  )

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-card border-r border-border transition-all duration-300",
        isCollapsed ? "w-[72px]" : "w-64"
      )}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-border">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary">
              <Pill className="w-5 h-5 text-primary-foreground" />
            </div>
            {!isCollapsed && (
              <span className="text-lg font-semibold text-foreground">
                Pharma<span className="text-primary">Smart</span>
              </span>
            )}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0"
            onClick={onToggle}
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 py-4 overflow-hidden">
          <nav className="px-3 space-y-6 pr-4">
            <NavSection items={mainNavItems} />
            <NavSection title="Inventory" items={inventoryNavItems} />
            <NavSection title="People" items={peopleNavItems} />
            <NavSection title="Operations" items={operationsNavItems} />
            <NavSection title="More" items={moreNavItems} />
            <NavSection title="Admin" items={adminNavItems} />
          </nav>
        </ScrollArea>

        {/* Footer */}
        {!isCollapsed && (
          <div className="p-4 border-t border-border">
            <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">AI Insights</span>
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                3 new predictions available
              </p>
              <Button size="sm" variant="outline" className="w-full text-xs h-8">
                View Insights
              </Button>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}
