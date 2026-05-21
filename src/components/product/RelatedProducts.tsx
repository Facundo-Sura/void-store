import { productsApi } from "@/lib/api/products";
import { ProductGrid } from "./ProductGrid";

interface RelatedProductsProps {
  productId: number;
}

export async function RelatedProducts({ productId }: RelatedProductsProps) {
  try {
    const products = await productsApi.getRelated(productId);
    const limited = products.slice(0, 4);

    if (limited.length === 0) return null;

    return (
      <section className="mt-16 border-t border-border pt-16">
        <h2 className="font-display text-2xl font-bold tracking-tight text-text-primary mb-8">
          You May Also Like
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {limited.map((product) => (
            <ProductGrid key={product.id} products={[product]} />
          ))}
        </div>
      </section>
    );
  } catch {
    return null;
  }
}
