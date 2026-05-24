"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Badge } from "@/src/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import {
  Search,
  Bell,
  Sun,
  Moon,
  User,
  Settings,
  LogOut,
  AlertTriangle,
  Package,
  Clock,
  CheckCircle,
  KeyRound,
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/hooks/useAuth";
import { useCurrentUser } from "@/src/hooks/useCurrentUser";

const notifications = [
  {
    id: 1,
    type: "warning",
    title: "Low Stock Alert",
    description: "Amoxicillin 500mg is running low (23 units)",
    time: "5 min ago",
    read: false,
  },
  {
    id: 2,
    type: "info",
    title: "New Order",
    description: "Order #1234 received from John Doe",
    time: "15 min ago",
    read: false,
  },
  {
    id: 3,
    type: "success",
    title: "Delivery Completed",
    description: "Order #1230 has been delivered successfully",
    time: "1 hour ago",
    read: true,
  },
  {
    id: 4,
    type: "warning",
    title: "Expiry Warning",
    description: "5 medicines expiring within 30 days",
    time: "2 hours ago",
    read: true,
  },
];

interface HeaderProps {
  sidebarCollapsed: boolean;
}

export function Header({ sidebarCollapsed }: HeaderProps) {
  const router = useRouter();
  const { logoutUser } = useAuth();
  const user = useCurrentUser();

  const [isDarkMode, setIsDarkMode] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      case "info":
        return <Package className="w-4 h-4 text-blue-500" />;
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const initials =
    user?.fullName
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  const role =
    user?.role
      ?.replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase()) || "Role";

  return (
    <header
      className={cn(
        "fixed top-0 right-0 z-30 h-16 bg-gradient-to-r from-primary via-primary/80 to-primary/60 text-primary-foreground backdrop-blur-sm border-b border-primary/20 transition-all duration-300 animate-gradient",
        sidebarCollapsed ? "left-[72px]" : "left-64",
      )}
    >
      <div className="flex items-center justify-between h-full px-6">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-foreground/70" />
            <Input
              type="search"
              placeholder="Search medicines, customers, orders..."
              className="pl-10 h-10 bg-primary-foreground/10 border-primary-foreground/20 focus:border-primary-foreground/40 text-primary-foreground placeholder:text-primary-foreground/50"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex h-5 items-center gap-1 rounded border bg-primary-foreground/10 border-primary-foreground/20 px-1.5 text-[10px] font-medium text-primary-foreground/70">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Dark Mode */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="h-10 w-10 text-primary-foreground hover:bg-primary-foreground/20"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </Button>

          {/* Notifications (UNCHANGED) */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 relative text-primary-foreground hover:bg-primary-foreground/20"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-destructive text-destructive-foreground text-[10px] font-medium rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="flex items-center justify-between">
                <span>Notifications</span>
                {unreadCount > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {unreadCount} new
                  </Badge>
                )}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    className={cn(
                      "flex items-start gap-3 p-3 cursor-pointer",
                      !notification.read && "bg-muted/50",
                    )}
                  >
                    <div className="mt-0.5">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {notification.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {notification.description}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {notification.time}
                      </div>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    )}
                  </DropdownMenuItem>
                ))}
              </div>

              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-center text-sm text-primary cursor-pointer">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Profile (FIXED) */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-10 gap-2 px-2 text-primary-foreground hover:bg-primary-foreground/20"
              >
                <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary-foreground">
                    {initials}
                  </span>
                </div>

                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium leading-none text-primary-foreground">
                    {user?.fullName || "User"}
                  </p>
                  <p className="text-xs text-primary-foreground/70">
                    {role}
                  </p>
                </div>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">
                    {user?.fullName || "User"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {user?.email || "user@email.com"}
                  </p>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <Link href="/dashboard/profile" className="cursor-pointer">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings" className="cursor-pointer">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href="/dashboard/change-password" className="cursor-pointer">
                  <KeyRound className="w-4 h-4 mr-2" />
                  Change Password
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => logoutUser()}
                className="text-destructive focus:text-destructive cursor-pointer"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}