import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost";
};

const baseClassName =
  "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 disabled:pointer-events-none disabled:opacity-50";

const variantClassName: Record<NonNullable<ButtonProps["variant"]>, string> = {
  default: "bg-zinc-900 text-white hover:bg-zinc-800",
  outline: "border border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-100",
  ghost: "text-zinc-700 hover:bg-zinc-100",
};

export function Button({
  className,
  variant = "default",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(baseClassName, variantClassName[variant], className)}
      type={type}
      {...props}
    />
  );
}
