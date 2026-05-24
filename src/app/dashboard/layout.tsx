"use client";

import { useState } from "react";
import { Sidebar } from "@/src/components/dashboard/sidebar";
import { Header } from "@/src/components/dashboard/header";
import { Footer } from "@/src/components/landing/footer";
import { cn } from "@/src/lib/utils";
import ProtectedRoute from "@/src/components/auth/ProtectedRoute";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background flex flex-col">
        <Sidebar
          isCollapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        <Header sidebarCollapsed={sidebarCollapsed} />
        <main
          className={cn(
            "pt-16 flex-1 transition-all duration-300",
            sidebarCollapsed ? "pl-[72px]" : "pl-64",
          )}
        >
          <div className="p-6">{children}</div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
