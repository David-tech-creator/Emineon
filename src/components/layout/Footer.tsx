import Link from "next/link";
import type { Dictionary } from "@/content/schema";
import { localizedHref } from "@/lib/i18n";
import { landingPath } from "@/lib/routes";
import { CONTACT_EMAIL, activeProfiles } from "@/lib/site";
import { WORDMARK } from "@/components/brand";
import { BrandMark } from "./BrandMark";
import { NewsletterForm } from "./NewsletterForm";
import { LocaleSwitcher } from "./LocaleSwitcher";

function fillYear(template: string) {
  return template.replace("{year}", String(new Date().getFullYear()));
}

/** Site footer: sitemap, offices, newsletter, legal, huge wordmark and the brand line. */
export function Footer({ dict }: { dict: Dictionary }) {
  const { locale, footer, nav, common, offices, services, industries } = dict;
  const href = (p: string) => localizedHref(locale, p);
  const linkCls = "text-[15px] text-fg-muted transition-colors duration-200 hover:text-fg";
  const colTitle = "eyebrow mb-5 text-fg-dim";
  const seo = dict.seo;
  // SEO-PLAN §10: small "AI consulting" column, descriptive anchors in the page's language.
  const aiLinks = [
    { label: seo.pages.switzerland, href: landingPath("switzerland") },
    { label: seo.pages.geneva, href: landingPath("geneva") },
    { label: seo.pages.governance, href: landingPath("governance") },
    { label: seo.pages.faq, href: "/faq" },
  ];
  // Placeholder-safe: profiles without a URL (src/lib/site.ts) are not rendered.
  const profiles = activeProfiles();

  return (
    <footer className="tone-stone relative overflow-hidden border-t border-line pt-20 md:pt-28">
      <div className="container-site">
        {/* Top: brand line + newsletter */}
        <div className="grid grid-cols-4 gap-x-5 gap-y-12 md:grid-cols-12 md:gap-x-8">
          <div className="col-span-4 md:col-span-6">
            <BrandMark />
            <p className="mt-8 max-w-md text-h3 font-medium text-fg">
              <span className="heading-quiet">{footer.brandLine.split(" ").slice(0, -1).join(" ")}</span>{" "}
              {footer.brandLine.split(" ").slice(-1)}
            </p>
            <p className="mt-4 max-w-md text-fg-muted">{footer.tagline}</p>
            <p className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[15px]">
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-fg underline decoration-line-strong underline-offset-4 transition-colors hover:text-ember-ink">
                {CONTACT_EMAIL}
              </a>
              {profiles.length > 0 && (
                <span className="flex flex-wrap items-center gap-x-4" aria-label={seo.labels.follow}>
                  {profiles.map((p) => (
                    <a key={p.id} href={p.url} rel="me noopener" target="_blank" className="text-fg-muted transition-colors hover:text-fg">
                      {p.label}
                    </a>
                  ))}
                </span>
              )}
            </p>
          </div>
          <div className="col-span-4 md:col-span-5 md:col-start-8">
            <p className={colTitle}>{footer.newsletter.title}</p>
            <p className="mb-4 text-[15px] text-fg-muted">{footer.newsletter.text}</p>
            <NewsletterForm
              locale={locale}
              labels={{
                label: common.form.newsletterLabel,
                placeholder: common.form.newsletterPlaceholder,
                submit: common.form.newsletterSubmit,
                invalid: common.form.invalidEmail,
                honeypot: common.form.honeypot,
                sending: dict.newsletter.sending,
                sent: dict.newsletter.sent,
                confirmed: dict.newsletter.confirmed,
                expired: dict.newsletter.expired,
                failed: dict.newsletter.failed,
                rateLimited: dict.newsletter.rateLimited,
                note: dict.newsletter.note,
              }}
            />
          </div>
        </div>

        {/* Sitemap */}
        <nav aria-label={common.a11y.footerNav} className="mt-20 grid grid-cols-2 gap-x-5 gap-y-12 border-t border-line pt-12 md:grid-cols-12 md:gap-x-8">
          <div className="md:col-span-3">
            <p className={colTitle}>{footer.columns.services}</p>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={href(`/services/${s.slug}`)} className={linkCls}>
                    {s.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={href("/approach")} className={linkCls}>
                  {nav.items.approach}
                </Link>
              </li>
            </ul>
          </div>
          <div className="md:col-span-3">
            <p className={colTitle}>{footer.columns.industries}</p>
            <ul className="space-y-3">
              {industries.map((i) => (
                <li key={i.slug}>
                  <Link href={href(`/industries/${i.slug}`)} className={linkCls}>
                    {i.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2">
            <p className={colTitle}>{footer.columns.company}</p>
            <ul className="space-y-3">
              {footer.companyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={href(l.href)} className={linkCls}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className={`${colTitle} mt-10`}>{seo.labels.footerColumn}</p>
            <ul className="space-y-3">
              {aiLinks.map((l) => (
                <li key={l.href}>
                  <Link href={href(l.href)} className={linkCls}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

          </div>
          <div className="col-span-2 md:col-span-4">
            <p className={colTitle}>{footer.columns.offices}</p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-4">
              {offices.map((o) => (
                <li key={o.id} className={o.hq ? "col-span-2" : undefined}>
                  <p className="flex items-center gap-2 text-[15px] text-fg">
                    {o.hq && <span aria-hidden className="size-1.5 rounded-full bg-ember" />}
                    {o.city}
                    {o.hq && <span className="eyebrow text-ember-ink">{common.labels.hq}</span>}
                  </p>
                  {o.addressLines ? (
                    <address className="mt-1 text-[14px] leading-relaxed text-fg-muted not-italic">
                      {o.addressLines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </address>
                  ) : (
                    <p className="mt-0.5 font-mono text-[11px] tracking-[0.12em] text-fg-dim uppercase">{o.country}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Legal row */}
        <div className="mt-16 flex flex-col gap-4 border-t border-line py-6 font-mono text-[11.5px] tracking-[0.12em] text-fg-dim uppercase md:flex-row md:items-center md:justify-between">
          <p className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <span>{fillYear(footer.copyright)}</span>
            <span>
              {footer.madeBy}{" "}
              <a href="https://www.rive-foundry.com" target="_blank" rel="noopener" className="text-fg-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-ember-ink">
                Rive Foundry
              </a>
            </span>
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link href={href("/legal/privacy")} className="hover:text-fg">
              {footer.legal.privacy}
            </Link>
            <Link href={href("/legal/imprint")} className="hover:text-fg">
              {footer.legal.imprint}
            </Link>
            <span className="hidden md:inline">{footer.rooted}</span>
            <LocaleSwitcher current={locale} label={nav.locale.label} names={nav.locale.names} short={nav.locale.short} />
            <a href="#top" className="hover:text-ember-ink">
              {footer.backToTop} ↑
            </a>
          </div>
        </div>
      </div>

      {/* Huge wordmark: the 08 letterforms, faint ink, the node stays ember. Cropped at the baseline so it sits on the edge. */}
      <div aria-hidden className="container-site select-none">
        <svg viewBox={`0 0 ${WORDMARK.width} ${WORDMARK.height - 0.45}`} className="-mb-px block w-full text-fg" preserveAspectRatio="xMidYMax meet">
          <defs>
            <linearGradient id="footer-wordmark" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="currentColor" stopOpacity="0.16" />
              <stop offset="1" stopColor="currentColor" stopOpacity="0.04" />
            </linearGradient>
          </defs>
          <path d={WORDMARK.d} fill="url(#footer-wordmark)" />
          <circle cx={WORDMARK.dot.x} cy={WORDMARK.dot.y} r={WORDMARK.dot.r} fill="var(--ember)" />
        </svg>
      </div>
    </footer>
  );
}
