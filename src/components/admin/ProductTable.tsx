"use client";

import Image from "next/image";
import Link from "next/link";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import type { Product } from "@/lib/types";
import { formatPrice, getProductImage } from "@/lib/utils";

interface ProductTableProps {
  products: Product[];
  onDelete: (id: number) => void;
}

export function ProductTable({ products, onDelete }: ProductTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-surface-elevated">
            <th className="px-4 py-3 text-left font-medium text-text-secondary">
              Product
            </th>
            <th className="px-4 py-3 text-left font-medium text-text-secondary hidden sm:table-cell">
              Category
            </th>
            <th className="px-4 py-3 text-left font-medium text-text-secondary">
              Price
            </th>
            <th className="px-4 py-3 text-right font-medium text-text-secondary">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {products.length === 0 ? (
            <tr>
              <td
                colSpan={4}
                className="px-4 py-10 text-center text-sm text-text-muted"
              >
                No products found.
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-surface-elevated/50 transition-colors"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg bg-void-100">
                      <Image
                        src={getProductImage(product.images)}
                        alt={product.title}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                    <span className="font-medium text-text-primary truncate max-w-[200px]">
                      {product.title}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-text-secondary hidden sm:table-cell">
                  {product.category.name}
                </td>
                <td className="px-4 py-3 font-display font-bold text-text-primary">
                  {formatPrice(product.price)}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-text-secondary hover:text-cyan hover:bg-cyan/10 transition-all"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => onDelete(product.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-text-secondary hover:text-coral hover:bg-coral/10 transition-all"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
