import { api, buildQuery, type PaginationParams } from "./client";
import type { User, CreateUserPayload } from "@/lib/types";

export const usersApi = {
  getAll: (params: PaginationParams = {}) =>
    api.get<User[]>(`/users${buildQuery(params)}`),

  getById: (id: number) =>
    api.get<User>(`/users/${id}`),

  create: (payload: CreateUserPayload) =>
    api.post<User>("/users", payload),

  update: (id: number, payload: Partial<CreateUserPayload>) =>
    api.put<User>(`/users/${id}`, payload),

  delete: (id: number) =>
    api.delete<void>(`/users/${id}`),

  isEmailAvailable: (email: string) =>
    api.post<{ isAvailable: boolean }>("/users/is-available", { email }),
};
