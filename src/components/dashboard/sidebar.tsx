"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  Stamp,
} from "lucide-react";

/* -------------------- TYPES (FIX FOR "never" ERROR) -------------------- */

type MenuItem = {
  title: string;
  icon: any;
  href?: string;
  children?: MenuItem[];
};

/* -------------------- MENU TREE -------------------- */

const menu: MenuItem[] = [
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
      {
        title: "Sales Return",
        href: "/dashboard/sales-returns",
        icon: RotateCcw,
      },
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
      {
        title: "Purchase Return",
        href: "/dashboard/purchase-return",
        icon: RotateCcw,
      },
    ],
  },
  {
    title: "Inventory",
    icon: Package,
    children: [
      {
        title: "Category",
        href: "/dashboard/product-category",
        icon: PackageOpen,
      },
      { title: "Brand", href: "/dashboard/product-brand", icon: PackageOpen },
      { title: "Products", href: "/dashboard/medicines", icon: PackageOpen },
      { title: "Batch", href: "/dashboard/product-batch", icon: PackageOpen },
      { title: "Unit", href: "/dashboard/product-units", icon: PackageOpen },
      { title: "Badge", href: "/dashboard/product-badge", icon: PackageOpen },
      { title: "Tag", href: "/dashboard/product-tag", icon: PackageOpen },
      { title: "Image", href: "/dashboard/product-image", icon: PackageOpen },
      { title: "Offers", href: "/dashboard/product-offers", icon: PackageOpen },
      // { title: "Pricing", href: "/dashboard/pricing", icon: DollarSign },
    ],
  },
  {
    title: "People",
    icon: Users,
    children: [
      { title: "Stakeholders", href: "/dashboard/company", icon: Users },
      { title: "Users", href: "/dashboard/users", icon: UserCog },
      {
        title: "Manufacturers",
        href: "/dashboard/manufacturers",
        icon: Building2,
      },
      { title: "Shops", href: "/dashboard/shops", icon: ShoppingBagIcon },
      { title: "Branch", href: "/dashboard/branch", icon: ShoppingCartIcon },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    children: [
      {
        title: "Discount Codes",
        href: "/dashboard/discount-codes",
        icon: Sparkles,
      },
      {
        title: "Payment Methods",
        href: "/dashboard/payment-methods",
        icon: DollarSign,
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
      { title: "Countries", href: "/dashboard/country", icon: Home },
      { title: "Divisions", href: "/dashboard/division", icon: Home },
      { title: "Districts", href: "/dashboard/districts", icon: Home },
      { title: "Thanas", href: "/dashboard/thanas", icon: Home },
      { title: "Regions", href: "/dashboard/regions", icon: Home },
      { title: "Zones", href: "/dashboard/zone", icon: Home },
      { title: "Routes", href: "/dashboard/route", icon: Home },
      { title: "Lines", href: "/dashboard/line", icon: Home },
    ],
  },
  {
    title: "Reports",
    icon: ChartAreaIcon,
    children: [
      { title: "All Reports", href: "/dashboard/reports", icon: ChartAreaIcon },
      { title: "Sales Reports", href: "/dashboard/sales-reports", icon: ChartAreaIcon },
      { title: "Purchase Reports", href: "/dashboard/purchase-reports", icon: ChartAreaIcon },
    ],
  },
  {
    title: "Statements",
    icon: Stamp,
    children: [
      { title: "Supplier", href: "/dashboard/statement/supplier", icon: Stamp },
      { title: "Customer", href: "/dashboard/statement/customer", icon: Stamp },
     
    ],
  },
];

/* -------------------- COMPONENT -------------------- */

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
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

            const isActive =
              "href" in item && item.href ? pathname === item.href : false;

            return (
              <div key={item.title}>
                {/* PARENT */}
                {hasChildren ? (
                  <button
                    onClick={() => {
                      toggleMenu(item.title);

                      if ("href" in item && item.href) {
                        router.push(item.href);
                      }
                    }}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium hover:bg-muted",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </div>

                    {!isCollapsed && (
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 transition-transform",
                          isOpen && "rotate-180",
                        )}
                      />
                    )}
                  </button>
                ) : (
                  <Link
                    href={item.href!}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium hover:bg-muted",
                      isActive && "bg-primary text-primary-foreground",
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    {!isCollapsed && <span>{item.title}</span>}
                  </Link>
                )}

                {/* CHILDREN */}
                {hasChildren && isOpen && !isCollapsed && (
                  <div className="ml-6 mt-1 space-y-1 border-l pl-3">
                    {item.children!.map((child) => {
                      const ChildIcon = child.icon;
                      const childActive = pathname === child.href;

                      return (
                        <Link
                          key={child.href}
                          href={child.href!}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                            childActive
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
