"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { Badge } from "@/src/components/ui/badge";
import { cn } from "@/src/lib/utils";
import { Building2, MapPin, Users, Search, Crown } from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { shopService } from "@/src/services/shop.service";

import ShopDialogueForm from "@/src/components/shops/ShopDialogueForm";
import { useShops } from "@/src/hooks/useShops";
import {  initialLimit, initialPage } from "@/src/constants/utils";
import Loading from "@/src/components/common/Loading";

export default function ShopsPage() {
  const [page, setPage] = useState(initialPage);
  const [limit] = useState(initialLimit);
  const [search, setSearch] = useState("");
  const [includeDeleted, setIncludeDeleted] = useState(false);
  const { fetchShops } = useShops();
  const { shops,fetchLoading } = useAppSelector((state) => state.shops);

  useEffect(() => {
    fetchShops({
      page,
      limit,
      q: search,
      includeDeleted,
    });
  }, [fetchShops, page, limit, search, includeDeleted]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchShops();
    }, 400);

    return () => clearTimeout(timer);
  }, [fetchShops]);

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "enterprise":
        return "bg-purple-100 text-purple-700";
      case "business":
        return "bg-blue-100 text-blue-700";
      case "starter":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Crown className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Shop Management
            </h1>
            <p className="text-muted-foreground">
              Super Admin: Manage all pharmacy shops
            </p>
          </div>
        </div>
        <ShopDialogueForm />
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 gap-4">
        {[
          {
            label: "Total Shops",
            value: shops?.length,
            icon: Building2,
            color: "bg-primary/10 text-primary",
          },
          {
            label: "Active Shops",
            value: shops.length && shops?.filter((item) => item.status === "active").length,
            icon: Building2,
            color: "bg-green-500/10 text-green-500",
          },
        ].map((stat, index) => (
          <Card key={index} className="border-border">
            <CardContent className="p-6 flex items-center gap-4">
              <div
                className={cn(
                  "w-12 h-12 rounded-lg flex items-center justify-center",
                  stat.color,
                )}
              >
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search (UI only for now) */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />

        <Input
          placeholder="Search shops..."
          className="pl-10"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1); // reset page when searching
          }}
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={includeDeleted}
          onChange={(e) => {
            setIncludeDeleted(e.target.checked);
            setPage(1);
          }}
        />
        <label className="text-sm">Include Deleted</label>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Shops</CardTitle>
        </CardHeader>

        <CardContent>
          {fetchLoading ? (
            <Loading text="Loading data..." />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Shop</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead className="text-center">Branches</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {shops.length && shops?.map((shop) => (
                  <TableRow key={shop.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 flex items-center justify-center rounded">
                          <Building2 className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{shop.name}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {shop.city || "No city"}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div>
                        <p className="font-medium">{shop.owner_name}</p>
                        <p className="text-xs text-muted-foreground">
                          {shop.owner_email}
                        </p>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge className={cn(getPlanColor(shop.plan))}>
                        {shop.plan}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-center">
                      {shop.branch_limit}
                    </TableCell>

                    <TableCell>
                      <Badge
                        className={
                          shop.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }
                      >
                        {shop.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Pagination (basic ready) */}
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Prev
        </Button>

        <Button variant="outline" onClick={() => setPage((p) => p + 1)}>
          Next
        </Button>
      </div>
    </div>
  );
}
