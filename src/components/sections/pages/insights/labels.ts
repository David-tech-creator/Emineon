import type { Dictionary } from "@/content";
import { localizedHref, type Locale } from "@/lib/i18n";

/** Dictionary → labels for the newsletter forms (footer field and the insights band). */
export function newsletterFormLabels(d: Dictionary) {
  const f = d.common.form;
  const n = d.newsletter;
  return {
    label: f.newsletterLabel,
    placeholder: f.newsletterPlaceholder,
    submit: f.newsletterSubmit,
    invalid: f.invalidEmail,
    honeypot: f.honeypot,
    sending: n.sending,
    sent: n.sent,
    confirmed: n.confirmed,
    expired: n.expired,
    failed: n.failed,
    rateLimited: n.rateLimited,
    note: n.note,
  };
}

export type NewsletterFormLabels = ReturnType<typeof newsletterFormLabels>;

/** Dictionary → NewsletterBand labels. */
export function newsletterLabels(d: Dictionary) {
  const locale = d.locale as Locale;
  return {
    eyebrow: d.footer.newsletter.title,
    title: d.home.insights.title,
    text: d.footer.newsletter.text,
    form: newsletterFormLabels(d),
    privacy: { label: d.footer.legal.privacy, href: localizedHref(locale, "/legal/privacy") },
    rss: { label: d.blog.rss, href: localizedHref(locale, "/insights/rss.xml") },
  };
}
