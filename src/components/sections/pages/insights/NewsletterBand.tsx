"use client";

import { useId } from "react";
import type { Headline, Locale } from "@/content/schema";
import { cn } from "@/lib/cn";
import { Arrow, Eyebrow, Heading } from "@/components/ui";
import { Honeypot, newsletterMessage, type NewsletterLabels } from "@/components/layout/NewsletterForm";
import { useNewsletter } from "@/components/layout/use-newsletter";

type Labels = {
  eyebrow: string;
  title: Headline;
  text: string;
  form: NewsletterLabels;
  privacy: { label: string; href: string };
  rss: { label: string; href: string };
};

/**
 * In-page newsletter band (target of the content's "#newsletter" links on insight pages).
 * Double opt-in via POST /api/newsletter; also shows the result of the confirmation link
 * (?subscribed=yes|expired|error), which lands here.
 */
export function NewsletterBand({ locale, labels }: { locale: Locale; labels: Labels }) {
  const id = useId();
  const { state, onSubmit, done, busy } = useNewsletter(locale, { readConfirmation: true });
  const msg = newsletterMessage(state, labels.form);
  const good = state === "sent" || state === "confirmed";

  return (
    <section id="newsletter" className="tone-stone relative isolate scroll-mt-[var(--nav-h)] overflow-hidden border-t border-line">
      <div className="container-site grid grid-cols-4 gap-x-[var(--gutter)] gap-y-10 py-24 md:grid-cols-12 md:py-32">
        <div className="col-span-4 md:col-span-6">
          <Eyebrow live>{labels.eyebrow}</Eyebrow>
          <Heading title={labels.title} size="h2" className="mt-6 max-w-[16ch]" />
          <p className="mt-6 max-w-[48ch] text-lead text-fg-muted">{labels.text}</p>
        </div>
        <form onSubmit={onSubmit} noValidate aria-busy={busy} className="relative col-span-4 self-end md:col-span-5 md:col-start-8">
          <Honeypot id={`${id}-website`} label={labels.form.honeypot} />
          <label htmlFor={`${id}-email`} className="eyebrow text-fg-dim">
            {labels.form.label}
          </label>
          <div className="mt-3 flex items-center border-b border-line-strong transition-colors focus-within:border-ember">
            <input
              id={`${id}-email`}
              name="email"
              type="email"
              autoComplete="email"
              maxLength={254}
              placeholder={labels.form.placeholder}
              disabled={busy || done}
              aria-invalid={state === "invalid" || undefined}
              aria-describedby={`${id}-msg`}
              className="h-14 min-w-0 flex-1 bg-transparent text-[18px] text-fg placeholder:text-fg-dim focus:outline-none"
            />
            <button
              type="submit"
              disabled={busy || done}
              className="group/s flex h-14 items-center gap-2 pl-4 font-mono text-[12px] uppercase tracking-[0.14em] text-fg transition-colors hover:text-ember-ink disabled:opacity-50"
            >
              {labels.form.submit}
              <Arrow className="transition-transform group-hover/s:translate-x-1" />
            </button>
          </div>
          <p id={`${id}-msg`} role="status" aria-live="polite" className={cn("mt-3 min-h-5 text-[14px]", good ? "text-ember-ink" : state === "idle" ? "text-fg-dim" : "text-fg-muted")}>
            {msg}
          </p>
          <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11.5px] uppercase tracking-[0.12em] text-fg-dim">
            <a href={labels.privacy.href} className="transition-colors hover:text-fg">
              {labels.privacy.label}
            </a>
            <a href={labels.rss.href} className="transition-colors hover:text-fg" type="application/rss+xml">
              {labels.rss.label}
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}
