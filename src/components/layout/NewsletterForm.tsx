"use client";

import type { Locale } from "@/content/schema";
import { Arrow } from "@/components/ui/Arrow";
import { cn } from "@/lib/cn";
import { useNewsletter, type NewsletterState } from "./use-newsletter";

export type NewsletterLabels = {
  label: string;
  placeholder: string;
  submit: string;
  invalid: string;
  honeypot: string;
  sending: string;
  sent: string;
  confirmed: string;
  expired: string;
  failed: string;
  rateLimited: string;
  note: string;
};

/** The message for a state, or the small print when there is nothing to say. */
export function newsletterMessage(state: NewsletterState, l: NewsletterLabels): string {
  switch (state) {
    case "sending":
      return l.sending;
    case "sent":
      return l.sent;
    case "confirmed":
      return l.confirmed;
    case "invalid":
      return l.invalid;
    case "expired":
      return l.expired;
    case "failed":
      return l.failed;
    case "rateLimited":
      return l.rateLimited;
    default:
      return l.note;
  }
}

/** Hidden field: people leave it empty, bots fill it in and get a quiet success. */
export function Honeypot({ id, label }: { id: string; label: string }) {
  return (
    <div aria-hidden className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden">
      <label htmlFor={id}>{label}</label>
      <input id={id} name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
    </div>
  );
}

/** Footer newsletter field: double opt-in through POST /api/newsletter. */
export function NewsletterForm({ locale, labels }: { locale: Locale; labels: NewsletterLabels }) {
  const { state, onSubmit, done, busy } = useNewsletter(locale);
  const message = newsletterMessage(state, labels);
  const good = state === "sent" || state === "confirmed";

  return (
    <form onSubmit={onSubmit} noValidate className="relative w-full" aria-busy={busy}>
      <Honeypot id="newsletter-website" label={labels.honeypot} />
      <label htmlFor="newsletter-email" className="sr-only">
        {labels.label}
      </label>
      <div className="group/nl flex items-center border-b border-line-strong transition-colors focus-within:border-ember">
        <input
          id="newsletter-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
          placeholder={labels.placeholder}
          disabled={busy || done}
          aria-invalid={state === "invalid" || undefined}
          aria-describedby="newsletter-msg"
          className="h-12 min-w-0 flex-1 bg-transparent text-[16px] text-fg placeholder:text-fg-dim focus:outline-none"
        />
        <button
          type="submit"
          disabled={busy || done}
          className="group/sub flex h-12 items-center gap-2 pl-4 font-mono text-[11.5px] tracking-[0.14em] text-fg uppercase transition-colors hover:text-ember-ink disabled:opacity-50"
        >
          {labels.submit}
          <Arrow className="transition-transform group-hover/sub:translate-x-1" />
        </button>
      </div>
      <p id="newsletter-msg" role="status" aria-live="polite" className={cn("mt-3 min-h-5 text-[13px]", good ? "text-ember-ink" : state === "idle" ? "text-fg-dim" : "text-fg-muted")}>
        {message}
      </p>
    </form>
  );
}
