"use client";

/**
 * The WebGL part of the hero (three + R3F + postprocessing). Never import this
 * directly: OakGraphHero loads it lazily with next/dynamic({ ssr: false }).
 */

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import * as THREE from "three";
import { buildOakGraph, type OakQuality } from "./oak";
import { lowerTier, TIERS } from "./quality";
import {
  backdropFragment,
  backdropVertex,
  linesFragment,
  linesVertex,
  pointsFragment,
  pointsVertex,
} from "./shaders";

export interface OakGraphCanvasProps {
  quality: OakQuality;
  /** Read every frame (0..1). */
  progressRef: RefObject<number>;
  /** Normalised pointer (-1..1), read every frame. */
  pointerRef: RefObject<[number, number]>;
  /** Render loop runs only while true (in view + tab visible). */
  active: boolean;
  align: "center" | "right";
  seed?: number;
  /** Logs fps to the console every 2s and exposes window.__oakGraph (lab only). */
  debug?: boolean;
  onReady?: () => void;
}

const COLORS = {
  void: new THREE.Color("#0A0B0D"),
  graphite: new THREE.Color("#262A31"),
  warm: new THREE.Color("#2E231D"),
  steelLight: new THREE.Color("#9DB8FF"),
  haze: new THREE.Color("#BEBAB2"),
  bone: new THREE.Color("#EDEAE3"),
  ash: new THREE.Color("#9A978F"),
  ember: new THREE.Color("#FF5B1F"),
  emberDeep: new THREE.Color("#C75B12"),
  steel: new THREE.Color("#6F86A8"),
};

const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/* ------------------------------------------------------------- backdrop -- */

