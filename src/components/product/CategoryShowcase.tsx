import Image from "next/image";
import Link from "next/link";
import { categoriesApi } from "@/lib/api/categories";

export async function CategoryShowcase() {
  const categories = await categoriesApi.getAll({ limit: 6 });

  return (
    <section className="border-t border-border py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="font-display text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Browse by Category
          </h2>
          <p className="mt-2 text-text-secondary">
            Find your vibe, explore our collections
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products?categoryId=${category.id}`}
              className="group relative flex aspect-square flex-col items-center justify-center overflow-hidden rounded-xl border border-border bg-surface transition-all duration-300 hover:border-void-300 hover:-translate-y-1"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover opacity-60 transition-all duration-300 group-hover:opacity-80 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 16vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-void/40 to-transparent" />
              <span className="relative z-10 font-display text-sm font-bold text-text-primary text-center px-2">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
