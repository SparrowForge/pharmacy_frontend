import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Authentication - PharmaSmart",
  description: "Sign in or create an account to access PharmaSmart",
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
