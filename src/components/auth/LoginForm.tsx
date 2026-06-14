"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Checkbox } from "@/src/components/ui/checkbox";

import { Eye, EyeOff, Loader2, ArrowRight, Pill } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/src/hooks/useAuth";

export default function LoginForm() {
  const router = useRouter();
  const { loginUser, loading } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState<"email" | "otp">("email");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phone: "",
    remember: false,
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    phone: "",
  });

  const validateForm = () => {
    const newErrors = { email: "", password: "", phone: "" };
    let isValid = true;

    if (loginMethod === "email") {
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Enter a valid email";
        isValid = false;
      }

      if (!formData.password.trim()) {
        newErrors.password = "Password is required";
        isValid = false;
      } else if (formData.password.length <= 8) {
        newErrors.password = "Password must be at least 8 characters";
        isValid = false;
      }
    }

    if (loginMethod === "otp") {
      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (loginMethod === "email") {
        await loginUser({
          email: formData.email,
          password: formData.password,
        });

        router.push("/dashboard");
      } else {
        toast.success("OTP functionality coming soon");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-8 bg-background">
      <div className="w-full max-w-md space-y-8">
        {/* Mobile Logo */}
        <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary">
            <Pill className="w-5 h-5 text-primary-foreground" />
          </div>

          <span className="text-xl font-semibold text-foreground">
            Pharma<span className="text-primary">Smart</span>
          </span>
        </div>

        {/* Header */}
        <div className="text-center lg:text-left">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Welcome back
          </h2>

          <p className="text-muted-foreground">
            Sign in to your account to continue
          </p>
        </div>

        {/* Tabs */}
        <div className="flex p-1 bg-muted rounded-lg">
          <button
            type="button"
            onClick={() => setLoginMethod("email")}
            className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-colors ${
              loginMethod === "email"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Email & Password
          </button>

          <button
            type="button"
            onClick={() => setLoginMethod("otp")}
            className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-colors ${
              loginMethod === "otp"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            OTP Login
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {loginMethod === "email" ? (
            <>
              <div className="space-y-2">
                <Label>Email or Phone</Label>
                <Input
                  name="email"
                  type="text"
                  placeholder="you@pharmacy.com"
                  className="h-12"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Password</Label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-primary"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="h-12 pr-12"
                    value={formData.password}
                    onChange={handleChange}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>

                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={formData.remember}
                  onCheckedChange={(checked) =>
                    setFormData((p) => ({
                      ...p,
                      remember: checked === true,
                    }))
                  }
                />
                <label className="text-sm text-muted-foreground">
                  Remember me for 30 days
                </label>
              </div>
            </>
          ) : (
            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input
                name="phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                className="h-12"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone}</p>
              )}
            </div>
          )}

          <Button
            type="submit"
            className="w-full h-12 bg-primary hover:bg-primary/90"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin w-5 h-5 mr-2" />
                Signing in...
              </>
            ) : (
              <>
                {loginMethod === "email" ? "Sign In" : "Send OTP"}
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="border-t w-full border-border" />
          </div>

          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        {/* Google */}
        <Button variant="outline" className="w-full h-12">
          Continue with Google
        </Button>

        {/* Signup */}
        <p className="text-center text-sm text-muted-foreground">
          Don’t have an account?{" "}
          <Link href="/register" className="text-primary font-medium">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}
