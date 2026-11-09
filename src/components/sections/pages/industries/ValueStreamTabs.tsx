"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { ValueStream } from "@/content";
import { cn } from "@/lib/cn";
import { EASE_OUT_EXPO } from "@/lib/motion";

type ValueStreamTabsProps = {
  streams: ValueStream[];
  useCasesLabel: string;
};

/**
 * Value streams as an accessible tab list (WAI-ARIA tabs, arrow-key navigation).
 * Desktop: vertical tab rail on the left, panel on the right. Mobile: tabs stack above the panel.
 * All panels are server-rendered (inactive ones `hidden`) so the content is indexable.
 */
export function ValueStreamTabs({ streams, useCasesLabel }: ValueStreamTabsProps) {
  const [active, setActive] = useState(0);
  const base = useId();
  const reduce = useReducedMotion();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const n = streams.length;
    let next = -1;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (i + 1) % n;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (i - 1 + n) % n;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = n - 1;
    if (next >= 0) {
      e.preventDefault();
      setActive(next);
      tabs.current[next]?.focus();
    }
  };

  return (
    <div className="grid grid-cols-4 gap-x-[var(--gutter)] gap-y-8 md:grid-cols-12">
      <div role="tablist" aria-orientation="vertical" className="col-span-4 border-t border-line md:col-span-5">
        {streams.map((s, i) => {
          const isActive = i === active;
          return (
            <button
              key={s.name}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              role="tab"
              id={`${base}-t${i}`}
              aria-selected={isActive}
              aria-controls={`${base}-p${i}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKey(e, i)}
              className={cn(
                "group/tab relative flex w-full items-baseline gap-5 border-b border-line py-6 text-left transition-colors duration-200",
                isActive ? "text-fg" : "text-fg-dim hover:text-fg-muted",
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "absolute bottom-[-1px] left-0 h-px bg-ember transition-[width] duration-700 ease-[var(--ease-out-expo)]",
                  isActive ? "w-full" : "w-0",
                )}
              />
              <span className={cn("font-mono text-[12px] tabular", isActive ? "text-ember-ink" : "text-fg-dim")}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 text-[clamp(20px,2vw,28px)] font-medium leading-tight tracking-[-0.02em]">{s.name}</span>
              <span className="font-mono text-[12px] text-fg-dim tabular">{s.useCases.length}</span>
            </button>
          );
        })}
      </div>

      <div className="col-span-4 md:col-span-6 md:col-start-7">
        {streams.map((s, i) => (
          <div
            key={s.name}
            role="tabpanel"
            id={`${base}-p${i}`}
            aria-labelledby={`${base}-t${i}`}
            hidden={i !== active}
            tabIndex={0}
            className="outline-none"
          >
            {i === active ? (
              <motion.div
                key={`active-${active}`}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
              >
                  <p className="text-lead text-fg">{s.description}</p>
                  <p className="eyebrow mt-10 text-fg-dim">{useCasesLabel}</p>
                  <ul className="mt-4 border-t border-line">
                    {s.useCases.map((u, j) => (
                      <li key={u} className="flex items-baseline gap-5 border-b border-line py-5">
                        <span className="font-mono text-[12px] text-fg-dim tabular">
                          {String(i + 1).padStart(2, "0")}.{j + 1}
                        </span>
                        <span className="flex-1 text-[17px] leading-snug text-fg">{u}</span>
                        <span aria-hidden className="size-[5px] shrink-0 rounded-full bg-fg-dim" />
                      </li>
                    ))}
                  </ul>
              </motion.div>
            ) : (
              <div>
                  <p className="text-lead text-fg">{s.description}</p>
                  <p className="eyebrow mt-10 text-fg-dim">{useCasesLabel}</p>
                  <ul className="mt-4 border-t border-line">
                    {s.useCases.map((u, j) => (
                      <li key={u} className="flex items-baseline gap-5 border-b border-line py-5">
                        <span className="font-mono text-[12px] text-fg-dim tabular">
                          {String(i + 1).padStart(2, "0")}.{j + 1}
                        </span>
                        <span className="flex-1 text-[17px] leading-snug text-fg">{u}</span>
                        <span aria-hidden className="size-[5px] shrink-0 rounded-full bg-fg-dim" />
                      </li>
                    ))}
                  </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
