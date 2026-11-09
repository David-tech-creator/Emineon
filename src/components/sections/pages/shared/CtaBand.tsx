import type { Headline } from "@/content";
import { cn } from "@/lib/cn";
import { Button, CursorGlow, Eyebrow, Heading, MediaFrame, Reveal, type VideoAsset, type ImageAsset } from "@/components/ui";

type CtaLink = { label: string; href: string };

type CtaBandProps = {
  eyebrow?: string;
  title: Headline | string;
  text?: string;
  /** Already-localized hrefs. */
  primary: CtaLink;
  secondary?: CtaLink;
  /** Optional ambient media behind the band (decorative). */
  video?: VideoAsset;
  image?: ImageAsset;
  className?: string;
};

/**
 * Closing call-to-action band: the page's one dark ("night") moment, an inset
 * grainy ember/steel panel with a cursor glow, optional ambient loop, huge heading.
 * Place last on a page, before the footer.
 */
export function CtaBand({ eyebrow, title, text, primary, secondary, video, image, className }: CtaBandProps) {
  return (
    <section className={cn("bg-canvas px-[calc(var(--gutter)*0.5)] pb-[calc(var(--gutter)*0.5)]", className)}>
    <div className="tone-night night-backdrop relative isolate overflow-hidden">
      {(video || image) && (
        <div aria-hidden className="absolute inset-0 -z-10 opacity-45">
          <MediaFrame video={video} image={image} alt="" ratio="h-full" zoom={false} sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-void via-void/70 to-void/40" />
        </div>
      )}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-[radial-gradient(ellipse_60%_80%_at_50%_120%,var(--ember-glow),transparent_70%)] opacity-60"
      />
      <CursorGlow />
      <div className="container-site py-28 md:py-40">
        <div className="mx-auto flex max-w-[72rem] flex-col items-center text-center">
          {eyebrow && (
            <Reveal y={8}>
              <Eyebrow live>{eyebrow}</Eyebrow>
            </Reveal>
          )}
          <Heading title={title} size="h1" as="h2" className="mt-8 max-w-[18ch] text-balance" />
          {text && (
            <Reveal delay={0.15}>
              <p className="mx-auto mt-8 max-w-[52ch] text-lead text-fg-muted">{text}</p>
            </Reveal>
          )}
          <Reveal delay={0.25}>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
              <Button href={primary.href} size="lg" arrow>
                {primary.label}
              </Button>
              {secondary && (
                <Button href={secondary.href} variant="secondary" size="lg">
                  {secondary.label}
                </Button>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </div>
    </section>
  );
}
