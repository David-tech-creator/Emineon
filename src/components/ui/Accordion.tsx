"use client";

import { useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export type AccordionItem = { q: ReactNode; a: ReactNode };

type AccordionProps = {
  items: AccordionItem[];
  /** Allow several panels open at once. */
  multiple?: boolean;
  /** Index open by default (-1 for none). */
  defaultOpen?: number;
  className?: string;
};

/** FAQ accordion: hairline rows, mono index, plus/minus glyph, grid-rows height animation. */
export function Accordion({ items, multiple = false, defaultOpen = -1, className }: AccordionProps) {
  const baseId = useId();
  const [open, setOpen] = useState<number[]>(defaultOpen >= 0 ? [defaultOpen] : []);
  const toggle = (i: number) =>
    setOpen((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : multiple ? [...prev, i] : [i]));

  return (
    <div className={cn("border-t border-line", className)}>
      {items.map((item, i) => {
        const isOpen = open.includes(i);
        const btnId = `${baseId}-b${i}`;
        const panelId = `${baseId}-p${i}`;
        return (
          <div key={i} className="border-b border-line">
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                className="group/acc flex w-full items-start gap-6 py-6 text-left md:py-7"
              >
                <span className="eyebrow mt-1.5 w-8 shrink-0 text-fg-dim tabular">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex-1 text-[19px] leading-snug font-medium text-fg transition-colors duration-200 group-hover/acc:text-ember-ink md:text-[22px]">
                  {item.q}
                </span>
                <span aria-hidden className="relative mt-2 size-3.5 shrink-0 text-fg-muted">
                  <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-current" />
                  <span
                    className={cn(
                      "absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-current transition-transform duration-300 ease-[var(--ease-out-expo)]",
                      isOpen && "scale-y-0",
                    )}
                  />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className={cn(
                "grid transition-[grid-template-rows] duration-500 ease-[var(--ease-out-expo)]",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden" inert={!isOpen}>
                <div className="max-w-3xl pr-10 pb-7 pl-14 text-fg-muted">{item.a}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
