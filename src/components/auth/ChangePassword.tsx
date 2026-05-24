"use client";

import { useState } from "react";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/src/components/ui/input-otp";

import {
  Loader2,
  ArrowRight,
  KeyRound,
  Check,
} from "lucide-react";

import { toast } from "sonner";

type Step = "email" | "code" | "reset" | "success";

export default function ChangePassword() {
  const [step, setStep] = useState<Step>("email");
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // STEP 1: SEND EMAIL
  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return toast.error("Email is required");

    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);

    toast.success("Reset code sent");
    setStep("code");
  };

  // STEP 2: VERIFY CODE
  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!code || code.length < 4) {
      return toast.error("Invalid code");
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);

    setStep("reset");
  };

  // STEP 3: RESET PASSWORD
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password) return toast.error("Password required");

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);

    setStep("success");
    toast.success("Password reset successful");
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-card border rounded-xl p-6 shadow-sm">

        {/* HEADER */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold">
            {step === "email" && "Forgot Password"}
            {step === "code" && "Verify Code"}
            {step === "reset" && "Set New Password"}
            {step === "success" && "Completed"}
          </h2>

          <p className="text-sm text-muted-foreground mt-1">
            {step === "email" && "Enter email to receive reset code"}
            {step === "code" && `Code sent to ${email}`}
            {step === "reset" && "Create new secure password"}
            {step === "success" && "Password updated successfully"}
          </p>
        </div>

        {/* STEP 1 */}
        {step === "email" && (
          <form onSubmit={handleSendEmail} className="space-y-4">
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                className="h-12"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@pharmacy.com"
              />
            </div>

            <Button className="w-full h-12" disabled={loading}>
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  Send Code <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>
        )}

        {/* STEP 2 */}
        {step === "code" && (
          <form onSubmit={handleVerifyCode} className="space-y-5">
            <div className="text-sm text-muted-foreground">
              Enter code sent to <b>{email}</b>
            </div>

            <div className="flex justify-center">
              <InputOTP value={code} onChange={setCode} maxLength={6}>
                <InputOTPGroup>
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <InputOTPSlot key={i} index={i} className="w-10 h-12" />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>

            <Button className="w-full h-12" disabled={loading}>
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  Verify Code <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>
        )}

        {/* STEP 3 */}
        {step === "reset" && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <KeyRound className="w-4 h-4" />
              Reset password for <b>{email}</b>
            </div>

            <div>
              <Label>New Password</Label>
              <Input
                type="password"
                className="h-12"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <Label>Confirm Password</Label>
              <Input
                type="password"
                className="h-12"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
              />
            </div>

            <Button className="w-full h-12" disabled={loading}>
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Reset Password"
              )}
            </Button>
          </form>
        )}

        {/* SUCCESS */}
        {step === "success" && (
          <div className="text-center py-6 space-y-3">
            <div className="w-14 h-14 mx-auto rounded-full bg-green-100 flex items-center justify-center">
              <Check className="w-6 h-6 text-green-600" />
            </div>

            <h3 className="font-semibold">
              Password Updated
            </h3>

            <p className="text-sm text-muted-foreground">
              You can now continue using the system
            </p>
          </div>
        )}
      </div>
    </div>
  );
}