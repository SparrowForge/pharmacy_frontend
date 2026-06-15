"use client";

import { useEffect, useState } from "react";

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

import {
  Building2,
  MapPin,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
} from "lucide-react";

import { cn } from "@/src/lib/utils";
import { useAppSelector } from "@/src/redux/hooks";
import { useCompanies } from "@/src/hooks/useCompanies";

import { initialLimit, initialPage } from "@/src/constants/utils";

import Loading from "@/src/components/common/Loading";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import CompanyDialogueForm from "@/src/components/company/CompanyDialogueForm";
import TableSkeleton from "@/src/components/common/TableSkeleton";

export default function CompaniesPage() {
  const [page, setPage] = useState(initialPage);

  const [limit] = useState(initialLimit);

  const [search, setSearch] = useState("");

  const [includeDeleted, setIncludeDeleted] = useState(false);

  const [editCompanyId, setEditCompanyId] = useState<string | null>(null);

  const [openEdit, setOpenEdit] = useState(false);

  const { fetchCompanies, deleteCompany } = useCompanies();

  const { companies, fetchLoading } = useAppSelector(
    (state) => state.companies,
  );

  useEffect(() => {
    fetchCompanies({
      page,
      limit,
      q: search,
      includeDeleted,
    });
  }, [fetchCompanies, page, limit, search, includeDeleted]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCompanies();
    }, 500);

    return () => clearTimeout(timer);
  }, [fetchCompanies]);

  const companyTypeColorMap: Record<string, string> = {
    customer: "bg-blue-100 text-blue-700",
    supplier: "bg-green-100 text-green-700",
    manufacturer: "bg-purple-100 text-purple-700",
    distributor: "bg-yellow-100 text-yellow-800",
    pharmacy: "bg-pink-100 text-pink-700",
    wholesaler: "bg-indigo-100 text-indigo-700",
    retailer: "bg-orange-100 text-orange-700",
    doctor: "bg-teal-100 text-teal-700",
    hospital: "bg-red-100 text-red-700",
    clinic: "bg-cyan-100 text-cyan-700",
    other: "bg-gray-100 text-gray-700",
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Building2 className="w-6 h-6 text-primary" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Stakeholder Management
            </h1>

            <p className="text-muted-foreground">Manage all stakeholders</p>
          </div>
        </div>

        <CompanyDialogueForm
          companyId={editCompanyId}
          onClose={() => {
            setEditCompanyId(null);
            setOpenEdit(false);
          }}
        />
      </div>

      {/* SEARCH */}

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />

        <Input
          placeholder="Search stakeholders..."
          className="pl-10"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>

      {/* INCLUDE DELETE */}

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

      {/* TABLE */}

      <Card>
        <CardHeader>
          <CardTitle>All Stakeholders</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Stakeholder</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {fetchLoading ? (
                <TableSkeleton />
              ) : companies.length > 0 ? (
                companies.map((company) => (
                  <TableRow key={company.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 flex items-center justify-center rounded">
                          <Building2 className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{company.name}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {company.city || "No city"}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div>
                        <p className="font-medium">{company.contact_person}</p>

                        <p className="text-xs text-muted-foreground">
                          {company.email}
                        </p>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge
                        className={cn(
                          "capitalize",
                          companyTypeColorMap[company.company_type] ||
                            companyTypeColorMap.other,
                        )}
                      >
                        {company.company_type}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <Badge
                        className={
                          company.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }
                      >
                        {company.status}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setEditCompanyId(company.id);

                              setOpenEdit(true);
                            }}
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Stakeholder
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => deleteCompany(company.id)}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8">
                    No data found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
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

        <Button variant="outline" onClick={() => setPage((p) => p + 1)}>
          Next
        </Button>
      </div>
    </div>
  );
}
