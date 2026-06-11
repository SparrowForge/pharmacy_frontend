"use client";

import { useEffect, useState } from "react";

import { Search, FileText, Edit, Trash2, MoreHorizontal } from "lucide-react";

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

import Loading from "@/src/components/common/Loading";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

import { initialLimit, initialPage } from "@/src/constants/utils";
import { useSalesInvoice } from "@/src/hooks/useSalesInvoice";
import { useCompanies } from "@/src/hooks/useCompanies";
import SalesInvoiceDialogForm from "@/src/components/invoices/SalesInvoiceDialogForm";
import { InvoiceModal } from "@/src/components/pos/InvoiceModal";

export default function SalesInvoicesPage() {
  const [page, setPage] = useState(initialPage);
  const [limit] = useState(initialLimit);
  const [search, setSearch] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [status, setStatus] = useState("");
  const [includeDeleted, setIncludeDeleted] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const [printId, setPrintId] = useState<string | null>(null);
  const [printOpen, setPrintOpen] = useState(false);

  const {
    salesInvoices,
    fetchLoading,
    fetchSalesInvoices,
    deleteSalesInvoice,
    fetchSingleSalesInvoice,
    singleSalesInvoice,
  } = useSalesInvoice();

  const { companies, fetchCompanies } = useCompanies();

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  useEffect(() => {
    const params: any = {
      page,
      limit,
    };

    if (search) params.q = search;
    if (customerId) params.customer_id = customerId;
    if (status) params.status = status;
    if (typeof includeDeleted === "boolean") {
      params.includeDeleted = includeDeleted;
    }

    fetchSalesInvoices(params);
  }, [
    page,
    limit,
    search,
    customerId,
    status,
    includeDeleted,
    fetchSalesInvoices,
  ]);
  const customers = companies.filter(
    (item) => item.company_type === "customer",
  );

  const handlePrintInvoice = async (id: string) => {
    await fetchSingleSalesInvoice(id);
    setPrintId(id);
    setPrintOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <FileText className="w-6 h-6 text-primary" />
          </div>

          <div>
            <h1 className="text-2xl font-bold">Sales Invoices</h1>

            <p className="text-muted-foreground">Manage sales invoices</p>
          </div>
        </div>

        <SalesInvoiceDialogForm
          invoiceId={editId}
          onClose={() => setEditId(null)}
        />
      </div>

      {/* FILTERS */}

      <div className="grid md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

          <Input
            placeholder="Search..."
            value={search}
            className="pl-10"
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>

        <Select value={customerId} onValueChange={setCustomerId}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Customer" />
          </SelectTrigger>

          <SelectContent>
            {customers.map((customer) => (
              <SelectItem key={customer.id} value={customer.id}>
                {customer.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={includeDeleted}
            onChange={(e) => setIncludeDeleted(e.target.checked)}
          />

          <span className="text-sm">Include Deleted</span>
        </div>
      </div>

      {/* TABLE */}

      <Card>
        <CardHeader>
          <CardTitle>Sales Invoice List</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Sale Type</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Paid</TableHead>
                <TableHead>Due</TableHead>
                <TableHead>Date</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>

            <TableBody>
              {/* LOADING STATE */}
              {fetchLoading ? (
                <TableRow>
                  <TableCell className="text-center py-10">
                    <div className="flex justify-center items-center">
                      <span className="animate-pulse text-muted-foreground">
                        Loading invoices...
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : /* EMPTY STATE */
              salesInvoices.length === 0 ? (
                <TableRow>
                  <TableCell className="text-center py-10 text-muted-foreground">
                    No invoices found
                  </TableCell>
                </TableRow>
              ) : (
                /* DATA ROWS */
                salesInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell>{invoice.invoice_number}</TableCell>
                    <TableCell>{invoice.customer_name}</TableCell>
                    <TableCell>{invoice.status}</TableCell>
                    <TableCell>{invoice.sale_type}</TableCell>
                    <TableCell>{invoice.total_amount}</TableCell>
                    <TableCell>{invoice.paid_amount}</TableCell>
                    <TableCell>{invoice.due_amount}</TableCell>
                    <TableCell>
                      {new Date(invoice.invoice_date).toLocaleDateString()}
                    </TableCell>

                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          {/* <DropdownMenuItem
                            onClick={() => setEditId(invoice.id)}
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => deleteSalesInvoice(invoice.id)}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem> */}

                          <DropdownMenuItem
                            onClick={() => handlePrintInvoice(invoice.id)}
                          >
                            <FileText className="w-4 h-4 mr-2" />
                            Print Invoice
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Prev
        </Button>

        <Button variant="outline" onClick={() => setPage((prev) => prev + 1)}>
          Next
        </Button>
      </div>

      <InvoiceModal
        open={printOpen}
        onOpenChange={setPrintOpen}
        invoice={singleSalesInvoice}
      />
    </div>
  );
}
