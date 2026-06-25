"use client";

import { useEffect, useState } from "react";

import { Building2, Search, MapPin, Mail, Phone } from "lucide-react";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";

import { useCompanies } from "@/src/hooks/useCompanies";
import { useAppSelector } from "@/src/redux/hooks";

import TableSkeleton from "@/src/components/common/TableSkeleton";

import { initialLimit, initialPage } from "@/src/constants/utils";
import Loading from "@/src/components/common/Loading";

export default function ManufacturersPage() {
  const [page, setPage] = useState(initialPage);
  const [search, setSearch] = useState("");

  const limit = initialLimit;

  const { fetchCompanies } = useCompanies();

  const { companies, fetchLoading } = useAppSelector(
    (state) => state.companies,
  );

  useEffect(() => {
    fetchCompanies({
      page,
      limit,
      q: search,
    });
  }, [fetchCompanies, page, limit, search]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700";
      case "inactive":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const manufacturers = companies.filter(
    (item) => item.company_type === "manufacturer",
  );

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Building2 className="w-6 h-6 text-primary" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Manufacturers
            </h1>

            <p className="text-muted-foreground">Manage all manufacturers</p>
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          Total Manufacturers:
          <span className="ml-1 font-medium text-foreground">
            {manufacturers.length}
          </span>
        </div>
      </div>

      {/* SEARCH */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />

        <Input
          placeholder="Search manufacturers..."
          className="pl-10"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>

      {/* LIST */}
      <Card>
        <CardHeader>
          <CardTitle>All Manufacturers</CardTitle>
        </CardHeader>

        <CardContent>
          {fetchLoading ? (
            <Loading text="loading data" />
          ) : manufacturers.length > 0 ? (
            <div className="space-y-4">
              {manufacturers.map((manufacturer) => (
                <Card
                  key={manufacturer.id}
                  className="border border-border/60 hover:border-primary/30 transition-all hover:shadow-sm"
                >
                  <CardContent className="p-5 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="space-y-3 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-muted-foreground" />

                          <h3 className="font-semibold">{manufacturer.name}</h3>
                        </div>

                        <Badge
                          className={`${getStatusColor(manufacturer.status)}`}
                        >
                          {manufacturer.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{manufacturer.city || "-"}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          <span>{manufacturer.email || "-"}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          <span>{manufacturer.phone || "-"}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-sm text-muted-foreground">
                      {manufacturer.contact_person || "No Contact"}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No manufacturers found
            </div>
          )}
        </CardContent>
      </Card>

      {/* PAGINATION */}
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Prev
        </Button>

        <Button
          variant="outline"
          disabled={companies.length < limit}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
