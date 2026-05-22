import { Suspense } from "react";
import { categoriesApi } from "@/lib/api/categories";
import { ProductForm } from "@/components/admin/ProductForm";

async function CategoryLoader() {
  let categories;
  try {
    categories = await categoriesApi.getAll({ limit: 100 });
  } catch {
    return (
      <div className="rounded-xl border border-coral/20 bg-coral/5 p-6 text-center">
        <p className="text-sm text-coral">Could not load categories. API unavailable.</p>
      </div>
    );
  }
  return <ProductForm categories={categories} />;
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

export default function NewProductPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold tracking-tight text-text-primary mb-8">
        New Product
      </h1>
      <Suspense fallback={<FormFallback />}>
        <CategoryLoader />
      </Suspense>
    </div>
  );
}
