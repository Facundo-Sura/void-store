"use client";

import { useState } from "react";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import type { Product } from "@/lib/types";
import { useCartStore } from "@/store/cart";
import { Button } from "@/components/ui/Button";

interface AddToCartButtonProps {
  product: Product;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Quantity selector */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-text-secondary">Quantity</span>
        <div className="flex items-center rounded-lg border border-border">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="flex h-9 w-9 items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
          >
            &minus;
          </button>
          <span className="flex h-9 w-10 items-center justify-center text-sm font-medium text-text-primary border-x border-border">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="flex h-9 w-9 items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
          >
            +
          </button>
        </div>
      </div>

      {/* Add to cart button */}
      <Button
        onClick={handleAdd}
        size="lg"
        variant={added ? "secondary" : "primary"}
        className="w-full"
      >
        <ShoppingBagIcon className="h-5 w-5" />
        {added ? "Added to Cart!" : "Add to Cart"}
      </Button>
    </div>
  );
}
