/**
 * GLSL for the Oak Graph. Colours arrive as linear uniforms; fragment shaders end
 * with <colorspace_fragment> so output is correct with and without the composer.
 */

const pulseFn = /* glsl */ `
  uniform float uTime;
  uniform float uSpeed;
  uniform float uPeriod;
  uniform float uDensity;
  float hash11(float n) { return fract(sin(n * 12.9898) * 43758.5453); }
  // Ember fronts travelling along increasing g (roots -> canopy), only on some lanes.
  float pulseAt(float g, float lane) {
    float ph = (uTime * uSpeed - g) / uPeriod;
    float idx = floor(ph);
    float f = fract(ph);
    float on = step(hash11(idx * 7.13 + floor(lane * 997.0) * 0.61), uDensity);
    float head = smoothstep(0.0, 0.012, f) * exp(-f * 16.0);
    return on * head;
  }
`;

export const pointsVertex = /* glsl */ `
  ${pulseFn}
  uniform float uDissolve;
  uniform float uReveal;
  uniform float uScale;
  uniform float uPixelRatio;
  attribute float aG;
  attribute float aLane;
  attribute float aSize;
  attribute float aKind;
  attribute float aRand;
  attribute vec3 aScatter;
  varying float vPulse;
  varying float vAlpha;
  varying float vKind;
  varying float vPx;

  void main() {
    float ds = uDissolve * uDissolve * (3.0 - 2.0 * uDissolve);
    vec3 p = position + aScatter * ds;
    // constellation drift
    p += aScatter * 0.05 * sin(uTime * 0.35 + aRand * 6.2831) * uDissolve;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;

    float pulse = pulseAt(aG, aLane);
    vPulse = pulse;
    vKind = aKind;

    // grow-in from the lattice up into the canopy
    float rv = smoothstep(aG - 2.5, aG, uReveal);

    float twinkle = 0.85 + 0.15 * sin(uTime * (0.6 + aRand) + aRand * 40.0);
    float depth = -mv.z;
    float px = aSize * uScale / depth * (1.0 + pulse * 1.4) * mix(1.0, 1.15, uDissolve);
    px = clamp(px, aKind > 1.5 ? 0.0 : 1.25, 5.5) * rv;
    vPx = px;
    gl_PointSize = max(px, 0.0) * uPixelRatio;

    float a = (aKind > 1.5 ? 0.55 : (aKind > 0.5 ? 0.72 : 0.9)) * twinkle;
    // lattice fades into the void at its rim and with depth
    if (aKind > 1.5) a *= smoothstep(11.5, 5.0, length(position.xz));
    a *= smoothstep(48.0, 14.0, depth);
    // sub-pixel dots fade instead of shimmering
    a *= smoothstep(0.4, 1.2, px);
    vAlpha = a * rv;
  }
`;

export const pointsFragment = /* glsl */ `
  uniform vec3 uBone;
  uniform vec3 uAsh;
  uniform vec3 uEmber;
  varying float vPulse;
  varying float vAlpha;
  varying float vKind;
  varying float vPx;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    // crisp round dot, ~1px antialiased edge
    float aa = 0.5 / max(vPx, 1.0);
    float core = 1.0 - smoothstep(0.5 - aa * 2.0, 0.5, d);
    if (core <= 0.0) discard;
    vec3 base = vKind > 1.5 ? mix(uAsh, uBone, 0.55) : (vKind > 0.5 ? mix(uAsh, uBone, 0.7) : uBone);
    vec3 col = mix(base, uEmber * 2.4, clamp(vPulse * 1.2, 0.0, 1.0));
    gl_FragColor = vec4(col * (vAlpha + vPulse * 0.9), 1.0) * core;
    #include <colorspace_fragment>
  }
`;

export const linesVertex = /* glsl */ `
  ${pulseFn}
  uniform float uDissolve;
  uniform float uReveal;
  uniform float uLineGain;
  attribute float aG;
  attribute float aLane;
  attribute float aAlpha;
  attribute float aKeep;
  attribute vec3 aScatter;
  varying float vPulse;
  varying float vAlpha;

  void main() {
    float ds = uDissolve * uDissolve * (3.0 - 2.0 * uDissolve);
    vec3 p = position + aScatter * ds;
    p += aScatter * 0.05 * sin(uTime * 0.35 + aLane * 6.2831) * uDissolve;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    vPulse = pulseAt(aG, aLane) * (1.0 - smoothstep(0.0, 0.3, uDissolve));
    float rv = smoothstep(aG - 1.5, aG, uReveal);
    // edges let go first, then a sparse set re-emerges as constellation lines
    float keep = mix(1.0 - smoothstep(0.0, 0.22, uDissolve), aKeep * 0.32, smoothstep(0.35, 0.8, uDissolve));
    vAlpha = aAlpha * uLineGain * rv * keep * smoothstep(48.0, 14.0, -mv.z);
  }
`;

