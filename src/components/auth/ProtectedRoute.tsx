"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Loader2 } from "lucide-react";
import { useAuth } from "@/src/hooks/useAuth";
import { toast } from "sonner";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({
  children,
}: ProtectedRouteProps) {
  const router = useRouter();

  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("accessToken")
        : null;

      if (!loading && !token && !isAuthenticated) {
        toast.error("You must be logged in to access this page.");
      router.replace("/login");
    }
  }, [isAuthenticated, loading, router]);

  /* ---------------- LOADING ---------------- */

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  /* ---------------- NOT AUTHENTICATED ---------------- */

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("accessToken")
      : null;

  if (!token && !isAuthenticated) {
    toast.error("You must be logged in to access this page.");
    return null;
  }

  /* ---------------- AUTHORIZED ---------------- */

  return <>{children}</>;
}