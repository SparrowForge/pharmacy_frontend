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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";

import {
  Building2,
  MapPin,
  Search,
  GitBranch,
  MoreHorizontal,
  Edit,
  Trash2,
  Phone,
  Mail,
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import { useAppSelector } from "@/src/redux/hooks";
import { initialLimit, initialPage } from "@/src/constants/utils";
import Loading from "@/src/components/common/Loading";
import { useBranches } from "@/src/hooks/useBranches";

export default function BranchesPage() {
  const [page, setPage] = useState(initialPage);
  const [limit] = useState(initialLimit);

  const [search, setSearch] = useState("");

  const [includeDeleted, setIncludeDeleted] = useState(false);

  const [editBranchId, setEditBranchId] = useState<string | null>(null);

  const [openEdit, setOpenEdit] = useState(false);

  const { fetchBranches } = useBranches();
  const { branches, fetchLoading } = useAppSelector((state) => state.branch);

  useEffect(() => {
    fetchBranches({
      page,
      limit,
      q: search,
      includeDeleted,
    });
  }, [fetchBranches, page, limit, search, includeDeleted]);

useEffect(() => {
  const timer = setTimeout(() => {
    fetchBranches({
      page,
      limit,
      q: search,
      includeDeleted,
    });
  }, 1000);

  return () => clearTimeout(timer);
}, [fetchBranches, page, limit, search, includeDeleted]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <GitBranch className="w-6 h-6 text-primary" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Branch Management
            </h1>

            <p className="text-muted-foreground">
              Manage all pharmacy branches
            </p>
          </div>
        </div>

        {/* <BranchDialogueForm
          branchId={editBranchId}
          open={openEdit}
          onClose={() => {
            setEditBranchId(null);
            setOpenEdit(false);
          }}
        /> */}
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />

        <Input
          placeholder="Search branches..."
          className="pl-10"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>

      {/* Include Deleted */}
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
          <CardTitle>All Branches</CardTitle>
        </CardHeader>

        <CardContent>
          {fetchLoading ? (
            <Loading text="Loading branches..." />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Branch</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {branches?.length ? (
                  branches.map((branch) => (
                    <TableRow key={branch.id}>
                      {/* Branch */}
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded flex items-center justify-center">
                            <Building2 className="w-5 h-5 text-primary" />
                          </div>

                          <div>
                            <p className="font-medium">{branch.name}</p>

                            <p className="text-xs text-muted-foreground">
                              ID: {branch.id}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      {/* Contact */}
                      <TableCell>
                        <div className="space-y-1">
                          <p className="text-sm flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {branch.email || "No email"}
                          </p>

                          <p className="text-sm flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {branch.phone || "No phone"}
                          </p>
                        </div>
                      </TableCell>

                      {/* Location */}
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4" />

                          {branch.city || "No city"}
                        </div>
                      </TableCell>

                      {/* Status */}
                      <TableCell>
                        <Badge
                          className={cn(
                            branch.status === "active"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700",
                          )}
                        >
                          {branch.status}
                        </Badge>
                      </TableCell>

                      {/* Actions */}
                      <TableCell>
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
                                setEditBranchId(branch.id);
                                setOpenEdit(true);
                              }}
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Branch
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              className="text-destructive"
                              // onClick={() => deleteBranch(branch.id)}
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
                    <TableCell
                      colSpan={5}
                      className="text-center py-10 text-muted-foreground"
                    >
                      No branches found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
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
