"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";

export function SalesWatch() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card className="w-full max-w-sm shadow-md border border-muted/40">
      <CardHeader className="">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Current Time
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="text-3xl font-bold tracking-tight">
          {formatTime(time)}
        </div>

        <div className="text-sm text-muted-foreground">{formatDate(time)}</div>

        <div className="flex gap-2">
          <Badge variant="secondary">Live</Badge>
          <Badge variant="outline">Sales Dashboard</Badge>
        </div>
      </CardContent>
    </Card>
  );
}
