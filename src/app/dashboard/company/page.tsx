
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Building2 className="w-6 h-6 text-primary" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Company Management
            </h1>

            <p className="text-muted-foreground">Manage all companies</p>
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
          placeholder="Search companies..."
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
          <CardTitle>All Companies</CardTitle>
        </CardHeader>

        <CardContent>
          {fetchLoading ? (
            <Loading text="Loading data..." />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>

                  <TableHead>Contact</TableHead>

                  <TableHead>Type</TableHead>

                  <TableHead>Status</TableHead>

                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {companies.length > 0 &&
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
                          <p className="font-medium">
                            {company.contact_person}
                          </p>

                          <p className="text-xs text-muted-foreground">
                            {company.email}
                          </p>
                        </div>
                      </TableCell>

                      <TableCell>
                        <Badge className={cn("capitalize")}>
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
                              Edit Company
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
                  ))}
              </TableBody>
            </Table>
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

        <Button variant="outline" onClick={() => setPage((p) => p + 1)}>
          Next
        </Button>
      </div>
    </div>
  );
}
