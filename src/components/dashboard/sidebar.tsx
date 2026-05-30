"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ShoppingCart,
  ClipboardList,
  Package,
  FileText,
  RotateCcw,
  LayoutDashboard,
  PackageOpen,
  Users,
  Settings,
  DollarSign,
  Sparkles,
  Building2,
  UserCog,
  ChartAreaIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  Home,
  Command,
} from "lucide-react";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

/* -------------------- MENU TREE -------------------- */

const menu = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },

  {
    title: "Sales",
    icon: ShoppingCart,
    children: [
      { title: "POS", href: "/dashboard/pos", icon: ShoppingCart },
      { title: "Invoice", href: "/dashboard/invoices", icon: FileText },
      { title: "Sales Return", href: "/dashboard/returns", icon: RotateCcw },
    ],
  },

  {
    title: "Purchase",
    icon: ClipboardList,
    children: [
      {
        title: "Purchase",
        href: "/dashboard/purchase-orders",
        icon: ClipboardList,
      },
      { title: "Receive", href: "/dashboard/purchase-receive", icon: Package },
      { title: "Purchase Return", href: "/dashboard/returns", icon: RotateCcw },
    ],
  },

  {
    title: "Inventory",
    icon: Package,
    children: [
      { title: "Products", href: "/dashboard/medicines", icon: PackageOpen },
      {
        title: "Product Brand",
        href: "/dashboard/product-brand",
        icon: PackageOpen,
      },
      {
        title: "Product Category",
        href: "/dashboard/product-category",
        icon: PackageOpen,
      },
      {
        title: "Product Unit",
        href: "/dashboard/product-units",
        icon: PackageOpen,
      },
      { title: "Pricing", href: "/dashboard/pricing", icon: DollarSign },
    ],
  },

  {
    title: "People",
    icon: Users,
    children: [
      { title: "Stakeholders", href: "/dashboard/customers", icon: Users },
      { title: "Users", href: "/dashboard/users", icon: UserCog },
      {
        title: "Manufacturers",
        href: "/dashboard/manufacturers",
        icon: Building2,
      },
    ],
  },

  {
    title: "Settings",
    icon: Settings,
    children: [
      {
        title: "Shops",
        href: "/dashboard/shops",
        icon: ShoppingBagIcon,
      },
      {
        title: "Branch",
        href: "/dashboard/branch",
        icon: ShoppingCartIcon,
      },
      {
        title: "Company",
        href: "/dashboard/company",
        icon: Home,
      },
      {
        title: "General Settings",
        href: "/dashboard/settings",
        icon: Settings,
      },
      { title: "AI Insights", href: "/dashboard/ai-insights", icon: Sparkles },
    ],
  },
  {
    title: "General",
    icon: Command,
    children: [
      {
        title: "Countries",
        href: "/dashboard/country",
        icon: Home,
      },
      {
        title: "Divisions",
        href: "/dashboard/division",
        icon: Home,
      },
      {
        title: "Districts",
        href: "/dashboard/districts",
        icon: Home,
      },
      {
        title: "Thanas",
        href: "/dashboard/thanas",
        icon: Home,
      },
      {
        title: "Regions",
        href: "/dashboard/regions",
        icon: Home,
      },
      {
        title: "Zones",
        href: "/dashboard/zone",
        icon: Home,
      },
      {
        title: "Routes",
        href: "/dashboard/route",
        icon: Home,
      },
      {
        title: "Lines",
        href: "/dashboard/line",
        icon: Home,
      },
    ],
  },
  {
    title: "Reports",
    icon: ChartAreaIcon,
    href: "/reports",
  },
];

/* -------------------- COMPONENT -------------------- */

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title],
    );
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-card border-r transition-all duration-300",
        isCollapsed ? "w-[72px]" : "w-64",
      )}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between h-16 px-4 border-b">
        <span className="font-semibold">ERP System</span>

        <Button variant="ghost" size="icon" onClick={onToggle}>
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>

      {/* MENU */}
      <ScrollArea className="h-[calc(100vh-64px)]">
        <nav className="p-3 space-y-1">
          {menu.map((item) => {
            const isOpen = openMenus.includes(item.title);
            const Icon = item.icon;

            const hasChildren = !!item.children;

            return (
              <div key={item.title}>
                {/* PARENT */}
                <button
                  onClick={() => hasChildren && toggleMenu(item.title)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium hover:bg-muted",
                    pathname === item.href &&
                      "bg-primary text-primary-foreground",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    {!isCollapsed && <span>{item.title}</span>}
                  </div>

                  {!isCollapsed && hasChildren && (
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 transition-transform",
                        isOpen && "rotate-180",
                      )}
                    />
                  )}
                </button>

                {/* CHILDREN */}
                {hasChildren && isOpen && !isCollapsed && (
                  <div className="ml-6 mt-1 space-y-1 border-l pl-3">
                    {item.children.map((child) => {
                      const ChildIcon = child.icon;
                      const isActive = pathname === child.href;

                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                            isActive
                              ? "bg-primary text-primary-foreground"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted",
                          )}
                        >
                          <ChildIcon className="w-4 h-4" />
                          <span>{child.title}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </ScrollArea>
    </aside>
  );
}
