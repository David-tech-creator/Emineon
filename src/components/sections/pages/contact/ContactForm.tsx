"use client";

import { useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import type { CommonDict, Locale } from "@/content/schema";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui";
import { contactSchema, fieldErrors, type ContactErrorCode, type ContactField } from "./schema";

type Props = {
  locale: Locale;
  form: CommonDict["form"];
  /** Already-localized privacy policy href + its label. */
  privacyHref: string;
  privacyLabel: string;
  /** Pre-selected topic (e.g. from ?topic=sprint). */
  defaultTopic?: string;
};

type Status = "idle" | "sending" | "ok" | "error" | "rateLimited";

const inputCls =
  "peer block w-full rounded-[2px] border border-line-strong bg-transparent px-4 text-[16px] text-fg placeholder:text-fg-dim transition-colors duration-200 hover:border-fg/40 focus:border-ember focus:outline-none aria-[invalid=true]:border-ember";

function Field({ id, label, hint, error, children, className }: { id: string; label: string; hint?: string; error?: string; children: ReactNode; className?: string }) {
  return (
    <div className={className}>
      <div className="mb-2 flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="eyebrow text-fg-muted">
          {label}
        </label>
        {hint && <span className="font-mono text-[11px] text-fg-dim">{hint}</span>}
      </div>
      {children}
      <p id={`${id}-err`} className={cn("mt-2 min-h-[1.25rem] font-mono text-[12px] text-ember-ink", !error && "invisible")} aria-live="polite">
        {error}
      </p>
    </div>
  );
}

/**
 * Contact form. zod validation on blur/submit (same schema as the API), honeypot,
 * success and error states. POSTs JSON to /api/contact.
 */
export function ContactForm({ locale, form, privacyHref, privacyLabel, defaultTopic }: Props) {
  const uid = useId();
  const ref = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Partial<Record<ContactField, ContactErrorCode>>>({});
  const [touched, setTouched] = useState(false);

  const msg = (code?: ContactErrorCode) => (code ? form[code] : undefined);
  const id = (f: string) => `${uid}-${f}`;

  const read = () => {
    const fd = new FormData(ref.current!);
    return {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      company: String(fd.get("company") ?? ""),
      topic: String(fd.get("topic") ?? ""),
      message: String(fd.get("message") ?? ""),
      consent: fd.get("consent") === "on",
      website: String(fd.get("website") ?? ""),
      locale,
    };
  };

  const validate = () => {
    const r = contactSchema.safeParse(read());
    const e = r.success ? {} : fieldErrors(r.error);
    setErrors(e);
    return { ok: r.success, errors: e };
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched(true);
    const v = validate();
    if (!v.ok) {
      const first = (["name", "email", "company", "topic", "message", "consent"] as const).find((f) => v.errors[f]);
      if (first) document.getElementById(id(first))?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(read()) });
      if (res.ok) {
        setStatus("ok");
        ref.current?.reset();
        return;
      }
      if (res.status === 429) {
        setStatus("rateLimited");
        return;
      }
      if (res.status === 422) {
        const data = (await res.json().catch(() => null)) as { fields?: Partial<Record<ContactField, ContactErrorCode>> } | null;
        if (data?.fields) setErrors(data.fields);
        setStatus("idle");
        return;
      }
      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  const onBlur = () => {
    if (touched) validate();
  };

  if (status === "ok") {
    return (
      <div role="status" className="flex min-h-[520px] flex-col justify-center border border-line p-8 md:p-12">
        <span className="flex size-12 items-center justify-center rounded-full border border-ember text-ember-ink">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M4 12.5l5 5L20 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
          </svg>
        </span>
        <h3 className="mt-10 text-h2 font-medium text-fg">{form.successTitle}</h3>
        <p className="mt-6 max-w-[44ch] text-lead text-fg-muted">{form.successText}</p>
        <div className="mt-10">
          <Button variant="ghost" onClick={() => setStatus("idle")}>
            {form.sendAnother}
          </Button>
        </div>
      </div>
    );
  }

  const describedBy = (f: ContactField) => (errors[f] ? `${id(f)}-err` : undefined);

  return (
    <form ref={ref} onSubmit={onSubmit} onBlur={onBlur} noValidate className="relative" aria-busy={status === "sending"}>
      {/* Honeypot: hidden from people and assistive tech, attractive to bots. */}
      <div aria-hidden className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden">
        <label htmlFor={id("website")}>{form.honeypot}</label>
        <input id={id("website")} name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <div className="grid grid-cols-1 gap-x-6 md:grid-cols-2">
        <Field id={id("name")} label={form.name} error={msg(errors.name)}>
          <input id={id("name")} name="name" type="text" autoComplete="name" required maxLength={120} aria-invalid={!!errors.name} aria-describedby={describedBy("name")} className={cn(inputCls, "h-12")} />
        </Field>
        <Field id={id("email")} label={form.email} error={msg(errors.email)}>
          <input id={id("email")} name="email" type="email" autoComplete="email" required maxLength={200} aria-invalid={!!errors.email} aria-describedby={describedBy("email")} className={cn(inputCls, "h-12")} />
        </Field>
        <Field id={id("company")} label={form.company} hint={form.optional} error={msg(errors.company)}>
          <input id={id("company")} name="company" type="text" autoComplete="organization" maxLength={160} aria-invalid={!!errors.company} aria-describedby={describedBy("company")} className={cn(inputCls, "h-12")} />
        </Field>
        <Field id={id("topic")} label={form.topic} error={msg(errors.topic)}>
          <div className="relative">
            <select
              id={id("topic")}
              name="topic"
              required
              defaultValue={defaultTopic && form.topics.some((t) => t.value === defaultTopic) ? defaultTopic : ""}
              aria-invalid={!!errors.topic}
              aria-describedby={describedBy("topic")}
              className={cn(inputCls, "h-12 appearance-none pr-10 [&:invalid]:text-fg-dim")}
            >
              <option value="" disabled>
                {form.topicPlaceholder}
              </option>
              {form.topics.map((t) => (
                <option key={t.value} value={t.value} className="bg-paper text-ink">
                  {t.label}
                </option>
              ))}
            </select>
            <svg aria-hidden width="12" height="12" viewBox="0 0 12 12" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-fg-muted">
              <path d="M2 4.5l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
            </svg>
          </div>
        </Field>
        <Field id={id("message")} label={form.message} error={msg(errors.message)} className="md:col-span-2">
          <textarea
            id={id("message")}
            name="message"
            required
            rows={6}
            maxLength={5000}
            placeholder={form.messagePlaceholder}
            aria-invalid={!!errors.message}
            aria-describedby={describedBy("message")}
            className={cn(inputCls, "min-h-40 resize-y py-3 leading-relaxed")}
          />
        </Field>
      </div>

      <div className="mt-2">
        <label htmlFor={id("consent")} className="group flex cursor-pointer items-start gap-3">
          <input
            id={id("consent")}
            name="consent"
            type="checkbox"
            required
            aria-invalid={!!errors.consent}
            aria-describedby={describedBy("consent")}
            className="peer mt-0.5 size-[18px] shrink-0 cursor-pointer appearance-none rounded-[2px] border border-line-strong bg-transparent transition-colors checked:border-ember checked:bg-ember aria-[invalid=true]:border-ember"
          />
          <svg aria-hidden width="18" height="18" viewBox="0 0 18 18" className="pointer-events-none -ml-[30px] mt-0.5 shrink-0 text-void opacity-0 peer-checked:opacity-100">
            <path d="M4 9.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
          </svg>
          <span className="text-[14px] leading-snug text-fg-muted">
            {form.consent}{" "}
            <a href={privacyHref} target="_blank" className="whitespace-nowrap text-fg underline decoration-line-strong underline-offset-4 hover:text-ember-ink">
              {privacyLabel} ↗
            </a>
          </span>
        </label>
        <p id={`${id("consent")}-err`} className={cn("mt-2 min-h-[1.25rem] pl-[30px] font-mono text-[12px] text-ember-ink", !errors.consent && "invisible")} aria-live="polite">
          {msg(errors.consent)}
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
        <div role="alert" aria-live="assertive" className="min-h-5 text-[14px]">
          {status === "error" && (
            <p>
              <span className="text-fg">{form.errorTitle}</span> <span className="text-fg-muted">{form.errorText}</span>
            </p>
          )}
          {status === "rateLimited" && (
            <p>
              <span className="text-fg">{form.errorTitle}</span> <span className="text-fg-muted">{form.rateLimited}</span>
            </p>
          )}
        </div>
        <Button type="submit" size="lg" disabled={status === "sending"} arrow={status !== "sending"} className="shrink-0">
          {status === "sending" ? form.sending : form.submit}
        </Button>
      </div>
    </form>
  );
}
