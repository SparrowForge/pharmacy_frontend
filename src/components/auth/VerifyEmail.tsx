"use client";

import { useEffect, useState } from "react";
import {
  useSearchParams,
  useRouter,
} from "next/navigation";

import {
  Card,
  CardContent,
} from "@/src/components/ui/card";

import { Button } from "@/src/components/ui/button";

import {
  Loader2,
  CheckCircle,
  XCircle,
} from "lucide-react";

import { useAuth } from "@/src/hooks/useAuth";

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const {
    verifyEmailUser,
    resendVerificationEmailUser,
    loading,
  } = useAuth();

  const [status, setStatus] = useState<
    "loading" | "success" | "error"
  >("loading");

  const [message, setMessage] = useState("");

  const [email, setEmail] = useState("");

  /* ---------------- VERIFY ---------------- */

  useEffect(() => {
    const token = searchParams.get("token");
    const emailFromUrl =
      searchParams.get("email") || "";

    setEmail(emailFromUrl);

    if (!token) {
      setStatus("error");
      setMessage(
        "Invalid or missing verification token"
      );
      return;
    }

    const verify = async () => {
      try {
        const res =
          await verifyEmailUser({
            token,
          });

        setStatus("success");

        setMessage(
          res.message ||
            "Email verified successfully"
        );
      } catch (err: any) {
        setStatus("error");

        setMessage(
          err?.response?.data?.message ||
            "Verification failed"
        );
      }
    };

    verify();
  }, [searchParams, verifyEmailUser]);

  /* ---------------- RESEND ---------------- */

  const handleResend = async () => {
    if (!email) return;

    try {
      await resendVerificationEmailUser({
        email,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-8 bg-background">
      <div className="w-full max-w-md">

        <Card className="w-full shadow-sm border">
          <CardContent className="p-6 text-center space-y-4">

            {/* LOADING */}
            {status === "loading" && (
              <>
                <Loader2 className="w-10 h-10 mx-auto animate-spin text-primary" />

                <h2 className="text-xl font-semibold">
                  Verifying your email...
                </h2>

                <p className="text-muted-foreground text-sm">
                  Please wait while we verify
                  your account
                </p>
              </>
            )}

            {/* SUCCESS */}
            {status === "success" && (
              <>
                <CheckCircle className="w-10 h-10 mx-auto text-green-500" />

                <h2 className="text-xl font-semibold text-green-600">
                  Verified Successfully
                </h2>

                <p className="text-muted-foreground text-sm">
                  {message}
                </p>

                <Button
                  className="w-full"
                  onClick={() =>
                    router.push("/login")
                  }
                >
                  Go to Login
                </Button>
              </>
            )}

            {/* ERROR */}
            {status === "error" && (
              <>
                <XCircle className="w-10 h-10 mx-auto text-red-500" />

                <h2 className="text-xl font-semibold text-red-600">
                  Verification Failed
                </h2>

                <p className="text-muted-foreground text-sm">
                  {message}
                </p>

                {/* RESEND BUTTON */}
                {email && (
                  <Button
                    className="w-full"
                    onClick={handleResend}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Resending...
                      </>
                    ) : (
                      "Resend Verification Email"
                    )}
                  </Button>
                )}

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                    router.push("/login")
                  }
                >
                  Back to Login
                </Button>
              </>
            )}

          </CardContent>
        </Card>

      </div>
    </div>
  );
}