import type { Metadata } from "next";
import Link from "next/link";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Create Account — VOID",
  description: "Create your VOID account and start shopping.",
};

export default function RegisterPage() {
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
          Join the Void
        </h1>
        <p className="mt-2 text-sm text-text-secondary">
          Create your account and start discovering
        </p>
      </div>

      <div className="rounded-xl border border-border bg-surface p-6 sm:p-8">
        <RegisterForm />
      </div>

      <p className="mt-6 text-center text-sm text-text-secondary">
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="font-medium text-cyan hover:text-cyan-dark transition-colors"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
