"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useCartStore } from "@/store/cart";
import { useAuth } from "@/lib/auth/AuthContext";
import { HeaderSearch } from "./HeaderSearch";
import { CategoryNav } from "./CategoryNav";

export function Header() {
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

        {/* Search — hidden on very small screens */}
        <div className="hidden sm:flex flex-1 justify-center">
          <HeaderSearch />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Mobile search icon */}
          <Link
            href="/products"
            className="sm:hidden p-2 text-text-secondary hover:text-text-primary transition-colors"
            aria-label="Search"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </Link>

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

      {/* Bottom row: Search on mobile + Category pills */}
      <div className="border-t border-border/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2 space-y-2">
          {/* Search on mobile */}
          <div className="sm:hidden">
            <HeaderSearch />
          </div>

          {/* Categories */}
          <CategoryNav />
        </div>
      </div>
    </header>
  );
}
