import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type EyebrowProps = {
  /** "01" -> renders "[ 01 — Label ]". Omit for "[ Label ]". */
  index?: string | number;
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Show a pulsing ember "live" dot before the label. */
  live?: boolean;
};

/** Mono bracketed label: [ 01 — Services ] */
export function Eyebrow({ index, children, as: Tag = "p", className, live }: EyebrowProps) {
  const idx = typeof index === "number" ? String(index).padStart(2, "0") : index;
  // Content strings may already carry brackets ("[ Services ]"): strip them, we draw our own.
  const label = typeof children === "string" ? children.replace(/^\s*\[\s*|\s*\]\s*$/g, "") : children;
  return (
    <Tag className={cn("eyebrow inline-flex items-center gap-2 text-fg-muted", className)}>
      {live && <span aria-hidden className="animate-pulse-dot size-1.5 rounded-full bg-ember" />}
      <span aria-hidden className="text-fg-dim">[</span>
      {idx && (
        <>
          <span className="text-fg tabular">{idx}</span>
          <span aria-hidden className="text-fg-dim">—</span>
        </>
      )}
      <span>{label}</span>
      <span aria-hidden className="text-fg-dim">]</span>
    </Tag>
  );
}
