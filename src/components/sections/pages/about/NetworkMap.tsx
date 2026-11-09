import type { Office } from "@/content";
import { cn } from "@/lib/cn";

/**
 * Dot-lattice world map (equirectangular, cropped 75°N–48°S) with the Emineon
 * offices and arcs from Genève. Pure SVG, rendered on the server; arcs pulse with
 * CSS (cut under reduced motion). Coastlines are deliberately coarse: it reads as
 * a lattice, not a cartographic map.
 */

const W = 1000;
const LAT_TOP = 75;
const LAT_BOTTOM = -48;
const H = Math.round((W * (LAT_TOP - LAT_BOTTOM)) / 360);

const project = (lon: number, lat: number) => ({ x: ((lon + 180) / 360) * W, y: ((LAT_TOP - lat) / (LAT_TOP - LAT_BOTTOM)) * H });

type Poly = [number, number][];

// Coarse land polygons as [lon, lat].
const LAND: Poly[] = [
  // North America
  [[-168, 66], [-162, 70], [-140, 70], [-120, 74], [-95, 72], [-80, 73], [-62, 66], [-55, 52], [-66, 45], [-75, 38], [-81, 31], [-80, 25], [-90, 29], [-97, 26], [-97, 20], [-87, 21], [-83, 10], [-78, 8], [-85, 12], [-92, 15], [-105, 20], [-112, 29], [-117, 32], [-124, 40], [-124, 48], [-133, 55], [-150, 59], [-165, 60]],
  // Greenland
  [[-55, 60], [-44, 60], [-20, 70], [-20, 78], [-60, 78], [-70, 76], [-55, 68]],
  // South America
  [[-78, 8], [-60, 10], [-50, 0], [-35, -5], [-38, -13], [-48, -25], [-58, -35], [-65, -42], [-68, -52], [-74, -50], [-72, -35], [-70, -18], [-81, -5], [-80, 2]],
  // Europe
  [[-10, 36], [-9, 43], [-2, 44], [-5, 48], [2, 51], [8, 54], [8, 57], [5, 62], [14, 68], [25, 71], [40, 68], [45, 60], [40, 48], [30, 45], [28, 41], [22, 37], [15, 38], [12, 44], [5, 43], [-2, 36]],
  // Great Britain & Ireland
  [[-6, 50], [2, 51], [0, 54], [-3, 59], [-6, 57]],
  [[-10, 52], [-6, 52], [-6, 55], [-10, 54]],
  // Africa
  [[-17, 21], [-10, 30], [-6, 36], [10, 37], [32, 31], [34, 28], [43, 12], [51, 12], [40, -5], [40, -15], [35, -25], [20, -35], [17, -29], [12, -18], [13, -6], [9, 4], [-8, 4], [-17, 14]],
  // Madagascar
  [[44, -13], [50, -15], [47, -25], [44, -22]],
  // Asia
  [[28, 41], [36, 36], [35, 30], [44, 13], [55, 17], [57, 24], [65, 25], [72, 20], [77, 8], [80, 15], [88, 22], [92, 22], [98, 15], [100, 3], [104, 1], [104, 10], [109, 12], [106, 20], [110, 21], [117, 23], [122, 30], [120, 38], [126, 38], [129, 35], [130, 42], [141, 47], [143, 53], [135, 55], [156, 61], [163, 60], [178, 65], [180, 69], [140, 72], [110, 77], [80, 73], [68, 69], [60, 69], [45, 68], [40, 68], [45, 60], [40, 48], [30, 45]],
  // Japan
  [[130, 31], [135, 34], [140, 35], [142, 40], [141, 45], [145, 44], [140, 41], [136, 36], [131, 34]],
  // Borneo, Sumatra, New Guinea
  [[109, 1], [117, 7], [119, 1], [116, -4], [110, -3]],
  [[95, 5], [104, -6], [106, -6], [98, 2]],
  [[131, -1], [141, -3], [150, -10], [141, -9], [132, -4]],
  // Australia, New Zealand
  [[114, -22], [122, -18], [130, -12], [137, -12], [142, -11], [146, -19], [153, -25], [150, -37], [141, -38], [131, -31], [115, -34]],
  [[172, -34], [178, -38], [174, -42], [167, -46], [170, -41]],
];

