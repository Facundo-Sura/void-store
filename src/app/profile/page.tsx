"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { PencilIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { useAuth } from "@/lib/auth/AuthContext";
import { usersApi } from "@/lib/api/users";
import { Button } from "@/components/ui/Button";
import {
  loadExtendedProfile,
  saveExtendedProfile,
  DEFAULT_AVATAR,
} from "@/lib/profile";
import type { ExtendedProfile } from "@/lib/types";

function ProfileContent() {
  const { user, logout, updateUser } = useAuth();

  // Edit mode toggle
  const [isEditing, setIsEditing] = useState(false);

  // API fields
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  // Extended profile (localStorage)
  const [extended, setExtended] = useState<ExtendedProfile>({
    province: "",
    city: "",
    zipCode: "",
    description: "",
    dni: "",
  });

  // UI state
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Load data on mount / user change
  useEffect(() => {
    if (!user) return;
    setName(user.name);
    setAvatar(user.avatar);
    setExtended(loadExtendedProfile());
  }, [user]);

  if (!user) return null;

  const handleSave = async () => {
    setError("");
    setSuccess("");
    setIsSaving(true);

    try {
      // Persist avatar override (API only stores image URLs)
      const finalAvatar =
        avatar.trim() === "" ? DEFAULT_AVATAR : avatar.trim();

      // Update API user (name + avatar)
      await usersApi.update(user.id, {
        name: name.trim(),
        avatar: finalAvatar,
      });

      // Persist extended profile locally
      saveExtendedProfile(extended);

      // Sync auth context so Header reflects changes immediately
      updateUser({ name: name.trim(), avatar: finalAvatar });

      setSuccess("Profile updated successfully.");
      setIsEditing(false);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update profile.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    // Reset fields to original values
    setName(user.name);
    setAvatar(user.avatar);
    setExtended(loadExtendedProfile());
    setError("");
    setSuccess("");
    setIsEditing(false);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-bold tracking-tight text-text-primary">
          My Profile
        </h1>
        {!isEditing && (
          <Button
            variant="outline"
            onClick={() => setIsEditing(true)}
          >
            <PencilIcon className="h-4 w-4" />
            Edit Profile
          </Button>
        )}
      </div>

      {/* Alerts */}
      {error && (
        <div className="mb-6 rounded-xl border border-coral/20 bg-coral/5 p-4 text-sm text-coral">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-6 rounded-xl border border-green-500/20 bg-green-500/5 p-4 text-sm text-green-500">
          {success}
        </div>
      )}

      <div className="rounded-xl border border-border bg-surface p-6 sm:p-8">
        {/* ─── Avatar ─── */}
        <div className="flex items-center gap-6">
          <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-full bg-void-200">
            {avatar ? (
              <Image
                src={avatar}
                alt={name}
                fill
                className="object-cover"
                sizes="80px"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-text-muted">
                {name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="space-y-2">
                <label className="block text-xs font-medium text-text-secondary">
                  Avatar URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                    placeholder={DEFAULT_AVATAR}
                    className="flex-1 rounded-lg border border-border bg-surface-elevated px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-cyan"
                  />
                  <button
                    type="button"
                    onClick={() => setAvatar("")}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-secondary hover:text-coral hover:border-coral/50 transition-all"
                    title="Remove avatar"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-xs text-text-muted">
                  Enter an image URL or clear to use initials.
                </p>
              </div>
            ) : (
              <div>
                <h2 className="font-display text-xl font-bold text-text-primary">
                  {user.name}
                </h2>
                <p className="text-sm text-text-secondary">{user.email}</p>
                <span className="mt-1 inline-flex items-center rounded-full bg-cyan/10 px-2.5 py-0.5 text-xs font-medium text-cyan capitalize">
                  {user.role}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ─── Form / Details ─── */}
        <div className="mt-8 border-t border-border pt-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-4">
            {isEditing ? "Edit Details" : "Account Details"}
          </h3>

          {isEditing ? (
            <div className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full rounded-lg border border-border bg-surface-elevated px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-cyan"
                />
              </div>

              {/* DNI */}
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1.5">
                  DNI
                </label>
                <input
                  type="text"
                  value={extended.dni}
                  onChange={(e) =>
                    setExtended({ ...extended, dni: e.target.value })
                  }
                  placeholder="12.345.678"
                  className="w-full rounded-lg border border-border bg-surface-elevated px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-cyan"
                />
              </div>

              {/* Province + City (side-by-side) */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1.5">
                    Province
                  </label>
                  <input
                    type="text"
                    value={extended.province}
                    onChange={(e) =>
                      setExtended({ ...extended, province: e.target.value })
                    }
                    placeholder="Buenos Aires"
                    className="w-full rounded-lg border border-border bg-surface-elevated px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-cyan"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1.5">
                    City
                  </label>
                  <input
                    type="text"
                    value={extended.city}
                    onChange={(e) =>
                      setExtended({ ...extended, city: e.target.value })
                    }
                    placeholder="La Plata"
                    className="w-full rounded-lg border border-border bg-surface-elevated px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-cyan"
                  />
                </div>
              </div>

              {/* Zip Code */}
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1.5">
                  Zip Code
                </label>
                <input
                  type="text"
                  value={extended.zipCode}
                  onChange={(e) =>
                    setExtended({ ...extended, zipCode: e.target.value })
                  }
                  placeholder="B1900"
                  className="w-full rounded-lg border border-border bg-surface-elevated px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-cyan"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1.5">
                  Additional Description
                </label>
                <textarea
                  value={extended.description}
                  onChange={(e) =>
                    setExtended({ ...extended, description: e.target.value })
                  }
                  rows={3}
                  placeholder="Apartment, floor, references…"
                  className="w-full resize-none rounded-lg border border-border bg-surface-elevated px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-cyan"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={handleSave}
                  isLoading={isSaving}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* View mode — all fields */}
              <dl className="space-y-4 text-sm">
                <div className="flex justify-between pb-2 border-b border-border/50">
                  <dt className="text-text-secondary">Name</dt>
                  <dd className="text-text-primary font-medium">{user.name}</dd>
                </div>
                <div className="flex justify-between pb-2 border-b border-border/50">
                  <dt className="text-text-secondary">Email</dt>
                  <dd className="text-text-primary font-medium">
                    {user.email}
                  </dd>
                </div>
                <div className="flex justify-between pb-2 border-b border-border/50">
                  <dt className="text-text-secondary">Role</dt>
                  <dd className="text-text-primary font-medium capitalize">
                    {user.role}
                  </dd>
                </div>
                <div className="flex justify-between pb-2 border-b border-border/50">
                  <dt className="text-text-secondary">DNI</dt>
                  <dd className="text-text-primary font-medium">
                    {extended.dni || "—"}
                  </dd>
                </div>
                <div className="flex justify-between pb-2 border-b border-border/50">
                  <dt className="text-text-secondary">Province</dt>
                  <dd className="text-text-primary font-medium">
                    {extended.province || "—"}
                  </dd>
                </div>
                <div className="flex justify-between pb-2 border-b border-border/50">
                  <dt className="text-text-secondary">City</dt>
                  <dd className="text-text-primary font-medium">
                    {extended.city || "—"}
                  </dd>
                </div>
                <div className="flex justify-between pb-2 border-b border-border/50">
                  <dt className="text-text-secondary">Zip Code</dt>
                  <dd className="text-text-primary font-medium">
                    {extended.zipCode || "—"}
                  </dd>
                </div>
                <div className="flex justify-between pb-2 border-b border-border/50">
                  <dt className="text-text-secondary">Additional Info</dt>
                  <dd className="text-text-primary font-medium max-w-[60%] text-right">
                    {extended.description || "—"}
                  </dd>
                </div>
              </dl>
            </>
          )}
        </div>

        {/* ─── Sign Out ─── */}
        {!isEditing && (
          <div className="mt-8 border-t border-border pt-6">
            <Button
              variant="danger"
              onClick={logout}
              className="w-full sm:w-auto"
            >
              Sign Out
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <AuthGuard>
      <ProfileContent />
    </AuthGuard>
  );
}
