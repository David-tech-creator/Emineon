#!/usr/bin/env node
// Procedural "dot lattice on grainy gradient" covers (BRIEF §8).
// Crisp bone dots on 3D curved surfaces (perspective + size falloff) over a soft,
// heavily grained ember / graphite / steel-blue gradient. Pixels are computed directly
// (float RGB buffer), then encoded with sharp.
//
// Writes masters to _gen/img/insight-N-v2.png and _gen/img/og-default-v3.png;
// scripts/gen/optimize.mjs then picks the latest version of each key and writes
// public/media/img/*.{jpg,avif}, blurDataURLs and src/lib/media.ts.
//
// Usage: node scripts/gen/dot-covers.mjs [insight-3 og-default ...]   (default: all)
import { mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const sharp = require('../../_gen/node_modules/sharp');

const OUT = '_gen/img';
mkdirSync(OUT, { recursive: true });

// ---------------------------------------------------------------- utils
function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
const srgbToLin = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const linToSrgb = (c) => (c <= 0.0031308 ? c * 12.92 : 1.055 * c ** (1 / 2.4) - 0.055);
const lin = (h) => hex(h).map(srgbToLin);
const clamp = (x, a = 0, b = 1) => (x < a ? a : x > b ? b : x);
const smooth = (a, b, x) => { const t = clamp((x - a) / (b - a)); return t * t * (3 - 2 * t); };
const lerp = (a, b, t) => a + (b - a) * t;

const PAL = {
  void: lin('#0A0B0E'),
  graphite: lin('#14161A'),
  slate: lin('#2C323C'),
  emberDeep: lin('#C75B12'),
  ember: lin('#FF5B1F'),
  rust: lin('#8A3A12'),
  steel: lin('#6F86A8'),
  mist: lin('#AEB6C2'),
  navy: lin('#2A3A57'),
  bone: lin('#F2EFE8'),
};

function gaussRand(r) {
  let u = 0, v = 0;
  while (u === 0) u = r();
  v = r();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

// ---------------------------------------------------------------- camera
function camera({ pos, target, fov, W, H }) {
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const norm = (a) => { const l = Math.hypot(...a); return a.map((x) => x / l); };
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const f = norm(sub(target, pos));
  const r = norm(cross(f, [0, 1, 0]));
  const u = cross(r, f);
  const focal = (H / 2) / Math.tan((fov * Math.PI) / 360);
  return (p) => {
    const d = sub(p, pos);
    const z = dot(d, f);
    if (z <= 0.05) return null;
    return { x: W / 2 + (dot(d, r) * focal) / z, y: H / 2 - (dot(d, u) * focal) / z, z };
  };
}

// ---------------------------------------------------------------- gradient
// Normalised weighted mix of soft colour blobs, domain-warped by low-frequency sines.
function paintGradient(buf, W, H, spec, seed) {
  const r = rng(seed);
  const waves = Array.from({ length: 6 }, () => ({
    fx: (0.6 + r() * 1.6) * Math.PI, fy: (0.6 + r() * 1.6) * Math.PI, ph: r() * 6.28, a: 0.035 + r() * 0.05,
  }));
  const S = Math.max(W, H);
  const blobs = spec.blobs.map((b) => ({ ...b, r: b.r * (spec.soft ?? 1.35), c: PAL[b.c] ?? lin(b.c) }));
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      let u = x / S, v = y / S;
      let wu = 0, wv = 0;
      for (const w of waves) {
        wu += w.a * Math.sin(v * w.fy * 2 + w.ph);
        wv += w.a * Math.sin(u * w.fx * 2 + w.ph * 1.3);
      }
      u += wu; v += wv;
      let R = PAL[spec.base][0] * spec.baseW, G = PAL[spec.base][1] * spec.baseW, B = PAL[spec.base][2] * spec.baseW, Wt = spec.baseW;
      for (const b of blobs) {
        const dx = (u - b.x * (W / S)) / (b.rx ?? b.r), dy = (v - b.y * (H / S)) / (b.ry ?? b.r);
        const w = b.w * Math.exp(-(dx * dx + dy * dy));
        R += b.c[0] * w; G += b.c[1] * w; B += b.c[2] * w; Wt += w;
      }
      const i = (y * W + x) * 3;
      buf[i] = R / Wt; buf[i + 1] = G / Wt; buf[i + 2] = B / Wt;
    }
  }
  // vignette
  if (spec.vignette) {
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const dx = (x / W - 0.5) * 1.6, dy = (y / H - 0.5) * 1.6;
      const k = 1 - spec.vignette * smooth(0.35, 1.25, Math.hypot(dx, dy));
      const i = (y * W + x) * 3;
      buf[i] *= k; buf[i + 1] *= k; buf[i + 2] *= k;
    }
  }
}

