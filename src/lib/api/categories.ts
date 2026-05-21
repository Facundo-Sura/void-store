import { api, buildQuery, type PaginationParams } from "./client";
import type { Category, Product } from "@/lib/types";

export const categoriesApi = {
  getAll: (params: PaginationParams = {}) =>
    api.get<Category[]>(`/categories${buildQuery(params)}`),

  getById: (id: number) =>
    api.get<Category>(`/categories/${id}`),

  getBySlug: (slug: string) =>
    api.get<Category>(`/categories/slug/${slug}`),

  getProducts: (id: number, params: PaginationParams = {}) =>
    api.get<Product[]>(`/categories/${id}/products${buildQuery(params)}`),

  create: (payload: { name: string; image: string }) =>
    api.post<Category>("/categories", payload),

  update: (id: number, payload: { name?: string; image?: string }) =>
    api.put<Category>(`/categories/${id}`, payload),

  delete: (id: number) =>
    api.delete<void>(`/categories/${id}`),
};
