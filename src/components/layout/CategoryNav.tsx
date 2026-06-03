"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { categoriesApi } from "@/lib/api/categories";
import type { Category } from "@/lib/types";

export function CategoryNav() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    categoriesApi
      .getAll({ limit: 10 })
      .then(setCategories)
      .catch(() => {});
  }, []);

  if (categories.length === 0) return null;

  return (
    <div className="relative">
      {/* Scrollable pills */}
      <div className="flex items-center justify-start gap-1.5 overflow-x-auto pb-px scrollbar-none">
        <Link
          href="/products"
          className="flex-shrink-0 rounded-full bg-surface-elevated px-3 py-1 text-xs font-medium text-text-secondary hover:text-text-primary hover:bg-void-300 transition-colors"
        >
          All
        </Link>
        {categories.slice(0, 8).map((cat) => (
          <Link
            key={cat.id}
            href={`/products?categoryId=${cat.id}`}
            className="flex-shrink-0 whitespace-nowrap rounded-full bg-surface-elevated px-3 py-1 text-xs font-medium text-text-secondary hover:text-text-primary hover:bg-void-300 transition-colors"
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {/* Fade indicator on the right edge — hints at more content */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-surface to-transparent sm:w-12" />
    </div>
  );
}
