import type { Office } from "@/content";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/ui";

/** Bordered list of offices: city, country, role. HQ first and marked. */
export function OfficeList({ offices, hqLabel, className, columns = 4 }: { offices: Office[]; hqLabel: string; className?: string; columns?: 2 | 3 | 4 }) {
  const sorted = [...offices].sort((a, b) => Number(!!b.hq) - Number(!!a.hq));
  return (
    <ul
      className={cn(
        "grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2",
        columns === 4 && "lg:grid-cols-4",
        columns === 3 && "lg:grid-cols-3",
        className,
      )}
    >
      {sorted.map((o, i) => (
        <Reveal as="li" key={o.id} delay={i * 0.04} className={cn("flex flex-col gap-2 bg-[var(--bg)] p-5 md:p-6", o.hq && offices.length % 2 === 1 && "sm:col-span-2")}>
          <div className="flex items-center justify-between gap-3">
            <span className="eyebrow text-fg-dim">{o.region}</span>
            {o.hq && <span className="eyebrow text-ember-ink">{hqLabel}</span>}
          </div>
          <p className="mt-3 text-[20px] font-medium tracking-[-0.01em] text-fg">{o.city}</p>
          <p className="font-mono text-[12px] text-fg-muted">{o.country}</p>
          <p className="mt-2 text-[14px] leading-snug text-fg-muted">{o.role}</p>
        </Reveal>
      ))}
    </ul>
  );
}
