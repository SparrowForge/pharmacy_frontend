// app/dashboard/regions/page.tsx

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

import { MoreHorizontal, Edit, Trash2, Search, Map } from "lucide-react";

import { useAppSelector } from "@/src/redux/hooks";

import Loading from "@/src/components/common/Loading";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";

import { initialLimit, initialPage } from "@/src/constants/utils";
import { useRegions } from "@/src/hooks/useRegion";
import RegionDialogueForm from "@/src/components/regions/RegionDialogueForm";

export default function RegionsPage() {
  const [page, setPage] = useState(initialPage);

  const [limit] = useState(initialLimit);

  const [search, setSearch] = useState("");

  const [includeDeleted, setIncludeDeleted] = useState(false);

  const [editRegionId, setEditRegionId] = useState<string | null>(null);

  const { fetchRegions, deleteRegion } = useRegions();

  const { regions, fetchLoading } = useAppSelector((state) => state.regions);

  useEffect(() => {
    fetchRegions({
      page,
      limit,
      q: search,
      includeDeleted,
    });
  }, [fetchRegions, page, limit, search, includeDeleted]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Map className="w-6 h-6 text-primary" />
          </div>

          <div>
            <h1 className="text-2xl font-bold">Region Management</h1>

            <p className="text-muted-foreground">Manage all regions</p>
          </div>
        </div>

        <RegionDialogueForm
          regionId={editRegionId}
          onClose={() => setEditRegionId(null)}
        />
      </div>

      {/* SEARCH */}

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />

        <Input
          placeholder="Search regions..."
          className="pl-10"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>

      {/* INCLUDE DELETED */}

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
          <CardTitle>All Regions</CardTitle>
        </CardHeader>

        <CardContent>
          {fetchLoading ? (
            <Loading text="Loading regions..." />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Region Name</TableHead>

                  <TableHead>Description</TableHead>

                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {regions.length > 0 &&
                  regions.map((region) => (
                    <TableRow key={region.id}>
                      <TableCell>{region.name}</TableCell>

                      <TableCell className="max-w-[300px] truncate">
                        {region.description}
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
                              onClick={() => setEditRegionId(region.id)}
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => deleteRegion(region.id)}
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