// ---------------------------------------------------------------- dots
function disc(buf, W, H, cx, cy, rad, col, alpha) {
  const x0 = Math.max(0, Math.floor(cx - rad - 1)), x1 = Math.min(W - 1, Math.ceil(cx + rad + 1));
  const y0 = Math.max(0, Math.floor(cy - rad - 1)), y1 = Math.min(H - 1, Math.ceil(cy + rad + 1));
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const d = Math.hypot(x + 0.5 - cx, y + 0.5 - cy);
    // analytic AA: ~1px soft edge, a touch softer for tiny dots so they don't sparkle
    const edge = rad < 1.2 ? 1.25 : 0.95;
    const cov = clamp((rad - d) / edge + 0.5);
    if (cov <= 0) continue;
    const a = cov * alpha, i = (y * W + x) * 3;
    buf[i] = lerp(buf[i], col[0], a); buf[i + 1] = lerp(buf[i + 1], col[1], a); buf[i + 2] = lerp(buf[i + 2], col[2], a);
  }
}
function glow(buf, W, H, cx, cy, rad, col, strength) {
  const R = rad * 3;
  for (let y = Math.max(0, Math.floor(cy - R)); y < Math.min(H, cy + R); y++)
    for (let x = Math.max(0, Math.floor(cx - R)); x < Math.min(W, cx + R); x++) {
      const d2 = ((x - cx) ** 2 + (y - cy) ** 2) / (rad * rad);
      const a = strength * Math.exp(-d2);
      const i = (y * W + x) * 3;
      buf[i] += col[0] * a; buf[i + 1] += col[1] * a; buf[i + 2] += col[2] * a;
    }
}

/** points: [{p:[x,y,z], a?:alpha mult, ember?:bool, s?:size mult}] */
function drawPoints(buf, W, H, points, cam, opt) {
  const proj = [];
  for (const pt of points) {
    const q = cam(pt.p);
    if (!q) continue;
    proj.push({ ...pt, q });
  }
  proj.sort((a, b) => b.q.z - a.q.z); // far first
  const zs = proj.map((p) => p.q.z);
  const zMin = Math.min(...zs), zMax = Math.max(...zs);
  for (const pt of proj) {
    const { x, y, z } = pt.q;
    const rad = Math.min(opt.maxR, (opt.k * (pt.s ?? 1)) / z);
    if (rad < 0.35) continue;
    if (x < -10 || y < -10 || x > W + 10 || y > H + 10) continue;
    const depth = (z - zMin) / Math.max(1e-6, zMax - zMin); // 0 near .. 1 far
    let a = lerp(1, opt.farAlpha ?? 0.45, depth) * (pt.a ?? 1);
    if (pt.ember) {
      glow(buf, W, H, x, y, rad * 6, PAL.ember, 0.8);
      disc(buf, W, H, x, y, rad * 1.7, PAL.ember, 1);
      continue;
    }
    // tiny dots are drawn a bit larger but dimmer, so they read as dots not pixels
    if (rad < 0.9) { a *= rad / 0.9; }
    disc(buf, W, H, x, y, Math.max(rad, 0.9), PAL.bone, clamp(a));
  }
}

