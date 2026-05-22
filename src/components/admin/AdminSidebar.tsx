"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  CubeIcon,
  UsersIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Dashboard", icon: HomeIcon },
  { href: "/admin/products", label: "Products", icon: CubeIcon },
  { href: "/admin/users", label: "Users", icon: UsersIcon },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 flex-shrink-0 border-r border-border bg-surface lg:block">
      <div className="flex h-full flex-col">
        <div className="p-6">
          <Link
            href="/admin"
            className="font-display text-lg font-bold text-text-primary"
          >
            Admin Panel
          </Link>
        </div>

        <nav className="flex-1 px-3">
          <ul className="space-y-1">
            {links.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-cyan/10 text-cyan"
                        : "text-text-secondary hover:text-text-primary hover:bg-surface-elevated",
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-border p-3">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors"
          >
            <ArrowRightStartOnRectangleIcon className="h-5 w-5" />
            Back to Store
          </Link>
        </div>
      </div>
    </aside>
  );
}
