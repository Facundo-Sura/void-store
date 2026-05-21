"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Category, Product } from "@/lib/types";
import { productsApi } from "@/lib/api/products";
import { Button } from "@/components/ui/Button";

interface ProductFormProps {
  categories: Category[];
  product?: Product; // If provided, we're editing
}

export function ProductForm({ categories, product }: ProductFormProps) {
  const router = useRouter();
  const isEditing = !!product;

  const [formData, setFormData] = useState({
    title: product?.title || "",
    price: product?.price || 0,
    description: product?.description || "",
    categoryId: product?.category.id || categories[0]?.id || 1,
    images: product?.images.join("\n") || "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const images = formData.images
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    if (images.length === 0) {
      setError("At least one image URL is required");
      setIsLoading(false);
      return;
    }

    try {
      if (isEditing && product) {
        await productsApi.update(product.id, {
          title: formData.title,
          price: formData.price,
          description: formData.description,
          categoryId: formData.categoryId,
          images,
        });
      } else {
        await productsApi.create({
          title: formData.title,
          price: formData.price,
          description: formData.description,
          categoryId: formData.categoryId,
          images,
        });
      }
      router.push("/admin/products");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to save product",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const updateField = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {error && (
        <div className="rounded-lg border border-coral/20 bg-coral/5 p-3 text-sm text-coral">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-text-secondary mb-1.5">
          Title
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => updateField("title", e.target.value)}
          required
          className="w-full rounded-lg border border-border bg-surface-elevated px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-cyan"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1.5">
            Price ($)
          </label>
          <input
            type="number"
            min={0}
            step={0.01}
            value={formData.price}
            onChange={(e) => updateField("price", Number(e.target.value))}
            required
            className="w-full rounded-lg border border-border bg-surface-elevated px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-cyan"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1.5">
            Category
          </label>
          <select
            value={formData.categoryId}
            onChange={(e) => updateField("categoryId", Number(e.target.value))}
            className="w-full rounded-lg border border-border bg-surface-elevated px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-cyan"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-text-secondary mb-1.5">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => updateField("description", e.target.value)}
          required
          rows={4}
          className="w-full rounded-lg border border-border bg-surface-elevated px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-cyan resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-text-secondary mb-1.5">
          Image URLs (one per line)
        </label>
        <textarea
          value={formData.images}
          onChange={(e) => updateField("images", e.target.value)}
          rows={3}
          placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
          className="w-full rounded-lg border border-border bg-surface-elevated px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-cyan resize-none"
        />
      </div>

      <div className="flex gap-3">
        <Button type="submit" isLoading={isLoading}>
          {isEditing ? "Update Product" : "Create Product"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
