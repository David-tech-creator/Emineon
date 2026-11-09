import type { Role } from "@/content";
import { Button, Reveal, Tag } from "@/components/ui";

type Labels = {
  location: string;
  type: string;
  team: string;
  responsibilities: string;
  requirements: string;
  niceToHave: string;
  apply: string;
};

function Column({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="eyebrow text-fg-dim">{title}</h4>
      <ul className="mt-4 flex flex-col gap-3">
        {items.map((it) => (
          <li key={it} className="flex gap-3 text-[15px] leading-snug text-fg-muted">
            <span aria-hidden className="mt-[0.55em] size-1 shrink-0 rounded-full bg-fg-dim" />
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Roles as native <details> rows (keyboard and no-JS friendly). Each opens to the
 * full description and a mailto apply button with a prefilled subject.
 */
export function RoleList({ roles, labels, mailto }: { roles: Role[]; labels: Labels; mailto: (role: Role) => string }) {
  return (
    <div className="border-t border-line">
      {roles.map((r, i) => (
        <Reveal key={r.slug} delay={i * 0.06}>
          <details id={r.slug} className="group scroll-mt-[calc(var(--nav-h)+24px)] border-b border-line" open={i === 0}>
            <summary className="grid cursor-pointer list-none grid-cols-[2.5rem_1fr_auto] items-center gap-x-4 py-7 md:grid-cols-[4rem_1fr_16rem_10rem_2rem] md:py-9 [&::-webkit-details-marker]:hidden">
              <span className="font-mono text-[12px] text-fg-dim tabular">{String(i + 1).padStart(2, "0")}</span>
              <span>
                <span className="block text-[24px] font-medium leading-tight tracking-[-0.02em] text-fg transition-colors group-hover:text-ember-ink md:text-[32px]">{r.title}</span>
                <span className="mt-2 block text-[15px] text-fg-muted md:hidden">{r.locations.join(" · ")}</span>
              </span>
              <span className="hidden font-mono text-[12px] uppercase tracking-[0.1em] text-fg-muted md:block">{r.locations.join(" · ")}</span>
              <span className="hidden md:block">
                <Tag>{r.type}</Tag>
              </span>
              <span aria-hidden className="relative size-4 justify-self-end text-fg-muted">
                <span className="absolute left-0 top-1/2 h-px w-4 bg-current" />
                <span className="absolute left-1/2 top-0 h-4 w-px bg-current transition-transform duration-300 group-open:scale-y-0" />
              </span>
            </summary>
            <div className="grid grid-cols-1 gap-x-[var(--gutter)] gap-y-10 pb-12 md:grid-cols-12 md:pl-0">
              <div className="md:col-span-4 md:col-start-2">
                <p className="text-lead text-fg">{r.summary}</p>
                <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-line pt-6">
                  <div>
                    <dt className="eyebrow text-fg-dim">{labels.team}</dt>
                    <dd className="mt-2 text-[15px] text-fg">{r.team}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-fg-dim">{labels.type}</dt>
                    <dd className="mt-2 text-[15px] text-fg">{r.type}</dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="eyebrow text-fg-dim">{labels.location}</dt>
                    <dd className="mt-2 text-[15px] text-fg">{r.locations.join(" · ")}</dd>
                  </div>
                </dl>
                <div className="mt-8">
                  <Button href={mailto(r)} arrow>
                    {labels.apply}
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-10 md:col-span-6 md:col-start-7">
                <Column title={labels.responsibilities} items={r.responsibilities} />
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
                  <Column title={labels.requirements} items={r.requirements} />
                  <Column title={labels.niceToHave} items={r.niceToHave} />
                </div>
              </div>
            </div>
          </details>
        </Reveal>
      ))}
    </div>
  );
}
