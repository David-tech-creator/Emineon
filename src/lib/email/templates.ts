/**
 * Branded transactional emails in the site's light "report card" look: warm paper, ink
 * type, one ember button, mono labels. Table layout and inline styles only, so it holds up
 * in Outlook and Gmail. Every dynamic string is escaped. nas/insights/src/email.mjs mirrors
 * this layout for the newsletter broadcast.
 */
import type { Dictionary } from "@/content/schema";
import { SITE_URL } from "@/lib/site";

export const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

const C = { paper: "#F1EEE8", card: "#FBFAF7", line: "#DCD8CF", ink: "#0B0C0E", muted: "#55534E", dim: "#66635D", ember: "#FF5B1F", emberInk: "#A3450D" };
/** Hosted @2x PNG of the 08 wordmark (208 x 42, shown at 104 x 21). No SVG in email. */
const LOGO_URL = `${SITE_URL}/brand/email/wordmark@2x.png`;
const SANS = "'Geist','Helvetica Neue',Helvetica,Arial,sans-serif";
const MONO = "'Geist Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace";

type Layout = {
  lang: string;
  preheader: string;
  eyebrow: string;
  title: string;
  /** Trusted HTML built from escaped parts. */
  body: string;
  button?: { label: string; href: string };
  /** Trusted HTML under the button. */
  after?: string;
  footer: string;
};

export function emailLayout({ lang, preheader, eyebrow, title, body, button, after, footer }: Layout): string {
  const btn = button
    ? `<tr><td style="padding:8px 40px 8px"><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td style="background:${C.ember};border-radius:2px"><a href="${esc(button.href)}" style="display:inline-block;padding:14px 22px;font-family:${MONO};font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:${C.ink};text-decoration:none">${esc(button.label)}&nbsp;&rarr;</a></td></tr></table></td></tr>`
    : "";
  return `<!doctype html>
<html lang="${esc(lang)}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light"><title>${esc(title)}</title></head>
<body style="margin:0;padding:0;background:${C.paper}">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.paper}"><tr><td align="center" style="padding:40px 16px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px">
<tr><td style="padding:0 4px 20px"><img src="${LOGO_URL}" width="104" height="21" alt="Emineon" style="display:block;border:0;outline:none;text-decoration:none;width:104px;height:21px"></td></tr>
<tr><td style="background:${C.card};border:1px solid ${C.line}">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
<tr><td style="padding:36px 40px 0;font-family:${MONO};font-size:11.5px;letter-spacing:.16em;text-transform:uppercase;color:${C.dim}">[&nbsp;${esc(eyebrow)}&nbsp;]</td></tr>
<tr><td style="padding:16px 40px 8px;font-family:${SANS};font-size:30px;line-height:1.08;letter-spacing:-.02em;font-weight:500;color:${C.ink}">${esc(title)}</td></tr>
<tr><td style="padding:8px 40px 16px;font-family:${SANS};font-size:16px;line-height:1.6;color:${C.muted}">${body}</td></tr>
${btn}
${after ? `<tr><td style="padding:16px 40px 0;font-family:${SANS};font-size:14px;line-height:1.6;color:${C.dim}">${after}</td></tr>` : ""}
<tr><td style="padding:32px 40px 0"><div style="height:1px;background:${C.line};line-height:1px;font-size:0">&nbsp;</div></td></tr>
<tr><td style="padding:16px 40px 32px;font-family:${MONO};font-size:11px;line-height:1.6;letter-spacing:.08em;text-transform:uppercase;color:${C.dim}">Forge your edge.</td></tr>
</table></td></tr>
<tr><td style="padding:20px 4px 0;font-family:${MONO};font-size:11px;line-height:1.7;letter-spacing:.06em;color:${C.dim}">${esc(footer)}</td></tr>
</table></td></tr></table>
</body></html>`;
}

const para = (s: string) => `<p style="margin:0 0 16px">${esc(s)}</p>`;

/** Double opt-in confirmation email. */
export function confirmEmail(d: Dictionary, link: string) {
  const c = d.email.confirm;
  const html = emailLayout({
    lang: d.locale,
    preheader: c.preheader,
    eyebrow: d.footer.newsletter.title,
    title: c.title,
    body: para(c.text),
    button: { label: c.button, href: link },
    after: `${esc(c.ignore)}<br><br><span style="word-break:break-all;color:${C.dim}">${esc(link)}</span>`,
    footer: d.email.footer,
  });
  const text = `${c.title}\n\n${c.text}\n\n${c.button}:\n${link}\n\n${c.ignore}\n\n--\n${d.email.footer}`;
  return { subject: c.subject, html, text };
}

/**
 * Receipt to the person who used the contact form. It never quotes their message, and drops a
 * name that looks like a link, so the form cannot be used to send someone else's text to a
 * stranger from our domain.
 */
export function contactReceiptEmail(d: Dictionary, { name }: { name: string }) {
  const c = d.email.contactReceipt;
  const safeName = /https?:|www\.|@|\.[a-z]{2,}\b/i.test(name) ? "" : name.slice(0, 60);
  const greeting = safeName ? c.greeting.replace("{name}", safeName) : c.greeting.replace(/\s*\{name\}/, "");
  const html = emailLayout({
    lang: d.locale,
    preheader: c.preheader,
    eyebrow: d.nav.items.contact,
    title: c.title,
    body: `${para(greeting)}${para(c.text)}<p style="margin:24px 0 0;color:${C.ink}">${esc(c.signoff)}</p>`,
    footer: d.email.footer,
  });
  const text = `${greeting}\n\n${c.text}\n\n${c.signoff}\n\n--\n${d.email.footer}`;
  return { subject: c.subject, html, text };
}

/** Internal notification of a contact form message (to David). English, plain and scannable. */
export function contactNotificationEmail(fields: [string, string][], message: string, meta: string) {
  const rows = fields
    .map(([k, v]) => `<tr><td style="padding:6px 16px 6px 0;font-family:${MONO};font-size:11.5px;letter-spacing:.12em;text-transform:uppercase;color:${C.dim};vertical-align:top;white-space:nowrap">${esc(k)}</td><td style="padding:6px 0;font-family:${SANS};font-size:15px;color:${C.ink}">${esc(v)}</td></tr>`)
    .join("");
  const html = emailLayout({
    lang: "en",
    preheader: message.slice(0, 120),
    eyebrow: "Website contact",
    title: fields.find(([k]) => k === "Name")?.[1] ?? "New message",
    body: `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 16px">${rows}</table><div style="padding:16px;border-left:2px solid ${C.ember};background:${C.paper};font-size:15px;line-height:1.6;color:${C.ink};white-space:pre-wrap">${esc(message)}</div>`,
    after: esc(meta),
    footer: "Sent by the contact form on emineon.com. Reply to answer the sender directly.",
  });
  const text = `${fields.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${message}\n\n${meta}`;
  return { html, text };
}
