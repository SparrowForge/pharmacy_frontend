"use client";

import { useEffect, useState } from "react";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Badge } from "@/src/components/ui/badge";
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

import { Search, MoreHorizontal, Edit, Trash2, Package } from "lucide-react";

import { useProductUnits } from "@/src/hooks/useProductUnits";
import { initialLimit, initialPage } from "@/src/constants/utils";

import Loading from "@/src/components/common/Loading";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import ProductUnitDialogForm from "@/src/components/product-units/ProductUnitDialougeForm";
import TableSkeleton from "@/src/components/common/TableSkeleton";

export default function ProductUnitsPage() {
  const [page, setPage] = useState(initialPage);
  const [limit] = useState(initialLimit);
  const [search, setSearch] = useState("");
  const [includeDeleted, setIncludeDeleted] = useState(false);

  const [editId, setEditId] = useState<string | null>(null);

  const { fetchProductUnits, deleteProductUnit, units, fetchLoading } =
    useProductUnits();

  /* ================= FETCH ================= */
  useEffect(() => {
    fetchProductUnits({
      page,
      limit,
      q: search,
      includeDeleted,
    });
  }, [page, limit, search, includeDeleted, fetchProductUnits]);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary/10 flex items-center justify-center rounded-xl">
            <Package className="w-6 h-6 text-primary" />
          </div>

          <div>
            <h1 className="text-2xl font-bold">Product Units</h1>
            <p className="text-muted-foreground">
              Manage unit types and conversions
            </p>
          </div>
        </div>

        <ProductUnitDialogForm
          unitId={editId}
          onClose={() => setEditId(null)}
        />
      </div>

      {/* SEARCH + FILTER */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />

          <Input
            className="pl-10"
            placeholder="Search units..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={includeDeleted}
            onChange={(e) => {
              setIncludeDeleted(e.target.checked);
              setPage(1);
            }}
          />
          Include Deleted
        </label>
      </div>

      {/* TABLE */}
      <Card>
        <CardHeader>
          <CardTitle>All Product Units</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Short Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Conversion</TableHead>
                <TableHead>Default</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {fetchLoading ? (
                <TableSkeleton />
              ) : units.length > 0 ? (
                units?.map((unit) => (
                  <TableRow key={unit.id}>
                    {/* NAME */}
                    <TableCell>
                      <div>
                        <p className="font-medium">{unit.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {unit.description || "No description"}
                        </p>
                      </div>
                    </TableCell>

                    {/* SHORT NAME */}
                    <TableCell>{unit.short_name}</TableCell>

                    {/* TYPE */}
                    <TableCell>
                      <Badge variant="secondary">{unit.unit_type}</Badge>
                    </TableCell>

                    {/* CONVERT RATE */}
                    <TableCell>{unit.convert_rate}</TableCell>

                    {/* DEFAULT */}
                    <TableCell>
                      {unit.is_deafult_unit ? (
                        <Badge className="bg-green-100 text-green-700">
                          Default
                        </Badge>
                      ) : (
                        <Badge variant="outline">No</Badge>
                      )}
                    </TableCell>

                    {/* ACTIONS */}
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setEditId(unit.id)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            className="text-red-500"
                            onClick={() => deleteProductUnit(unit.id)}
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
                  <TableCell colSpan={7} className="text-center py-8">
                    No purchase orders found
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
