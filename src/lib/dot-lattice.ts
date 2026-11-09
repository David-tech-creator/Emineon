/**
 * Procedural "dot lattice on grainy gradient" covers (BRIEF §8), deterministic per slug.
 * Crisp bone dots on a curved surface, seen in perspective with size and opacity falloff,
 * over a soft ember / graphite / steel gradient with SVG grain. Same visual language as the
 * hand-tuned covers made by scripts/gen/dot-covers.mjs, but light enough to render at build
 * time for every new post (served as /covers/insights/<slug>.svg).
 *
 * Pure function, no I/O: the same slug always gives the same picture.
 */

export const COVER_SIZE = { width: 1536, height: 1024 } as const;

export const latticeForms = ["dome", "wave", "funnel", "ridge", "helix", "torus", "scatter"] as const;
export type CoverForm = (typeof latticeForms)[number];

/** FNV-1a: a stable 32-bit hash of a string. */
export function hashString(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** mulberry32 */
export function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Form and seed for a slug. Used by the cover route and the OG images, so both agree. */
export function latticeFor(slug: string): { form: CoverForm; seed: number } {
  const h = hashString(slug);
  return { form: latticeForms[h % latticeForms.length], seed: h };
}

type P3 = [number, number, number];

function points(form: CoverForm, r: () => number): P3[] {
  const pts: P3[] = [];
  const grid = (cols: number, rows: number, f: (u: number, v: number) => number) => {
    for (let j = 0; j < rows; j++)
      for (let i = 0; i < cols; i++) {
        const u = (i / (cols - 1)) * 2 - 1;
        const v = (j / (rows - 1)) * 2 - 1;
        pts.push([u * 1.7, f(u, v), v * 1.25]);
      }
  };
  const k = 0.8 + r() * 0.8;
  const ph = r() * Math.PI * 2;
  switch (form) {
    case "dome":
      grid(58, 34, (u, v) => Math.max(0, 1 - (u * u) / 0.42 - v * v * 0.9) * (0.75 + k * 0.25));
      break;
    case "wave":
      grid(62, 32, (u, v) => Math.sin(u * 3.2 * k + ph) * 0.22 * (1.1 - Math.abs(v) * 0.4) + Math.cos(v * 4 + u * 1.5) * 0.12);
      break;
    case "funnel":
      grid(58, 34, (u, v) => -0.32 / (Math.hypot(u * 1.1, v * 1.4) + 0.32) + 0.35);
      break;
    case "ridge":
      grid(62, 32, (u, v) => Math.exp(-((u - Math.sin(v * 2 + ph) * 0.35) ** 2) / 0.12) * 0.75);
      break;
    case "helix": {
      const turns = 2.5 + k;
      for (let s = 0; s < 1; s += 1 / 520) {
        const a = s * Math.PI * 2 * turns + ph;
        for (let w = 0; w < 4; w++) {
          const rad = 0.55 + w * 0.06;
          pts.push([Math.cos(a) * rad, (s - 0.5) * 1.6, Math.sin(a) * rad * 0.8]);
        }
      }
      break;
    }
    case "torus": {
      const R = 0.95,
        rr = 0.34;
      for (let i = 0; i < 64; i++)
        for (let j = 0; j < 28; j++) {
          const a = (i / 64) * Math.PI * 2 + ph;
          const b = (j / 28) * Math.PI * 2;
          pts.push([(R + rr * Math.cos(b)) * Math.cos(a), rr * Math.sin(b) + 0.15, (R + rr * Math.cos(b)) * Math.sin(a) * 0.9]);
        }
      break;
    }
    case "scatter":
      // Loose on the left, resolving into an ordered lattice on the right.
      grid(60, 30, () => 0);
      for (const p of pts) {
        const order = Math.min(1, Math.max(0, (p[0] + 1.2) / 2.4));
        const jitter = (1 - order) ** 1.6;
        p[0] += (r() - 0.5) * 0.5 * jitter;
        p[1] += (r() - 0.3) * 0.9 * jitter + order * order * 0.35 * Math.sin(p[2] * 2 + ph) * 0.4;
        p[2] += (r() - 0.5) * 0.5 * jitter;
      }
      break;
  }
  return pts;
}

/** A full cover as an SVG string. */
export function coverSvg(slug: string, { width = COVER_SIZE.width, height = COVER_SIZE.height } = {}): string {
  const { form, seed } = latticeFor(slug);
  const r = rng(seed);
  const W = width;
  const H = height;

  // Camera: above and in front, looking slightly down at the origin.
  const yaw = (r() - 0.5) * 0.7;
  const pitch = 0.38 + r() * 0.22;
  const dist = 3.3;
  const cam: P3 = [Math.sin(yaw) * dist * Math.cos(pitch), Math.sin(pitch) * dist, Math.cos(yaw) * dist * Math.cos(pitch)];
  const f = norm(sub([0, 0.05, 0], cam));
  const rt = norm(cross(f, [0, 1, 0]));
  const up = cross(rt, f);
  const focal = H / 2 / Math.tan((38 * Math.PI) / 360);
  const shiftX = (r() - 0.5) * W * 0.12;

  const dots: { x: number; y: number; rad: number; o: number; ember: boolean; z: number }[] = [];
  for (const p of points(form, r)) {
    const d = sub(p, cam);
    const z = dot(d, f);
    if (z < 0.3) continue;
    const x = W / 2 + shiftX + (dot(d, rt) * focal) / z;
    const y = H / 2 - (dot(d, up) * focal) / z;
    if (x < -8 || x > W + 8 || y < -8 || y > H + 8) continue;
    const near = Math.min(1, Math.max(0, (dist + 1.4 - z) / 2.8));
    dots.push({ x, y, z, rad: 1.1 + near * 3.1, o: 0.22 + near * 0.78, ember: r() < 0.006 });
  }
  dots.sort((a, b) => b.z - a.z);

  // Group by quantised opacity to keep the file small.
  const groups = new Map<number, string[]>();
  const embers: string[] = [];
  for (const d of dots) {
    const c = `<circle cx="${d.x.toFixed(1)}" cy="${d.y.toFixed(1)}" r="${(d.ember ? d.rad * 1.5 : d.rad).toFixed(1)}"/>`;
    if (d.ember) embers.push(c);
    else {
      const q = Math.round(d.o * 10) / 10;
      (groups.get(q) ?? groups.set(q, []).get(q)!).push(c);
    }
  }
  const dotSvg = [...groups].map(([o, cs]) => `<g fill="#EFECE5" fill-opacity="${o}">${cs.join("")}</g>`).join("");

  const ex = 0.25 + r() * 0.55;
  const ey = 0.08 + r() * 0.3;
  const sx = 1 - ex * 0.8;
  const sy = 0.75 + r() * 0.25;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Abstract cover: a ${form} of dots on a grainy ember and steel gradient">
<defs>
<linearGradient id="b" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2B211C"/><stop offset=".5" stop-color="#1C1E23"/><stop offset="1" stop-color="#28303D"/></linearGradient>
<radialGradient id="e" cx="${ex.toFixed(2)}" cy="${ey.toFixed(2)}" r=".75"><stop offset="0" stop-color="#FF5B1F" stop-opacity=".9"/><stop offset=".35" stop-color="#C75B12" stop-opacity=".5"/><stop offset="1" stop-color="#C75B12" stop-opacity="0"/></radialGradient>
<radialGradient id="s" cx="${sx.toFixed(2)}" cy="${sy.toFixed(2)}" r=".7"><stop offset="0" stop-color="#9DB8FF" stop-opacity=".45"/><stop offset=".45" stop-color="#6F86A8" stop-opacity=".4"/><stop offset="1" stop-color="#6F86A8" stop-opacity="0"/></radialGradient>
<radialGradient id="v" cx=".5" cy=".5" r=".75"><stop offset=".6" stop-color="#07080A" stop-opacity="0"/><stop offset="1" stop-color="#07080A" stop-opacity=".45"/></radialGradient>
<filter id="n" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="${seed % 997}" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .6 0"/></filter>
</defs>
<rect width="${W}" height="${H}" fill="url(#b)"/>
<rect width="${W}" height="${H}" fill="url(#e)"/>
<rect width="${W}" height="${H}" fill="url(#s)"/>
${dotSvg}
<g fill="#FF5B1F">${embers.join("")}</g>
<rect width="${W}" height="${H}" fill="url(#v)"/>
<rect width="${W}" height="${H}" filter="url(#n)" opacity=".22"/>
</svg>`;
}

function sub(a: P3, b: P3): P3 {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}
function dot(a: P3, b: P3) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}
function cross(a: P3, b: P3): P3 {
  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
}
function norm(a: P3): P3 {
  const l = Math.hypot(a[0], a[1], a[2]) || 1;
  return [a[0] / l, a[1] / l, a[2] / l];
}
