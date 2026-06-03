"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBagIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { useCartStore } from "@/store/cart";
import { useAuth } from "@/lib/auth/AuthContext";
import { HeaderSearch } from "./HeaderSearch";
import { CategoryNav } from "./CategoryNav";
import { MobileNav } from "./MobileNav";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalItems = useCartStore((state) => state.totalItems);
  const { isAuthenticated, user } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full glass-strong">
      {/* Top row: Logo | Search | Auth + Cart */}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex-shrink-0 font-display text-2xl font-bold tracking-tighter text-text-primary hover:text-cyan transition-colors"
        >
          VOID
        </Link>

        {/* Search — flex on all screens */}
        <div className="flex flex-1 justify-center min-w-0">
          <HeaderSearch />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="sm:hidden p-2 text-text-secondary hover:text-text-primary transition-colors"
            aria-label="Open menu"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>

          {isAuthenticated && user ? (
            <Link
              href="/profile"
              className="hidden sm:flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
            >
              <div className="relative h-7 w-7 overflow-hidden rounded-full bg-void-200">
                <Image
                  src={user.avatar}
                  alt={user.name}
                  fill
                  className="object-cover"
                  sizes="28px"
                />
              </div>
              <span className="hidden lg:inline">{user.name}</span>
            </Link>
          ) : (
            <Link
              href="/auth/login"
              className="hidden sm:inline-flex text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
            >
              Sign In
            </Link>
          )}

          {isAuthenticated && user?.role === "admin" && (
            <Link
              href="/admin"
              className="hidden sm:inline-flex text-xs font-medium text-cyan hover:text-cyan-dark transition-colors"
            >
              Admin
            </Link>
          )}

          <Link
            href="/cart"
            className="relative p-2 text-text-secondary hover:text-text-primary transition-colors"
          >
            <ShoppingBagIcon className="h-6 w-6" />
            {totalItems() > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-coral text-[10px] font-bold text-white">
                {totalItems()}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Bottom row: Category pills — hidden on mobile, visible on desktop */}
      <div className="hidden sm:block border-t border-border/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2">
          <CategoryNav />
        </div>
      </div>

      {/* Mobile navigation drawer */}
      <MobileNav isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  );
}
