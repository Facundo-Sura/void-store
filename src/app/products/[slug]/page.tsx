import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { productsApi } from "@/lib/api/products";
import { formatPrice } from "@/lib/utils";
import { Breadcrumbs } from "@/components/product/Breadcrumbs";
import { ImageGallery } from "@/components/product/ImageGallery";
import { AddToCartButton } from "@/components/product/AddToCartButton";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { Badge } from "@/components/ui/Badge";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

async function getProduct(slug: string) {
  try {
    return await productsApi.getBySlug(slug);
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return { title: "Product Not Found — VOID" };
  }

  return {
    title: `${product.title} — VOID`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: product.images,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Products", href: "/products" },
          { label: product.category.name, href: `/products?categoryId=${product.category.id}` },
          { label: product.title },
        ]}
      />

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Gallery */}
        <ImageGallery images={product.images} title={product.title} />

        {/* Product info */}
        <div className="flex flex-col">
          <div className="mb-2">
            <Badge variant="default">{product.category.name}</Badge>
          </div>

          <h1 className="font-display text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            {product.title}
          </h1>

          <div className="mt-4">
            <span className="font-display text-3xl font-bold text-text-primary">
              {formatPrice(product.price)}
            </span>
          </div>

          <div className="mt-8 border-t border-border pt-8">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-3">
              Description
            </h3>
            <p className="text-text-secondary leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="mt-auto pt-8">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>

      {/* Related products */}
      <RelatedProducts productId={product.id} />
    </div>
  );
}
