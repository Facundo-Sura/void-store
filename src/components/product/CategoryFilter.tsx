"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import type { Category } from "@/lib/types";

interface CategoryFilterProps {
  categories: Category[];
}

export function CategoryFilter({ categories }: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("categoryId");

  const handleCategoryChange = useCallback(
    (categoryId: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (categoryId) {
        params.set("categoryId", categoryId);
      } else {
        params.delete("categoryId");
      }
      params.set("offset", "0");
      router.push(`/products?${params.toString()}`);
    },
    [router, searchParams],
  );

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => handleCategoryChange(null)}
        className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
          !activeCategory
            ? "bg-cyan text-void"
            : "bg-surface-elevated text-text-secondary hover:text-text-primary hover:bg-void-300"
        }`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryChange(String(category.id))}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
            activeCategory === String(category.id)
              ? "bg-cyan text-void"
              : "bg-surface-elevated text-text-secondary hover:text-text-primary hover:bg-void-300"
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
