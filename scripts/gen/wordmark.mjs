// Emineon identity geometry (direction 08 "emineon." + 04 Dot Oak), baked to SVG path data.
//   - wordmark(): lowercase Geist SemiBold "emineon", tight tracking, the i's tittle is an ember node.
//   - symbol():   the lowercase e with its ember node, in a 0..100 box.
//   - dotOak():   the oak sampled on an 11 x 11 dot lattice, one ember dot at its heart.
//   - text():     any string as outlined path data (for social/email exports).
// Requires the scratch deps in _gen (opentype.js, geist). opentype.js 2.0's toPathData() can emit NaN,
// so every path goes through our own serializer `pd`.
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(new URL("../../_gen/package.json", import.meta.url));
const opentype = require("opentype.js");
const FONTS = new URL("../../_gen/node_modules/geist/dist/fonts/", import.meta.url).pathname;
const load = (p) => {
  const b = readFileSync(FONTS + p);
  return opentype.parse(b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength));
};
export const F = {
  semi: load("geist-sans/Geist-SemiBold.ttf"),
  med: load("geist-sans/Geist-Medium.ttf"),
  reg: load("geist-sans/Geist-Regular.ttf"),
  mono: load("geist-mono/GeistMono-Regular.ttf"),
  monoMed: load("geist-mono/GeistMono-Medium.ttf"),
};

export const r2 = (v) => Math.round(v * 100) / 100;
const num = (v) => {
  if (!Number.isFinite(v)) throw new Error("non-finite coordinate in glyph path");
  return r2(v);
};
/** Path command -> string. Replaces opentype's toPathData (which can write NaN). */
export const pd = (c) =>
  c.type === "Z"
    ? "Z"
    : c.type === "M" || c.type === "L"
      ? `${c.type}${num(c.x)} ${num(c.y)}`
      : c.type === "Q"
        ? `Q${num(c.x1)} ${num(c.y1)} ${num(c.x)} ${num(c.y)}`
        : `C${num(c.x1)} ${num(c.y1)} ${num(c.x2)} ${num(c.y2)} ${num(c.x)} ${num(c.y)}`;

/**
 * The 08 wordmark. Units: x-height = `xh`. Origin: left edge of the e's ink, top of the node.
 * Returns { d, dot: {x,y,r}, width, height, base }.
 */
export function wordmark({ xh = 20, tracking = -0.012 } = {}) {
  const font = F.semi;
  const size = (xh * font.unitsPerEm) / font.tables.os2.sxHeight;
  const stem = (128 / font.unitsPerEm) * size; // Geist SemiBold lowercase stem
  const dotR = stem * 0.66; // a touch heavier than a tittle so the ember reads as weight-equal to ink
  const dotGap = stem * 0.55;
  const top = dotR * 2 + dotGap;
  const base = top + xh;
  const chars = [..."emıneon"]; // dotless i; the node replaces the tittle
  let x = -(font.charToGlyph("e").getBoundingBox().x1 / font.unitsPerEm) * size;
  let d = "";
  let dot = null;
  chars.forEach((ch, i) => {
    const g = font.charToGlyph(ch);
    d += g.getPath(x, base, size).commands.map(pd).join("");
    if (ch === "ı") {
      const bb = g.getBoundingBox();
      dot = { x: r2(x + ((bb.x1 + bb.x2) / 2 / font.unitsPerEm) * size), y: r2(dotR), r: r2(dotR) };
    }
    x += (g.advanceWidth / font.unitsPerEm) * size + (i < chars.length - 1 ? tracking * size : 0);
  });
  const lg = font.charToGlyph("n");
  const lb = lg.getBoundingBox();
  const width = x - ((lg.advanceWidth - lb.x2) / font.unitsPerEm) * size;
  // e and o overshoot the baseline slightly; include it so nothing clips.
  const overshoot = (-font.charToGlyph("o").getBoundingBox().y1 / font.unitsPerEm) * size;
  return { d, dot, width: r2(width), height: r2(base + overshoot), base: r2(base), xh };
}

