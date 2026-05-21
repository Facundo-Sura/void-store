"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface PaginationProps {
  total: number;
  limit: number;
  offset: number;
}

export function Pagination({ total, limit, offset }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Math.floor(offset / limit) + 1;
  const totalPages = Math.ceil(total / limit);

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("offset", String((page - 1) * limit));
    router.push(`/products?${params.toString()}`);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 py-8">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage <= 1}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-secondary hover:text-text-primary hover:bg-surface-elevated disabled:pointer-events-none disabled:opacity-30 transition-all"
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </button>

      {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
        const page = i + 1;
        return (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-all ${
              page === currentPage
                ? "bg-cyan text-void"
                : "border border-border text-text-secondary hover:text-text-primary hover:bg-surface-elevated"
            }`}
          >
            {page}
          </button>
        );
      })}

      {totalPages > 5 && (
        <span className="text-text-muted px-1">...</span>
      )}

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-secondary hover:text-text-primary hover:bg-surface-elevated disabled:pointer-events-none disabled:opacity-30 transition-all"
      >
        <ChevronRightIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
