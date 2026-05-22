import { productsApi } from "@/lib/api/products";
import { ProductGrid } from "./ProductGrid";

export async function FeaturedProducts() {
  let products;
  try {
    products = await productsApi.getAll({ offset: 0, limit: 8 });
  } catch {
    return null;
  }

  if (products.length === 0) return null;

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              Featured Products
            </h2>
            <p className="mt-2 text-text-secondary">
              Hand-picked selections for the bold
            </p>
          </div>
          <a
            href="/products"
            className="hidden sm:inline-flex text-sm font-medium text-cyan hover:text-cyan-dark transition-colors"
          >
            View All &rarr;
          </a>
        </div>

        <ProductGrid products={products} />
      </div>
    </section>
  );
}
