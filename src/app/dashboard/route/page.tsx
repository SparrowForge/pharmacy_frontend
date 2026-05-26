// app/dashboard/routes/page.tsx

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

import { MoreHorizontal, Edit, Trash2, Search, Route } from "lucide-react";

import { useRoutes } from "@/src/hooks/useRoutes";

import { useAppSelector } from "@/src/redux/hooks";

import Loading from "@/src/components/common/Loading";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";

import { initialLimit, initialPage } from "@/src/constants/utils";
import RouteDialogueForm from "@/src/components/route/RouteDialogueForm";

export default function RoutesPage() {
  const [page, setPage] = useState(initialPage);

  const [limit] = useState(initialLimit);

  const [search, setSearch] = useState("");

  const [includeDeleted, setIncludeDeleted] = useState(false);

  const [editRouteId, setEditRouteId] = useState<string | null>(null);

  const { fetchRoutes, deleteRoute } = useRoutes();

  const { routes, fetchLoading } = useAppSelector((state) => state.routes);

  useEffect(() => {
    fetchRoutes({
      page,
      limit,
      q: search,
      includeDeleted,
    });
  }, [fetchRoutes, page, limit, search, includeDeleted]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Route className="w-6 h-6 text-primary" />
          </div>

          <div>
            <h1 className="text-2xl font-bold">Route Management</h1>

            <p className="text-muted-foreground">Manage all routes</p>
          </div>
        </div>

        <RouteDialogueForm
          routeId={editRouteId}
          onClose={() => setEditRouteId(null)}
        />
      </div>

      {/* SEARCH */}

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />

        <Input
          placeholder="Search routes..."
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
          <CardTitle>All Routes</CardTitle>
        </CardHeader>

        <CardContent>
          {fetchLoading ? (
            <Loading text="Loading routes..." />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Route Name</TableHead>

                  <TableHead>Zone ID</TableHead>

                  <TableHead>Description</TableHead>

                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {routes.length > 0 &&
                  routes.map((route) => (
                    <TableRow key={route.id}>
                      <TableCell>{route.name}</TableCell>

                      <TableCell>{route.zone_id}</TableCell>

                      <TableCell className="max-w-[300px] truncate">
                        {route.description}
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
                              onClick={() => setEditRouteId(route.id)}
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => deleteRoute(route.id)}
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
