"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";
import { mulberry32 } from "./oak";

export type GraphFieldVariant = "dome" | "wave" | "network";

export interface GraphFieldProps {
  /**
   * dome: dot sphere-cap seen in perspective (the report-cover look).
   * wave: a rolling dot plane. network: drifting nodes joined by fine edges.
   */
  variant?: GraphFieldVariant;
  /** 0.25..2, scales the dot count (default 1: a few hundred to ~1.4k dots). */
  density?: number;
  /** Ember pulse fronts crossing the field (default true). */
  pulses?: boolean;
  /** Grainy ember/graphite/steel gradient behind the dots (default false: transparent). */
  backdrop?: boolean;
  /** Where the form sits: 0..1 of width/height (default centre-bottom for dome/wave). */
  focus?: [number, number];
  seed?: number;
  className?: string;
}

/**
 * Lightweight 2D-canvas node field for section backgrounds (no three.js).
 * Dots take the element's CSS `color` (so `text-ash`, or bone vs. ink inside
 * tone-bone sections). Decorative: aria-hidden, pointer-events none. Pauses
 * offscreen and when the tab is hidden; reduced motion draws a single frame.
 * Fills its positioned parent (absolute inset-0).
 */
export function GraphField({
  variant = "dome",
  density = 1,
  pulses = true,
  backdrop = false,
  focus,
  seed = 7,
  className,
}: GraphFieldProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const fxProp = focus?.[0];
  const fyProp = focus?.[1];
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rng = mulberry32(seed);

    // ---- model (3D points around the origin)
    const pts: number[] = []; // x,y,z
    const edges: number[] = []; // i,j
    const d = Math.max(0.25, Math.min(2, density));
    if (variant === "dome") {
      const R = 1;
      const rings = Math.round(20 * Math.sqrt(d));
      for (let k = 0; k <= rings; k++) {
        const th = (k / rings) * (Math.PI * 0.48);
        const rho = Math.sin(th) * R;
        const n = k === 0 ? 1 : Math.max(6, Math.round((2 * Math.PI * rho) / ((Math.PI * 0.48) / rings)));
        for (let j = 0; j < n; j++) {
          const a = ((j + (k % 2) * 0.5) / n) * Math.PI * 2;
          pts.push(Math.cos(a) * rho, Math.cos(th) * R - R * 0.55, Math.sin(a) * rho);
        }
      }
    } else if (variant === "wave") {
      const n = Math.round(34 * Math.sqrt(d));
      for (let i = 0; i < n; i++)
        for (let j = 0; j < n; j++) pts.push((i / (n - 1)) * 2.6 - 1.3, 0, (j / (n - 1)) * 2.6 - 1.3);
    } else {
      // jittered grid -> even spacing; each node links to its 2 nearest (capped length)
      const cols = Math.round(16 * Math.sqrt(d));
      const rows = Math.round(7 * Math.sqrt(d));
      for (let i = 0; i < cols; i++)
        for (let j = 0; j < rows; j++)
          pts.push(
            ((i + 0.5 + (rng() - 0.5) * 0.8) / cols) * 2.6 - 1.3,
            ((j + 0.5 + (rng() - 0.5) * 0.8) / rows) * 1.2 - 0.6,
            (rng() - 0.5) * 0.5,
          );
      const n = pts.length / 3;
      const cap = (2.6 / cols) * 1.7;
      for (let i = 0; i < n; i++) {
        const best: [number, number][] = [];
        for (let j = 0; j < n; j++) {
          if (i === j) continue;
          const dx = pts[i * 3] - pts[j * 3], dy = pts[i * 3 + 1] - pts[j * 3 + 1], dz = pts[i * 3 + 2] - pts[j * 3 + 2];
          best.push([dx * dx + dy * dy + dz * dz, j]);
        }
        best.sort((a, b) => a[0] - b[0]);
        for (const [dd, j] of best.slice(0, 2)) if (i < j && Math.sqrt(dd) < cap) edges.push(i, j);
      }
    }
    const count = pts.length / 3;
    const rand = new Float32Array(count).map(() => rng());
    const sx = new Float32Array(count), sy = new Float32Array(count), sr = new Float32Array(count), sa = new Float32Array(count), sp = new Float32Array(count);

    // ---- grain tile for the backdrop
    let grain: HTMLCanvasElement | null = null;
    if (backdrop) {
      grain = document.createElement("canvas");
      grain.width = grain.height = 160;
      const g = grain.getContext("2d")!;
      const img = g.createImageData(160, 160);
      for (let i = 0; i < img.data.length; i += 4) {
        const v = rng() * 255;
        img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
        img.data[i + 3] = 34;
      }
      g.putImageData(img, 0, 0);
    }

    let w = 0, h = 0, dpr = 1;
    let color = "237,234,227";
    const ember = "255,91,31";
    const resize = () => {
      const r = wrap.getBoundingClientRect();
      dpr = Math.min(1.75, window.devicePixelRatio || 1);
      w = Math.max(1, r.width);
      h = Math.max(1, r.height);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      const m = getComputedStyle(wrap).color.match(/[\d.]+/g);
      if (m) color = `${m[0]},${m[1]},${m[2]}`;
    };
    resize();

    const fx = fxProp ?? 0.5;
    const fy = fyProp ?? (variant === "network" ? 0.5 : variant === "dome" ? 0.78 : 0.72);

    const draw = (time: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      if (backdrop) {
        const g1 = ctx.createRadialGradient(w * fx, h * (fy - 0.35), 0, w * fx, h * (fy - 0.35), Math.max(w, h) * 0.75);
        g1.addColorStop(0, "rgba(199,91,18,0.55)");
        g1.addColorStop(0.45, "rgba(60,32,20,0.35)");
        g1.addColorStop(1, "rgba(7,8,10,0)");
        ctx.fillStyle = "#0d0f12";
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = g1;
        ctx.fillRect(0, 0, w, h);
        const g2 = ctx.createRadialGradient(w * 0.08, h, 0, w * 0.08, h, Math.max(w, h) * 0.6);
        g2.addColorStop(0, "rgba(111,134,168,0.28)");
        g2.addColorStop(1, "rgba(111,134,168,0)");
        ctx.fillStyle = g2;
        ctx.fillRect(0, 0, w, h);
        if (grain) {
          const pat = ctx.createPattern(grain, "repeat");
          if (pat) {
            const o = Math.floor((time * 37) % 160);
            ctx.save();
            ctx.translate(-o, -((o * 7) % 160));
            ctx.fillStyle = pat;
            ctx.fillRect(0, 0, w + 160, h + 160);
            ctx.restore();
          }
        }
      }

      const t = time * 0.001;
      const rotY = variant === "network" ? t * 0.04 : t * 0.025;
      const tilt = variant === "dome" ? 0.42 : variant === "wave" ? 0.5 : 0.15;
      const cy = Math.cos(rotY), syy = Math.sin(rotY), ct = Math.cos(tilt), st = Math.sin(tilt);
      const scale = Math.min(w, h * 1.6) * (variant === "dome" ? 0.62 : 0.55);
      const camZ = 2.6;
      const dotK = Math.sqrt(Math.min(1, w / 1000)) * 0.55 + 0.45;
      const front = (t * 0.22) % 1.6; // pulse front radius in model units

      for (let i = 0; i < count; i++) {
        let x = pts[i * 3], y = pts[i * 3 + 1];
        const z = pts[i * 3 + 2];
        if (variant === "wave") y = 0.12 * Math.sin(x * 2.4 + t * 0.6) * Math.cos(z * 2.0 - t * 0.4);
        if (variant === "network") {
          x += 0.03 * Math.sin(t * 0.3 + rand[i] * 20);
          y += 0.03 * Math.cos(t * 0.27 + rand[i] * 13);
        }
        const rx = x * cy - z * syy;
        const rz = x * syy + z * cy;
        const ry = y * ct - rz * st;
        const rz2 = y * st + rz * ct;
        const persp = camZ / (camZ + rz2);
        sx[i] = w * fx + rx * scale * persp;
        sy[i] = h * fy - ry * scale * persp;
        sr[i] = (0.6 + 1.2 * persp * persp) * (0.85 + rand[i] * 0.3) * dotK;
        sa[i] = Math.max(0, Math.min(1, (persp - 0.55) * 1.6)) * (0.35 + 0.65 * rand[i] * 0.4 + 0.4);
        if (pulses) {
          const r = Math.hypot(x, z);
          const dd = front - r;
          sp[i] = dd > 0 && dd < 0.35 ? Math.exp(-dd * 12) * (rand[i] > 0.55 ? 1 : 0.25) : 0;
        } else sp[i] = 0;
      }

      if (edges.length) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = `rgba(${color},0.1)`;
        ctx.beginPath();
        for (let e = 0; e < edges.length; e += 2) {
          ctx.moveTo(sx[edges[e]], sy[edges[e]]);
          ctx.lineTo(sx[edges[e + 1]], sy[edges[e + 1]]);
        }
        ctx.stroke();
      }

      // dots in 4 alpha buckets -> 4 fills
      for (let b = 0; b < 4; b++) {
        const lo = b / 4, hi = (b + 1) / 4;
        ctx.fillStyle = `rgba(${color},${(lo + hi) / 2})`;
        ctx.beginPath();
        for (let i = 0; i < count; i++) {
          if (sa[i] < lo || sa[i] >= hi || sa[i] <= 0.02 || sp[i] > 0.15) continue;
          ctx.moveTo(sx[i] + sr[i], sy[i]);
          ctx.arc(sx[i], sy[i], sr[i], 0, Math.PI * 2);
        }
        ctx.fill();
      }
      if (pulses) {
        for (let i = 0; i < count; i++) {
          if (sp[i] <= 0.15) continue;
          ctx.fillStyle = `rgba(${ember},${Math.min(1, sp[i])})`;
          ctx.beginPath();
          ctx.arc(sx[i], sy[i], sr[i] * (1 + sp[i] * 0.6), 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    let raf = 0;
    let running = false;
    let visible = false;
    let last = 0;
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (now - last < 1000 / 40) return; // 40fps is plenty for ambient motion
      last = now;
      draw(now);
    };
    const update = () => {
      const should = visible && document.visibilityState !== "hidden" && !reduce;
      if (should && !running) {
        running = true;
        raf = requestAnimationFrame(loop);
      } else if (!should && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    };
    draw(reduce ? 4000 : performance.now());

    const ro = new ResizeObserver(() => {
      resize();
      draw(reduce ? 4000 : performance.now());
    });
    ro.observe(wrap);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      update();
    });
    io.observe(wrap);
    document.addEventListener("visibilitychange", update);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, [variant, density, pulses, backdrop, fxProp, fyProp, seed]);

  return (
    <div ref={wrapRef} aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden text-fg", className)}>
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}

export default GraphField;
