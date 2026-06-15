"use client";

import { useEffect, useState } from "react";
import { useUsers } from "@/src/hooks/useUsers";

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
import UserUpdateModal from "@/src/components/users/UserUpdateModalForm";
import CreateUserDialog from "@/src/components/users/CreateUserDialog";
import TableSkeleton from "@/src/components/common/TableSkeleton";

export default function UsersPage() {
  const { users, fetchUsers, deleteUser, loading } = useUsers();

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [q, setQ] = useState("");

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchUsers({
      page,
      limit,
      q: q || undefined,
    });
  }, [page, q]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Users</h1>
        <CreateUserDialog />
      </div>

      <Input
        placeholder="Search users..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />

      <Card>
        <CardHeader>
          <CardTitle>User List</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <TableSkeleton />
              ) : users?.length > 0 ? (
                users.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell>{u.fullName}</TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell>{u.phone}</TableCell>
                    <TableCell>{u.role}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="py-8 text-center">
                    No users found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </Button>

        <Button onClick={() => setPage(page + 1)}>Next</Button>
      </div>

      <UserUpdateModal
        userId={selectedUserId}
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}
