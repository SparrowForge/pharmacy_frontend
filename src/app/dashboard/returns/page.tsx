"use client";

import { useState } from "react";
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
import { Checkbox } from "@/src/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Textarea } from "@/src/components/ui/textarea";
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
import { Plus, Search, Check, X, Clock } from "lucide-react";
import { toast } from "sonner";

// Sample return data with detailed items
const sampleReturns = [
  {
    id: "RET-001",
    invoice: "INV-20250502-001",
    customer: "John Doe",
    amount: 50.0,
    reason: "Defective product",
    status: "approved",
    date: "2025-05-02",
    items: [
      {
        id: 1,
        name: "Paracetamol 500mg",
        quantity: 1,
        price: 2.5,
        reason: "Damaged packaging",
      },
      {
        id: 2,
        name: "Amoxicillin 500mg",
        quantity: 2,
        price: 5.0,
        reason: "Expired",
      },
    ],
    approvalDate: "2025-05-02",
    notes: "Refund processed via original payment method",
  },
  {
    id: "RET-002",
    invoice: "INV-20250502-002",
    customer: "Jane Smith",
    amount: 180.75,
    reason: "Wrong medicine delivered",
    status: "pending",
    date: "2025-05-02",
    items: [
      {
        id: 3,
        name: "Omeprazole 20mg",
        quantity: 1,
        price: 5.0,
        reason: "Wrong item sent",
      },
    ],
    approvalDate: null,
    notes: "Awaiting manager approval",
  },
  {
    id: "RET-003",
    invoice: "INV-20250501-001",
    customer: "Mike Johnson",
    amount: 100.0,
    reason: "Customer changed mind",
    status: "rejected",
    date: "2025-05-01",
    items: [
      {
        id: 4,
        name: "Vitamin D3 1000IU",
        quantity: 10,
        price: 5.0,
        reason: "N/A",
      },
    ],
    approvalDate: "2025-05-01",
    notes: "Outside return window (30 days)",
  },
];

