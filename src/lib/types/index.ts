/* ─── VOID Store — TypeScript Types ─── */

// ─── API Response Types ───

export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  creationAt: string;
  updatedAt: string;
}

export interface Product {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
  creationAt: string;
  updatedAt: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  role: "customer" | "admin";
  avatar: string;
  creationAt: string;
  updatedAt: string;
}

// ─── API Request Types ───

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
}

export interface CreateProductPayload {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}

export interface UpdateProductPayload {
  title?: string;
  price?: number;
  description?: string;
  categoryId?: number;
  images?: string[];
}

export interface CreateUserPayload {
  email: string;
  name: string;
  password: string;
  role: "customer" | "admin";
  avatar: string;
}

// ─── UI Types ───

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  offset: number;
  limit: number;
}

// ─── Profile Types ───

export interface ExtendedProfile {
  province: string;
  city: string;
  zipCode: string;
  description: string;
  dni: string;
}
