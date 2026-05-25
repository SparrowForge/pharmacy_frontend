"use client";

import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Loader2, Trash2 } from "lucide-react";
import { useShops } from "@/src/hooks/useShops";

interface Props {
  shopId: string;
  onSuccess?: () => void; // for refetch after delete
}

export default function ShopDialogDelete({ shopId, onSuccess }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { deleteShop } = useShops();

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteShop(shopId);

      setOpen(false);

      // reload list after delete
      if (onSuccess) {
        onSuccess();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="text-destructive w-full justify-start"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Shop</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this shop? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Deleting...
              </>
            ) : (
              "Yes, Delete"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}