"use client";

import Image from "next/image";
import Link from "next/link";
import { TrashIcon } from "@heroicons/react/24/outline";
import type { CartItem } from "@/lib/types";
import { useCartStore } from "@/store/cart";
import { formatPrice, getProductImage } from "@/lib/utils";

interface CartItemRowProps {
  item: CartItem;
}

export function CartItemRow({ item }: CartItemRowProps) {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="flex gap-4 py-6 border-b border-border last:border-b-0">
      {/* Image */}
      <Link
        href={`/products/${item.product.slug}`}
        className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-void-100 sm:h-28 sm:w-28"
      >
        <Image
          src={getProductImage(item.product.images)}
          alt={item.product.title}
          fill
          className="object-cover"
          sizes="112px"
        />
      </Link>

      {/* Info */}
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex justify-between">
          <div>
            <Link
              href={`/products/${item.product.slug}`}
              className="text-sm font-medium text-text-primary hover:text-cyan transition-colors"
            >
              {item.product.title}
            </Link>
            <p className="mt-0.5 text-xs text-text-muted">
              {item.product.category.name}
            </p>
          </div>
          <span className="font-display text-sm font-bold text-text-primary">
            {formatPrice(item.product.price * item.quantity)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          {/* Quantity */}
          <div className="flex items-center rounded-lg border border-border">
            <button
              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
              className="flex h-8 w-8 items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
            >
              &minus;
            </button>
            <span className="flex h-8 w-9 items-center justify-center text-xs font-medium text-text-primary border-x border-border">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
              className="flex h-8 w-8 items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
            >
              +
            </button>
          </div>

          {/* Remove */}
          <button
            onClick={() => removeItem(item.product.id)}
            className="flex items-center gap-1 text-xs text-text-muted hover:text-coral transition-colors"
          >
            <TrashIcon className="h-3.5 w-3.5" />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
