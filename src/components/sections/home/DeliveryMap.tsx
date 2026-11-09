"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";
import type { Office } from "@/content/schema";
import { cn } from "@/lib/cn";
import { GRID, landCells, project } from "./world-dots";
import "./home.css";

const W = GRID.cols * GRID.step; // 360
const H = GRID.rows * GRID.step; // 138

/** Label placement per office id (dx, dy in map units, text-anchor). Defaults to the right. */
const LABEL: Record<string, { dx: number; dy: number; anchor: "start" | "end" | "middle" }> = {
  geneve: { dx: 0, dy: -6.5, anchor: "middle" },
  hanoi: { dx: 3.6, dy: -0.6, anchor: "start" },
  hcmc: { dx: 3.6, dy: 3.4, anchor: "start" },
  tokyo: { dx: 3.6, dy: 1.2, anchor: "start" },
  melbourne: { dx: 3.6, dy: 1.2, anchor: "start" },
  "silicon-valley": { dx: -3.6, dy: -2, anchor: "end" },
  texas: { dx: 3.6, dy: 3, anchor: "start" },
};

function arcPath([x1, y1]: [number, number], [x2, y2]: [number, number]) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dist = Math.hypot(x2 - x1, y2 - y1);
  const lift = Math.min(46, dist * 0.32);
  return `M${x1.toFixed(1)} ${y1.toFixed(1)} Q${mx.toFixed(1)} ${(my - lift).toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
}

/**
 * Custom dot-matrix world map (Natural Earth land, 2° grid). Genève HQ in ember with a
 * pulse ring, hubs in bone, arcs that draw in from Genève with pulses travelling along them.
 * All land dots are one SVG path (round caps on zero-length segments) to keep the DOM light.
 */
export function DeliveryMap({ offices, label, hqLabel }: { offices: Office[]; label: string; hqLabel: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useSafeReducedMotion();
  const [inView, setInView] = useState(false);

  const landPath = useMemo(
    () =>
      landCells()
        .map(([c, r]) => `M${c * GRID.step + 1} ${r * GRID.step + 1}h0`)
        .join(""),
    [],
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const hq = offices.find((o) => o.hq) ?? offices[0];
  const hqXY = project(hq.lon, hq.lat);
  const hubs = offices.filter((o) => o.id !== hq.id);
  const on = inView || reduce;

  return (
    <div ref={ref} className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full overflow-visible" role="img" aria-label={label}>
        <title>{label}</title>
        <defs>
          <radialGradient id="dm-hq-glow">
            <stop offset="0%" stopColor="var(--ember)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--ember)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Land */}
        <path d={landPath} stroke="var(--fg)" strokeOpacity={0.22} strokeWidth={0.95} strokeLinecap="round" fill="none" />

        {/* Arcs */}
        {hubs.map((o, i) => {
          const d = arcPath(hqXY, project(o.lon, o.lat));
          return (
            <g key={o.id}>
              <path
                d={d}
                pathLength={1}
                fill="none"
                stroke="var(--ember)"
                strokeOpacity={0.55}
                strokeWidth={0.35}
                className={cn("home-arc", on && "home-arc-on")}
                style={{ animationDelay: `${0.25 + i * 0.14}s` }}
              />
              {inView && !reduce && (
                <circle r={0.75} fill="var(--ember)">
                  <animateMotion dur={`${3.4 + (i % 3) * 0.7}s`} begin={`${1.2 + i * 0.35}s`} repeatCount="indefinite" path={d} keyPoints="0;1" keyTimes="0;1" calcMode="linear" />
                  <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur={`${3.4 + (i % 3) * 0.7}s`} begin={`${1.2 + i * 0.35}s`} repeatCount="indefinite" />
                </circle>
              )}
            </g>
          );
        })}

        {/* Hubs */}
        {hubs.map((o, i) => {
          const [x, y] = project(o.lon, o.lat);
          const l = LABEL[o.id] ?? { dx: 3.6, dy: 1.2, anchor: "start" as const };
          return (
            <g key={o.id} className={cn("home-node", on && "home-node-on")} style={{ animationDelay: `${0.6 + i * 0.14}s` }}>
              <circle cx={x} cy={y} r={2.4} fill="var(--bg)" stroke="var(--fg)" strokeOpacity={0.5} strokeWidth={0.3} />
              <circle cx={x} cy={y} r={1} fill="var(--fg)" />
              <text
                x={x + l.dx}
                y={y + l.dy}
                textAnchor={l.anchor}
                className="hidden fill-[var(--fg-muted)] font-mono uppercase md:block"
                style={{ fontSize: 2.9, letterSpacing: "0.12em" }}
              >
                {o.city}
              </text>
            </g>
          );
        })}

        {/* HQ */}
        <g>
          <circle cx={hqXY[0]} cy={hqXY[1]} r={9} fill="url(#dm-hq-glow)" />
          {!reduce && (
            <circle cx={hqXY[0]} cy={hqXY[1]} r={2} fill="none" stroke="var(--ember)" strokeWidth={0.3}>
              <animate attributeName="r" values="2;7" dur="2.6s" repeatCount="indefinite" />
              <animate attributeName="stroke-opacity" values="0.9;0" dur="2.6s" repeatCount="indefinite" />
            </circle>
          )}
          <circle cx={hqXY[0]} cy={hqXY[1]} r={1.6} fill="var(--ember)" />
          <text
            x={hqXY[0] + LABEL.geneve.dx}
            y={hqXY[1] + LABEL.geneve.dy}
            textAnchor="middle"
            className="hidden fill-[var(--fg)] font-mono uppercase md:block"
            style={{ fontSize: 3.1, letterSpacing: "0.12em" }}
          >
            {hq.city}
          </text>
          <text
            x={hqXY[0]}
            y={hqXY[1] - 11.5}
            textAnchor="middle"
            className="hidden fill-[var(--ember-ink)] font-mono uppercase md:block"
            style={{ fontSize: 2.3, letterSpacing: "0.16em" }}
          >
            {hqLabel}
          </text>
        </g>
      </svg>
    </div>
  );
}
