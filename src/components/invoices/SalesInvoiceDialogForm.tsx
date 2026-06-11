"use client";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";

import { Button } from "@/src/components/ui/button";
import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";

import { Loader2 } from "lucide-react";
import { useSalesInvoice } from "@/src/hooks/useSalesInvoice";


export default function SalesInvoiceDialogForm({
  invoiceId,
  onClose,
}: {
  invoiceId?: string | null;
  onClose?: () => void;
}) {
  const [open, setOpen] = useState(false);

  const { fetchSingleSalesInvoice, updateSalesInvoice, updateLoading } =
    useSalesInvoice();

  const [form, setForm] = useState({
    status: "",
    notes: "",
  });

  useEffect(() => {
    const load = async () => {
      if (!invoiceId) return;

      const res = await fetchSingleSalesInvoice(invoiceId);

      setForm({
        status: res.status,
        notes: res.notes,
      });

      setOpen(true);
    };

    load();
  }, [invoiceId]);

  const handleSubmit = async () => {
    if (!invoiceId) return;

    await updateSalesInvoice(invoiceId, form);

    setOpen(false);

    onClose?.();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Sales Invoice</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Status</Label>

            <Input
              value={form.status}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  status: e.target.value,
                }))
              }
            />
          </div>

          <div>
            <Label>Notes</Label>

            <Input
              value={form.notes}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  notes: e.target.value,
                }))
              }
            />
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full"
            disabled={updateLoading}
          >
            {updateLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Updating...
              </>
            ) : (
              "Update Invoice"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