function inside(lon: number, lat: number, poly: Poly) {
  let hit = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) hit = !hit;
  }
  return hit;
}

const STEP = 3.2;
const DOTS: { x: number; y: number }[] = [];
for (let lat = LAT_TOP - STEP / 2; lat > LAT_BOTTOM; lat -= STEP) {
  for (let lon = -180 + STEP / 2; lon < 180; lon += STEP) {
    if (LAND.some((p) => inside(lon, lat, p))) DOTS.push(project(lon, lat));
  }
}

/** Label nudges for clustered cities (percent of map box). */
const LABEL_SIDE: Record<string, "left" | "right"> = {
  hcmc: "right",
  hanoi: "left",
  "silicon-valley": "left",
  texas: "right",
  tokyo: "right",
  melbourne: "right",
  geneve: "right",
};

type NetworkMapProps = {
  offices: Office[];
  /** Accessible label (dict.common.a11y.mapLabel). */
  label: string;
  /** Show the HTML city labels on md+ (default true). */
  labels?: boolean;
  className?: string;
};

export function NetworkMap({ offices, label, labels = true, className }: NetworkMapProps) {
  const hq = offices.find((o) => o.hq) ?? offices[0];
  const h = project(hq.lon, hq.lat);
  const points = offices.map((o) => ({ ...o, ...project(o.lon, o.lat) }));

  return (
    <figure className={cn("relative", className)}>
      <div className="relative w-full" style={{ aspectRatio: `${W} / ${H}` }}>
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label} className="absolute inset-0 h-full w-full overflow-visible">
          <title>{label}</title>
          <style>{`
            .nm-arc{stroke-dasharray:4 7;animation:nm-flow 2.6s linear infinite}
            .nm-pulse{transform-box:fill-box;transform-origin:center;animation:nm-pulse 2.4s cubic-bezier(.16,1,.3,1) infinite}
            @keyframes nm-flow{to{stroke-dashoffset:-44}}
            @keyframes nm-pulse{0%{opacity:.7;transform:scale(1)}100%{opacity:0;transform:scale(4)}}
            @media (prefers-reduced-motion: reduce){.nm-arc,.nm-pulse{animation:none}.nm-pulse{opacity:0}}
          `}</style>
          <g fill="currentColor" className="text-fg-dim" opacity="0.55">
            {DOTS.map((d, i) => (
              <circle key={i} cx={d.x.toFixed(1)} cy={d.y.toFixed(1)} r={1.6} />
            ))}
          </g>
          <g fill="none" stroke="var(--ember)" strokeWidth={1.1} strokeLinecap="round">
            {points
              .filter((p) => p.id !== hq.id)
              .map((p, i) => {
                const mx = (h.x + p.x) / 2;
                const dist = Math.hypot(p.x - h.x, p.y - h.y);
                const my = Math.min(h.y, p.y) - dist * 0.28;
                return <path key={p.id} d={`M${h.x} ${h.y} Q${mx} ${my} ${p.x} ${p.y}`} className="nm-arc" opacity={0.75} style={{ animationDelay: `${i * -0.35}s` }} />;
              })}
          </g>
          {points.map((p) => (
            <g key={p.id}>
              {p.hq && <circle cx={p.x} cy={p.y} r={5} fill="var(--ember)" className="nm-pulse" />}
              <circle cx={p.x} cy={p.y} r={p.hq ? 5 : 3.4} fill={p.hq ? "var(--ember)" : "var(--bg)"} stroke="var(--ember)" strokeWidth={1.5} />
            </g>
          ))}
        </svg>
        {labels && (
          <ul aria-hidden className="pointer-events-none absolute inset-0 hidden md:block">
            {points.map((p) => {
              const side = LABEL_SIDE[p.id] ?? "right";
              return (
                <li
                  key={p.id}
                  className={cn(
                    "absolute -translate-y-1/2 whitespace-nowrap font-mono text-[10.5px] uppercase tracking-[0.12em]",
                    p.hq ? "text-fg" : "text-fg-muted",
                    side === "left" ? "-translate-x-full pr-3" : "pl-3",
                  )}
                  style={{ left: `${(p.x / W) * 100}%`, top: `${(p.y / H) * 100}%` }}
                >
                  {p.city}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </figure>
  );
}
