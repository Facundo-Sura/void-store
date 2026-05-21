# 🥀 VOID — Where Style Meets the Void

> **Premium curated fashion marketplace.** A modern e-commerce experience built with Next.js, powered by the Platzi Fake Store API.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss)
![Bun](https://img.shields.io/badge/Bun-1.3-000?style=flat-square&logo=bun)

---

## ✨ Features

- **🛍️ Product Catalog** — Grid layout with pagination, category filters, and search
- **🔍 Product Detail** — Image gallery, description, pricing, and related products
- **🛒 Shopping Cart** — Persistent local storage with Zustand, quantity management
- **🔐 Authentication** — JWT-based login/register with refresh tokens
- **👑 Admin Panel** — Full CRUD for product management
- **🎨 Dark Mode** — Premium dark-first design with cyan accents
- **⚡ Modern Stack** — Next.js 16 App Router, React 19, TypeScript 5, Tailwind v4

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh) 1.3+

### Installation

```bash
git clone <repo-url>
cd void-store
bun install
```

### Development

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
bun run build
```

### Deploy

Deploy to Vercel with zero configuration:

```bash
vercel
```

## 🏗️ Architecture

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout (fonts, theme)
│   ├── page.tsx            # Landing page
│   ├── products/           # Product catalog & detail
│   ├── cart/               # Shopping cart
│   ├── auth/               # Login & register
│   ├── profile/            # User profile
│   └── admin/              # Admin panel
├── components/
│   ├── ui/                 # Atoms (Button, Card, Badge, etc.)
│   ├── layout/             # Header, Footer, Navbar
│   ├── product/            # ProductCard, ProductGrid, Gallery
│   ├── cart/               # CartItem, CartSummary
│   └── auth/               # LoginForm, RegisterForm
├── lib/
│   ├── api/                # API client (products, categories, auth, users)
│   ├── types/              # TypeScript interfaces
│   └── utils/              # Utility functions
└── store/                  # Zustand stores (cart)
```

## 🎨 Design System

| Token | Value |
|---|---|
| `--color-void` | `#0a0a0a` |
| `--color-cyan` | `#00f0ff` |
| `--color-coral` | `#ff5470` |
| `--font-display` | Space Grotesk |
| `--font-sans` | Inter |

## 📡 API

This project uses the [Platzi Fake Store API](https://api.escuelajs.co/docs) — a RESTful API with products, categories, users, and authentication endpoints.

## 📄 License

MIT
