import { NextResponse } from "next/server";
import { getDictionary } from "@/content";
import { contactSchema, fieldErrors } from "@/components/sections/pages/contact/schema";
import { emailConfig } from "@/lib/email/config";
import { sendEmail } from "@/lib/email/resend";
import { contactNotificationEmail, contactReceiptEmail } from "@/lib/email/templates";
import { clientIp, rateLimiter } from "@/lib/rate-limit";
import { SITE_URL } from "@/lib/site";

/**
 * Contact form → Resend. A notification goes to CONTACT_TO (David's mailbox) with the
 * sender as reply-to, and, unless CONTACT_CONFIRMATION=false, a short localised receipt
 * goes to the sender. A structured log line is always written, so a message is never lost
 * even when mail is down. Without RESEND_API_KEY it runs dry and logs instead of sending.
 *
 * Answers: 200 { ok, delivery } · 400 invalid_json · 422 { error: "validation", fields } · 429 rate_limited · 502 send_failed
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** 5 messages per 10 minutes per IP (per server instance). */
const limited = rateLimiter({ limit: 5, windowMs: 10 * 60_000 });

const TOPIC_LABEL: Record<string, string> = Object.fromEntries(getDictionary("en").common.form.topics.map((t) => [t.value, t.label]));

export async function POST(req: Request) {
  if (limited(clientIp(req))) return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: pretend success so bots learn nothing.
  if (body && typeof body === "object" && "website" in body && String((body as { website?: unknown }).website ?? "").length > 0) {
    return NextResponse.json({ ok: true });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "validation", fields: fieldErrors(parsed.error) }, { status: 422 });
  }
  const d = parsed.data;
  const topic = TOPIC_LABEL[d.topic] ?? d.topic;
  const fields: [string, string][] = [
    ["Name", d.name],
    ["Email", d.email],
    ["Company", d.company || "-"],
    ["Topic", topic],
    ["Language", d.locale.toUpperCase()],
  ];
  const received = new Date().toISOString();
  // Greppable in Vercel logs, so nothing is lost if email delivery fails.
  console.log("[contact] LEAD", JSON.stringify({ name: d.name, email: d.email, company: d.company, topic: d.topic, locale: d.locale, received }));

  const note = contactNotificationEmail(fields, d.message, `Received ${received} via ${SITE_URL}/${d.locale}/contact`);
  const delivery = await sendEmail({
    from: emailConfig.contact.from,
    to: [emailConfig.contact.to],
    replyTo: d.email,
    subject: `[emineon.com] ${topic} · ${d.name}${d.company ? ` (${d.company})` : ""}`,
    ...note,
    tags: [{ name: "kind", value: "contact" }],
  });
  if (delivery === "failed") return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });

  if (emailConfig.contact.confirmation) {
    const receipt = contactReceiptEmail(getDictionary(d.locale), { name: d.name });
    // Best effort: the message already reached us, so a failed receipt is only logged.
    await sendEmail({
      from: emailConfig.contact.confirmationFrom,
      to: [d.email],
      replyTo: emailConfig.contact.replyTo,
      ...receipt,
      tags: [{ name: "kind", value: "contact-receipt" }],
    });
  }

  return NextResponse.json({ ok: true, delivery });
}