/** The 08 symbol: lowercase e with its ember node, in a 0..100 box. */
export function symbol() {
  const font = F.semi;
  const g = font.charToGlyph("e");
  const bb = g.getBoundingBox();
  const h = bb.y2 - bb.y1;
  const w = bb.x2 - bb.x1;
  const s = 70 / h; // e is 70 units tall
  const size = s * font.unitsPerEm;
  const ox = 8 - bb.x1 * s;
  const base = 92 + bb.y1 * s;
  const d = g.getPath(ox, base, size).commands.map(pd).join("");
  const stem = 128 * s;
  const r = stem * 0.6;
  const ex = 8 + w * s;
  return { d, dot: { x: r2(ex + r * 0.55), y: r2(28 - r * 0.3), r: r2(r) } };
}

/** Bounding box of the symbol ink, for centring it in tiles. */
export function symbolBox() {
  const font = F.semi;
  const bb = font.charToGlyph("e").getBoundingBox();
  const s = 70 / (bb.y2 - bb.y1);
  const { dot } = symbol();
  const x0 = 8;
  const x1 = Math.max(8 + (bb.x2 - bb.x1) * s, dot.x + dot.r);
  const y0 = Math.min(22, dot.y - dot.r);
  const y1 = 92;
  return { x0, y0, x1, y1, cx: (x0 + x1) / 2, cy: (y0 + y1) / 2, w: x1 - x0, h: y1 - y0 };
}

// ---------- 04 Dot Oak ----------
// "o" = dot, "*" = the ember heart, "." = empty lattice cell (noise in motion).
const DOT_ROWS = [
  "...ooooo...",
  ".ooooooooo.",
  "ooooooooooo",
  "ooooooooooo",
  "ooooo*ooooo",
  ".ooooooooo.",
  "..ooooooo..",
  "....ooo....",
  ".....o.....",
  ".....o.....",
  "....ooo....",
];

/** Deterministic PRNG, so the motion is identical on every build. */
function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/**
 * Every lattice cell in a 0..100 box. Cells inside the tree have `on: true`; one is the heart.
 * `dx/dy` is a scattered start offset (noise) and `delay` a 0..1 stagger that grows the tree
 * from the trunk up, for the resolve animation.
 */
export function dotOak() {
  const n = DOT_ROWS.length;
  const cell = 100 / n;
  const rand = rng(11);
  const hx = 5;
  const hy = 4;
  const cells = [];
  DOT_ROWS.forEach((row, j) =>
    [...row].forEach((ch, i) => {
      const on = ch !== ".";
      const heart = ch === "*";
      const dist = Math.hypot(i - hx, j - hy);
      const r = heart ? cell * 0.46 : on ? cell * Math.max(0.3, 0.45 - dist * 0.026) : cell * 0.16;
      const ang = rand() * Math.PI * 2;
      const spread = 6 + rand() * 16;
      const fromBottom = (n - 1 - j) / (n - 1); // 0 at the roots, 1 at the crown
      cells.push({
        x: r2((i + 0.5) * cell),
        y: r2((j + 0.5) * cell),
        r: r2(r),
        on,
        heart,
        dx: r2(Math.cos(ang) * spread),
        dy: r2(Math.sin(ang) * spread),
        delay: r2(Math.min(1, fromBottom * 0.75 + rand() * 0.25)),
      });
    }),
  );
  return cells;
}

/** A string as outlined path data, left/middle/end anchored at (x, y baseline). */
export function text(str, x, y, { size = 14, font = F.med, tracking = 0, anchor = "start" } = {}) {
  const w = measure(str, size, font, tracking);
  let cx = anchor === "middle" ? x - w / 2 : anchor === "end" ? x - w : x;
  let d = "";
  for (const ch of str) {
    const g = font.charToGlyph(ch);
    d += g.getPath(cx, y, size).commands.map(pd).join("");
    cx += (g.advanceWidth / font.unitsPerEm) * size + tracking * size;
  }
  return { d, width: w };
}
export function measure(str, size, font = F.med, tracking = 0) {
  const chars = [...str];
  return chars.reduce((w, ch, i) => w + (font.charToGlyph(ch).advanceWidth / font.unitsPerEm) * size + (i < chars.length - 1 ? tracking * size : 0), 0);
}