// ---------------------------------------------------------------- grain + encode
function finish(buf, W, H, grain, seed) {
  const r = rng(seed);
  const out = Buffer.alloc(W * H * 3);
  for (let i = 0, p = 0; p < W * H; p++, i += 3) {
    const n = gaussRand(r);
    const nc = [gaussRand(r), gaussRand(r), gaussRand(r)];
    for (let c = 0; c < 3; c++) {
      let s = linToSrgb(clamp(buf[i + c]));
      // film grain: mostly luminance, a little chroma, strongest in mid-tones
      const mid = 0.55 + 1.2 * s * (1 - s);
      s += (n * grain + nc[c] * grain * 0.35) * mid;
      out[i + c] = Math.round(clamp(s) * 255);
    }
  }
  return out;
}

// ---------------------------------------------------------------- forms
const TAU = Math.PI * 2;

// 1 — scatter → order: a ribbon that starts as loose scatter (left) and resolves into a
// precise lattice rising to the upper right.
function form1(r) {
  const pts = [];
  const N = 64, M = 11;
  for (let i = 0; i < N; i++) {
    const u = i / (N - 1);
    const order = smooth(0.18, 0.78, u);
    const cx = lerp(-5.2, 4.6, u);
    const cy = -2.2 + 3.6 * u ** 1.6;
    const cz = lerp(1.2, -1.2, u);
    for (let j = 0; j < M; j++) {
      const v = j / (M - 1) - 0.5;
      // ordered position: rows across a gently twisting band
      const tw = 0.25 + u * 0.55;
      const ox = cx, oy = cy + v * 2.6 * Math.cos(tw), oz = cz + v * 2.6 * Math.sin(tw) + v * 0.8;
      // scattered position
      const sp = 1.9 * (1 - order) + 0.02;
      const sx = cx + gaussRand(r) * sp * 0.9, sy = cy + gaussRand(r) * sp * 0.8, sz = cz + gaussRand(r) * sp;
      if (order < 0.5 && r() < 0.35 * (1 - order * 2)) continue; // sparser in the chaos
      pts.push({ p: [lerp(sx, ox, order), lerp(sy, oy, order), lerp(sz, oz, order)], a: lerp(0.65, 1, order) });
    }
  }
  // faint drifting dust in the chaotic zone
  for (let k = 0; k < 120; k++) {
    pts.push({ p: [-6 + r() * 6, -3 + r() * 3.5, -1 + r() * 3], a: 0.45, s: 0.8 });
  }
  return { pts, cam: { pos: [0.6, 0.2, 7.6], target: [0.4, 0.1, 0], fov: 50 }, k: 40, maxR: 6.5, farAlpha: 0.55 };
}

// 2 — branching wave field: a lattice landscape whose ridges split as two wave sources interfere.
function form2() {
  const pts = [];
  // two interfering ripple sources: the wave fronts fork where they meet, a field that branches
  const src = [[-4.2, 7.5], [4.6, 9.5]];
  const step = 0.34;
  for (let gz = -2; gz <= 18; gz += step) {
    for (let gx = -13; gx <= 13; gx += step) {
      let h = 0;
      for (const [sx, sz] of src) {
        const d = Math.hypot(gx - sx, gz - sz);
        h += 0.5 * Math.cos(d * 1.25) * Math.exp(-d * 0.07);
      }
      pts.push({ p: [gx, h - 1.6, -gz], a: 1 - smooth(11, 18, gz) });
    }
  }
  return { pts, cam: { pos: [0, 3.4, 5.2], target: [0, -1.05, -7], fov: 54 }, k: 34, maxR: 6, farAlpha: 0.4 };
}

