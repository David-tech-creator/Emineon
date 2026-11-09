import { createHmac, timingSafeEqual } from "node:crypto";
import type { Locale } from "@/content/schema";
import { isLocale } from "@/lib/i18n";

/**
 * Double opt-in for the newsletter. The confirmation link carries the email, the reader's
 * locale and an expiry, signed with NEWSLETTER_SECRET, so nothing is stored until the reader
 * clicks it. Server only.
 */
export const TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;

const sign = (payload: string, secret: string) => createHmac("sha256", secret).update(payload).digest("base64url");

export function makeToken(email: string, locale: Locale, secret: string, now = Date.now()): string {
  const payload = Buffer.from(JSON.stringify({ e: email, l: locale, x: now + TOKEN_TTL_MS })).toString("base64url");
  return `${payload}.${sign(payload, secret)}`;
}

export type TokenResult = { ok: true; email: string; locale: Locale } | { ok: false; reason: "invalid" | "expired" };

/** The email and locale in a valid token; why not otherwise. */
export function readToken(token: string, secret: string, now = Date.now()): TokenResult {
  const [payload, sig, extra] = token.split(".");
  if (!payload || !sig || extra !== undefined) return { ok: false, reason: "invalid" };
  const want = Buffer.from(sign(payload, secret));
  const got = Buffer.from(sig);
  if (want.length !== got.length || !timingSafeEqual(want, got)) return { ok: false, reason: "invalid" };
  try {
    const { e, l, x } = JSON.parse(Buffer.from(payload, "base64url").toString());
    if (typeof e !== "string" || typeof x !== "number") return { ok: false, reason: "invalid" };
    if (x <= now) return { ok: false, reason: "expired" };
    return { ok: true, email: e, locale: isLocale(l) ? l : "en" };
  } catch {
    return { ok: false, reason: "invalid" };
  }
}
