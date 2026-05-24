"use client";

import Link from "next/link";

import { Construction, Home, ArrowLeft } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="items-center space-y-3">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <Construction className="h-8 w-8 text-muted-foreground" />
          </div>

          <CardTitle className="text-3xl">404</CardTitle>

          <CardDescription className="text-base">
            This page is under construction or not found.
            <br />
            Please try again later.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-3">
          <Link href="/">
            <Button className="w-full gap-2">
              <Home className="h-4 w-4" />
              Go Home
            </Button>
          </Link>

          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