// 3 — nested domes: three concentric shells, the inner ones finer and dimmer, like a shield.
function form3() {
  const pts = [];
  // ring (latitude) sampling so each shell reads as a structured surface
  const shells = [{ R: 4.6, gap: 0.42, a: 1, cut: 1.05 }, { R: 3.2, gap: 0.36, a: 0.9, cut: 0.8 }, { R: 1.8, gap: 0.3, a: 0.85, cut: 0 }];
  for (const s of shells) {
    const rings = Math.round((s.R * Math.PI * 0.53) / s.gap);
    for (let a = 0; a <= rings; a++) {
      const phi = (a / rings) * Math.PI * 0.53;
      const n = Math.max(1, Math.round((TAU * Math.sin(phi) * s.R) / s.gap));
      for (let b = 0; b < n; b++) {
        const th = (b / n) * TAU + a * 0.17 + s.R;
        const z = Math.sin(phi) * Math.sin(th);
        // cutaway: each outer shell is opened towards the viewer to reveal the next one
        const ang = Math.abs(Math.atan2(Math.cos(th), Math.sin(th)));
        if (s.cut && ang < s.cut && phi > 0.25) continue;
        pts.push({ p: [Math.sin(phi) * Math.cos(th) * s.R, Math.cos(phi) * s.R - 3.3, z * s.R], a: s.a * (z > 0 ? 1 : 0.4), s: s.R < 4 ? 0.9 : 1 });
      }
    }
  }
  return { pts, cam: { pos: [0, 2.0, 8.6], target: [0, -0.5, 0], fov: 48 }, k: 38, maxR: 6.2, farAlpha: 0.35 };
}

// 4 — torus: a balanced ring, tilted, two halves in equilibrium.
function form4() {
  const pts = [];
  const R = 2.7, rr = 1.15, NU = 96, NV = 26;
  const tilt = 1.08, c = Math.cos(tilt), s = Math.sin(tilt);
  for (let i = 0; i < NU; i++) for (let j = 0; j < NV; j++) {
    const u = (i / NU) * TAU + (j % 2) * (Math.PI / NU), v = (j / NV) * TAU;
    let x = (R + rr * Math.cos(v)) * Math.cos(u), z = (R + rr * Math.cos(v)) * Math.sin(u), y = rr * Math.sin(v);
    const y2 = y * c - z * s, z2 = y * s + z * c;
    pts.push({ p: [x, y2, z2] });
  }
  return { pts, cam: { pos: [0.6, 0.5, 8.0], target: [0, -0.15, 0], fov: 46 }, k: 36, maxR: 5.8, farAlpha: 0.32 };
}

// 5 — helix anchoring to a point: a widening spiral of strands that funnels down onto one anchor.
function form5() {
  const pts = [];
  const strands = 12, gap = 0.16;
  const at = (k, t) => {
    const rad = 0.06 + 4.2 * t ** 1.5;
    const th = (k / strands) * TAU + t * 7.5;
    return [Math.cos(th) * rad, -2.7 + t * 7.2, Math.sin(th) * rad];
  };
  for (let k = 0; k < strands; k++) {
    let prev = at(k, 0), acc = gap;
    for (let i = 1; i <= 4000; i++) {
      const t = i / 4000, p = at(k, t);
      acc += Math.hypot(p[0] - prev[0], p[1] - prev[1], p[2] - prev[2]);
      prev = p;
      if (acc >= gap * lerp(0.5, 1.6, t)) { acc = 0; pts.push({ p, a: lerp(1, 0.8, t) }); }
    }
  }
  pts.push({ p: [0, -2.78, 0], s: 2.2 });
  return { pts, cam: { pos: [0, 2.4, 8.6], target: [0, 0.3, 0], fov: 50 }, k: 36, maxR: 6, farAlpha: 0.3 };
}

