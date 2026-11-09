/**
 * Procedural oak graph (pure, framework-free, deterministic).
 *
 * Canopy and roots are grown with space colonization from a seeded PRNG, so the
 * same seed + quality always yields the same tree (SSR-safe, no visual jitter
 * between visits). The skeleton is smoothed, thickened with a pipe model, and
 * thick limbs are rendered as bundles of parallel filaments (the fibrous look of
 * the hero-oak poster). Below the ground, a dotted sphere-cap lattice ("your
 * data") receives the root tips.
 *
 * Every vertex carries a signed path coordinate `g` (world units): negative in
 * the lattice/roots, 0 at the root collar, positive up the trunk into the canopy.
 * The shaders move ember pulses along increasing `g`, i.e. roots -> canopy.
 */

export type OakQuality = "low" | "mid" | "high";

export interface OakGraphData {
  /** Dots: xyz per node. */
  points: Float32Array;
  /** Signed path coordinate per dot (see file comment). */
  pointG: Float32Array;
  /** Pulse lane per dot (0..1): pulses only travel along matching lanes. */
  pointLane: Float32Array;
  /** Dot world size. */
  pointSize: Float32Array;
  /** 0 = tree, 1 = root, 2 = lattice. */
  pointKind: Float32Array;
  /** Constellation displacement per dot. */
  pointScatter: Float32Array;
  /** Per-dot random 0..1 (twinkle, keep masks). */
  pointRand: Float32Array;

  /** Edges as line-segment pairs: xyz per vertex. */
  lines: Float32Array;
  lineG: Float32Array;
  lineLane: Float32Array;
  /** Base opacity per vertex. */
  lineAlpha: Float32Array;
  lineScatter: Float32Array;
  /** 1 when the edge survives the constellation dissolve. */
  lineKeep: Float32Array;

  gMin: number;
  gMax: number;
  /** Highest canopy point (y). */
  top: number;
  /** Canopy half-width (x/z). */
  halfWidth: number;
  stats: { nodes: number; dots: number; segments: number; ms: number };
}

/* ------------------------------------------------------------------ PRNG -- */

export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Rng = () => number;

