"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@/lib/auth/AuthContext";
import { categoriesApi } from "@/lib/api/categories";
import type { Category } from "@/lib/types";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    categoriesApi
      .getAll({ limit: 10 })
      .then(setCategories)
      .catch(() => {});
  }, []);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm sm:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Drawer panel */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-72 border-l border-border bg-surface shadow-2xl transition-transform duration-300 ease-in-out sm:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-4 h-16">
          <span className="font-display text-lg font-bold text-text-primary">
            Menu
          </span>
          <button
            onClick={onClose}
            className="p-2 text-text-secondary hover:text-text-primary transition-colors"
            aria-label="Close menu"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation links */}
        <nav className="flex flex-col gap-1 p-4">
          {/* Profile / Sign In */}
          {isAuthenticated && user ? (
            <Link
              href="/profile"
              onClick={onClose}
              className="flex items-center gap-3 rounded-lg p-3 text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors"
            >
              <div className="relative h-9 w-9 overflow-hidden rounded-full bg-void-200">
                <Image
                  src={user.avatar}
                  alt={user.name}
                  fill
                  className="object-cover"
                  sizes="36px"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">
                  {user.name}
                </p>
                <p className="text-xs text-text-muted">View profile</p>
              </div>
            </Link>
          ) : (
            <Link
              href="/auth/login"
              onClick={onClose}
              className="flex items-center gap-3 rounded-lg p-3 text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-void-200">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">Sign In</p>
                <p className="text-xs text-text-muted">Access your account</p>
              </div>
            </Link>
          )}

          {/* Admin link */}
          {isAuthenticated && user?.role === "admin" && (
            <Link
              href="/admin"
              onClick={onClose}
              className="flex items-center gap-3 rounded-lg p-3 text-cyan hover:text-cyan-dark hover:bg-surface-elevated transition-colors"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-void-200">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium">Admin Panel</p>
                <p className="text-xs text-cyan/70">Manage products & users</p>
              </div>
            </Link>
          )}

          {/* Divider */}
          <hr className="border-border my-2" />

          {/* All Products */}
          <Link
            href="/products"
            onClick={onClose}
            className="flex items-center gap-3 rounded-lg p-3 text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <span className="text-sm font-medium">All Products</span>
          </Link>

          {/* Categories section */}
          {categories.length > 0 && (
            <>
              <hr className="border-border my-2" />
              <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wider text-text-muted">
                Categories
              </p>
              <div className="flex flex-col gap-0.5">
                {categories.slice(0, 8).map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/products?categoryId=${cat.id}`}
                    onClick={onClose}
                    className="rounded-lg px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </>
          )}
        </nav>
      </div>
    </>
  );
}
