import { NextResponse } from "next/server";
import { z } from "zod";
import { getDictionary } from "@/content";
import { emailConfig, linkBase } from "@/lib/email/config";
import { sendEmail } from "@/lib/email/resend";
import { confirmEmail } from "@/lib/email/templates";
import { makeToken } from "@/lib/newsletter-token";
import { clientIp, rateLimiter } from "@/lib/rate-limit";

/**
 * Newsletter sign-up, double opt-in. Sends one confirmation email and stores nothing: the
 * reader becomes a Resend contact only by clicking the signed link (./confirm). Without
 * RESEND_API_KEY it runs dry and logs the email, link included.
 *
 * Answers: 200 { ok } · 422 { error: "invalid" } · 429 { error: "rate_limited" } · 502/503 { error: "failed" }
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const limited = rateLimiter({ limit: 5, windowMs: 60_000 });

const schema = z.object({
  email: z.string().trim().toLowerCase().max(254).regex(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/),
  locale: z.enum(["en", "fr", "de"]).optional().default("en"),
  /** Honeypot: people leave it empty. */
  website: z.string().optional(),
});

export async function POST(req: Request) {
  if (limited(clientIp(req))) return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });

  const body = await req.json().catch(() => null);
  // A filled honeypot gets a quiet success, so a bot learns nothing.
  if (body && typeof body === "object" && typeof (body as { website?: unknown }).website === "string" && (body as { website: string }).website) {
    return NextResponse.json({ ok: true });
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ ok: false, error: "invalid" }, { status: 422 });
  const { email, locale } = parsed.data;

  const secret = emailConfig.newsletter.secret;
  if (!secret) {
    console.error("[newsletter] NEWSLETTER_SECRET is not set");
    return NextResponse.json({ ok: false, error: "failed" }, { status: 503 });
  }

  const link = `${linkBase(req)}/api/newsletter/confirm?token=${encodeURIComponent(makeToken(email, locale, secret))}`;
  const mail = confirmEmail(getDictionary(locale), link);
  const delivery = await sendEmail({
    from: emailConfig.newsletter.from,
    to: [email],
    replyTo: emailConfig.newsletter.replyTo,
    ...mail,
    tags: [{ name: "kind", value: "newsletter-confirm" }],
  });
  if (delivery === "failed") return NextResponse.json({ ok: false, error: "failed" }, { status: 502 });
  return NextResponse.json({ ok: true, delivery });
}