function gauss(rng: Rng) {
  const u = Math.max(1e-9, rng());
  const v = rng();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

/* ------------------------------------------------------- quality presets -- */

interface Preset {
  canopyAttractors: number;
  rootAttractors: number;
  step: number;
  latticeSpacing: number;
  maxStrands: number;
  /** Dot size multiplier (small screens need bigger dots). */
  dotScale: number;
}

const PRESETS: Record<OakQuality, Preset> = {
  high: { canopyAttractors: 2400, rootAttractors: 520, step: 0.15, latticeSpacing: 0.3, maxStrands: 14, dotScale: 1 },
  mid: { canopyAttractors: 1500, rootAttractors: 360, step: 0.18, latticeSpacing: 0.36, maxStrands: 9, dotScale: 1.15 },
  low: { canopyAttractors: 760, rootAttractors: 280, step: 0.22, latticeSpacing: 0.48, maxStrands: 6, dotScale: 1.5 },
};

/* ---------------------------------------------------- space colonization -- */

interface Skeleton {
  x: number[];
  y: number[];
  z: number[];
  parent: number[];
}

class Grid {
  private cells = new Map<number, number[]>();
  private size: number;
  constructor(size: number) {
    this.size = size;
  }
  private key(ix: number, iy: number, iz: number) {
    return ((ix + 512) * 1024 + (iy + 512)) * 1024 + (iz + 512);
  }
  add(i: number, x: number, y: number, z: number) {
    const k = this.key(Math.floor(x / this.size), Math.floor(y / this.size), Math.floor(z / this.size));
    const c = this.cells.get(k);
    if (c) c.push(i);
    else this.cells.set(k, [i]);
  }
  /** Calls fn for every index in the 27 cells around (x,y,z). */
  near(x: number, y: number, z: number, fn: (i: number) => void) {
    const ix = Math.floor(x / this.size);
    const iy = Math.floor(y / this.size);
    const iz = Math.floor(z / this.size);
    for (let a = -1; a <= 1; a++)
      for (let b = -1; b <= 1; b++)
        for (let c = -1; c <= 1; c++) {
          const cell = this.cells.get(this.key(ix + a, iy + b, iz + c));
          if (cell) for (let n = 0; n < cell.length; n++) fn(cell[n]);
        }
  }
}

interface ColonizeOpts {
  rng: Rng;
  attractors: number[][];
  /** Initial nodes [x, y, z, parentIndex] (first entry is the shared origin, parent -1). */
  seedChain: number[][];
  step: number;
  influence: number;
  kill: number;
  /** Constant growth bias (e.g. phototropism up, gravitropism down). */
  tropism: [number, number, number];
  maxIter: number;
}

function colonize(o: ColonizeOpts): Skeleton {
  const sk: Skeleton = { x: [], y: [], z: [], parent: [] };
  const grid = new Grid(o.influence);
  const push = (x: number, y: number, z: number, p: number) => {
    const i = sk.x.length;
    sk.x.push(x);
    sk.y.push(y);
    sk.z.push(z);
    sk.parent.push(p);
    grid.add(i, x, y, z);
    return i;
  };
  o.seedChain.forEach((p, i) => push(p[0], p[1], p[2], p.length > 3 ? p[3] : i - 1));

  // Extend the seed chain until it reaches the attractor cloud.
  const reach = () => {
    const last = sk.x.length - 1;
    for (const a of o.attractors) {
      const dx = a[0] - sk.x[last], dy = a[1] - sk.y[last], dz = a[2] - sk.z[last];
      if (dx * dx + dy * dy + dz * dz < o.influence * o.influence) return true;
    }
    return false;
  };
  let guard = 0;
  while (!reach() && guard++ < 80) {
    const l = sk.x.length - 1;
    const p = sk.parent[l] >= 0 ? sk.parent[l] : l;
    let dx = sk.x[l] - sk.x[p], dy = sk.y[l] - sk.y[p], dz = sk.z[l] - sk.z[p];
    const len = Math.hypot(dx, dy, dz) || 1;
    dx = dx / len + o.tropism[0] * 0.2 + (o.rng() - 0.5) * 0.08;
    dy = dy / len + o.tropism[1] * 0.2;
    dz = dz / len + o.tropism[2] * 0.2 + (o.rng() - 0.5) * 0.08;
    const n = Math.hypot(dx, dy, dz) || 1;
    push(sk.x[l] + (dx / n) * o.step, sk.y[l] + (dy / n) * o.step, sk.z[l] + (dz / n) * o.step, l);
  }

  const alive = o.attractors.map(() => true);
  const inf2 = o.influence * o.influence;
  const kill2 = o.kill * o.kill;

  for (let iter = 0; iter < o.maxIter; iter++) {
    const acc = new Map<number, [number, number, number, number]>();
    let any = false;
    for (let ai = 0; ai < o.attractors.length; ai++) {
      if (!alive[ai]) continue;
      const a = o.attractors[ai];
      let best = -1;
      let bestD = inf2;
      grid.near(a[0], a[1], a[2], (i) => {
        const dx = a[0] - sk.x[i], dy = a[1] - sk.y[i], dz = a[2] - sk.z[i];
        const d = dx * dx + dy * dy + dz * dz;
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      });
      if (best < 0) continue;
      if (bestD < kill2) {
        alive[ai] = false;
        continue;
      }
      any = true;
      const d = Math.sqrt(bestD);
      const v = acc.get(best) ?? [0, 0, 0, 0];
      v[0] += (a[0] - sk.x[best]) / d;
      v[1] += (a[1] - sk.y[best]) / d;
      v[2] += (a[2] - sk.z[best]) / d;
      v[3] += 1;
      acc.set(best, v);
    }
    if (!any) break;
    acc.forEach((v, i) => {
      let dx = v[0] / v[3] + o.tropism[0] + (o.rng() - 0.5) * 0.12;
      let dy = v[1] / v[3] + o.tropism[1] + (o.rng() - 0.5) * 0.12;
      let dz = v[2] / v[3] + o.tropism[2] + (o.rng() - 0.5) * 0.12;
      const n = Math.hypot(dx, dy, dz) || 1;
      dx /= n;
      dy /= n;
      dz /= n;
      push(sk.x[i] + dx * o.step, sk.y[i] + dy * o.step, sk.z[i] + dz * o.step, i);
    });
  }
  return sk;
}

/* ------------------------------------------------------------ envelopes -- */

function canopyAttractors(rng: Rng, count: number): number[][] {
  // A broad, slightly flattened oak crown made of overlapping lobes. Points are
  // biased toward the outer shell so limbs reach the silhouette.
  const lobes: [number, number, number, number, number, number][] = [
    // cx, cy, cz, rx, ry, rz
    [0, 6.4, 0, 5.4, 2.9, 4.4],
    [-3.6, 5.3, 0.6, 2.6, 1.9, 2.4],
    [3.7, 5.5, -0.4, 2.7, 1.9, 2.4],
    [-1.6, 7.6, -0.8, 2.6, 1.7, 2.3],
    [1.9, 7.8, 0.9, 2.5, 1.6, 2.2],
    [0.3, 8.4, 0.2, 2.2, 1.2, 2.0],
    [-5.3, 4.6, -0.6, 1.6, 1.3, 1.6],
    [5.4, 4.8, 0.7, 1.5, 1.2, 1.6],
  ];
  const out: number[][] = [];
  let guard = 0;
  while (out.length < count && guard++ < count * 200) {
    const x = (rng() * 2 - 1) * 7.2;
    const y = 3.0 + rng() * 6.6;
    const z = (rng() * 2 - 1) * 5.2;
    let inside = Infinity;
    for (const l of lobes) {
      const d = Math.hypot((x - l[0]) / l[3], (y - l[1]) / l[4], (z - l[2]) / l[5]);
      inside = Math.min(inside, d);
    }
    if (inside > 1) continue;
    if (y < 3.6 && Math.abs(x) < 1.6) continue; // keep the crown base open over the trunk
    if (y < 7.2 && Math.hypot(x, z) < 1.1) continue; // no central leader: limbs fill the crown
    // shell bias: interior points are rarer
    const r = Math.hypot(x / 5.6, (y - 6.0) / 3.2, z / 4.6);
    if (rng() > 0.18 + 0.82 * Math.pow(Math.min(1, r), 1.6)) continue;
    out.push([x, y, z]);
  }
  return out;
}

function rootAttractors(rng: Rng, count: number): number[][] {
  // Roots fan out along a handful of radial veins, shallow and wide, deeper near the collar.
  const veins = 11;
  const a0 = rng() * Math.PI * 2;
  const out: number[][] = [];
  while (out.length < count) {
    const v = Math.floor(rng() * veins);
    const r = 0.5 + Math.pow(rng(), 0.8) * 6.4;
    const a = a0 + (v / veins) * Math.PI * 2 + gauss(rng) * (0.1 + 0.05 * r) / Math.max(1, r * 0.5);
    // stay between the ground and the lattice dome (y = -0.42 - r^2/30)
    const floor = 0.42 + (r * r) / 30;
    const depth = 0.1 + floor * (0.3 + 0.55 * Math.exp(-r * 0.35)) + gauss(rng) * 0.03;
    out.push([Math.cos(a) * r, -depth, Math.sin(a) * r * 0.85]);
  }
  return out;
}

/**
 * Trunk + scaffold limbs: an oak's trunk divides low into a few heavy, spreading
 * limbs instead of one central leader. Returns seed nodes [x, y, z, parent].
 */
function scaffold(rng: Rng, step: number): number[][] {
  const out: number[][] = [[0, 0, 0, -1]];
  const trunkTop = 2.5;
  let y = 0;
  let x = 0;
  let z = 0;
  while (y < trunkTop) {
    y += step;
    x += Math.sin(y * 1.3) * 0.012;
    z += Math.cos(y * 1.1) * 0.01;
    out.push([x, y, z, out.length - 1]);
  }
  const fork = out.length - 1;
  const limbs = 5;
  const a0 = rng() * Math.PI * 2;
  for (let l = 0; l < limbs; l++) {
    const az = a0 + (l / limbs) * Math.PI * 2 + (rng() - 0.5) * 0.5;
    const tilt = 0.55 + rng() * 0.45; // radians from vertical
    const len = 1.3 + rng() * 1.1;
    let px = x, py = y, pz = z;
    let parent = fork;
    for (let d = step; d <= len; d += step) {
      const bend = tilt * (0.75 + 0.4 * (d / len)); // arcs outward
      px += Math.sin(bend) * Math.cos(az) * step;
      pz += Math.sin(bend) * Math.sin(az) * step * 0.85;
      py += Math.cos(bend) * step;
      out.push([px, py, pz, parent]);
      parent = out.length - 1;
    }
  }
  return out;
}

/* ------------------------------------------------------------- assembly -- */

interface Tree {
  x: Float64Array;
  y: Float64Array;
  z: Float64Array;
  parent: Int32Array;
  kind: Uint8Array; // 0 tree, 1 root
  children: number[][];
  radius: Float64Array;
  path: Float64Array; // path length from origin
  lane: Float64Array;
}

function merge(canopy: Skeleton, roots: Skeleton): Tree {
  // node 0 is the shared origin in both skeletons
  const nC = canopy.x.length;
  const nR = roots.x.length - 1;
  const n = nC + nR;
  const t: Tree = {
    x: new Float64Array(n),
    y: new Float64Array(n),
    z: new Float64Array(n),
    parent: new Int32Array(n),
    kind: new Uint8Array(n),
    children: Array.from({ length: n }, () => []),
    radius: new Float64Array(n),
    path: new Float64Array(n),
    lane: new Float64Array(n),
  };
  for (let i = 0; i < nC; i++) {
    t.x[i] = canopy.x[i];
    t.y[i] = canopy.y[i];
    t.z[i] = canopy.z[i];
    t.parent[i] = canopy.parent[i];
  }
  for (let j = 1; j < roots.x.length; j++) {
    const i = nC + j - 1;
    t.x[i] = roots.x[j];
    t.y[i] = roots.y[j];
    t.z[i] = roots.z[j];
    const p = roots.parent[j];
    t.parent[i] = p === 0 ? 0 : nC + p - 1;
    t.kind[i] = 1;
  }
  for (let i = 1; i < n; i++) t.children[t.parent[i]].push(i);
  return t;
}

function smooth(t: Tree, passes: number, only?: 0 | 1) {
  const n = t.x.length;
  for (let p = 0; p < passes; p++) {
    const nx = Float64Array.from(t.x), ny = Float64Array.from(t.y), nz = Float64Array.from(t.z);
    for (let i = 1; i < n; i++) {
      const ch = t.children[i];
      if (ch.length !== 1) continue; // keep tips and forks pinned
      if (only !== undefined && t.kind[i] !== only) continue;
      const a = t.parent[i], b = ch[0];
      nx[i] = t.x[i] * 0.5 + (t.x[a] + t.x[b]) * 0.25;
      ny[i] = t.y[i] * 0.5 + (t.y[a] + t.y[b]) * 0.25;
      nz[i] = t.z[i] * 0.5 + (t.z[a] + t.z[b]) * 0.25;
    }
    t.x.set(nx);
    t.y.set(ny);
    t.z.set(nz);
  }
}

function thicken(t: Tree) {
  const n = t.x.length;
  const leaf = 0.011;
  const e = 2.4;
  for (let i = n - 1; i >= 0; i--) {
    const ch = t.children[i];
    if (!ch.length) {
      t.radius[i] = leaf;
      continue;
    }
    let s = 0;
    for (const c of ch) s += Math.pow(t.radius[c], e);
    t.radius[i] = Math.pow(s, 1 / e);
  }
  // collar flare: roots and trunk both share node 0; keep its radius = trunk radius
}

function paths(t: Tree, rng: Rng) {
  const n = t.x.length;
  t.lane[0] = rng();
  for (let i = 1; i < n; i++) {
    const p = t.parent[i];
    t.path[i] = t.path[p] + Math.hypot(t.x[i] - t.x[p], t.y[i] - t.y[p], t.z[i] - t.z[p]);
  }
  // Lanes: the heaviest child continues its parent's lane; side shoots get a new one.
  for (let i = 0; i < n; i++) {
    const ch = t.children[i];
    if (!ch.length) continue;
    let heavy = ch[0];
    for (const c of ch) if (t.radius[c] > t.radius[heavy]) heavy = c;
    for (const c of ch) t.lane[c] = c === heavy && t.kind[c] === t.kind[i] ? t.lane[i] : rng();
  }
}

/* ------------------------------------------------------------- lattice --- */

interface Lattice {
  pts: number[][];
  g: number[];
  lane: number[];
}

function lattice(spacing: number): Lattice {
  // A sphere cap (dome seen from above) just under the ground plane, dots on
  // concentric rings with equal arc spacing: the "data" the roots draw from.
  const R = 15;
  const top = -0.42;
  const maxRho = 11.5;
  const pts: number[][] = [];
  const g: number[] = [];
  const lane: number[] = [];
  const rings = Math.floor(maxRho / spacing);
  for (let k = 1; k <= rings; k++) {
    const rho = k * spacing;
    const theta = Math.asin(Math.min(1, rho / R));
    const y = top - R * (1 - Math.cos(theta));
    const count = Math.max(6, Math.round((2 * Math.PI * rho) / spacing));
    const off = (k % 2) * 0.5;
    for (let j = 0; j < count; j++) {
      const a = ((j + off) / count) * Math.PI * 2;
      pts.push([Math.cos(a) * rho, y, Math.sin(a) * rho]);
      g.push(-(0.9 + rho * 1.05));
      // sectors converge inward in waves
      lane.push((Math.floor((a / (Math.PI * 2)) * 28) + 0.5) / 28);
    }
  }
  return { pts, g, lane };
}

/* ---------------------------------------------------------------- build -- */

const cache = new Map<string, OakGraphData>();

export function buildOakGraph(quality: OakQuality = "high", seed = 77): OakGraphData {
  const key = `${quality}:${seed}`;
  const hit = cache.get(key);
  if (hit) return hit;
  const t0 = typeof performance !== "undefined" ? performance.now() : 0;
  const P = PRESETS[quality];
  const rng = mulberry32(seed);

  const canopy = colonize({
    rng,
    attractors: canopyAttractors(rng, P.canopyAttractors),
    seedChain: scaffold(rng, P.step),
    step: P.step,
    influence: 1.25,
    kill: P.step * 1.7,
    tropism: [0, 0.16, 0],
    maxIter: 240,
  });
  const roots = colonize({
    rng,
    attractors: rootAttractors(rng, P.rootAttractors),
    seedChain: [
      [0, 0, 0],
      [0, -P.step * 0.8, 0],
    ],
    step: P.step,
    influence: 1.6,
    kill: P.step * 2.2,
    tropism: [0, -0.05, 0],
    maxIter: 160,
  });

  const t = merge(canopy, roots);
  // roots follow a smooth soil profile (kills the vertical zig-zags colonization makes)
  for (let i = 1; i < t.x.length; i++) {
    if (t.kind[i] !== 1) continue;
    const rho = Math.hypot(t.x[i], t.z[i]);
    const floor = 0.42 + (rho * rho) / 30;
    const profile = -(0.1 + floor * (0.3 + 0.55 * Math.exp(-rho * 0.35))) * Math.min(1, rho * 1.5);
    t.y[i] = profile * 0.85 + t.y[i] * 0.15;
  }
  smooth(t, 4);
  smooth(t, 10, 1);
  thicken(t);
  paths(t, rng);

  const n = t.x.length;
  const lat = lattice(P.latticeSpacing);

  // prune short root stubs (colonization leaves little hooks that read as noise)
  const maxDown = new Int32Array(n);
  for (let i = n - 1; i >= 1; i--) {
    const p = t.parent[i];
    maxDown[p] = Math.max(maxDown[p], maxDown[i] + 1);
  }
  const hidden = new Uint8Array(n);
  for (let i = 1; i < n; i++) {
    const p = t.parent[i];
    hidden[i] = hidden[p] || (t.kind[i] === 1 && t.children[p].length > 1 && maxDown[i] < 5) ? 1 : 0;
  }

  // ---- dots
  const dotCount = n + lat.pts.length;
  const points = new Float32Array(dotCount * 3);
  const pointG = new Float32Array(dotCount);
  const pointLane = new Float32Array(dotCount);
  const pointSize = new Float32Array(dotCount);
  const pointKind = new Float32Array(dotCount);
  const pointScatter = new Float32Array(dotCount * 3);
  const pointRand = new Float32Array(dotCount);

  let top = 0;
  let halfWidth = 0;
  const scatterOf = (x: number, y: number, z: number, out: Float32Array, o: number, amp: number) => {
    // outward + random: the tree loosens into a constellation around its own shape
    const cx = x, cy = y - 5.5, cz = z;
    const len = Math.hypot(cx, cy, cz) || 1;
    const k = amp * (0.6 + rng() * 1.8);
    out[o] = (cx / len) * k + gauss(rng) * amp * 0.9;
    out[o + 1] = (cy / len) * k * 0.6 + gauss(rng) * amp * 0.7;
    out[o + 2] = (cz / len) * k + gauss(rng) * amp * 0.9;
  };

  const sign = (i: number) => (t.kind[i] === 1 ? -t.path[i] : t.path[i]);

  for (let i = 0; i < n; i++) {
    points[i * 3] = t.x[i];
    points[i * 3 + 1] = t.y[i];
    points[i * 3 + 2] = t.z[i];
    pointG[i] = sign(i);
    pointLane[i] = t.lane[i];
    const ch = t.children[i].length;
    const tip = ch === 0;
    const fork = ch > 1;
    const thick = t.radius[i] > 0.045;
    const base = tip ? 0.05 : fork ? 0.046 : thick ? 0.016 : 0.03;
    pointSize[i] = base * (0.8 + rng() * 0.45) * (t.kind[i] === 1 ? 0.85 : 1);
    pointSize[i] *= P.dotScale;
    if (hidden[i]) pointSize[i] = 0;
    pointKind[i] = t.kind[i];
    pointRand[i] = rng();
    scatterOf(t.x[i], t.y[i], t.z[i], pointScatter, i * 3, t.kind[i] === 1 ? 1.4 : 2.4);
    if (t.kind[i] === 0) {
      top = Math.max(top, t.y[i]);
      halfWidth = Math.max(halfWidth, Math.abs(t.x[i]), Math.abs(t.z[i]));
    }
  }
  for (let j = 0; j < lat.pts.length; j++) {
    const i = n + j;
    const p = lat.pts[j];
    points[i * 3] = p[0];
    points[i * 3 + 1] = p[1];
    points[i * 3 + 2] = p[2];
    pointG[i] = lat.g[j];
    pointLane[i] = lat.lane[j];
    const rho = Math.hypot(p[0], p[2]);
    pointSize[i] = (0.034 + 0.012 * Math.min(1, rho / 10)) * P.dotScale;
    pointKind[i] = 2;
    pointRand[i] = rng();
    scatterOf(p[0], p[1], p[2], pointScatter, i * 3, 0.8);
  }

  // ---- edges
  const seg: number[] = []; // x,y,z, x,y,z
  const segG: number[] = [];
  const segLane: number[] = [];
  const segAlpha: number[] = [];
  const segScatter: number[] = [];
  const segKeep: number[] = [];

  // stable per-strand random offsets in a unit disk (3D, projected per node)
  const strandU: number[][] = [];
  for (let s = 0; s < P.maxStrands; s++) {
    const a = rng() * Math.PI * 2;
    const r = s === 0 ? 0 : 0.35 + Math.sqrt(rng()) * 0.65;
    strandU.push([Math.cos(a) * r, gauss(rng) * 0.4, Math.sin(a) * r]);
  }
  const offset = (i: number, s: number, out: number[]) => {
    // direction of the branch at node i (towards parent)
    const p = t.parent[i] < 0 ? (t.children[i][0] ?? i) : t.parent[i];
    let dx = t.x[i] - t.x[p], dy = t.y[i] - t.y[p], dz = t.z[i] - t.z[p];
    const l = Math.hypot(dx, dy, dz) || 1;
    dx /= l;
    dy /= l;
    dz /= l;
    const u = strandU[s];
    const dot = u[0] * dx + u[1] * dy + u[2] * dz;
    // flare toward the collar
    const flare = 1 + 1.6 * Math.exp(-Math.hypot(t.x[i], t.y[i], t.z[i]) * 2.2);
    const r = t.radius[i] * 2.6 * flare;
    out[0] = (u[0] - dot * dx) * r;
    out[1] = (u[1] - dot * dy) * r;
    out[2] = (u[2] - dot * dz) * r;
  };
  const oa = [0, 0, 0];
  const ob = [0, 0, 0];
  const strandsFor = (i: number) =>
    Math.max(1, Math.min(t.kind[i] === 1 ? 3 : P.maxStrands, Math.round(t.radius[i] / 0.017)));

  for (let i = 1; i < n; i++) {
    if (hidden[i]) continue;
    const p = t.parent[i];
    const k = strandsFor(i);
    const keep = rng() < 0.07 ? 1 : 0;
    const sa = [pointScatter[p * 3], pointScatter[p * 3 + 1], pointScatter[p * 3 + 2]];
    const sb = [pointScatter[i * 3], pointScatter[i * 3 + 1], pointScatter[i * 3 + 2]];
    const fine = t.radius[i] < 0.03;
    for (let s = 0; s < k; s++) {
      offset(p, s, oa);
      offset(i, s, ob);
      seg.push(t.x[p] + oa[0], t.y[p] + oa[1], t.z[p] + oa[2], t.x[i] + ob[0], t.y[i] + ob[1], t.z[i] + ob[2]);
      segG.push(sign(p), sign(i));
      segLane.push(t.lane[i], t.lane[i]);
      const a = (fine ? 0.34 : 0.26) * (t.kind[i] === 1 ? 0.8 : 1) * (s === 0 ? 1 : 0.75);
      segAlpha.push(a, a);
      segScatter.push(...sa, ...sb);
      segKeep.push(s === 0 ? keep : 0, s === 0 ? keep : 0);
    }
  }

  // root tips reach into the lattice: connect each to its 2 nearest lattice dots
  const latGrid = new Grid(1.2);
  lat.pts.forEach((q, j) => latGrid.add(j, q[0], q[1], q[2]));
  for (let i = 1; i < n; i++) {
    if (t.kind[i] !== 1 || t.children[i].length || hidden[i]) continue;
    const best: [number, number][] = [];
    latGrid.near(t.x[i], t.y[i], t.z[i], (j) => {
      const q = lat.pts[j];
      const d = Math.hypot(q[0] - t.x[i], q[1] - t.y[i], q[2] - t.z[i]);
      best.push([d, j]);
    });
    best.sort((a, b) => a[0] - b[0]);
    for (const [d, j] of best.slice(0, 2)) {
      if (d > 0.9) continue;
      const q = lat.pts[j];
      const li = n + j;
      seg.push(q[0], q[1], q[2], t.x[i], t.y[i], t.z[i]);
      segG.push(sign(i) - d, sign(i));
      segLane.push(t.lane[i], t.lane[i]);
      segAlpha.push(0.05, 0.1);
      segScatter.push(
        pointScatter[li * 3], pointScatter[li * 3 + 1], pointScatter[li * 3 + 2],
        pointScatter[i * 3], pointScatter[i * 3 + 1], pointScatter[i * 3 + 2],
      );
      const keep = rng() < 0.05 ? 1 : 0;
      segKeep.push(keep, keep);
    }
  }

  let gMin = Infinity;
  let gMax = -Infinity;
  for (let i = 0; i < dotCount; i++) {
    gMin = Math.min(gMin, pointG[i]);
    gMax = Math.max(gMax, pointG[i]);
  }
  const lineG = Float32Array.from(segG);

  const data: OakGraphData = {
    points,
    pointG,
    pointLane,
    pointSize,
    pointKind,
    pointScatter,
    pointRand,
    lines: Float32Array.from(seg),
    lineG,
    lineLane: Float32Array.from(segLane),
    lineAlpha: Float32Array.from(segAlpha),
    lineScatter: Float32Array.from(segScatter),
    lineKeep: Float32Array.from(segKeep),
    gMin,
    gMax,
    top,
    halfWidth,
    stats: {
      nodes: n,
      dots: dotCount,
      segments: seg.length / 6,
      ms: typeof performance !== "undefined" ? Math.round(performance.now() - t0) : 0,
    },
  };
  cache.set(key, data);
  return data;
}
