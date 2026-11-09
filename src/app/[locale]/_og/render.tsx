/**
 * Shared Open Graph renderer (next/og). Brand fonts (Geist Medium, Geist Mono)
 * and the ink wordmark (identity 08) are read from disk at build time. Light-first "report
 * card" layout: ink title on paper (two-tone, no serif), and a cover panel on
 * the right with a procedural dot lattice over a grainy ember / graphite /
 * steel gradient (BRIEF §8).
 */
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { Headline } from "@/content/schema";
import { WORDMARK } from "@/components/brand/paths";

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";

/** Wordmark height on the card (node top to baseline), px. */
const LOGO_H = 40;

const FONT_DIR = join(process.cwd(), "src/app/[locale]/_og/fonts");

async function loadAssets() {
  const [sans, mono, logoRaw] = await Promise.all([
    readFile(join(FONT_DIR, "Geist-Medium.ttf")),
    readFile(join(FONT_DIR, "GeistMono-Regular.ttf")),
    readFile(join(process.cwd(), "public/brand/wordmark-ink.svg"), "utf8"),
  ]);
  // Ink wordmark on paper; the node on the i stays ember.
  return { sans, mono, logo: `data:image/svg+xml;base64,${Buffer.from(logoRaw).toString("base64")}` };
}

/** Deterministic PRNG so every build renders the same lattice. */
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

export type LatticeForm = "dome" | "wave" | "funnel";

/** A dome / wave / funnel of crisp bone dots with perspective size falloff, plus grain. */
export const PANEL = { width: 470, height: 550 } as const;

