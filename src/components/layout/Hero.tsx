import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-void via-void to-cyan/5" />
      <div className="absolute right-0 top-0 h-[600px] w-[600px] translate-x-1/3 translate-y-[-20%] rounded-full bg-cyan/5 blur-3xl" />
      <div className="absolute left-0 bottom-0 h-[400px] w-[400px] -translate-x-1/3 translate-y-1/4 rounded-full bg-coral/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        <div className="max-w-3xl">
          {/* Tagline */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan/20 bg-cyan/5 px-3 py-1">
            <span className="h-2 w-2 rounded-full bg-cyan animate-pulse" />
            <span className="text-xs font-medium text-cyan tracking-wider uppercase">
              Premium Collection 2026
            </span>
          </div>

          {/* Main heading */}
          <h1 className="font-display text-5xl font-bold tracking-tight text-text-primary sm:text-7xl lg:text-8xl">
            Where Style
            <br />
            <span className="text-cyan">Meets the Void</span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-text-secondary sm:text-xl">
            Curated fashion for those who dare to stand out. Discover the
            intersection of streetwear edge and premium sophistication.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap gap-4">
            <Button size="lg" href="/products">
              Shop Collection
            </Button>
            <Button variant="outline" size="lg" href="/products?categoryId=4">
              Explore Adidas
            </Button>
          </div>
        </div>

        {/* Decorative element */}
        <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 lg:block">
          <div className="relative">
            <div className="text-[200px] font-display font-black leading-none text-white/[0.02] select-none">
              VOID
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
