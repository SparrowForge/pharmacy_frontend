"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

import { Eye, EyeOff, Loader2, ArrowRight, Pill } from "lucide-react";

import { toast } from "sonner";

import { useAuth } from "@/src/hooks/useAuth";
import { useShops } from "@/src/hooks/useShops";
import { useBranches } from "@/src/hooks/useBranches";
import { USER_ROLE_OPTIONS } from "@/src/constants/userRoles";

export default function RegisterForm() {
  const router = useRouter();

  const { registerUser, loading } = useAuth();
  const { fetchShops, shops } = useShops();
  const { fetchBranches, branches } = useBranches();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    role: "staff",
    shopId: "",
    branchId: "",
  });

  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    fetchShops();
    fetchBranches();
  }, []);

  const validate = () => {
    const err: any = {};
    if (!formData.fullName) err.fullName = "Full name required";
    if (!formData.email) err.email = "Email required";
    if (!formData.phone) err.phone = "Phone required";
    if (!formData.password || formData.password.length < 6)
      err.password = "Min 6 characters required";
    if (!formData.shopId) err.shopId = "Shop required";
    if (!formData.branchId) err.branchId = "Branch required";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await registerUser(formData);
      toast.success("Registration successful");
      router.push("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-8 bg-background">
      <div className="w-full max-w-md space-y-8">
        {/* HEADER */}
        <div className="text-center lg:text-left">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Create account
          </h2>
          <p className="text-muted-foreground">
            Register your pharmacy account
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* FULL NAME */}
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input
              className="h-12"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  fullName: e.target.value,
                })
              }
            />
            {errors.fullName && (
              <p className="text-sm text-red-500">{errors.fullName}</p>
            )}
          </div>

          {/* EMAIL */}
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              className="h-12"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* PHONE */}
          <div className="space-y-2">
            <Label>Phone</Label>
            <Input
              className="h-12"
              value={formData.phone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phone: e.target.value,
                })
              }
            />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div className="space-y-2">
            <Label>Password</Label>

            <div className="relative">
              <Input
                className="h-12 pr-12"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  })
                }
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          {/* ROLE */}
          <div className="space-y-2">
            <Label>Role</Label>

            <Select
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  role: value,
                })
              }
              defaultValue={formData.role}
            >
              <SelectTrigger className="h-12 w-full">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>

              <SelectContent>
                {USER_ROLE_OPTIONS.map((role) => (
                  <SelectItem key={role.value} value={role.value}>
                    {role.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* SHOP */}
          <div className="space-y-2">
            <Label>Shop</Label>

            <Select
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  shopId: value,
                })
              }
            >
              <SelectTrigger className="h-12 w-full">
                <SelectValue placeholder="Select shop" />
              </SelectTrigger>

              <SelectContent className="w-full">
                {shops?.map((shop) => (
                  <SelectItem key={shop.id} value={shop.id}>
                    {shop.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {errors.shopId && (
              <p className="text-sm text-red-500">{errors.shopId}</p>
            )}
          </div>

          {/* BRANCH */}
          <div className="space-y-2">
            <Label>Branch</Label>

            <Select
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  branchId: value,
                })
              }
            >
              <SelectTrigger className="h-12 w-full">
                <SelectValue placeholder="Select branch" />
              </SelectTrigger>

              <SelectContent className="w-full">
                {branches?.map((branch) => (
                  <SelectItem key={branch.id} value={branch.id}>
                    {branch.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {errors.branchId && (
              <p className="text-sm text-red-500">{errors.branchId}</p>
            )}
          </div>

          {/* SUBMIT */}
          <Button type="submit" className="w-full h-12" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                Create Account
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
        </form>

        {/* LOGIN LINK */}
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-primary">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
