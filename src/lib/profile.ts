/* ─── VOID Store — Extended Profile Persistence ─── */
/* Fields not supported by Platzi API are stored locally. */

import type { ExtendedProfile } from "@/lib/types";

const STORAGE_KEY = "void-extended-profile";

const defaultProfile: ExtendedProfile = {
  province: "",
  city: "",
  zipCode: "",
  description: "",
  dni: "",
};

export function loadExtendedProfile(): ExtendedProfile {
  if (typeof window === "undefined") return defaultProfile;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProfile;
    return { ...defaultProfile, ...JSON.parse(raw) };
  } catch {
    return defaultProfile;
  }
}

export function saveExtendedProfile(profile: ExtendedProfile): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

export const DEFAULT_AVATAR = "https://picsum.photos/seed/void/200";
