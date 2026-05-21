"use client";

import { AuthGuard } from "@/components/auth/AuthGuard";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  return <AuthGuard adminOnly>{children}</AuthGuard>;
}
