import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, type = "text", ...props }: InputProps) {
  return (
    <input
      className={cn(
        "h-10 w-full rounded-md border-0 bg-white/90 px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400",
        className,
      )}
      type={type}
      {...props}
    />
  );
}
