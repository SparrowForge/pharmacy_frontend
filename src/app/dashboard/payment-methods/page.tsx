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

import { MoreHorizontal, Edit, Trash2, Search, CreditCard } from "lucide-react";

import Loading from "@/src/components/common/Loading";

import { usePaymentMethods } from "@/src/hooks/usePaymentMethods";

import { initialLimit, initialPage } from "@/src/constants/utils";
import PaymentMethodDialogForm from "@/src/components/payment-methods/PaymentMethodDialogForm";

export default function PaymentMethodsPage() {
  const [page, setPage] = useState(initialPage);
  const [limit] = useState(initialLimit);
  const [search, setSearch] = useState("");
  const [includeDeleted, setIncludeDeleted] = useState(false);

  const [editId, setEditId] = useState<string | null>(null);

  const {
    fetchPaymentMethods,
    deletePaymentMethod,
    paymentMethods,
    fetchLoading,
  } = usePaymentMethods();

  useEffect(() => {
    fetchPaymentMethods({
      page,
      limit,
      q: search,
      includeDeleted,
    });
  }, [page, limit, search, includeDeleted, fetchPaymentMethods]);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <CreditCard className="w-6 h-6 text-primary" />
          </div>

          <div>
            <h1 className="text-2xl font-bold">Payment Methods</h1>
            <p className="text-muted-foreground">Manage all payment methods</p>
          </div>
        </div>

        <PaymentMethodDialogForm
          paymentId={editId}
          onClose={() => setEditId(null)}
        />
      </div>

      {/* SEARCH */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />

        <Input
          placeholder="Search payment methods..."
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
          <CardTitle>All Payment Methods</CardTitle>
        </CardHeader>

        <CardContent>
          {fetchLoading ? (
            <Loading text="Loading payment methods..." />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {paymentMethods?.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium flex items-center gap-2">
                      {item.icon && (
                        <img
                          src={item.icon}
                          alt={item.name}
                          className="w-6 h-6 rounded"
                        />
                      )}
                      {item.name}
                    </TableCell>

                    <TableCell>{item.method_type}</TableCell>

                    <TableCell className="max-w-[300px] truncate">
                      {item.description}
                    </TableCell>

                    <TableCell>
                      {item.is_active ? (
                        <span className="text-green-600 font-medium">
                          Active
                        </span>
                      ) : (
                        <span className="text-red-500 font-medium">
                          Inactive
                        </span>
                      )}
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
                            onClick={() => deletePaymentMethod(item.id)}
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