function latticeSvg(form: LatticeForm, seed = 7): string {
  const W = PANEL.width;
  const H = PANEL.height;
  const rand = rng(seed);
  const dots: string[] = [];
  const cols = 46;
  const rows = 22;
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const u = i / (cols - 1) - 0.5; // -0.5..0.5
      const v = j / (rows - 1); // 0 far .. 1 near
      const z = 0.35 + v * 0.95; // depth
      let h: number;
      if (form === "dome") h = Math.max(0, 1 - (u * u) / 0.16 - ((v - 0.55) * (v - 0.55)) / 0.35) * 210;
      else if (form === "wave") h = (Math.sin(u * 9 + v * 4) * 0.5 + 0.5) * 120 + Math.cos(v * 6) * 30;
      else h = -Math.max(0, 0.6 - Math.hypot(u * 1.6, (v - 0.5) * 1.1)) * 320;
      const x = W * 0.5 + (u * W * 1.6) / (1.4 - v * 0.55);
      const y = H * 0.36 + v * H * 0.62 - h * z * 0.9;
      if (x < -10 || x > W + 10 || y < -10 || y > H + 10) continue;
      const r = 0.7 + z * 1.55;
      const fade = Math.min(1, 0.18 + v * 0.95) * (0.75 + rand() * 0.25);
      const ember = rand() < 0.012;
      dots.push(
        `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(ember ? r * 1.6 : r).toFixed(2)}" fill="${ember ? "#FF5B1F" : "#EDEAE3"}" fill-opacity="${(ember ? 1 : fade).toFixed(2)}"/>`,
      );
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs>
<radialGradient id="g1" cx="0.6" cy="0.12" r="0.75"><stop offset="0" stop-color="#FF5B1F" stop-opacity="0.85"/><stop offset="0.35" stop-color="#C75B12" stop-opacity="0.45"/><stop offset="1" stop-color="#C75B12" stop-opacity="0"/></radialGradient>
<radialGradient id="g2" cx="0.12" cy="0.5" r="0.45"><stop offset="0" stop-color="#BEBAB2" stop-opacity="0.22"/><stop offset="1" stop-color="#BEBAB2" stop-opacity="0"/></radialGradient>
<filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.55 0"/></filter>
<linearGradient id="base" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2B211C"/><stop offset="0.5" stop-color="#24262B"/><stop offset="1" stop-color="#2A3240"/></linearGradient>
<radialGradient id="g3" cx="0.95" cy="0.98" r="0.7"><stop offset="0" stop-color="#9DB8FF" stop-opacity="0.5"/><stop offset="0.4" stop-color="#6F86A8" stop-opacity="0.45"/><stop offset="1" stop-color="#6F86A8" stop-opacity="0"/></radialGradient>
</defs>
<rect width="${W}" height="${H}" fill="url(#base)"/>
<rect width="${W}" height="${H}" fill="url(#g1)"/>
<rect width="${W}" height="${H}" fill="url(#g2)"/>
<rect width="${W}" height="${H}" fill="url(#g3)"/>
${dots.join("")}
<rect width="${W}" height="${H}" filter="url(#n)" opacity="0.2"/>
</svg>`;
}

type OgInput = {
  eyebrow: string;
  title: Headline | string;
  /** Small mono line at the bottom right, e.g. "emineon.com · Genève". */
  footer?: string;
  form?: LatticeForm;
  seed?: number;
};

export async function renderOg({ eyebrow, title, footer, form = "dome", seed }: OgInput) {
  const { sans, mono, logo } = await loadAssets();
  const bg = `data:image/svg+xml;base64,${Buffer.from(latticeSvg(form, seed)).toString("base64")}`;
  const t: Headline = typeof title === "string" ? { pre: "", accent: title } : title;
  const len = (t.pre + t.accent + (t.post ?? "")).length;
  const fontSize = len > 70 ? 44 : len > 44 ? 52 : 64;
  // Two-tone, one grotesk: pre in quiet grey, the key phrase and what follows in ink.
  const words = [
    ...t.pre.split(/\s+/).filter(Boolean).map((text) => ({ text, quiet: true })),
    ...t.accent.split(/\s+/).filter(Boolean).map((text) => ({ text, quiet: false })),
    ...(t.post ?? "").split(/\s+/).filter(Boolean).map((text) => ({ text, quiet: false })),
  ];
  const label = eyebrow.replace(/^\s*\[\s*|\s*\]\s*$/g, "");

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#F1EEE8", color: "#0B0C0E", fontFamily: "Geist" }}>
        {/* Cover panel (report-card style) */}
        <div style={{ position: "absolute", top: 40, right: 40, width: PANEL.width, height: PANEL.height, display: "flex" }}>
          {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
          <img src={bg} width={PANEL.width} height={PANEL.height} />
        </div>
        <div style={{ position: "absolute", top: 0, left: 0, width: 690, height: OG_SIZE.height, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "60px 40px 56px 64px" }}>
          <div style={{ display: "flex", alignItems: "center", fontFamily: "Geist Mono", fontSize: 18, letterSpacing: 3, textTransform: "uppercase", color: "#55534E" }}>
            <span style={{ width: 9, height: 9, borderRadius: 9, background: "#FF5B1F", marginRight: 14 }} />
            <span style={{ color: "#66635D" }}>[</span>
            <span style={{ margin: "0 12px", color: "#0B0C0E" }}>{label}</span>
            <span style={{ color: "#66635D" }}>]</span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", maxWidth: 600, fontSize, lineHeight: 1.04, letterSpacing: -fontSize * 0.04 }}>
            {words.map((w, i) => (
              <span key={i} style={{ marginRight: fontSize * 0.24, color: w.quiet ? "#77736C" : "#0B0C0E" }}>
                {w.text}
              </span>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
            {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
            <img src={logo} height={LOGO_H} width={Math.round((LOGO_H * WORDMARK.width) / WORDMARK.height)} />
            <span style={{ fontFamily: "Geist Mono", fontSize: 15, letterSpacing: 2, textTransform: "uppercase", color: "#55534E" }}>
              {footer ?? "emineon.com · Genève"}
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Geist", data: sans, weight: 500, style: "normal" },
        { name: "Geist Mono", data: mono, weight: 400, style: "normal" },
      ],
    },
  );
}

export const OG_ALT = "Emineon";

/* ------------------------------------------------------------------ */
/* Route helper: one branded card per page, with a per-page alt.       */
/* ------------------------------------------------------------------ */

export type OgSpec = OgInput;

/** Plain text of a headline, for alt text. */
export function headlineText(t: Headline | string): string {
  const s = typeof t === "string" ? t : `${t.pre}${t.accent}${t.post ?? ""}`;
  return s.replace(/\s+/g, " ").trim();
}

/**
 * Builds the exports of an opengraph-image.tsx file. `generateImageMetadata`
 * gives each card its own og:image:alt (the page title), which a static `alt`
 * export cannot. Usage:
 *   const og = ogRoute<{ locale: string }>(({ locale }) => ({ eyebrow, title }));
 *   export const generateImageMetadata = og.generateImageMetadata;
 *   export default og.Image;
 */
export function ogRoute<P extends { locale: string }>(spec: (params: P) => OgSpec | undefined) {
  return {
    generateImageMetadata: async ({ params }: { params: P | Promise<P> }) => {
      const s = spec(await params);
      return [
        {
          id: "card",
          alt: s ? `${headlineText(s.title).replace(/[.:,;]+$/, "")} · Emineon` : OG_ALT,
          size: OG_SIZE,
          contentType: OG_CONTENT_TYPE,
        },
      ];
    },
    Image: async ({ params }: { params: Promise<P> }) => {
      const s = spec(await params);
      return renderOg(s ?? { eyebrow: "Emineon", title: "AI-native consulting, Genève" });
    },
  };
}
