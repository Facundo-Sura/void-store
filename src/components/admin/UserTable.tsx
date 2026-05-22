"use client";

import Image from "next/image";
import Link from "next/link";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import type { User } from "@/lib/types";
import { cn } from "@/lib/utils";

interface UserTableProps {
  users: User[];
  onDelete: (id: number) => void;
}

export function UserTable({ users, onDelete }: UserTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-surface-elevated">
            <th className="px-4 py-3 text-left font-medium text-text-secondary">
              User
            </th>
            <th className="px-4 py-3 text-left font-medium text-text-secondary hidden sm:table-cell">
              Email
            </th>
            <th className="px-4 py-3 text-left font-medium text-text-secondary hidden md:table-cell">
              Role
            </th>
            <th className="px-4 py-3 text-right font-medium text-text-secondary">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {users.length === 0 ? (
            <tr>
              <td
                colSpan={4}
                className="px-4 py-10 text-center text-sm text-text-muted"
              >
                No users found.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-surface-elevated/50 transition-colors"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-void-100">
                      <Image
                        src={user.avatar}
                        alt={user.name}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                    <span className="font-medium text-text-primary truncate max-w-[200px]">
                      {user.name}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-text-secondary hidden sm:table-cell truncate max-w-[220px]">
                  {user.email}
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span
                    className={cn(
                      "inline-block rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
                      user.role === "admin"
                        ? "bg-cyan/10 text-cyan"
                        : "bg-surface-elevated text-text-secondary",
                    )}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/users/${user.id}/edit`}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-text-secondary hover:text-cyan hover:bg-cyan/10 transition-all"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => onDelete(user.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-text-secondary hover:text-coral hover:bg-coral/10 transition-all"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
