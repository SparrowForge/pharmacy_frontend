"use client";
import LeftComponent from "@/src/components/auth/LeftComponent";
import RegisterForm from "@/src/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex">
      <LeftComponent />
      <RegisterForm />
    </div>
  );
}