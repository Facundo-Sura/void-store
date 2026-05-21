"use client";

import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export function CartSummary() {
  const items = useCartStore((state) => state.items);
  const totalItems = useCartStore((state) => state.totalItems);
  const totalPrice = useCartStore((state) => state.totalPrice);

  if (items.length === 0) return null;

  const subtotal = totalPrice();

  return (
    <div className="rounded-xl border border-border bg-surface p-6">
      <h2 className="font-display text-lg font-bold text-text-primary mb-4">
        Order Summary
      </h2>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-text-secondary">
          <span>Subtotal ({totalItems()} items)</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-text-secondary">
          <span>Shipping</span>
          <span className="text-cyan">Free</span>
        </div>
        <div className="border-t border-border pt-3">
          <div className="flex justify-between font-medium text-text-primary">
            <span>Total</span>
            <span className="font-display text-lg font-bold">
              {formatPrice(subtotal)}
            </span>
          </div>
        </div>
      </div>

      <Button variant="primary" size="lg" className="mt-6 w-full">
        Checkout
      </Button>

      <p className="mt-3 text-center text-xs text-text-muted">
        Secure checkout. No payment info required (demo only).
      </p>
    </div>
  );
}
