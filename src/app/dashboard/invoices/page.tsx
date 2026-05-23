"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Badge } from "@/src/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { Plus, Search, Download, Printer, Eye, Trash2 } from "lucide-react";
import { toast } from "sonner";

// Sample invoice data
const sampleInvoices = [
  {
    id: "INV-20250502-001",
    customer: "John Doe",
    amount: 250.5,
    date: "2025-05-02",
    status: "paid",
    items: 5,
  },
  {
    id: "INV-20250502-002",
    customer: "Jane Smith",
    amount: 180.75,
    date: "2025-05-02",
    status: "pending",
    items: 3,
  },
  {
    id: "INV-20250501-001",
    customer: "Mike Johnson",
    amount: 420.0,
    date: "2025-05-01",
    status: "paid",
    items: 8,
  },
  {
    id: "INV-20250501-002",
    customer: "Sarah Brown",
    amount: 95.25,
    date: "2025-05-01",
    status: "cancelled",
    items: 2,
  },
  {
    id: "INV-20250430-001",
    customer: "Robert Lee",
    amount: 315.0,
    date: "2025-04-30",
    status: "paid",
    items: 6,
  },
];

export default function InvoicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedInvoice, setSelectedInvoice] = useState<
    (typeof sampleInvoices)[0] | null
  >(null);

  const filteredInvoices = useMemo(() => {
    return sampleInvoices.filter((invoice) => {
      const matchesSearch =
        invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invoice.customer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || invoice.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Invoices</h1>
          <p className="text-muted-foreground">
            Manage and track all sales invoices
          </p>
        </div>
        <Button asChild className="bg-primary hover:bg-primary/90">
          <Link href="/dashboard/invoices/new">
            <Plus className="w-4 h-4 mr-2" />
            New Invoice
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card className="border-border">
        <CardContent className="pt-6">
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <Label className="text-sm mb-2 block">
                Search Invoice or Customer
              </Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search invoice ID or customer name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-48">
              <Label className="text-sm mb-2 block">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Invoices</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Invoices Table */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle>Recent Invoices</CardTitle>
          <CardDescription>
            Total: {filteredInvoices.length} invoices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No invoices found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">
                        {invoice.id}
                      </TableCell>
                      <TableCell>{invoice.customer}</TableCell>
                      <TableCell className="text-right font-semibold">
                        ${invoice.amount.toFixed(2)}
                      </TableCell>
                      <TableCell>{invoice.items}</TableCell>
                      <TableCell>
                        {new Date(invoice.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={getStatusColor(invoice.status)}
                          variant="outline"
                        >
                          {invoice.status.charAt(0).toUpperCase() +
                            invoice.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setSelectedInvoice(invoice)}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Invoice {invoice.id}</DialogTitle>
                                <DialogDescription>
                                  Customer: {invoice.customer} | Amount: $
                                  {invoice.amount.toFixed(2)}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4 py-4">
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <p className="text-muted-foreground">
                                      Invoice Date
                                    </p>
                                    <p className="font-semibold">
                                      {new Date(
                                        invoice.date,
                                      ).toLocaleDateString()}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground">
                                      Status
                                    </p>
                                    <p className="font-semibold capitalize">
                                      {invoice.status}
                                    </p>
                                  </div>
                                </div>
                                <div className="border-t pt-4">
                                  <Button
                                    className="w-full gap-2"
                                    variant="outline"
                                  >
                                    <Printer className="w-4 h-4" />
                                    Print Invoice
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>

                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4" />
                          </Button>

                          <Button
                            size="sm"
                            variant="outline"
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
