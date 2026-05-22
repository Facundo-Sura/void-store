"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import type { Product } from "@/lib/types";
import { formatPrice, getProductImage } from "@/lib/utils";
import { useCartStore } from "@/store/cart";
import { Badge } from "@/components/ui/Badge";

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export function ProductCard({ product, compact = false }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  if (compact) {
    return (
      <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-all duration-300 hover:border-void-300 hover:shadow-lg hover:shadow-cyan/5">
        {/* Image */}
        <Link
          href={`/products/${product.slug}`}
          className="relative aspect-[1/1] overflow-hidden bg-void-100"
        >
          <Image
            src={getProductImage(product.images)}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 20vw"
          />
        </Link>

        {/* Info */}
        <div className="flex flex-1 flex-col gap-1 p-2.5">
          <Link href={`/products/${product.slug}`}>
            <h3 className="text-xs font-medium text-text-primary truncate hover:text-cyan transition-colors">
              {product.title}
            </h3>
          </Link>

          <div className="mt-auto flex items-center justify-between">
            <span className="font-display text-sm font-bold text-text-primary">
              {formatPrice(product.price)}
            </span>
            <button
              onClick={() => addItem(product)}
              className="flex h-7 w-7 items-center justify-center rounded-md bg-cyan/10 text-cyan transition-all hover:bg-cyan hover:text-void"
              aria-label={`Add ${product.title} to cart`}
            >
              <ShoppingBagIcon className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-all duration-300 hover:border-void-300 hover:shadow-lg hover:shadow-cyan/5">
      {/* Image */}
      <Link
        href={`/products/${product.slug}`}
        className="relative aspect-[4/5] overflow-hidden bg-void-100"
      >
        <Image
          src={getProductImage(product.images)}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <Link href={`/products/${product.slug}`}>
              <h3 className="text-sm font-medium text-text-primary truncate hover:text-cyan transition-colors">
                {product.title}
              </h3>
            </Link>
            <Badge variant="default" className="mt-1">
              {product.category.name}
            </Badge>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <span className="font-display text-lg font-bold text-text-primary">
            {formatPrice(product.price)}
          </span>
          <button
            onClick={() => addItem(product)}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan/10 text-cyan transition-all hover:bg-cyan hover:text-void"
            aria-label={`Add ${product.title} to cart`}
          >
            <ShoppingBagIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
