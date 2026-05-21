"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useCartStore } from "@/store/cart";
import { useAuth } from "@/lib/auth/AuthContext";

export function Header() {
  const totalItems = useCartStore((state) => state.totalItems);
  const { isAuthenticated, user } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full glass-strong">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="font-display text-2xl font-bold tracking-tighter text-text-primary hover:text-cyan transition-colors"
        >
          VOID
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/products"
            className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
          >
            Products
          </Link>
          <Link
            href="/products?categoryId=4"
            className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
          >
            Adidas
          </Link>
          <Link
            href="/products?categoryId=1"
            className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
          >
            Fashion
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
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

          <Link href="/cart" className="relative p-2 text-text-secondary hover:text-text-primary transition-colors">
            <ShoppingBagIcon className="h-6 w-6" />
            {totalItems() > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-coral text-[10px] font-bold text-white">
                {totalItems()}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