export default function ReturnsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showReturnDialog, setShowReturnDialog] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [returnReason, setReturnReason] = useState("");
  const [selectedReturn, setSelectedReturn] = useState<
    (typeof sampleReturns)[0] | null
  >(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const filteredReturns = sampleReturns.filter((ret) => {
    const matchesSearch =
      ret.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ret.invoice.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ret.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || ret.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <Check className="w-4 h-4" />;
      case "rejected":
        return <X className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const handleProcessReturn = () => {
    if (!invoiceNumber || selectedItems.length === 0) {
      toast.error("Please enter invoice number and select items");
      return;
    }
    toast.success(`Return initiated for invoice ${invoiceNumber}`);
    setShowReturnDialog(false);
    setInvoiceNumber("");
    setSelectedItems([]);
    setReturnReason("");
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Returns Management
          </h1>
          <p className="text-muted-foreground">
            Process and track product returns
          </p>
        </div>
        <Dialog open={showReturnDialog} onOpenChange={setShowReturnDialog}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              New Return
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Process Return</DialogTitle>
              <DialogDescription>
                Enter invoice number and select items to return
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {/* Invoice Lookup */}
              <div className="space-y-2">
                <Label htmlFor="invoiceNo">Invoice Number *</Label>
                <div className="flex gap-2">
                  <Input
                    id="invoiceNo"
                    placeholder="e.g. INV-20250502-001"
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="button" variant="outline">
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Items Selection */}
              <div className="space-y-2">
                <Label>Select Items to Return</Label>
                <div className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="item1"
                      checked={selectedItems.includes("item1")}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedItems([...selectedItems, "item1"]);
                        } else {
                          setSelectedItems(
                            selectedItems.filter((i) => i !== "item1"),
                          );
                        }
                      }}
                    />
                    <label htmlFor="item1" className="text-sm cursor-pointer">
                      Paracetamol 500mg - $50.00
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="item2"
                      checked={selectedItems.includes("item2")}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedItems([...selectedItems, "item2"]);
                        } else {
                          setSelectedItems(
                            selectedItems.filter((i) => i !== "item2"),
                          );
                        }
                      }}
                    />
                    <label htmlFor="item2" className="text-sm cursor-pointer">
                      Aspirin 100mg - $30.00
                    </label>
                  </div>
                </div>
              </div>

              {/* Return Reason */}
              <div className="space-y-2">
                <Label htmlFor="reason">Return Reason *</Label>
                <Select value={returnReason} onValueChange={setReturnReason}>
                  <SelectTrigger id="reason">
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="defective">Defective Product</SelectItem>
                    <SelectItem value="wrong">Wrong Item Delivered</SelectItem>
                    <SelectItem value="expired">
                      Expired/Expiring Soon
                    </SelectItem>
                    <SelectItem value="damaged">Damaged In Transit</SelectItem>
                    <SelectItem value="changed">
                      Customer Changed Mind
                    </SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Additional details about the return..."
                  rows={3}
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button onClick={handleProcessReturn} className="flex-1">
                  Process Return
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowReturnDialog(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card className="border-border">
        <CardContent className="pt-6">
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <Label className="text-sm mb-2 block">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search return ID, invoice, or customer..."
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
                  <SelectItem value="all">All Returns</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Returns Table */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle>Return Requests</CardTitle>
          <CardDescription>
            Total: {filteredReturns.length} returns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Return ID</TableHead>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReturns.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No returns found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredReturns.map((ret) => (
                    <TableRow
                      key={ret.id}
                      onClick={() => {
                        setSelectedReturn(ret);
                        setShowDetailModal(true);
                      }}
                      className="cursor-pointer hover:bg-muted/50 transition"
                    >
                      <TableCell className="font-medium">{ret.id}</TableCell>
                      <TableCell>{ret.invoice}</TableCell>
                      <TableCell>{ret.customer}</TableCell>
                      <TableCell className="text-right">
                        ${ret.amount.toFixed(2)}
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {ret.reason}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(ret.status)}>
                          {getStatusIcon(ret.status)}
                          <span className="ml-1">
                            {ret.status.charAt(0).toUpperCase() +
                              ret.status.slice(1)}
                          </span>
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Return Details Modal */}
      <Dialog open={showDetailModal} onOpenChange={setShowDetailModal}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Return Details - {selectedReturn?.id}</DialogTitle>
            <DialogDescription>
              Invoice: {selectedReturn?.invoice}
            </DialogDescription>
          </DialogHeader>

          {selectedReturn && (
            <div className="space-y-6 py-4">
              {/* Header Info */}
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground">Customer</p>
                    <p className="font-semibold">{selectedReturn.customer}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge
                      className={`${getStatusColor(selectedReturn.status)} mt-2`}
                    >
                      {getStatusIcon(selectedReturn.status)}
                      <span className="ml-1">
                        {selectedReturn.status.charAt(0).toUpperCase() +
                          selectedReturn.status.slice(1)}
                      </span>
                    </Badge>
                  </CardContent>
                </Card>
              </div>

              {/* Return Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    Return Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Return Date
                      </p>
                      <p className="font-medium">
                        {new Date(selectedReturn.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Approval Date
                      </p>
                      <p className="font-medium">
                        {selectedReturn.approvalDate
                          ? new Date(
                              selectedReturn.approvalDate,
                            ).toLocaleDateString()
                          : "Pending"}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Return Reason
                    </p>
                    <p className="font-medium">{selectedReturn.reason}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Notes</p>
                    <p className="text-sm">{selectedReturn.notes}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Items Returned */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Items Returned</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {selectedReturn.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-2 bg-muted/50 rounded"
                      >
                        <div>
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-xs text-muted-foreground">
                            Qty: {item.quantity} × ${item.price.toFixed(2)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Reason: {item.reason}
                          </p>
                        </div>
                        <p className="font-semibold">
                          ${(item.quantity * item.price).toFixed(2)}
                        </p>
                      </div>
                    ))}
                    <div className="border-t pt-2 mt-2 flex justify-between font-semibold">
                      <span>Total Return Amount:</span>
                      <span>${selectedReturn.amount.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stock Adjustment Preview */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    Stock Adjustment Preview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    The following stock levels will be updated upon approval:
                  </p>
                  <div className="space-y-2">
                    {selectedReturn.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between p-2 bg-green-50 rounded border border-green-200"
                      >
                        <span className="text-sm">{item.name}</span>
                        <span className="text-sm font-semibold text-green-600">
                          +{item.quantity} units
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              {selectedReturn.status === "pending" && (
                <div className="flex gap-2 pt-4">
                  <Button
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    onClick={() => {
                      toast.success(`Return ${selectedReturn.id} approved`);
                      setShowDetailModal(false);
                    }}
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Approve Return
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      toast.error(`Return ${selectedReturn.id} rejected`);
                      setShowDetailModal(false);
                    }}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Reject Return
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