// 6 — grid dome with a single ember dot (the reference composition, in landscape).
function form6() {
  const pts = [];
  const R = 6.2, rings = 30;
  for (let a = 0; a <= rings; a++) {
    const phi = (a / rings) * (Math.PI * 0.55);
    const n = Math.max(1, Math.round(2 * Math.PI * Math.sin(phi) * rings / (Math.PI * 0.55) * 0.95));
    for (let b = 0; b < n; b++) {
      const th = (b / n) * TAU + a * 0.11;
      pts.push({ p: [Math.sin(phi) * Math.cos(th) * R, Math.cos(phi) * R - 6.6, Math.sin(phi) * Math.sin(th) * R] });
    }
  }
  // the one that stands out: an existing lattice point (ring 11, facing the viewer slightly right)
  const target = [Math.sin(0.64) * Math.cos(1.25) * R, Math.cos(0.64) * R - 6.6, Math.sin(0.64) * Math.sin(1.25) * R];
  let best = pts[0], bd = Infinity;
  for (const q of pts) { const d = Math.hypot(q.p[0] - target[0], q.p[1] - target[1], q.p[2] - target[2]); if (d < bd) { bd = d; best = q; } }
  best.ember = true;
  return { pts, cam: { pos: [0, 1.4, 7.0], target: [0, -1.9, 0], fov: 54 }, k: 38, maxR: 6.4, farAlpha: 0.45 };
}

