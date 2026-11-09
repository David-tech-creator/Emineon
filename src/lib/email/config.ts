/**
 * Email settings, all from the environment (see .env.example and SETUP-EMAIL.md).
 * With no RESEND_API_KEY everything runs in dry mode: messages are logged, nothing is sent.
 * Server only: never import this from a client component.
 */
import type { Locale } from "@/content/schema";
import { SITE_URL } from "@/lib/site";

const env = (k: string) => process.env[k]?.trim() || undefined;

export const emailConfig = {
  get apiKey() {
    return env("RESEND_API_KEY");
  },
  get dry() {
    return !env("RESEND_API_KEY");
  },
  contact: {
    /** David's mailbox. Also the public address on the site until a hello@ alias exists. */
    get to() {
      return env("CONTACT_TO") ?? "david.v@emineon.com";
    },
    get from() {
      return env("CONTACT_FROM") ?? "Emineon website <notifications@emineon.com>";
    },
    /** Send the sender a short "we have your message" receipt. On unless set to "false". */
    get confirmation() {
      return env("CONTACT_CONFIRMATION") !== "false";
    },
    get confirmationFrom() {
      return env("CONTACT_CONFIRMATION_FROM") ?? env("NEWSLETTER_FROM") ?? "Emineon <david.v@emineon.com>";
    },
    get replyTo() {
      return env("CONTACT_REPLY_TO") ?? "david.v@emineon.com";
    },
  },
  newsletter: {
    get from() {
      return env("NEWSLETTER_FROM") ?? "Emineon <david.v@emineon.com>";
    },
    get replyTo() {
      return env("NEWSLETTER_REPLY_TO") ?? "david.v@emineon.com";
    },
    /** HMAC secret for confirmation links. Required once a key is set; a fixed dev value in dry mode. */
    get secret() {
      return env("NEWSLETTER_SECRET") ?? (env("RESEND_API_KEY") ? undefined : "dry-mode-only-not-a-secret");
    },
    /** Resend segment for a locale: NEWSLETTER_SEGMENT_ID_FR / _DE when set, else NEWSLETTER_SEGMENT_ID. */
    segment(locale: Locale) {
      return env(`NEWSLETTER_SEGMENT_ID_${locale.toUpperCase()}`) ?? env("NEWSLETTER_SEGMENT_ID");
    },
  },
};

/**
 * Base URL for links in emails. Always the canonical site in production, so a forged Host
 * header can never put another domain into a mail we send. Local dev uses the request origin.
 */
export function linkBase(req: Request): string {
  if (process.env.NODE_ENV !== "production" || process.env.VERCEL_ENV === "preview") {
    try {
      return new URL(req.url).origin;
    } catch {
      /* fall through */
    }
  }
  return SITE_URL;
}
