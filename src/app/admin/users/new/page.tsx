"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { usersApi } from "@/lib/api/users";
import { Button } from "@/components/ui/Button";

export default function NewUserPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer" as "customer" | "admin",
    avatar: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await usersApi.create({
        ...form,
        avatar: form.avatar || "https://picsum.photos/200",
      });
      router.push("/admin/users");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create user",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Link
        href="/admin/users"
        className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary transition-colors mb-6"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        Back to Users
      </Link>

      <h1 className="font-display text-2xl font-bold tracking-tight text-text-primary mb-8">
        New User
      </h1>

      {error && (
        <div className="mb-6 rounded-xl border border-coral/20 bg-coral/5 p-4 text-sm text-coral">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="max-w-lg space-y-5 rounded-xl border border-border bg-surface p-6"
      >
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-text-secondary mb-1.5"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="w-full rounded-lg border border-border bg-surface-elevated px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-cyan"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-text-secondary mb-1.5"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className="w-full rounded-lg border border-border bg-surface-elevated px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-cyan"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-text-secondary mb-1.5"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            className="w-full rounded-lg border border-border bg-surface-elevated px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-cyan"
          />
        </div>

        <div>
          <label
            htmlFor="role"
            className="block text-sm font-medium text-text-secondary mb-1.5"
          >
            Role
          </label>
          <select
            id="role"
            value={form.role}
            onChange={(e) =>
              setForm({
                ...form,
                role: e.target.value as "customer" | "admin",
              })
            }
            className="w-full rounded-lg border border-border bg-surface-elevated px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-cyan"
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="avatar"
            className="block text-sm font-medium text-text-secondary mb-1.5"
          >
            Avatar URL
          </label>
          <input
            id="avatar"
            type="url"
            value={form.avatar}
            onChange={(e) => setForm({ ...form, avatar: e.target.value })}
            placeholder="https://picsum.photos/200"
            className="w-full rounded-lg border border-border bg-surface-elevated px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-cyan"
          />
          <p className="mt-1 text-xs text-text-muted">
            Leave empty for a random avatar.
          </p>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Link href="/admin/users">
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </Link>
          <Button type="submit" isLoading={isLoading}>
            Create User
          </Button>
        </div>
      </form>
    </div>
  );
}
