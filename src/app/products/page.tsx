import { Suspense } from "react";
import type { Metadata } from "next";
import { ProductListWithLoadMore } from "@/components/product/ProductListWithLoadMore";
import { ProductGrid } from "@/components/product/ProductGrid";
import { SkeletonCard } from "@/components/product/SkeletonCard";

export const metadata: Metadata = {
  title: "Products — VOID",
  description: "Browse our curated collection of premium fashion.",
};

function Fallback() {
  return (
    <ProductGrid
      products={[]}
      isLoading
    />
  );
}

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          Products
        </h1>
        <p className="mt-2 text-text-secondary">
          Discover your next favorite piece
        </p>
      </div>

      <Suspense fallback={<Fallback />}>
        <ProductListWithLoadMore />
      </Suspense>
    </div>
  );
}
