import { NextResponse } from "next/server";
import { emailConfig, linkBase } from "@/lib/email/config";
import { addContact } from "@/lib/email/resend";
import { readToken } from "@/lib/newsletter-token";
import { clientIp, rateLimiter } from "@/lib/rate-limit";
import type { Locale } from "@/content/schema";

/**
 * The link in the confirmation email. Adds the reader to the Resend segment for their
 * locale, then lands on /{locale}/insights?subscribed=yes|expired|error#newsletter, where
 * the newsletter band shows the result.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const limited = rateLimiter({ limit: 20, windowMs: 60_000 });

export async function GET(req: Request) {
  const back = (state: "yes" | "expired" | "error", locale: Locale = "en") =>
    NextResponse.redirect(`${linkBase(req)}/${locale}/insights?subscribed=${state}#newsletter`, 303);

  if (limited(clientIp(req))) return back("error");
  const secret = emailConfig.newsletter.secret;
  if (!secret) return back("error");
  const token = new URL(req.url).searchParams.get("token") ?? "";
  const r = readToken(token, secret);
  if (!r.ok) return back(r.reason === "expired" ? "expired" : "error");

  const result = await addContact(r.email, emailConfig.newsletter.segment(r.locale));
  return back(result === "failed" ? "error" : "yes", r.locale);
}