function Backdrop({ uniforms }: { uniforms: Record<string, THREE.IUniform> }) {
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 3));
    return g;
  }, []);
  return (
    <mesh geometry={geo} frustumCulled={false} renderOrder={-10}>
      <shaderMaterial
        vertexShader={backdropVertex}
        fragmentShader={backdropFragment}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ----------------------------------------------------------------- tick -- */

interface FrameState { time: number; p: number; px: number; py: number; rot: number; ready: boolean; frames: number; acc: number }
interface TickEnv {
  s: FrameState;
  shared: Record<"uTime" | "uDissolve" | "uReveal", THREE.IUniform<number>>;
  data: ReturnType<typeof buildOakGraph>;
  progressRef: RefObject<number>;
  pointerRef: RefObject<[number, number]>;
  group: THREE.Group | null;
  camera: THREE.Camera;
  size: { width: number; height: number };
  gl: THREE.WebGLRenderer;
  align: "center" | "right";
  pointsMat: THREE.ShaderMaterial;
  linesMat: THREE.ShaderMaterial;
  backdropUniforms: Record<string, THREE.IUniform>;
  quality: OakQuality;
  debug?: boolean;
  onReady?: () => void;
}

/** Per-frame update (module scope: mutates three objects, outside React's render model). */
function tick(env: TickEnv, rawDelta: number) {
  const { s, shared, data, progressRef, pointerRef, group, camera, size, gl, align, pointsMat, linesMat, backdropUniforms, quality, debug, onReady } = env;
  const dt = Math.min(rawDelta, 1 / 20);
  s.time += dt;
  shared.uTime.value = s.time;

  // reveal: lattice -> roots -> trunk -> canopy over ~3.6s
  const span = data.gMax - data.gMin + 4;
  shared.uReveal.value = data.gMin - 2 + Math.min(1, s.time / 3.6) ** 0.8 * span;

  // scroll progress, damped
  const target = Math.min(1, Math.max(0, progressRef.current ?? 0));
  s.p += (target - s.p) * (1 - Math.exp(-dt * 5));
  const e = smoothstep(0, 1, s.p);
  shared.uDissolve.value = smoothstep(0.32, 1, s.p);

  // pointer parallax, damped
  const ptr = pointerRef.current ?? [0, 0];
  s.px += (ptr[0] - s.px) * (1 - Math.exp(-dt * 2.2));
  s.py += (ptr[1] - s.py) * (1 - Math.exp(-dt * 2.2));

  // slow rotation (a touch faster as it dissolves)
  s.rot += dt * (0.035 + 0.04 * shared.uDissolve.value);
  if (group) group.rotation.y = s.rot;

  // camera: rises from the roots to the canopy
  const cam = camera as THREE.PerspectiveCamera;
  const aspect = size.width / Math.max(1, size.height);
  const fit = Math.min(1.9, Math.max(1, 1.45 / aspect));
  const portrait = 1 - Math.min(1, aspect);
  const dist = (24.5 - 12 * e) * fit;
  const y = 3.6 + 7.8 * e;
  const look = 3.9 + 3.8 * e - 9 * portrait * (1 - e);
  cam.position.set(s.px * 1.1 * fit, y + s.py * 0.55, dist);
  cam.lookAt(0, look, 0);
  const offset = align === "right" && aspect > 1.15 ? -Math.min(0.36, (aspect - 1.15) * 0.5) : 0;
  if (cam.filmOffset !== offset * cam.getFilmWidth()) {
    cam.filmOffset = offset * cam.getFilmWidth();
    cam.updateProjectionMatrix();
  }

  // dot scale: world size -> pixels
  pointsMat.uniforms.uScale.value = (size.height * 0.5) / Math.tan(THREE.MathUtils.degToRad(cam.fov) / 2);
  pointsMat.uniforms.uPixelRatio.value = gl.getPixelRatio();
  // 1px lines get thinner on dense screens: compensate a little with brightness
  linesMat.uniforms.uLineGain.value = 1 + (gl.getPixelRatio() - 1) * 0.7;

  backdropUniforms.uRes.value.set(size.width, size.height);
  backdropUniforms.uFocus.value.set(0.5 - offset * 0.5, 0.56);
  backdropUniforms.uProgress.value = e;

  if (!s.ready) {
    s.ready = true;
    onReady?.();
  }
  if (debug) {
    s.frames++;
    s.acc += rawDelta;
    if (s.acc >= 2) {
      const fps = Math.round(s.frames / s.acc);
      const w = window as unknown as { __oakGraph?: object };
      w.__oakGraph = { fps, quality, dpr: gl.getPixelRatio(), ...data.stats, calls: gl.info.render.calls };
      console.info(`[oak-graph] ${fps} fps · ${quality} · dpr ${gl.getPixelRatio().toFixed(2)} · ${data.stats.dots} dots · ${data.stats.segments} segments`);
      s.frames = 0;
      s.acc = 0;
    }
  }
}

/* ---------------------------------------------------------------- graph -- */

function Graph({
  quality,
  seed,
  progressRef,
  pointerRef,
  align,
  debug,
  onReady,
  grain,
}: Omit<OakGraphCanvasProps, "active"> & { seed: number; grain: number }) {
  const data = useMemo(() => buildOakGraph(quality, seed), [quality, seed]);
  const { camera, size, gl } = useThree();
  const group = useRef<THREE.Group>(null);

  const shared = useMemo(
    () => ({
      uTime: { value: 0 },
      uSpeed: { value: 2.1 },
      uPeriod: { value: 6.5 },
      uDensity: { value: 0.2 },
      uDissolve: { value: 0 },
      uReveal: { value: -20 },
    }),
    [],
  );

  const pointsMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: pointsVertex,
        fragmentShader: pointsFragment,
        uniforms: {
          ...shared,
          uScale: { value: 400 },
          uPixelRatio: { value: 1 },
          uBone: { value: COLORS.bone },
          uAsh: { value: COLORS.ash },
          uEmber: { value: COLORS.ember },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [shared],
  );
  const linesMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: linesVertex,
        fragmentShader: linesFragment,
        uniforms: { ...shared, uLineGain: { value: 1 }, uBone: { value: COLORS.bone }, uEmber: { value: COLORS.ember } },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [shared],
  );
  const backdropUniforms = useMemo(
    () => ({
      uTime: shared.uTime,
      uRes: { value: new THREE.Vector2(1, 1) },
      uFocus: { value: new THREE.Vector2(0.5, 0.55) },
      uProgress: { value: 0 },
      uGrain: { value: grain },
      uVoid: { value: COLORS.void },
      uGraphite: { value: COLORS.graphite },
      uWarm: { value: COLORS.warm },
      uEmber: { value: COLORS.ember },
      uEmberDeep: { value: COLORS.emberDeep },
      uSteel: { value: COLORS.steel },
      uSteelLight: { value: COLORS.steelLight },
      uHaze: { value: COLORS.haze },
    }),
    [shared, grain],
  );

  const pointsGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(data.points, 3));
    g.setAttribute("aG", new THREE.BufferAttribute(data.pointG, 1));
    g.setAttribute("aLane", new THREE.BufferAttribute(data.pointLane, 1));
    g.setAttribute("aSize", new THREE.BufferAttribute(data.pointSize, 1));
    g.setAttribute("aKind", new THREE.BufferAttribute(data.pointKind, 1));
    g.setAttribute("aRand", new THREE.BufferAttribute(data.pointRand, 1));
    g.setAttribute("aScatter", new THREE.BufferAttribute(data.pointScatter, 3));
    return g;
  }, [data]);
  const linesGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(data.lines, 3));
    g.setAttribute("aG", new THREE.BufferAttribute(data.lineG, 1));
    g.setAttribute("aLane", new THREE.BufferAttribute(data.lineLane, 1));
    g.setAttribute("aAlpha", new THREE.BufferAttribute(data.lineAlpha, 1));
    g.setAttribute("aKeep", new THREE.BufferAttribute(data.lineKeep, 1));
    g.setAttribute("aScatter", new THREE.BufferAttribute(data.lineScatter, 3));
    return g;
  }, [data]);

  useEffect(
    () => () => {
      pointsGeo.dispose();
      linesGeo.dispose();
    },
    [pointsGeo, linesGeo],
  );
  useEffect(
    () => () => {
      pointsMat.dispose();
      linesMat.dispose();
    },
    [pointsMat, linesMat],
  );

  const state = useRef({ time: 0, p: 0, px: 0, py: 0, rot: 0.35, ready: false, frames: 0, acc: 0 });

  useFrame((_, rawDelta) =>
    tick(
      {
        s: state.current,
        shared,
        data,
        progressRef,
        pointerRef,
        group: group.current,
        camera,
        size,
        gl,
        align,
        pointsMat,
        linesMat,
        backdropUniforms,
        quality,
        debug,
        onReady,
      },
      rawDelta,
    ),
  );

  return (
    <>
      <Backdrop uniforms={backdropUniforms} />
      <group ref={group}>
        <lineSegments geometry={linesGeo} material={linesMat} frustumCulled={false} />
        <points geometry={pointsGeo} material={pointsMat} frustumCulled={false} />
      </group>
    </>
  );
}

