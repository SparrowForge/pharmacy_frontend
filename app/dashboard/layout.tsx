"use client"

import { useState } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { Footer } from "@/components/landing/footer"
import { cn } from "@/lib/utils"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <Header sidebarCollapsed={sidebarCollapsed} />
      <main
        className={cn(
          "pt-16 flex-1 transition-all duration-300",
          sidebarCollapsed ? "pl-[72px]" : "pl-64"
        )}
      >
        <div className="p-6">{children}</div>
      </main>
      <Footer />
    </div>
  )
}
