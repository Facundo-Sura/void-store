import { Suspense } from "react";
import type { Metadata } from "next";
import { productsApi } from "@/lib/api/products";
import { categoriesApi } from "@/lib/api/categories";
import { ProductGrid } from "@/components/product/ProductGrid";
import { SearchBar } from "@/components/product/SearchBar";
import { CategoryFilter } from "@/components/product/CategoryFilter";
import { Pagination } from "@/components/product/Pagination";
import { SkeletonCard } from "@/components/product/SkeletonCard";

export const metadata: Metadata = {
  title: "Products — VOID",
  description: "Browse our curated collection of premium fashion.",
};

interface ProductsPageProps {
  searchParams: Promise<{
    offset?: string;
    limit?: string;
    categoryId?: string;
    title?: string;
    price_min?: string;
    price_max?: string;
  }>;
}

async function ProductList({
  offset,
  limit,
  categoryId,
  title,
}: {
  offset: number;
  limit: number;
  categoryId?: number;
  title?: string;
}) {
  const products = await productsApi.getAll({
    offset,
    limit,
    ...(categoryId && { categoryId }),
    ...(title && { title }),
  });

  return <ProductGrid products={products} />;
}

function ProductListFallback() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

async function CategorySection() {
  const categories = await categoriesApi.getAll({ limit: 20 });
  return <CategoryFilter categories={categories} />;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const offset = Number(params.offset) || 0;
  const limit = Number(params.limit) || 12;
  const categoryId = params.categoryId ? Number(params.categoryId) : undefined;
  const title = params.title || undefined;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          Products
        </h1>
        <p className="mt-2 text-text-secondary">
          Discover your next favorite piece
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-4">
        <div className="max-w-sm">
          <SearchBar />
        </div>
        <Suspense
          fallback={
            <div className="flex gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-8 w-20 animate-pulse rounded-full bg-void-200"
                />
              ))}
            </div>
          }
        >
          <CategorySection />
        </Suspense>
      </div>

      {/* Products */}
      <Suspense fallback={<ProductListFallback />}>
        <ProductList
          offset={offset}
          limit={limit}
          categoryId={categoryId}
          title={title}
        />
      </Suspense>

      {/* Pagination */}
      <Suspense fallback={null}>
        <PaginationWrapper offset={offset} limit={limit} />
      </Suspense>
    </div>
  );
}

async function PaginationWrapper({
  offset,
  limit,
}: {
  offset: number;
  limit: number;
}) {
  // Fetch a larger batch to estimate total count, or use the returned array length
  const products = await productsApi.getAll({ offset: 0, limit: 100 });
  return <Pagination total={products.length} limit={limit} offset={offset} />;
}
