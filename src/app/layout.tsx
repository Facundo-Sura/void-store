import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AuthProvider } from "@/lib/auth/AuthContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VOID — Where Style Meets the Void",
  description:
    "Premium curated fashion marketplace. Discover the intersection of streetwear and sophistication.",
  keywords: ["fashion", "streetwear", "ecommerce", "void", "style"],
  openGraph: {
    title: "VOID — Where Style Meets the Void",
    description:
      "Premium curated fashion marketplace. Discover the intersection of streetwear and sophistication.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-void font-sans text-text-primary antialiased">
        <AuthProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
