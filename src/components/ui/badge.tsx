import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "muted";
};

const variantClassName: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default: "border-zinc-300 bg-zinc-100 text-zinc-800",
  muted: "border-zinc-200 bg-white text-zinc-700",
};

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        variantClassName[variant],
        className,
      )}
      {...props}
    />
  );
}
