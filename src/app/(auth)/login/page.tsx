"use client";
import LeftComponent from "@/src/components/auth/LeftComponent";
import LoginForm from "@/src/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      <LeftComponent />
      <LoginForm />
    </div>
  );
}