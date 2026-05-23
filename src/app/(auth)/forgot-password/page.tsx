"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/src/components/ui/input-otp"
import { Pill, Loader2, ArrowLeft, ArrowRight, Check, Eye, EyeOff, Mail } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/src/lib/utils"

type Step = "email" | "otp" | "reset" | "success"

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<Step>("email")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [otp, setOtp] = useState("")

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    toast.success("Reset code sent to your email!")
    setStep("otp")
  }

  const handleOtpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (otp.length !== 6) {
      toast.error("Please enter the complete verification code")
      return
    }
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    setStep("reset")
  }

  const handleResetSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    setStep("success")
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-background">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary">
            <Pill className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-semibold text-foreground">
            Pharma<span className="text-primary">Smart</span>
          </span>
        </Link>

        {/* Card */}
        <div className="p-8 rounded-2xl bg-card border border-border shadow-sm">
          {step === "email" && (
            <>
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Forgot Password?
                </h2>
                <p className="text-muted-foreground text-sm">
                  Enter your email and we&apos;ll send you a reset code
                </p>
              </div>

              <form onSubmit={handleEmailSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@pharmacy.com"
                    required
                    className="h-12"
                    autoFocus
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-primary hover:bg-primary/90"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Reset Code
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </>
          )}

          {step === "otp" && (
            <>
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Enter Verification Code
                </h2>
                <p className="text-muted-foreground text-sm">
                  We sent a 6-digit code to your email
                </p>
              </div>

              <form onSubmit={handleOtpSubmit} className="space-y-6">
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={otp}
                    onChange={(value) => setOtp(value)}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} className="w-12 h-14 text-lg" />
                      <InputOTPSlot index={1} className="w-12 h-14 text-lg" />
                      <InputOTPSlot index={2} className="w-12 h-14 text-lg" />
                      <InputOTPSlot index={3} className="w-12 h-14 text-lg" />
                      <InputOTPSlot index={4} className="w-12 h-14 text-lg" />
                      <InputOTPSlot index={5} className="w-12 h-14 text-lg" />
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-primary hover:bg-primary/90"
                  disabled={isLoading || otp.length !== 6}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      Verify Code
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  Didn&apos;t receive a code?{" "}
                  <button
                    type="button"
                    className="text-primary hover:text-primary/80 font-medium"
                    onClick={() => toast.success("New code sent!")}
                  >
                    Resend
                  </button>
                </p>
              </form>
            </>
          )}

          {step === "reset" && (
            <>
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Create New Password
                </h2>
                <p className="text-muted-foreground text-sm">
                  Your new password must be different from previous ones
                </p>
              </div>

              <form onSubmit={handleResetSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="password">New Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      required
                      className="h-12 pr-12"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm new password"
                    required
                    className="h-12"
                  />
                </div>

                <ul className="text-xs text-muted-foreground space-y-1">
                  <li className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-green-500" />
                    At least 8 characters
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-green-500" />
                    One uppercase letter
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-green-500" />
                    One number or special character
                  </li>
                </ul>

                <Button
                  type="submit"
                  className="w-full h-12 bg-primary hover:bg-primary/90"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Resetting...
                    </>
                  ) : (
                    <>
                      Reset Password
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </>
          )}

          {step === "success" && (
            <div className="text-center py-8">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Password Reset Successful
              </h2>
              <p className="text-muted-foreground text-sm mb-6">
                Your password has been successfully reset. You can now sign in with your new password.
              </p>
              <Button asChild className="w-full h-12 bg-primary hover:bg-primary/90">
                <Link href="/login">
                  Sign In
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          )}
        </div>

        {/* Back to Login */}
        {step !== "success" && (
          <div className="mt-6 text-center">
            <Link
              href="/login"
              className={cn(
                "inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              )}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to login
            </Link>
          </div>
        )}

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-8">
          &copy; 2026 PharmaSmart by Sparrow Forge Ltd. All rights reserved.
        </p>
      </div>
    </div>
  )
}
