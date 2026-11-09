import Link from "next/link";
import type { Insight, Locale } from "@/content/schema";
import { fill, formatDate } from "@/content";
import { insightCover } from "@/lib/insight-cover";
import { localizedHref } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/brand";
import { Arrow, MediaFrame, Tag } from "@/components/ui";

type ReportCardProps = {
  locale: Locale;
  insight: Insight;
  /** Localised "{n} min read" template (d.common.units.minRead). */
  minRead: string;
  /** portrait = cover on top (grid card); landscape = cover left from md up (featured story). */
  layout?: "portrait" | "landscape";
  /** Optional ember tag, e.g. the hub's "Latest" label. */
  label?: string;
  /** Localised "Read article" CTA, shown in the footer of the landscape card. */
  cta?: string;
  headingLevel?: "h2" | "h3";
  sizes?: string;
  priority?: boolean;
  className?: string;
};

/**
 * "Report" card (BRIEF §8): a light grey card holding the dot-lattice cover inset at the top,
 * a big black grotesk title, the dek, and a small Emineon lockup at the foot. Uses the bone
 * tone so semantic colours (fg, lines, tags) flip to ink.
 */
export function ReportCard({
  locale,
  insight,
  minRead,
  layout = "portrait",
  label,
  cta,
  headingLevel = "h3",
  sizes,
  priority,
  className,
}: ReportCardProps) {
  const H = headingLevel;
  const landscape = layout === "landscape";
  return (
    <Link
      href={localizedHref(locale, `/insights/${insight.slug}`)}
      className={cn(
        "tone-bone group relative flex h-full flex-col border border-ink-line p-3 text-ink transition-[box-shadow,transform] duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-24px_rgba(11,12,14,0.45)] md:p-4",
        landscape && "md:grid md:grid-cols-12 md:gap-x-4",
        className,
      )}
      // Set inline: the bone tone's `background` shorthand would otherwise win over a bg-image utility.
      style={{ background: "linear-gradient(180deg, #f4f3f0 0%, #e4e3df 55%, #d3d2ce 100%)" }}
    >
      <MediaFrame
        image={insightCover(insight)}
        alt=""
        ratio={landscape ? "aspect-[3/2] md:aspect-auto md:h-full md:min-h-[480px]" : "aspect-[4/3]"}
        className={cn(landscape && "md:col-span-7")}
        sizes={sizes ?? (landscape ? "(min-width: 768px) 56vw, 100vw" : "(min-width: 768px) 33vw, 100vw")}
        priority={priority}
      />
      <div className={cn("flex flex-1 flex-col px-1 pt-6 pb-1 md:px-2", landscape && "md:col-span-5 md:px-4 md:pt-4 md:pb-2")}>
        <div className="flex flex-wrap items-center gap-2">
          {label && <Tag variant="ember">{label}</Tag>}
          <Tag>{insight.category}</Tag>
        </div>
        <H
          lang={insight.lang !== locale ? insight.lang : undefined}
          className={cn(
            "mt-5 font-medium text-balance text-ink",
            landscape
              ? "text-[30px] leading-[1.02] tracking-[-0.035em] md:mt-8 md:text-[46px]"
              : "text-[26px] leading-[1.04] tracking-[-0.03em] md:text-[27px] lg:text-[30px]",
          )}
        >
          {insight.title}
        </H>
        <p lang={insight.lang !== locale ? insight.lang : undefined} className={cn("mt-4 text-ink-muted", landscape ? "text-[16px] leading-relaxed md:text-[17px]" : "line-clamp-3 text-[15px] leading-relaxed")}>
          {insight.dek}
        </p>
        <div className="mt-auto flex flex-wrap items-end justify-between gap-x-4 gap-y-3 pt-10">
          <Logo title="" className={cn("w-auto text-ink", landscape ? "h-[19px]" : "h-4")} />
          <span className="flex items-center gap-2 font-mono text-[11px] tracking-[0.06em] whitespace-nowrap text-fg-dim uppercase tabular sm:tracking-[0.1em]">
            <time dateTime={insight.date}>{formatDate(locale, insight.date)}</time>
            <span aria-hidden>·</span>
            <span>{fill(minRead, { n: insight.readingMinutes })}</span>
            {landscape && cta && (
              <span className="ml-3 hidden items-center gap-2 text-ink group-hover:text-ember-ink md:flex">
                {cta}
                <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            )}
          </span>
        </div>
      </div>
    </Link>
  );
}
