// Builds every brand artefact of the Emineon identity:
//   08 "emineon."  lowercase Geist SemiBold wordmark, the i's tittle is an ember node; symbol = e + node.
//   04 Dot Oak     the oak on an 11 x 11 dot lattice with one ember dot (illustration/motion layer, never the logo).
//
//   node scripts/gen/brand.mjs
// Requires `npm i --prefix _gen sharp opentype.js geist png-to-ico` (scratch deps, not app deps).
// Outputs:
//   src/components/brand/paths.ts      generated constants consumed by <Logo/> and <DotOak/>
//   src/app/favicon.ico, icon.svg, apple-icon.png
//   public/brand/*.svg|png|ico         the kit (wordmark, symbol, dot oak, icons, email)
//   public/brand/social/*.png          social kit (not linked from the site)
import { writeFileSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { createRequire } from "node:module";
import { wordmark, symbol, symbolBox, dotOak, text, measure, F, r2 } from "./wordmark.mjs";

const require = createRequire(new URL("../../_gen/package.json", import.meta.url));
const sharp = require("sharp");
const pngToIco = require("png-to-ico").default ?? require("png-to-ico");

const root = new URL("../../", import.meta.url).pathname;
const out = (p) => root + p;
mkdirSync(out("public/brand/social"), { recursive: true });
mkdirSync(out("public/brand/email"), { recursive: true });

const C = { paper: "#F1EEE8", ink: "#0B0C0E", ember: "#FF5B1F", muted: "#55534E", dim: "#66635D" };

const W = wordmark();
const S = symbol();
const SB = symbolBox();
const OAK = dotOak();
for (const d of [W.d, S.d]) if (/NaN|undefined/.test(d)) throw new Error("glyph path contains NaN");

// ---------- svg fragments ----------
const svg = (w, h, vb, body) => `<svg xmlns="http://www.w3.org/2000/svg"${w ? ` width="${w}" height="${h}"` : ""} viewBox="${vb}">${body}</svg>\n`;
const wordBody = (c, a = C.ember) => `<path fill="${c}" d="${W.d}"/><circle cx="${W.dot.x}" cy="${W.dot.y}" r="${W.dot.r}" fill="${a}"/>`;
const symBody = (c, a = C.ember) => `<path fill="${c}" d="${S.d}"/><circle cx="${S.dot.x}" cy="${S.dot.y}" r="${S.dot.r}" fill="${a}"/>`;
const oakBody = (c, a = C.ember) =>
  OAK.filter((d) => d.on)
    .map((d) => `<circle cx="${d.x}" cy="${d.y}" r="${d.r}" fill="${d.heart ? a : c}"/>`)
    .join("");
/** Symbol centred in a 100 box with `pad` (units of 100) on the tightest side. */
const symCentered = (c, a, pad = 18) => {
  const k = (100 - 2 * pad) / Math.max(SB.w, SB.h);
  const tx = 50 - SB.cx * k;
  const ty = 50 - SB.cy * k;
  return `<g transform="translate(${r2(tx)} ${r2(ty)}) scale(${(Math.round(k * 10000) / 10000).toString()})">${symBody(c, a)}</g>`;
};
const wordVB = `0 0 ${W.width} ${W.height}`;
/** Nested wordmark at x,y with height h. */
const placeWord = (x, y, h, c, a) => {
  const w = (W.width / W.height) * h;
  return { w, s: `<svg x="${r2(x)}" y="${r2(y)}" width="${r2(w)}" height="${r2(h)}" viewBox="${wordVB}">${wordBody(c, a)}</svg>` };
};
const placeOak = (x, y, size, c, a) => `<svg x="${r2(x)}" y="${r2(y)}" width="${r2(size)}" height="${r2(size)}" viewBox="0 0 100 100">${oakBody(c, a)}</svg>`;
const png = (s) => sharp(Buffer.from(s), { density: 72 }).png({ compressionLevel: 9 }).toBuffer();
const write = (p, b) => writeFileSync(out(p), b);

// ---------- clean obsolete marks ----------
for (const f of readdirSync(out("public/brand"))) {
  if (/^(oak-|logo-|wordmark-|favicon|icon|apple-touch|symbol-|dot-oak)/.test(f)) rmSync(out(`public/brand/${f}`));
}

// ---------- vector kit ----------
const files = {
  "wordmark-ink.svg": svg(null, null, wordVB, wordBody(C.ink)),
  "wordmark-paper.svg": svg(null, null, wordVB, wordBody(C.paper)),
  "symbol-ink.svg": svg(null, null, "0 0 100 100", symBody(C.ink)),
  "symbol-paper.svg": svg(null, null, "0 0 100 100", symBody(C.paper)),
  // single-colour ember (one-colour print, stickers, merch)
  "symbol-ember.svg": svg(null, null, "0 0 100 100", symBody(C.ember, C.ember)),
  "dot-oak-ink.svg": svg(null, null, "0 0 100 100", oakBody(C.ink)),
  "dot-oak-paper.svg": svg(null, null, "0 0 100 100", oakBody(C.paper)),
};
// Favicon: ink e on light tabs, paper e on dark tabs; ember node on both.
const faviconSvg =
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><style>.e{fill:${C.ink}}@media (prefers-color-scheme:dark){.e{fill:${C.paper}}}</style>` +
  symCentered(C.ink, C.ember, 4).replace(`fill="${C.ink}"`, `class="e"`) +
  `</svg>\n`;
files["favicon.svg"] = faviconSvg;
for (const [f, s] of Object.entries(files)) write(`public/brand/${f}`, s);
write("src/app/icon.svg", faviconSvg);

// ---------- rasters ----------
// App tile: ink square, paper e, ember node (reads on any wallpaper, any tab bar).
const tile = (px, pad = 20, rx = 0) =>
  svg(px, px, "0 0 100 100", `<rect width="100" height="100" rx="${rx}" fill="${C.ink}"/>${symCentered(C.paper, C.ember, pad)}`);
write("public/brand/icon.png", await png(tile(512)));
write("public/brand/apple-touch-icon.png", await png(tile(180)));
write("src/app/apple-icon.png", await png(tile(180)));
const ico = await pngToIco(await Promise.all([16, 32, 48].map((s) => png(tile(s, s <= 16 ? 10 : 14, 18)))));
write("src/app/favicon.ico", ico);
write("public/brand/favicon.ico", ico);
for (const [name, c] of [["ink", C.ink], ["paper", C.paper]]) {
  write(`public/brand/wordmark-${name}-1200.png`, await png(svg(1200, r2((1200 * W.height) / W.width), wordVB, wordBody(c))));
  write(`public/brand/symbol-${name}-512.png`, await png(svg(512, 512, "0 0 100 100", symCentered(c, C.ember, 8))));
  write(`public/brand/dot-oak-${name}-1024.png`, await png(svg(1024, 1024, "0 0 100 100", oakBody(c))));
}
// Email header logo: hosted PNG, @2x of a 104 x 21 px display box (no SVG in email).
const EMAIL_W = 104;
write("public/brand/email/wordmark@2x.png", await png(svg(EMAIL_W * 2, 42, wordVB, wordBody(C.ink))));

// ---------- social kit (light style) ----------
const paperRect = (w, h) => `<rect width="${w}" height="${h}" fill="${C.paper}"/>`;
const doc = (w, h, body) => svg(w, h, `0 0 ${w} ${h}`, paperRect(w, h) + body);
const mono = (str, x, y, size, fill, anchor = "start", tracking = 0.12) =>
  `<path fill="${fill}" d="${text(str.toUpperCase(), x, y, { size, font: F.mono, tracking, anchor }).d}"/>`;
const LINE = "AI-native consulting · Rooted in Genève";

// Square avatars: LinkedIn company logo and X avatar (X crops to a circle; the symbol sits well inside).
const avatar = (px) => svg(px, px, "0 0 100 100", `<rect width="100" height="100" fill="${C.paper}"/>${symCentered(C.ink, C.ember, 24)}`);
write("public/brand/social/linkedin-logo-400.png", await png(avatar(400)));
write("public/brand/social/x-avatar-400.png", await png(avatar(400)));

// Banners: the profile picture overlaps bottom-left, so content lives in the right two thirds.
function banner(w, h) {
  const u = h / 100; // layout unit
  const oakSize = 72 * u;
  const oakX = w - oakSize - 10 * u;
  const oakY = (h - oakSize) / 2;
  const wordH = 21 * u;
  const lineSize = 5.2 * u;
  const blockW = Math.max((W.width / W.height) * wordH, measure(LINE.toUpperCase(), lineSize, F.mono, 0.12));
  const x = oakX - 14 * u - blockW;
  const wy = h / 2 - wordH + 1 * u;
  const word = placeWord(x, wy, wordH, C.ink);
  return doc(w, h, word.s + mono(LINE, x, h / 2 + 15 * u, lineSize, C.muted) + placeOak(oakX, oakY, oakSize, C.ink));
}
write("public/brand/social/linkedin-banner-1128x191.png", await png(banner(1128, 191)));
write("public/brand/social/linkedin-banner-4200x700.png", await png(banner(4200, 700)));
write("public/brand/social/x-header-1500x500.png", await png(banner(1500, 500)));

// Email signatures: 2x PNG of a 300 x 64 display box. Wordmark + one small line + the address.
function signature(email) {
  const k = 2;
  const w = 300 * k;
  const h = 64 * k;
  const word = placeWord(1 * k, 4 * k, 19 * k, C.ink);
  const l1 = mono("AI-native consulting · Genève", 1 * k, 42 * k, 9 * k, C.muted, "start", 0.08);
  const l2 = `<path fill="${C.ink}" d="${text(email, 1 * k, 58 * k, { size: 10.5 * k, font: F.mono, tracking: 0.01 }).d}"/>`;
  return svg(w, h, `0 0 ${w} ${h}`, `<rect width="${w}" height="${h}" fill="#FFFFFF"/>` + word.s + l1 + l2);
}
write("public/brand/social/email-signature-david.v.png", await png(signature("david.v@emineon.com")));
write("public/brand/social/email-signature-hello.png", await png(signature("hello@emineon.com")));

// ---------- generated TS ----------
const cells = OAK.map((d) => [d.x, d.y, d.r, d.heart ? 2 : d.on ? 1 : 0, d.dx, d.dy, d.delay]);
const ts = `// AUTO-GENERATED by scripts/gen/brand.mjs — do not edit by hand.

/** 08 wordmark "emineon": lowercase Geist SemiBold, the i's tittle is the ember node. */
export const WORDMARK = {
  width: ${W.width},
  height: ${W.height},
  d: ${JSON.stringify(W.d)},
  dot: ${JSON.stringify(W.dot)},
} as const;

/** 08 symbol: the e with its ember node, in a 0..100 box. \`box\` is the tight ink box. */
export const SYMBOL = {
  d: ${JSON.stringify(S.d)},
  dot: ${JSON.stringify(S.dot)},
  box: "${r2(SB.x0)} ${r2(SB.y0)} ${r2(SB.w)} ${r2(SB.h)}",
} as const;

/**
 * 04 Dot Oak lattice in a 0..100 box. One row per lattice cell:
 * [x, y, r, kind (0 noise, 1 tree, 2 ember heart), dx, dy (scattered start), delay 0..1].
 */
export const DOT_OAK: ReadonlyArray<readonly [number, number, number, 0 | 1 | 2, number, number, number]> = ${JSON.stringify(cells)};
`;
write("src/components/brand/paths.ts", ts);
console.log(`brand: wordmark ${W.width}x${W.height}, ${Object.keys(files).length} svgs, rasters, social kit, paths.ts`);
