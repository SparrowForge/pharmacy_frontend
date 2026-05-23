"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/src/components/ui/dialog";

import { Button } from "@/src/components/ui/button";
import { Plus } from "lucide-react";
import { StakeholderTabs } from "./StakeholderTabs";

export default function AddStakeholderDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Add Stakeholder
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl rounded-2xl">
        <DialogHeader>
          <DialogTitle>Add New Stakeholder</DialogTitle>
          <DialogDescription>
            Create and manage customer or supplier profile
          </DialogDescription>
        </DialogHeader>

        <StakeholderTabs />

        {/* FOOTER */}
        <div className="mt-6 flex items-center justify-end gap-3">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button className="bg-primary hover:bg-primary/90">
            Add Stakeholder
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
