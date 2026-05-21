import { Hero } from "@/components/layout/Hero";
import { FeaturedProducts } from "@/components/product/FeaturedProducts";
import { CategoryShowcase } from "@/components/product/CategoryShowcase";
import { NewsletterSection } from "@/components/layout/NewsletterSection";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <CategoryShowcase />
      <NewsletterSection />
    </>
  );
}
