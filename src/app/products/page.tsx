import { Suspense } from "react";
import type { Metadata } from "next";
import { productsApi } from "@/lib/api/products";
import { ProductGrid } from "@/components/product/ProductGrid";
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
  let products;
  try {
    products = await productsApi.getAll({
      offset,
      limit,
      ...(categoryId && { categoryId }),
      ...(title && { title }),
    });
  } catch {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-text-muted text-sm">Could not load products. Please try again later.</p>
      </div>
    );
  }

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
  let products;
  try {
    products = await productsApi.getAll({ offset: 0, limit: 100 });
  } catch {
    return null;
  }
  return <Pagination total={products.length} limit={limit} offset={offset} />;
}
