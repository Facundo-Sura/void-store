"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  PlusIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import type { User } from "@/lib/types";
import { usersApi } from "@/lib/api/users";
import { UserTable } from "@/components/admin/UserTable";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { Button } from "@/components/ui/Button";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = useMemo(
    () =>
      users.filter((u) =>
        u.name.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [users, searchQuery],
  );

  const fetchUsers = async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await usersApi.getAll({ offset: 0, limit: 100 });
      setUsers(data);
    } catch {
      setError("Failed to load users. API unavailable.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      await usersApi.delete(deleteId);
      setUsers((prev) => prev.filter((u) => u.id !== deleteId));
      setDeleteId(null);
    } catch {
      // Error handled silently
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-2xl font-bold tracking-tight text-text-primary">
          Users
        </h1>
        <Link href="/admin/users/new">
          <Button variant="primary">
            <PlusIcon className="h-4 w-4" />
            New User
          </Button>
        </Link>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-coral/20 bg-coral/5 p-4 text-sm text-coral">
          {error}
          <button
            onClick={fetchUsers}
            className="ml-2 underline hover:no-underline"
          >
            Retry
          </button>
        </div>
      )}

      {/* Search */}
      {!isLoading && users.length > 0 && (
        <div className="relative mb-4">
          <MagnifyingGlassIcon className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search users by name…"
            className="w-full rounded-lg border border-border bg-surface-elevated py-2.5 pl-10 pr-4 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-cyan"
          />
        </div>
      )}

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-16 animate-pulse rounded-xl bg-surface-elevated"
            />
          ))}
        </div>
      ) : (
        <UserTable users={filteredUsers} onDelete={(id) => setDeleteId(id)} />
      )}

      <ConfirmDialog
        isOpen={deleteId !== null}
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        isLoading={isDeleting}
      />
    </div>
  );
}