export const linesFragment = /* glsl */ `
  uniform vec3 uBone;
  uniform vec3 uEmber;
  varying float vPulse;
  varying float vAlpha;
  void main() {
    vec3 col = mix(uBone * vAlpha, uEmber * 1.8, clamp(vPulse, 0.0, 1.0) * step(0.001, vAlpha));
    gl_FragColor = vec4(col, 1.0);
    #include <colorspace_fragment>
  }
`;

/**
 * Full-screen grainy gradient behind the graph, in the insight-cover style
 * (light-first re-theme): an ember/burnt-orange bloom behind the crown, warm
 * graphite through the middle, a cool steel-blue wash from the lower right, a
 * pale haze on the left, and a deep corner at the lower left so the bone
 * headline stays legible. Heavy analogue grain. Matches `.panel-gradient`
 * (globals.css), its static CSS twin used before the canvas fades in.
 */
export const backdropVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = position.xy * 0.5 + 0.5;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

export const backdropFragment = /* glsl */ `
  uniform float uTime;
  uniform vec2 uRes;
  uniform vec2 uFocus;     // tree centre in uv
  uniform float uProgress;
  uniform float uGrain;
  uniform vec3 uVoid;
  uniform vec3 uGraphite;
  uniform vec3 uWarm;
  uniform vec3 uEmber;
  uniform vec3 uEmberDeep;
  uniform vec3 uSteel;
  uniform vec3 uSteelLight;
  uniform vec3 uHaze;
  varying vec2 vUv;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
  }
  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; }
    return v;
  }

  void main() {
    float aspect = uRes.x / uRes.y;
    vec2 uv = vUv;
    vec2 a = vec2(aspect, 1.0);
    float t = uTime * 0.025;
    float n = fbm(uv * a * 1.3 + vec2(t, -t * 0.7));
    float n2 = fbm(uv * a * 2.1 - vec2(t * 0.6, t));

    // base: warm graphite (top-left) -> cool graphite (bottom-right)
    float diag = clamp(dot(uv - vec2(0.0, 1.0), vec2(0.62, -0.78)) * 0.9, 0.0, 1.0);
    vec3 col = mix(uWarm, uGraphite, diag);

    // ember bloom behind the crown; drifts down as the camera rises
    vec2 ep = vec2(uFocus.x + 0.14 + 0.03 * sin(t * 3.0), 0.9 - 0.22 * uProgress);
    float ed = length((uv - ep) * a * vec2(0.78, 1.1)) + (n - 0.5) * 0.42;
    float em = smoothstep(0.78, 0.0, ed);
    col = mix(col, uEmberDeep, em * 0.82);
    col = mix(col, uEmber, pow(em, 2.0) * 0.5);

    // cool steel from the lower right (supporting tone only)
    float sd = length((uv - vec2(1.02, -0.04)) * a * vec2(0.55, 1.0)) + (n2 - 0.5) * 0.45;
    float st = smoothstep(0.9, 0.0, sd);
    col = mix(col, uSteel, st * 0.8);
    col = mix(col, uSteelLight, pow(st, 2.4) * 0.35);

    // pale haze, left of centre
    float hz = smoothstep(0.5, 0.0, length((uv - vec2(0.24, 0.6)) * a * vec2(0.55, 1.0)) + (n - 0.5) * 0.3);
    col = mix(col, uHaze, hz * 0.2);

    // deep lower-left corner: the headline sits here
    float dk = smoothstep(0.95, 0.05, length(uv * a * vec2(0.42, 0.95)));
    col = mix(col, uVoid, dk * 0.86);

    // heavy analogue grain (animated, luminance-weighted)
    float g = hash(gl_FragCoord.xy + fract(uTime * 7.31) * 113.0) - 0.5;
    col += g * uGrain * (0.6 + dot(col, vec3(0.33)) * 2.2);
    gl_FragColor = vec4(max(col, 0.0), 1.0);
    #include <colorspace_fragment>
  }
`;
