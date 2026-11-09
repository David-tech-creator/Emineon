"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";
import type { HomeDict } from "@/content/schema";
import { Button, Eyebrow, Heading } from "@/components/ui";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/cn";

type Sprint = HomeDict["approach"]["sprint"];

const DAYS = 30;

/**
 * The 30-day sprint. Desktop: a tall track with a sticky stage; scroll drives a
 * day counter (00 → 30), a 30-tick progress rail and the active week.
 * Mobile: a vertical timeline whose spine fills as you scroll past it.
 * Reduced motion: everything visible and static.
 */
export function SprintTimeline({ sprint, ctaHref, dayLabel }: { sprint: Sprint; ctaHref: string; dayLabel: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const reduce = useSafeReducedMotion();
  const [desktop, setDesktop] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const on = () => setDesktop(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  const { scrollYProgress: trackP } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  const { scrollYProgress: listP } = useScroll({ target: listRef, offset: ["start 75%", "end 55%"] });
  const progress = desktop ? trackP : listP;

  const day = useTransform(progress, (v) => String(Math.min(DAYS, Math.max(0, Math.round(v * DAYS)))).padStart(2, "0"));

  useMotionValueEvent(progress, "change", (v) => {
    const n = sprint.weeks.length;
    setActive(Math.min(n - 1, Math.max(0, Math.floor(v * n * 0.999))));
  });

  const isOn = (i: number) => reduce || i <= active;
  const isCurrent = (i: number) => !reduce && i === active;

  return (
    <div id="sprint" ref={trackRef} className={cn("relative", !reduce && "lg:h-[300vh]")}>
      <div className={cn(!reduce && "lg:sticky lg:top-[var(--nav-h)] lg:flex lg:h-[calc(100svh-var(--nav-h))] lg:items-center")}>
        <div className="container-site grid w-full grid-cols-1 gap-y-12 py-24 lg:grid-cols-12 lg:gap-x-8 lg:py-0">
          {/* Left: the promise + day counter */}
          <div className="flex flex-col lg:col-span-5">
            <Eyebrow live>{sprint.eyebrow}</Eyebrow>
            <Heading title={sprint.title} className="mt-6 max-w-[14ch]" />
            <p className="mt-6 max-w-md text-lead text-fg-muted">{sprint.sub}</p>

            <div className="mt-8 hidden items-end gap-4 lg:flex" aria-hidden>
              <span className="font-mono text-[11.5px] tracking-[0.16em] text-fg-dim uppercase">{dayLabel}</span>
              <span className="text-[clamp(64px,7vw,112px)] leading-[0.8] font-medium tracking-[-0.045em] text-fg tabular">
                {reduce ? DAYS : <motion.span>{day}</motion.span>}
              </span>
              <span className="pb-1 font-mono text-[15px] text-fg-dim tabular">/ {DAYS}</span>
            </div>

            <div className="mt-10">
              <Button href={ctaHref} size="lg">
                {sprint.cta.label}
              </Button>
            </div>
          </div>

          {/* Right: rail + weeks */}
          <div className="lg:col-span-7 lg:col-start-6 lg:pl-8">
            {/* 30-tick rail (desktop) */}
            <div aria-hidden className="relative mb-8 hidden lg:block">
              <div className="flex justify-between">
                {Array.from({ length: DAYS + 1 }, (_, d) => (
                  <span key={d} className={cn("w-px bg-line-strong", d % 7 === 0 || d === DAYS ? "h-4" : "h-2")} />
                ))}
              </div>
              <div className="absolute inset-x-0 top-0 h-px bg-line" />
              <motion.div
                className="absolute inset-x-0 top-0 h-[2px] origin-left bg-ember shadow-[0_0_12px_var(--ember-glow)]"
                style={{ scaleX: reduce ? 1 : progress }}
              />
              <div className="mt-3 flex justify-between font-mono text-[10.5px] tracking-[0.12em] text-fg-dim tabular">
                <span>00</span>
                <span>07</span>
                <span>14</span>
                <span>21</span>
                <span>30</span>
              </div>
            </div>

            <ol ref={listRef} className="relative">
              {/* Spine */}
              <span aria-hidden className="absolute top-2 bottom-2 left-[5px] w-px bg-line-strong" />
              <motion.span
                aria-hidden
                className="absolute top-2 bottom-2 left-[5px] w-px origin-top bg-ember"
                style={{ scaleY: reduce ? 1 : progress }}
              />
              {sprint.weeks.map((w, i) => (
                <li
                  key={w.label}
                  className={cn(
                    "relative grid grid-cols-[auto_1fr] gap-x-6 pb-10 transition-opacity duration-500 ease-[var(--ease-out-expo)] last:pb-0 lg:pb-4",
                    isOn(i) ? "opacity-100" : "opacity-75",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "relative z-10 mt-1.5 size-[11px] rounded-full border transition-colors duration-500",
                      isOn(i) ? "border-ember bg-ember" : "border-line-strong bg-canvas",
                      isCurrent(i) && "shadow-[0_0_0_5px_rgba(255,91,31,.15)]",
                    )}
                  />
                  <div
                    className={cn(
                      "border-b border-line pb-8 transition-colors duration-500 lg:pb-5",
                      i === sprint.weeks.length - 1 && "border-b-0 pb-0 lg:pb-0",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className={cn("font-mono text-[11.5px] tracking-[0.16em] uppercase", isCurrent(i) ? "text-ember-ink" : isOn(i) ? "text-fg" : "text-fg-dim")}>
                        {w.label}
                      </span>
                      {i === sprint.weeks.length - 1 && (
                        <Icon name="sprint" size={16} className={isCurrent(i) ? "text-ember-ink" : isOn(i) ? "text-fg" : "text-fg-dim"} />
                      )}
                    </div>
                    <h3 className="mt-2 text-[24px] leading-tight font-medium tracking-[-0.02em] text-fg xl:text-[28px]">{w.title}</h3>
                    <p className="mt-2 max-w-[52ch] text-[15.5px] leading-relaxed text-fg-muted">{w.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
