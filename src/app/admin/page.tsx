import { Suspense } from "react";
import { productsApi } from "@/lib/api/products";
import { categoriesApi } from "@/lib/api/categories";
import { usersApi } from "@/lib/api/users";

async function AdminStats() {
  let allProducts: { length: number } = { length: 0 };
  let allCategories: { length: number } = { length: 0 };
  let allUsers: { length: number } = { length: 0 };
  let apiOnline = false;

  try {
    const [products, categories, users] = await Promise.all([
      productsApi.getAll({ offset: 0, limit: 1 }),
      categoriesApi.getAll({ limit: 1 }),
      usersApi.getAll({ offset: 0, limit: 1 }),
    ]);
    allProducts = await productsApi.getAll({ offset: 0, limit: 200 });
    allCategories = await categoriesApi.getAll({ limit: 100 });
    allUsers = await usersApi.getAll({ offset: 0, limit: 100 });
    apiOnline = true;
  } catch {
    // API unavailable — show offline state
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        label="Total Products"
        value={allProducts.length}
        color="cyan"
      />
      <StatCard
        label="Categories"
        value={allCategories.length}
        color="coral"
      />
      <StatCard
        label="Total Users"
        value={allUsers.length}
        color="purple"
      />
      <StatCard
        label="API Status"
        value={apiOnline ? "Online" : "Offline"}
        color={apiOnline ? "green" : "coral"}
      />
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: string | number;
  color: "cyan" | "coral" | "green" | "purple";
}) {
  const colors = {
    cyan: "bg-cyan/10 text-cyan border-cyan/20",
    coral: "bg-coral/10 text-coral border-coral/20",
    green: "bg-green-500/10 text-green-500 border-green-500/20",
    purple: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  };

  return (
    <div
      className={`rounded-xl border p-6 ${colors[color]}`}
    >
      <p className="text-sm font-medium opacity-80">{label}</p>
      <p className="mt-2 font-display text-3xl font-bold">{value}</p>
    </div>
  );
}

function StatsFallback() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="h-28 animate-pulse rounded-xl border border-border bg-surface-elevated"
        />
      ))}
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold tracking-tight text-text-primary mb-8">
        Dashboard
      </h1>
      <Suspense fallback={<StatsFallback />}>
        <AdminStats />
      </Suspense>
    </div>
  );
}
