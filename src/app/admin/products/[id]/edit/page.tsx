import { Suspense } from "react";
import { notFound } from "next/navigation";
import { productsApi } from "@/lib/api/products";
import { categoriesApi } from "@/lib/api/categories";
import { ProductForm } from "@/components/admin/ProductForm";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

async function EditForm({ id }: { id: number }) {
  let product;
  let categories;
  try {
    [product, categories] = await Promise.all([
      productsApi.getById(id),
      categoriesApi.getAll({ limit: 100 }),
    ]);
  } catch {
    return (
      <div className="rounded-xl border border-coral/20 bg-coral/5 p-6 text-center">
        <p className="text-sm text-coral">Could not load product data. API unavailable.</p>
      </div>
    );
  }

  if (!product) notFound();

  return <ProductForm categories={categories} product={product} />;
}

function FormFallback() {
  return (
    <div className="space-y-6 max-w-2xl">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="h-12 animate-pulse rounded-lg bg-surface-elevated" />
      ))}
    </div>
  );
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;

  return (
    <div>
      <h1 className="font-display text-2xl font-bold tracking-tight text-text-primary mb-8">
        Edit Product
      </h1>
      <Suspense fallback={<FormFallback />}>
        <EditForm id={Number(id)} />
      </Suspense>
    </div>
  );
}
