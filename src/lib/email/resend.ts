/**
 * The two Resend calls the site makes, over plain fetch (no SDK). In dry mode (no
 * RESEND_API_KEY) they log what they would have done and report "dry".
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { emailConfig } from "./config";

export type Mail = { from: string; to: string[]; replyTo?: string; subject: string; html: string; text: string; tags?: { name: string; value: string }[] };
export type Delivery = "sent" | "dry" | "failed";

const API = "https://api.resend.com";

async function call(path: string, body: unknown): Promise<Response> {
  return fetch(`${API}${path}`, {
    method: "POST",
    headers: { authorization: `Bearer ${emailConfig.apiKey}`, "content-type": "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(15_000),
  });
}

export async function sendEmail(mail: Mail): Promise<Delivery> {
  if (emailConfig.dry) {
    console.log(`[email:dry] from=${mail.from} to=${mail.to.join(",")} reply_to=${mail.replyTo ?? "-"} subject=${JSON.stringify(mail.subject)}\n${mail.text}`);
    // Local preview: EMAIL_DRY_DIR=/some/folder writes each email as an HTML file to open in a browser.
    const dir = process.env.EMAIL_DRY_DIR;
    if (dir) {
      try {
        mkdirSync(dir, { recursive: true });
        writeFileSync(join(dir, `${Date.now()}-${mail.subject.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 50)}.html`), mail.html);
      } catch (e) {
        console.error("[email:dry] could not write preview", (e as Error).message);
      }
    }
    return "dry";
  }
  try {
    const res = await call("/emails", { from: mail.from, to: mail.to, reply_to: mail.replyTo, subject: mail.subject, html: mail.html, text: mail.text, tags: mail.tags });
    if (res.ok) return "sent";
    console.error("[email] Resend error", res.status, (await res.text()).slice(0, 300));
  } catch (e) {
    console.error("[email] Resend request failed", (e as Error).message);
  }
  return "failed";
}

/** Adds a confirmed reader to a Resend segment. A reader who is already a contact counts as added. */
export async function addContact(email: string, segmentId: string | undefined): Promise<Delivery> {
  if (emailConfig.dry) {
    console.log(`[newsletter:dry] would add a contact to segment ${segmentId ?? "(none set)"}`);
    return "dry";
  }
  if (!segmentId) {
    console.error("[newsletter] NEWSLETTER_SEGMENT_ID is not set");
    return "failed";
  }
  try {
    const res = await call("/contacts", { email, unsubscribed: false, segments: [{ id: segmentId }] });
    if (res.ok || res.status === 409) return "sent";
    console.error("[newsletter] contact error", res.status, (await res.text()).slice(0, 300));
  } catch (e) {
    console.error("[newsletter] contact request failed", (e as Error).message);
  }
  return "failed";
}
