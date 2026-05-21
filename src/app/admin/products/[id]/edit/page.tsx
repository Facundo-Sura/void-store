import { Suspense } from "react";
import { notFound } from "next/navigation";
import { productsApi } from "@/lib/api/products";
import { categoriesApi } from "@/lib/api/categories";
import { ProductForm } from "@/components/admin/ProductForm";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

async function EditForm({ id }: { id: number }) {
  const [product, categories] = await Promise.all([
    productsApi.getById(id),
    categoriesApi.getAll({ limit: 100 }),
  ]);

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
