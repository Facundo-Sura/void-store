import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-void">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="font-display text-xl font-bold tracking-tighter text-text-primary"
            >
              VOID
            </Link>
            <p className="mt-2 text-sm text-text-muted max-w-xs">
              Where style meets the void. Premium curated fashion for the
              daring.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-text-muted">
              Shop
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/products" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/products?categoryId=1" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                  Fashion
                </Link>
              </li>

            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-text-muted">
              Support
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <span className="text-sm text-text-muted">FAQ</span>
              </li>
              <li>
                <span className="text-sm text-text-muted">Shipping</span>
              </li>
              <li>
                <span className="text-sm text-text-muted">Returns</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-text-muted">
              Connect
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <span className="text-sm text-text-muted">Twitter / X</span>
              </li>
              <li>
                <span className="text-sm text-text-muted">Instagram</span>
              </li>
              <li>
                <span className="text-sm text-text-muted">GitHub</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-xs text-text-muted">
            &copy; {new Date().getFullYear()} VOID Store. Powered by Platzi Fake
            Store API.
          </p>
        </div>
      </div>
    </footer>
  );
}
