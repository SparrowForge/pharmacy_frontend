"use client";

import { useEffect, useState } from "react";

import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";

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

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";

import { MoreHorizontal, Edit, Trash2 } from "lucide-react";

import Loading from "@/src/components/common/Loading";
import ProductUnitDialog from "@/src/components/product-units/ProductUnitDialougeForm";

import { useProductUnits } from "@/src/hooks/useProductUnits";

export default function ProductUnitsPage() {
  const {
    units = [],
    page,
    limit,
    total,
    loading,
    fetchUnits,
    deleteUnit,
  } = useProductUnits();

  const [search, setSearch] = useState("");
  const [includeDeleted, setIncludeDeleted] = useState(false);

  const [editId, setEditId] = useState<string | null>(null);
  const [openEdit, setOpenEdit] = useState(false);

  /* FETCH */
  useEffect(() => {
    fetchUnits({
      page,
      limit,
      q: search,
      includeDeleted,
    });
  }, [fetchUnits, page, limit, search, includeDeleted]);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Product Units</h1>

        <ProductUnitDialog
          unitId={editId}
          onClose={() => {
            setEditId(null);
            setOpenEdit(false);
          }}
        />
      </div>

      {/* SEARCH + FILTER */}
      <div className="flex gap-4 items-center">
        <Input
          placeholder="Search units..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={includeDeleted}
            onChange={(e) => setIncludeDeleted(e.target.checked)}
          />
          Include Deleted
        </label>
      </div>

      {/* TABLE */}
      <Card>
        <CardHeader>
          <CardTitle>All Units</CardTitle>
        </CardHeader>

        <CardContent>
          {loading ? (
            <Loading text="Loading units..." />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Short Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {units.length > 0 &&
                  units.map((unit) => (
                    <TableRow key={unit.id}>
                      <TableCell className="font-medium">{unit.name}</TableCell>

                      <TableCell>{unit.short_name}</TableCell>

                      <TableCell>
                        {unit.is_delete ? (
                          <span className="text-red-500">Deleted</span>
                        ) : (
                          <span className="text-green-600">Active</span>
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
                            {/* EDIT */}
                            <DropdownMenuItem
                              onClick={() => {
                                setEditId(unit.id);
                                setOpenEdit(true);
                              }}
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>

                            {/* DELETE */}
                            <DropdownMenuItem
                              className="text-red-500"
                              onClick={() => deleteUnit(unit.id)}
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
          onClick={() =>
            fetchUnits({
              page: page - 1,
              limit,
              q: search,
              includeDeleted,
            })
          }
        >
          Prev
        </Button>

        <Button
          variant="outline"
          disabled={page * limit >= total}
          onClick={() =>
            fetchUnits({
              page: page + 1,
              limit,
              q: search,
              includeDeleted,
            })
          }
        >
          Next
        </Button>
      </div>
    </div>
  );
}
