/**
 * Per-instance, best-effort sliding-window throttle for the form endpoints. Serverless
 * instances do not share it, so it is a speed bump against naive spam, not a WAF.
 */
export function rateLimiter({ limit, windowMs }: { limit: number; windowMs: number }) {
  const hits = new Map<string, number[]>();
  return function limited(key: string, now = Date.now()): boolean {
    const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
    recent.push(now);
    hits.set(key, recent);
    if (hits.size > 5000) hits.clear();
    return recent.length > limit;
  };
}

/** The caller's IP as seen by Vercel (first x-forwarded-for hop). */
export function clientIp(req: Request): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}
