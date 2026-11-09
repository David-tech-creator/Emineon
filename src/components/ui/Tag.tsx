import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type TagProps = {
  children: ReactNode;
  className?: string;
  /** ember = accent outline; solid = filled ink; default = hairline. */
  variant?: "default" | "ember" | "solid";
};

export function Tag({ children, className, variant = "default" }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-[2px] border px-2 py-1 font-mono text-[11px] leading-none tracking-[0.12em] uppercase",
        variant === "default" && "border-line-strong text-fg-muted",
        variant === "ember" && "border-ember/50 text-ember-ink",
        variant === "solid" && "border-transparent bg-fg text-[var(--bg)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