/* --------------------------------------------------------------- canvas -- */

export default function OakGraphCanvas(props: OakGraphCanvasProps) {
  const { quality: initial, active, seed = 77 } = props;
  const [quality, setQuality] = useState<OakQuality>(initial);
  const tier = TIERS[quality];
  const [dpr, setDpr] = useState(() =>
    Math.min(tier.dpr[1], Math.max(tier.dpr[0], typeof window !== "undefined" ? window.devicePixelRatio : 1)),
  );
  const [bloom, setBloom] = useState(tier.bloom);
  const declines = useRef(0);

  return (
    <Canvas
      aria-hidden
      role="presentation"
      flat
      dpr={dpr}
      frameloop={active ? "always" : "never"}
      gl={{ antialias: false, alpha: false, powerPreference: "high-performance", stencil: false, depth: false }}
      camera={{ fov: 34, near: 0.1, far: 120, position: [0, 1.2, 18.5] }}
      style={{ position: "absolute", inset: 0 }}
    >
      <PerformanceMonitor
        flipflops={3}
        onDecline={() => {
          declines.current++;
          // first drop the bloom, then the resolution, then the node count
          if (bloom) setBloom(false);
          else if (dpr > 1.01) setDpr((d) => Math.max(1, d - 0.25));
          else if (quality !== "low") setQuality((q) => lowerTier(q));
        }}
      />
      <Graph {...props} quality={quality} seed={seed} grain={tier.grain} />
      {bloom ? (
        <EffectComposer multisampling={0} enableNormalPass={false}>
          <Bloom mipmapBlur intensity={0.55} luminanceThreshold={0.62} luminanceSmoothing={0.2} radius={0.55} />
        </EffectComposer>
      ) : (
        <></>
      )}
    </Canvas>
  );
}
