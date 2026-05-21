import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Sign In — VOID",
  description: "Sign in to your VOID account.",
};

export default function LoginPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-12 sm:px-6">
      <div className="mb-8 text-center">
        <Link
          href="/"
          className="font-display text-2xl font-bold tracking-tighter text-text-primary hover:text-cyan transition-colors"
        >
          VOID
        </Link>
        <h1 className="mt-6 font-display text-3xl font-bold tracking-tight text-text-primary">
          Welcome back
        </h1>
        <p className="mt-2 text-sm text-text-secondary">
          Sign in to your account to continue
        </p>
      </div>

      <div className="rounded-xl border border-border bg-surface p-6 sm:p-8">
        <LoginForm />
      </div>

      <p className="mt-6 text-center text-sm text-text-secondary">
        Don&apos;t have an account?{" "}
        <Link
          href="/auth/register"
          className="font-medium text-cyan hover:text-cyan-dark transition-colors"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
