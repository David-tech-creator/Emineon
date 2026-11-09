"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import { RelatedCardsGrid, type RelatedItem } from "../shared/RelatedCards";

export type FilterOption = { value: string; label: string; count: number };

type Props = {
  /** Filter group label (visible on desktop, accessible name always). */
  label: string;
  allLabel: string;
  options: FilterOption[];
  items: (RelatedItem & { group: string })[];
  /** Query param used to persist the filter in the URL (e.g. "sector"). */
  param: string;
  columns?: 2 | 3;
};

/**
 * Mono chip filter + card grid. Works without JS (all items render server-side);
 * the active filter is mirrored in the URL (?sector=...) so it can be shared.
 */
export function FilterGrid({ label, allLabel, options, items, param, columns = 3 }: Props) {
  const [active, setActive] = useState<string>("all");

  useEffect(() => {
    const v = new URLSearchParams(window.location.search).get(param);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sync from URL on mount (static page)
    if (v && options.some((o) => o.value === v)) setActive(v);
  }, [param, options]);

  const select = (v: string) => {
    setActive(v);
    const url = new URL(window.location.href);
    if (v === "all") url.searchParams.delete(param);
    else url.searchParams.set(param, v);
    window.history.replaceState(null, "", url.toString());
  };

  const visible = useMemo(() => (active === "all" ? items : items.filter((i) => i.group === active)), [active, items]);
  const total = items.length;

  return (
    <div>
      <div role="group" aria-label={label} className="flex flex-col gap-4 border-y border-line py-4 md:flex-row md:items-center md:gap-8">
        <span className="eyebrow shrink-0 text-fg-dim">{label}</span>
        <div className="-mx-[var(--gutter)] flex gap-2 overflow-x-auto px-[var(--gutter)] [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0 [&::-webkit-scrollbar]:hidden">
          {[{ value: "all", label: allLabel, count: total }, ...options].map((o) => {
            const on = o.value === active;
            return (
              <button
                key={o.value}
                type="button"
                aria-pressed={on}
                onClick={() => select(o.value)}
                className={cn(
                  "inline-flex h-9 shrink-0 items-center gap-2 rounded-[2px] border px-3 font-mono text-[11.5px] uppercase tracking-[0.12em] transition-colors duration-200",
                  on ? "border-ember bg-ember/10 text-fg" : "border-line-strong text-fg-muted hover:border-fg/50 hover:text-fg",
                )}
              >
                {o.label}
                <span className={cn("tabular", on ? "text-ember-ink" : "text-fg-dim")}>{String(o.count).padStart(2, "0")}</span>
              </button>
            );
          })}
        </div>
      </div>
      <p className="sr-only" aria-live="polite">
        {visible.length} / {total}
      </p>
      <RelatedCardsGrid key={active} items={visible} columns={columns} className="mt-10 md:mt-14" />
    </div>
  );
}
