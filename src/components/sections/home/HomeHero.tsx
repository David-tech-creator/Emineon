import type { Dictionary, Locale } from "@/content/schema";
import type { CSSProperties } from "react";
import { Button, CursorGlow, Eyebrow, Heading, Marquee } from "@/components/ui";
import { localizedHref } from "@/lib/i18n";
import { HeroVisual } from "./HeroVisual";
import "./home.css";

/** Hero: a grainy gradient panel carrying the Oak Graph (bone dots) and the headline in bone; live ticker on paper below. */
export function HomeHero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { hero } = dict.home;
  const { a11y, labels } = dict.common;

  return (
    <section aria-labelledby="home-hero-title" className="relative isolate flex flex-col bg-canvas pt-[var(--nav-h)]">
      {/* The panel: a large grainy gradient (cover style) inset on the paper
          canvas, the Oak Graph drawn on it in bone dots, the headline in bone. */}
      <div className="px-[calc(var(--gutter)*0.5)] md:px-[calc(var(--gutter)*0.5)]">
        <div className="tone-on-media relative isolate flex min-h-[600px] flex-col overflow-hidden max-md:min-h-[calc(100svh-var(--nav-h)-58px)] md:h-[calc(100svh-var(--nav-h)-58px)] md:max-h-[1100px]">
          <HeroVisual label={a11y.decorative3d} />
          <CursorGlow intensity={0.3} />

          <div className="container-site flex flex-1 flex-col justify-end pb-9 max-md:pt-[min(36svh,320px)] md:pb-12">
            <div className="home-hero-in">
              <Eyebrow live>{hero.eyebrow}</Eyebrow>
            </div>
            <Heading
              id="home-hero-title"
              as="h1"
              size="hero"
              title={hero.title}
              delay={120}
              className="mt-6 max-w-[11ch] md:mt-8"
            />

            <div className="mt-9 grid grid-cols-1 gap-8 md:mt-12 md:grid-cols-12 md:items-end md:gap-x-8">
              <div className="home-hero-in md:col-span-6 lg:col-span-5" style={{ "--d": "350ms" } as CSSProperties}>
                <p className="max-w-xl text-lead text-fg-muted">{hero.sub}</p>
              </div>
              <div style={{ "--d": "450ms" } as CSSProperties} className="home-hero-in flex flex-wrap gap-3 md:col-span-6 md:justify-end lg:col-span-7">
                <Button href={localizedHref(locale, hero.primaryCta.href)} size="lg">
                  {hero.primaryCta.label}
                </Button>
                <Button
                  href={localizedHref(locale, hero.secondaryCta.href)}
                  variant="secondary"
                  size="lg"
                  arrow
                  className="bg-[rgba(10,11,13,0.18)] backdrop-blur-[2px]"
                >
                  {hero.secondaryCta.label}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live ticker of system facts, on paper */}
      <div className="relative border-b border-line">
        <div className="container-site flex items-stretch">
          <div className="flex shrink-0 items-center gap-2.5 border-r border-line py-4 pr-5 md:pr-8">
            <span aria-hidden className="relative flex size-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-ember opacity-60" />
              <span className="relative size-1.5 rounded-full bg-ember" />
            </span>
            <span className="eyebrow text-fg">{labels.live}</span>
          </div>
          <Marquee
            aria-label={labels.live}
            duration={55}
            className="min-w-0 flex-1 py-4 font-mono text-[11.5px] tracking-[0.12em] text-fg-muted uppercase"
            itemClassName="pl-6 md:pl-10"
            separator={<span aria-hidden className="ml-6 inline-block size-1 bg-fg-dim md:ml-10" />}
            items={hero.ticker.map((t) => (
              <span key={t}>{t}</span>
            ))}
          />
          <div className="hidden shrink-0 items-center border-l border-line py-4 pl-8 lg:flex">
            <span className="eyebrow text-fg-dim">{hero.scrollHint}</span>
            <span aria-hidden className="relative ml-3 block h-6 w-px overflow-hidden bg-line-strong">
              <span className="home-scroll-hint absolute inset-x-0 top-0 h-2 bg-ember" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