// ---------------------------------------------------------------- compositions
const COVERS = {
  'insight-1': {
    form: form1, seed: 11, grain: 0.085,
    bg: { base: 'graphite', baseW: 0.6, vignette: 0.35, blobs: [
      { c: 'emberDeep', x: 0.82, y: 0.12, r: 0.32, w: 1.2 }, { c: 'ember', x: 0.95, y: 0.3, r: 0.16, w: 0.7 },
      { c: 'void', x: 0.12, y: 0.25, r: 0.3, w: 1.1 }, { c: 'steel', x: 0.25, y: 0.95, r: 0.3, w: 1.0 },
      { c: 'mist', x: 0.5, y: 0.6, r: 0.14, w: 0.35 }, { c: 'navy', x: 0.6, y: 1.0, r: 0.25, w: 0.8 },
    ] },
  },
  'insight-2': {
    form: form2, seed: 22, grain: 0.085,
    bg: { base: 'graphite', baseW: 0.6, vignette: 0.3, blobs: [
      { c: 'ember', x: 0.5, y: 0.02, r: 0.28, w: 1.1 }, { c: 'emberDeep', x: 0.2, y: 0.18, r: 0.25, w: 0.9 },
      { c: 'steel', x: 0.92, y: 0.35, r: 0.25, w: 0.9 }, { c: 'void', x: 0.5, y: 0.62, r: 0.32, w: 1.0 },
      { c: 'navy', x: 0.1, y: 0.95, r: 0.3, w: 0.9 }, { c: 'mist', x: 0.82, y: 0.9, r: 0.18, w: 0.45 },
    ] },
  },
  'insight-3': {
    form: form3, seed: 33, grain: 0.085,
    bg: { base: 'graphite', baseW: 0.6, vignette: 0.3, blobs: [
      { c: 'emberDeep', x: 0.5, y: 0.25, r: 0.22, w: 1.0 }, { c: 'ember', x: 0.52, y: 0.5, r: 0.12, w: 0.9 },
      { c: 'steel', x: 0.08, y: 0.65, r: 0.26, w: 1.0 }, { c: 'navy', x: 0.92, y: 0.85, r: 0.28, w: 1.0 },
      { c: 'void', x: 0.85, y: 0.08, r: 0.25, w: 1.0 }, { c: 'mist', x: 0.18, y: 0.2, r: 0.12, w: 0.35 },
    ] },
  },
  'insight-4': {
    form: form4, seed: 44, grain: 0.085,
    bg: { base: 'graphite', baseW: 0.6, vignette: 0.32, blobs: [
      { c: 'emberDeep', x: 0.15, y: 0.3, r: 0.28, w: 1.1 }, { c: 'ember', x: 0.25, y: 0.45, r: 0.12, w: 0.6 },
      { c: 'steel', x: 0.85, y: 0.65, r: 0.28, w: 1.1 }, { c: 'mist', x: 0.75, y: 0.35, r: 0.14, w: 0.4 },
      { c: 'void', x: 0.5, y: 0.98, r: 0.3, w: 1.0 }, { c: 'rust', x: 0.6, y: 0.05, r: 0.2, w: 0.6 },
    ] },
  },
  'insight-5': {
    form: form5, seed: 55, grain: 0.085,
    bg: { base: 'graphite', baseW: 0.6, vignette: 0.32, blobs: [
      { c: 'steel', x: 0.25, y: 0.1, r: 0.3, w: 1.0 }, { c: 'mist', x: 0.4, y: 0.05, r: 0.14, w: 0.45 },
      { c: 'emberDeep', x: 0.78, y: 0.2, r: 0.26, w: 1.0 }, { c: 'ember', x: 0.5, y: 0.92, r: 0.16, w: 1.0 },
      { c: 'void', x: 0.1, y: 0.8, r: 0.25, w: 1.0 }, { c: 'navy', x: 0.92, y: 0.85, r: 0.25, w: 0.9 },
    ] },
  },
  'insight-6': {
    form: form6, seed: 66, grain: 0.085,
    bg: { base: 'graphite', baseW: 0.6, vignette: 0.28, blobs: [
      { c: 'emberDeep', x: 0.45, y: 0.05, r: 0.3, w: 1.2 }, { c: 'ember', x: 0.55, y: 0.18, r: 0.14, w: 0.6 },
      { c: 'void', x: 0.05, y: 0.05, r: 0.2, w: 1.0 }, { c: 'mist', x: 0.12, y: 0.55, r: 0.16, w: 0.55 },
      { c: 'steel', x: 0.88, y: 0.2, r: 0.2, w: 0.9 }, { c: 'void', x: 0.62, y: 0.68, r: 0.2, w: 0.8 },
      { c: 'steel', x: 0.85, y: 0.98, r: 0.25, w: 1.1 }, { c: 'navy', x: 0.25, y: 1.0, r: 0.25, w: 0.9 },
    ] },
  },
  // OG fallback: lattice on the right, darker quiet left for the wordmark.
  'og-default': {
    W: 1200, H: 630, version: 3, form: () => { const f = form6(); f.cam = { pos: [-5.0, 2.0, 7.0], target: [-3.3, -1.3, 0], fov: 50 }; f.k = 26; f.pts = f.pts.map((p) => ({ ...p, ember: false })); return f; },
    seed: 77, grain: 0.08,
    bg: { base: 'void', baseW: 0.35, vignette: 0.25, blobs: [
      { c: 'emberDeep', x: 0.75, y: 0.05, r: 0.3, w: 1.1 }, { c: 'ember', x: 0.88, y: 0.25, r: 0.14, w: 0.55 },
      { c: 'steel', x: 0.95, y: 0.95, r: 0.26, w: 1.0 }, { c: 'void', x: 0.12, y: 0.5, r: 0.4, w: 1.6 },
      { c: 'navy', x: 0.45, y: 1.0, r: 0.25, w: 0.7 },
    ] },
  },
};

async function render(key) {
  const c = COVERS[key];
  const W = c.W ?? 1536, H = c.H ?? 1024;
  const buf = new Float32Array(W * H * 3);
  paintGradient(buf, W, H, c.bg, c.seed);
  const f = c.form(rng(c.seed + 1));
  const cam = camera({ ...f.cam, W, H });
  drawPoints(buf, W, H, f.pts, cam, { k: f.k * (W / 1536), maxR: f.maxR * (W / 1536), farAlpha: f.farAlpha });
  const px = finish(buf, W, H, c.grain, c.seed + 2);
  const file = `${OUT}/${key}-v${c.version ?? 2}.png`;
  await sharp(px, { raw: { width: W, height: H, channels: 3 } }).png({ compressionLevel: 6 }).toFile(file);
  console.log(`${key} -> ${file} (${f.pts.length} dots)`);
}

const only = process.argv.slice(2);
for (const key of Object.keys(COVERS)) if (!only.length || only.includes(key)) await render(key);
