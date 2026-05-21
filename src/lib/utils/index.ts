/* ─── VOID Store — Utilities ─── */

/**
 * Format a price in USD.
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

/**
 * Truncate text with ellipsis.
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "…";
}

/**
 * Generate a slug from text (fallback if API doesn't return one).
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

/**
 * Get the first valid image URL from a product's images array.
 */
export function getProductImage(images: string[]): string {
  const valid = images.find(
    (img) => img.startsWith("http://") || img.startsWith("https://"),
  );
  return valid || "/placeholder.svg";
}

/**
 * Merge class names (simple utility — use cn() from clsx/twMerge for complex cases).
 */
export function cn(...classes: (string | false | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Check if user is authenticated.
 */
export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("void-auth-token");
}

/**
 * Get auth token.
 */
export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("void-auth-token");
}
