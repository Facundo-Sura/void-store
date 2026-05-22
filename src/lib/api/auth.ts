import { api } from "./client";
import type { LoginCredentials, AuthResponse, User } from "@/lib/types";

export const authApi = {
  login: (credentials: LoginCredentials) =>
    api.post<AuthResponse>("/auth/login", credentials),

  getProfile: () =>
    api.get<User>("/auth/profile"),

  refreshToken: (refreshToken: string) =>
    api.post<{ access_token: string; refresh_token: string }>("/auth/refresh-token", { refreshToken }),
};
