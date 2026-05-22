"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { productsApi } from "@/lib/api/products";
import type { Product } from "@/lib/types";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/Button";

const LIMIT = 12;

export function ProductListWithLoadMore() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState("");

  const categoryId = searchParams.get("categoryId")
    ? Number(searchParams.get("categoryId"))
    : undefined;
  const title = searchParams.get("title") || undefined;

  // Stable key to detect filter changes
  const filterKey = `${categoryId ?? ""}|${title ?? ""}`;
  const prevFilterKey = useRef(filterKey);

  // Initial fetch — runs on mount and when filters change
  useEffect(() => {
    if (prevFilterKey.current !== filterKey) {
      prevFilterKey.current = filterKey;
      setProducts([]);
      setOffset(0);
      setHasMore(true);
    }

    let cancelled = false;

    const fetchInitial = async () => {
      setIsLoading(true);
      setError("");
      try {
        const data = await productsApi.getAll({
          offset: 0,
          limit: LIMIT,
          ...(categoryId && { categoryId }),
          ...(title && { title }),
        });
        if (!cancelled) {
          setProducts(data);
          setHasMore(data.length === LIMIT);
          setOffset(LIMIT);
        }
      } catch {
        if (!cancelled) setError("Could not load products. Try again later.");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchInitial();

    return () => { cancelled = true; };
    // Only re-run when filters change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterKey]);

  const handleLoadMore = useCallback(async () => {
    setIsLoadingMore(true);
    setError("");
    try {
      const data = await productsApi.getAll({
        offset,
        limit: LIMIT,
        ...(categoryId && { categoryId }),
        ...(title && { title }),
      });
      setProducts((prev) => [...prev, ...data]);
      setHasMore(data.length === LIMIT);
      setOffset((prev) => prev + LIMIT);
    } catch {
      setError("Could not load more products.");
    } finally {
      setIsLoadingMore(false);
    }
  }, [offset, categoryId, title]);

  return (
    <div>
      <ProductGrid products={products} isLoading={isLoading} />

      {error && (
        <div className="mt-6 text-center">
          <p className="text-sm text-coral">{error}</p>
        </div>
      )}

      {!isLoading && hasMore && (
        <div className="mt-10 flex justify-center">
          <Button
            variant="outline"
            size="lg"
            onClick={handleLoadMore}
            isLoading={isLoadingMore}
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}
