import { api, buildQuery, type PaginationParams } from "./client";
import type { Product, CreateProductPayload, UpdateProductPayload } from "@/lib/types";

export const productsApi = {
  getAll: (params: PaginationParams & { categoryId?: number; title?: string; price_min?: number; price_max?: number } = {}) =>
    api.get<Product[]>(`/products${buildQuery(params)}`),

  getById: (id: number) =>
    api.get<Product>(`/products/${id}`),

  getBySlug: (slug: string) =>
    api.get<Product>(`/products/slug/${slug}`),

  getRelated: (id: number) =>
    api.get<Product[]>(`/products/${id}/related`),

  getRelatedBySlug: (slug: string) =>
    api.get<Product[]>(`/products/slug/${slug}/related`),

  create: (payload: CreateProductPayload) =>
    api.post<Product>("/products", payload),

  update: (id: number, payload: UpdateProductPayload) =>
    api.put<Product>(`/products/${id}`, payload),

  delete: (id: number) =>
    api.delete<void>(`/products/${id}`),
};
