import Link from "next/link";
import { cn } from "@/lib/cn";
import { localizedHref, type Locale } from "@/lib/i18n";
import type { Crumb } from "./seo";

type BreadcrumbProps = {
  locale: Locale;
  /** Crumbs with locale-less hrefs. The last crumb is the current page (no href needed). */
  items: Crumb[];
  /** Accessible nav label: dict.common.a11y.breadcrumb */
  label: string;
  className?: string;
};

/** Mono breadcrumb trail: Emineon / Services / AI strategy. Pair with breadcrumbLd() for JSON-LD. */
export function Breadcrumb({ locale, items, label, className }: BreadcrumbProps) {
  return (
    <nav aria-label={label} className={cn("eyebrow text-fg-dim", className)}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${c.label}-${i}`} className="flex items-center gap-2">
              {c.href && !last ? (
                <Link href={localizedHref(locale, c.href)} className="text-fg-muted transition-colors duration-200 hover:text-ember-ink">
                  {c.label}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className={last ? "text-fg" : undefined}>
                  {c.label}
                </span>
              )}
              {!last && <span aria-hidden>/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
