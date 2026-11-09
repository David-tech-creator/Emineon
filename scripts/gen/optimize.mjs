#!/usr/bin/env node
// Picks the chosen original for each key (_gen/picks.json: { key: "file.png" }, else latest version),
// writes public/media/img/<key>.avif + .jpg (max 2400w), a tiny blurDataURL, the OG image,
// and regenerates src/lib/media.ts.
// Usage: node scripts/gen/optimize.mjs [key ...] [--og]
//   With keys: only those are re-encoded; every other entry is rebuilt from its
//   existing public/media/img/<key>.jpg (so untouched images are byte-identical).
//   The OG image is only rebuilt with --og (or when no keys are given).
import { readFileSync, readdirSync, writeFileSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { createRequire } from 'node:module';
import { IMAGES } from './prompts.mjs';
const require = createRequire(import.meta.url);
const sharp = require('../../_gen/node_modules/sharp');

const OUT = 'public/media/img';
mkdirSync(OUT, { recursive: true });
const picks = existsSync('_gen/picks.json') ? JSON.parse(readFileSync('_gen/picks.json', 'utf8')) : {};
const files = readdirSync('_gen/img');

function pick(key) {
  if (picks[key]) return `_gen/img/${picks[key]}`;
  const vs = files.filter((f) => new RegExp(`^${key}-v\\d+\\.png$`).test(f))
    .sort((a, b) => parseInt(a.match(/v(\d+)/)[1]) - parseInt(b.match(/v(\d+)/)[1]));
  return vs.length ? `_gen/img/${vs.at(-1)}` : null;
}

// Gentle unified grade: slight lift of blacks avoided; just a touch of sharpening for upscale.
async function encode(key, src) {
  const base = sharp(src).rotate();
  const meta = await base.metadata();
  const width = Math.min(meta.width, 2400);
  const resized = sharp(src).resize({ width, withoutEnlargement: true });
  await resized.clone().avif({ quality: 64, effort: 6, chromaSubsampling: '4:2:0' }).toFile(`${OUT}/${key}.avif`);
  await resized.clone().jpeg({ quality: 82, mozjpeg: true, progressive: true }).toFile(`${OUT}/${key}.jpg`);
  const out = await sharp(`${OUT}/${key}.jpg`).metadata();
  const blur = await sharp(src).resize(16, Math.round((16 * meta.height) / meta.width)).blur(0.6).jpeg({ quality: 50 }).toBuffer();
  return { width: out.width, height: out.height, blurDataURL: `data:image/jpeg;base64,${blur.toString('base64')}` };
}

const argv = process.argv.slice(2);
const only = argv.filter((a) => !a.startsWith('--'));
const doOg = argv.includes('--og') || only.length === 0;

// Images that are not generated from prompts but must stay in the manifest.
const STATIC = {
  // Static render of the WebGL Oak Graph on its grainy gradient panel: the hero
  // fallback for reduced motion / no WebGL (light-first re-theme, Nov 2026).
  'hero-oak-panel': { alt: 'The Emineon oak drawn as a graph of bone dots and fine lines on a grainy ember and steel-blue gradient.' },
};

async function existing(key) {
  const jpg = `${OUT}/${key}.jpg`;
  const m = await sharp(jpg).metadata();
  const blur = await sharp(jpg).resize(16, Math.round((16 * m.height) / m.width)).blur(0.6).jpeg({ quality: 50 }).toBuffer();
  return { width: m.width, height: m.height, blurDataURL: `data:image/jpeg;base64,${blur.toString('base64')}` };
}

const keys = Object.keys(IMAGES).filter((k) => !IMAGES[k].internal && k !== 'og-default');
const entries = {};
for (const [key, v] of Object.entries(STATIC)) {
  entries[key] = { ...(await existing(key)), alt: v.alt, src: `/media/img/${key}.jpg`, avif: `/media/img/${key}.avif` };
}
for (const key of keys) {
  if (only.length && !only.includes(key)) {
    entries[key] = { ...(await existing(key)), alt: IMAGES[key].alt, src: `/media/img/${key}.jpg`, avif: `/media/img/${key}.avif` };
    continue;
  }
  const src = pick(key);
  if (!src) { console.warn(`MISSING ${key}`); continue; }
  entries[key] = { ...(await encode(key, src)), alt: IMAGES[key].alt, src: `/media/img/${key}.jpg`, avif: `/media/img/${key}.avif`, from: src };
  const kb = (f) => Math.round(statSync(f).size / 1024);
  console.log(`${key.padEnd(18)} ${src.padEnd(34)} avif ${kb(`${OUT}/${key}.avif`)}KB jpg ${kb(`${OUT}/${key}.jpg`)}KB`);
}

// OG: 1200x630, cover crop, keep right-weighted subject
const ogSrc = doOg ? pick('og-default') : null;
if (ogSrc) {
  // Fit by height (no crop of canopy/roots), then extend the void on the left to 1200w.
  const fitted = await sharp(ogSrc).resize({ height: 630 }).toBuffer({ resolveWithObject: true });
  const { data: px } = await sharp(fitted.data).extract({ left: 0, top: 0, width: 8, height: 8 }).raw().toBuffer({ resolveWithObject: true });
  const bg = { r: px[0], g: px[1], b: px[2] };
  await sharp(fitted.data)
    .extend({ left: Math.max(0, 1200 - fitted.info.width), extendWith: 'mirror', background: bg })
    .jpeg({ quality: 82, mozjpeg: true }).toFile('public/media/og-default.jpg');
  console.log('og-default -> public/media/og-default.jpg');
}

// Videos (produced by scripts/gen/video.sh)
const VID = ['hero-oak', 'geneva-mist', 'filaments'];
const videos = {};
for (const v of VID) {
  const poster = `public/media/video/${v}.jpg`;
  if (!existsSync(poster)) { console.warn(`MISSING video ${v}`); continue; }
  const m = await sharp(poster).metadata();
  videos[v] = { mp4: `/media/video/${v}.mp4`, webm: `/media/video/${v}.webm`, poster: `/media/video/${v}.jpg`, width: m.width, height: m.height };
}

const imageKeys = Object.keys(entries);
const ts = `// AUTO-GENERATED by scripts/gen/optimize.mjs — do not edit by hand.
// Source originals, prompts and models: see ASSETS.md.
// \`src\` is a JPEG fallback; \`avif\` is the preferred format (next/image will also negotiate AVIF/WebP from \`src\`).

export type ImageKey =
${imageKeys.map((k) => `  | '${k}'`).join('\n')};

export type VideoKey = ${VID.map((v) => `'${v}'`).join(' | ')};

export interface MediaImage {
  src: string;
  avif: string;
  width: number;
  height: number;
  alt: string;
  blurDataURL: string;
}

export interface MediaVideo {
  mp4: string;
  webm: string;
  poster: string;
  width: number;
  height: number;
}

export const images: Record<ImageKey, MediaImage> = {
${imageKeys.map((k) => {
  const e = entries[k];
  return `  '${k}': {\n    src: '${e.src}',\n    avif: '${e.avif}',\n    width: ${e.width},\n    height: ${e.height},\n    alt: ${JSON.stringify(e.alt)},\n    blurDataURL:\n      '${e.blurDataURL}',\n  },`;
}).join('\n')}
};

export const videos: Record<VideoKey, MediaVideo> = {
${Object.entries(videos).map(([k, v]) => `  '${k}': { mp4: '${v.mp4}', webm: '${v.webm}', poster: '${v.poster}', width: ${v.width}, height: ${v.height} },`).join('\n')}
};

/** Default Open Graph image, 1200x630, no text (wordmark space on the left). */
export const ogDefault = { src: '/media/og-default.jpg', width: 1200, height: 630, alt: ${JSON.stringify(IMAGES['og-default'].alt)} } as const;

/** Convenience ordered lists for series. */
export const industryImages = {
  'commodities-trading': 'ind-trading',
  'banking-wealth': 'ind-banking',
  'international-organisations': 'ind-intl',
  'life-sciences': 'ind-life',
  'fragrance-flavour-chemicals': 'ind-fragrance',
  'industry-manufacturing': 'ind-manufacturing',
} as const satisfies Record<string, ImageKey>;

export const caseImages = ['case-1', 'case-2', 'case-3', 'case-4', 'case-5', 'case-6'] as const satisfies readonly ImageKey[];
export const insightImages = ['insight-1', 'insight-2', 'insight-3', 'insight-4', 'insight-5', 'insight-6'] as const satisfies readonly ImageKey[];
`;
writeFileSync('src/lib/media.ts', ts);
console.log(`wrote src/lib/media.ts (${imageKeys.length} images, ${Object.keys(videos).length} videos)`);
