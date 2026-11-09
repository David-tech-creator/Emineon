import Link from "next/link";
import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type CardProps = {
  children: ReactNode;
  /** Already-localized href: the whole cell becomes a link. */
  href?: string;
  as?: ElementType;
  className?: string;
  /** Inner padding preset. */
  padding?: "md" | "lg" | "none";
  "aria-label"?: string;
};

const pad = { md: "p-6 md:p-8", lg: "p-8 md:p-10", none: "" } as const;

/**
 * Bordered grid cell. Place cards in a grid with `gap-px bg-line` + `border border-line`
 * (or use <CardGrid>) to get continuous hairlines. Hover draws an ember hairline across the top.
 */
export function Card({ children, href, as, className, padding = "md", ...aria }: CardProps) {
  const cls = cn(
    "group/card relative flex flex-col bg-[var(--bg)] text-fg transition-colors duration-300 ease-[var(--ease-out-expo)]",
    href && "hover:bg-[color-mix(in_oklab,var(--bg),var(--fg)_3%)]",
    pad[padding],
    className,
  );
  const line = (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-ember transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/card:scale-x-100 group-focus-visible/card:scale-x-100"
    />
  );
  if (href) {
    return (
      <Link href={href} className={cls} aria-label={aria["aria-label"]}>
        {line}
        {children}
      </Link>
    );
  }
  const Tag = as ?? "div";
  return (
    <Tag className={cls} aria-label={aria["aria-label"]}>
      {line}
      {children}
    </Tag>
  );
}

/** Grid wrapper that renders continuous 1px hairlines between cards. */
export function CardGrid({ children, className, as: Tag = "div" }: { children: ReactNode; className?: string; as?: ElementType }) {
  return <Tag className={cn("grid gap-px border border-line bg-line", className)}>{children}</Tag>;
}
