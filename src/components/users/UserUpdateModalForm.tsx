"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { useUsers } from "@/src/hooks/useUsers";
import { toast } from "sonner";

export default function UserUpdateModal({
  userId,
  open,
  onClose,
}: {
  userId: string | null;
  open: boolean;
  onClose: () => void;
}) {
  const { singleUser, fetchSingleUser, updateUser } = useUsers();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    status: true,
    isVerified: false,
  });

  useEffect(() => {
    if (userId) fetchSingleUser(userId);
  }, [userId]);

  useEffect(() => {
    if (singleUser) {
      setForm({
        fullName: singleUser.fullName,
        email: singleUser.email,
        phone: singleUser.phone,
        status: singleUser.status,
        isVerified: singleUser.isVerified,
      });
    }
  }, [singleUser]);

  const handleSubmit = async () => {
    try {
      if (!userId) return;
      await updateUser(userId, form);
      toast.success("User updated");
      onClose();
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <div className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            />
          </div>

          <div>
            <Label>Email</Label>
            <Input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div>
            <Label>Phone</Label>
            <Input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>

          <Button onClick={handleSubmit}>Update User</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
