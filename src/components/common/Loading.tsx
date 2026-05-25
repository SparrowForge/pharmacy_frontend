"use client";

import { Loader2 } from "lucide-react";

interface LoadingProps {
  text?: string;
}

export default function Loading({ text = "Loading..." }: LoadingProps) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3 rounded-lg bg-background px-6 py-5 shadow-lg">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">{text}</p>
      </div>
    </div>
  );
}