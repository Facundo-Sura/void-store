import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "cyan" | "coral";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variants: Record<BadgeVariant, string> = {
  default: "bg-surface-elevated text-text-secondary",
  cyan: "bg-cyan/10 text-cyan border border-cyan/20",
  coral: "bg-coral/10 text-coral border border-coral/20",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
