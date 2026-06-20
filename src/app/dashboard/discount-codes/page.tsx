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

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";

import { MoreHorizontal, Edit, Trash2, Search, Ticket } from "lucide-react";

import Loading from "@/src/components/common/Loading";

import { useDiscountCodes } from "@/src/hooks/useDiscountCodes";

import { initialLimit, initialPage } from "@/src/constants/utils";
import DiscountCodeDialogForm from "@/src/components/discount-codes/DiscountCodeDialogForm";
import TableSkeleton from "@/src/components/common/TableSkeleton";

export default function DiscountCodesPage() {
  const [page, setPage] = useState(initialPage);
  const [limit] = useState(initialLimit);
  const [search, setSearch] = useState("");
  const [includeDeleted, setIncludeDeleted] = useState(false);

  const [editId, setEditId] = useState<string | null>(null);

  const { fetchDiscountCodes, deleteDiscountCode } = useDiscountCodes();

  const { discountCodes, fetchLoading } = useDiscountCodes();

  useEffect(() => {
    fetchDiscountCodes({
      page,
      limit,
      q: search,
      includeDeleted,
    });
  }, [page, limit, search, includeDeleted, fetchDiscountCodes]);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Ticket className="w-6 h-6 text-primary" />
          </div>

          <div>
            <h1 className="text-2xl font-bold">Discount Codes</h1>
            <p className="text-muted-foreground">Manage all discount coupons</p>
          </div>
        </div>

        <DiscountCodeDialogForm
          discountId={editId}
          onClose={() => setEditId(null)}
        />
      </div>

      {/* SEARCH */}
      <div className="flex gap-3 items-center max-w-md">
        <Search className="w-4 h-4 text-muted-foreground" />

        <Input
          placeholder="Search discount codes..."
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
          <CardTitle>All Discount Codes</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Max Usage</TableHead>
                <TableHead>Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {fetchLoading ? (
                <TableSkeleton />
              ) : discountCodes.length > 0 ? (
                discountCodes?.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.code}</TableCell>

                    <TableCell>{item.phar_discount_type}</TableCell>

                    <TableCell>{item.discount_value}</TableCell>

                    <TableCell>
                      {item.usage_count}/{item.max_usage}
                    </TableCell>

                    <TableCell>
                      {item.is_active ? "Active" : "Inactive"}
                    </TableCell>

                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setEditId(item.id)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            className="text-red-500"
                            onClick={() => deleteDiscountCode(item.id)}
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
