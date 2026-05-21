import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/Button";

export function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-surface-elevated">
        <ShoppingBagIcon className="h-10 w-10 text-text-muted" />
      </div>
      <h2 className="font-display text-2xl font-bold text-text-primary">
        Your cart is empty
      </h2>
      <p className="mt-2 text-text-secondary max-w-sm">
        Looks like you haven&apos;t added anything yet. Explore our collection
        and find something you love.
      </p>
      <div className="mt-8">
        <Button href="/products" variant="primary" size="lg">
          Shop Collection
        </Button>
      </div>
    </div>
  );
}
