"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  PlusIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import type { Product } from "@/lib/types";
import { productsApi } from "@/lib/api/products";
import { ProductTable } from "@/components/admin/ProductTable";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { Button } from "@/components/ui/Button";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(
    () =>
      products.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [products, searchQuery],
  );

  const fetchProducts = async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await productsApi.getAll({ offset: 0, limit: 100 });
      setProducts(data);
    } catch {
      setError("Failed to load products. API unavailable.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      await productsApi.delete(deleteId);
      setProducts((prev) => prev.filter((p) => p.id !== deleteId));
      setDeleteId(null);
    } catch {
      // Error handled silently
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-2xl font-bold tracking-tight text-text-primary">
          Products
        </h1>
        <Link href="/admin/products/new">
          <Button variant="primary">
            <PlusIcon className="h-4 w-4" />
            New Product
          </Button>
        </Link>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-coral/20 bg-coral/5 p-4 text-sm text-coral">
          {error}
          <button
            onClick={fetchProducts}
            className="ml-2 underline hover:no-underline"
          >
            Retry
          </button>
        </div>
      )}

      {/* Search */}
      {!isLoading && products.length > 0 && (
        <div className="relative mb-4">
          <MagnifyingGlassIcon className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products by name…"
            className="w-full rounded-lg border border-border bg-surface-elevated py-2.5 pl-10 pr-4 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-cyan"
          />
        </div>
      )}

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-16 animate-pulse rounded-xl bg-surface-elevated"
            />
          ))}
        </div>
      ) : (
        <ProductTable
          products={filteredProducts}
          onDelete={(id) => setDeleteId(id)}
        />
      )}

      <ConfirmDialog
        isOpen={deleteId !== null}
        title="Delete Product"
        message="Are you sure you want to delete this product? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        isLoading={isDeleting}
      />
    </div>
  );
}
