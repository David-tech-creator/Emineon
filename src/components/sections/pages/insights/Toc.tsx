"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { cn } from "@/lib/cn";
import { useLenis } from "@/components/layout/SmoothScroll";
import type { TocItem } from "./blocks";

/** Sticky table of contents with the active heading highlighted. */
export function Toc({ items, label }: { items: TocItem[]; label: string }) {
  const [active, setActive] = useState(items[0]?.id);
  const lenis = useLenis();

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => !!e);
    if (!els.length) return;
    const onScroll = () => {
      const line = window.innerHeight * 0.3;
      let current = els[0].id;
      for (const el of els) if (el.getBoundingClientRect().top - line <= 0) current = el.id;
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  const go = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    const t = document.getElementById(id);
    if (!t) return;
    e.preventDefault();
    const offset = -96;
    if (lenis) lenis.scrollTo(t, { offset });
    else window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY + offset, behavior: "smooth" });
    history.replaceState(null, "", `#${id}`);
  };

  if (!items.length) return null;
  return (
    <nav aria-label={label}>
      <p className="eyebrow text-fg-dim">{label}</p>
      <ol className="mt-5 border-l border-line">
        {items.map((it, i) => {
          const on = it.id === active;
          return (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                onClick={(e) => go(e, it.id)}
                aria-current={on ? "location" : undefined}
                className={cn(
                  "relative -ml-px flex gap-3 border-l py-2 pl-4 text-[13.5px] leading-snug transition-colors duration-200",
                  on ? "border-ember text-fg" : "border-transparent text-fg-dim hover:text-fg-muted",
                )}
              >
                <span className={cn("font-mono text-[11px] tabular", on ? "text-ember-ink" : "text-fg-dim")}>{String(i + 1).padStart(2, "0")}</span>
                <span>{it.label}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
