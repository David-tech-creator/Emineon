"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { cn } from "@/lib/cn";
import { useLenis } from "@/components/layout/SmoothScroll";

export type InPageNavItem = { id: string; label: string };

type InPageNavProps = {
  items: InPageNavItem[];
  /** Accessible label + visible mono title, e.g. dict.common.labels.onThisPage */
  label: string;
  className?: string;
};

const NAV_H = 72;
const BAR_H = 52;

/**
 * Sticky in-page navigation for long detail pages. Sits under the fixed site nav,
 * tracks the active section (IntersectionObserver), scrolls horizontally on mobile.
 * Target sections need matching `id`s.
 */
export function InPageNav({ items, label, className }: InPageNavProps) {
  const [active, setActive] = useState(items[0]?.id);
  const lenis = useLenis();
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => !!e);
    if (els.length === 0) return;
    const visible = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.set(e.target.id, e.boundingClientRect.top);
          else visible.delete(e.target.id);
        }
        if (visible.size > 0) {
          // The topmost visible section wins.
          const first = items.find((i) => visible.has(i.id));
          if (first) setActive(first.id);
        }
      },
      { rootMargin: `-${NAV_H + BAR_H + 8}px 0px -55% 0px`, threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  // Keep the active pill in view on mobile.
  useEffect(() => {
    const list = listRef.current;
    const el = list?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!list || !el) return;
    const left = el.offsetLeft - 20;
    if (left < list.scrollLeft || el.offsetLeft + el.offsetWidth > list.scrollLeft + list.clientWidth) {
      list.scrollTo({ left, behavior: "smooth" });
    }
  }, [active]);

  const onClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    const offset = -(NAV_H + BAR_H + 8);
    if (lenis) lenis.scrollTo(target, { offset });
    else window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY + offset, behavior: "smooth" });
    history.replaceState(null, "", `#${id}`);
    setActive(id);
  };

  return (
    <nav
      aria-label={label}
      className={cn(
        "sticky top-[var(--nav-h)] z-30 border-y border-line bg-canvas/95 backdrop-blur-md",
        className,
      )}
    >
      <div className="container-site flex h-[52px] items-center gap-6">
        <span className="eyebrow hidden shrink-0 text-fg-dim 2xl:inline">{label}</span>
        <ul
          ref={listRef}
          className="-mx-[var(--gutter)] flex flex-1 items-center gap-1 overflow-x-auto px-[var(--gutter)] [scrollbar-width:none] lg:mx-0 lg:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {items.map((it, i) => {
            const isActive = it.id === active;
            return (
              <li key={it.id} className="shrink-0">
                <a
                  href={`#${it.id}`}
                  data-id={it.id}
                  onClick={(e) => onClick(e, it.id)}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "relative flex h-[52px] items-center gap-2 px-2.5 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors duration-200",
                    isActive ? "text-fg" : "text-fg-muted hover:text-fg",
                  )}
                >
                  <span className={cn("tabular", isActive ? "text-ember-ink" : "text-fg-dim")}>{String(i + 1).padStart(2, "0")}</span>
                  {it.label}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-2.5 -bottom-px h-px origin-left bg-ember transition-transform duration-500 ease-[var(--ease-out-expo)]",
                      isActive ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
