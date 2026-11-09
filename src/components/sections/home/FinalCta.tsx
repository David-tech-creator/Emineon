import type { HomeDict, Locale } from "@/content/schema";
import { Button, CursorGlow, Eyebrow, Heading, Reveal } from "@/components/ui";
import { localizedHref } from "@/lib/i18n";
import { GraphField } from "@/components/three";
import "./home.css";

/** Final CTA band: "Forge your edge." over a dot lattice on a grainy ember/steel gradient. */
export function FinalCta({ locale, cta }: { locale: Locale; cta: HomeDict["cta"] }) {
  return (
    <section aria-labelledby="home-cta-title" className="bg-canvas px-[calc(var(--gutter)*0.5)] pb-[calc(var(--gutter)*0.5)]">
    <div className="tone-night night-backdrop relative isolate flex min-h-[80svh] items-center overflow-hidden py-28 md:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 text-bone/60 [mask-image:linear-gradient(180deg,transparent_0%,transparent_40%,#000_80%)]"
      >
        <GraphField variant="wave" density={1.4} focus={[0.5, 0.86]} />
      </div>
      {/* Calm void behind the copy so dots never cross the text */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_44%_40%_at_50%_50%,rgba(7,8,10,.92)_0%,rgba(7,8,10,.6)_55%,transparent_100%)]"
      />
      <div aria-hidden className="panel-grain absolute inset-0 -z-10" />
      <CursorGlow intensity={0.45} size={720} />

      <div className="container-site flex flex-col items-center text-center">
        <Eyebrow live>{cta.eyebrow}</Eyebrow>
        <Heading id="home-cta-title" as="h2" size="hero" title={cta.title} className="mx-auto mt-8 max-w-[10ch]" />
        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-xl text-lead text-fg-muted">{cta.text}</p>
        </Reveal>
        <Reveal delay={0.3} className="mt-10 flex flex-wrap justify-center gap-3">
          <Button href={localizedHref(locale, cta.primary.href)} size="lg">
            {cta.primary.label}
          </Button>
          <Button href={localizedHref(locale, cta.secondary.href)} variant="secondary" size="lg" arrow>
            {cta.secondary.label}
          </Button>
        </Reveal>
      </div>
    </div>
    </section>
  );
}
