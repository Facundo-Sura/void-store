"use client";

import Image from "next/image";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { useAuth } from "@/lib/auth/AuthContext";
import { Button } from "@/components/ui/Button";

function ProfileContent() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-3xl font-bold tracking-tight text-text-primary mb-8">
        My Profile
      </h1>

      <div className="rounded-xl border border-border bg-surface p-6 sm:p-8">
        <div className="flex items-center gap-6">
          <div className="relative h-16 w-16 overflow-hidden rounded-full bg-void-200">
            <Image
              src={user.avatar}
              alt={user.name}
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-text-primary">
              {user.name}
            </h2>
            <p className="text-sm text-text-secondary">{user.email}</p>
            <span className="mt-1 inline-flex items-center rounded-full bg-cyan/10 px-2.5 py-0.5 text-xs font-medium text-cyan capitalize">
              {user.role}
            </span>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-4">
            Account Details
          </h3>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-text-secondary">Name</dt>
              <dd className="text-text-primary font-medium">{user.name}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-text-secondary">Email</dt>
              <dd className="text-text-primary font-medium">{user.email}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-text-secondary">Role</dt>
              <dd className="text-text-primary font-medium capitalize">
                {user.role}
              </dd>
            </div>
          </dl>
        </div>

        <div className="mt-8 border-t border-border pt-6">
          <Button
            variant="danger"
            onClick={logout}
            className="w-full sm:w-auto"
          >
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <AuthGuard>
      <ProfileContent />
    </AuthGuard>
  );
}
