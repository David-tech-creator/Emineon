"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";
import { localizeAlt } from "@/lib/media-alt";

/** Structural types, compatible with the entries exported by src/lib/media.ts. */
export type ImageAsset = { src: string; alt?: string; width: number; height: number; blurDataURL?: string };
export type VideoAsset = { mp4: string; webm?: string; poster: string };

type MediaFrameProps = {
  image?: ImageAsset;
  video?: VideoAsset;
  /** Alt text (overrides image.alt). Pass "" for decorative media. */
  alt?: string;
  /** Aspect ratio utility, e.g. "aspect-[16/9]" (default) or "aspect-[4/5]". Use "h-full" to fill a sized parent. */
  ratio?: string;
  /** next/image sizes attribute. */
  sizes?: string;
  priority?: boolean;
  /** Subtle zoom on hover of the nearest `group` (default true). */
  zoom?: boolean;
  /**
   * Paper scrim from the bottom, for the rare case where ink text must sit on a
   * photo. Photography is light (Nov 2026 re-shoot), so the scrim lightens rather
   * than darkens; prefer putting text below the image (report-card style).
   */
  overlay?: boolean;
  /**
   * Report-card frame: a hairline border and a few px of the grey card gradient
   * around the image, so photography sits calmly on paper.
   */
  framed?: boolean;
  className?: string;
  mediaClassName?: string;
  children?: React.ReactNode;
};

/**
 * Image or video in a 0-radius frame, object-cover. Videos are lazy: the source
 * is attached only when near the viewport, playback pauses offscreen, and under
 * reduced motion only the poster is shown.
 */
export function MediaFrame({
  image,
  video,
  alt,
  ratio = "aspect-[16/9]",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  zoom = true,
  overlay = false,
  framed = false,
  className,
  mediaClassName,
  children,
}: MediaFrameProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const params = useParams<{ locale?: string }>();
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!video || !el || reduce) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoad(true);
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [video, reduce]);

  const mediaCls = cn(
    "absolute inset-0 h-full w-full object-cover",
    zoom && "transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.035]",
    mediaClassName,
  );

  const frame = (
    <div className={cn("relative overflow-hidden bg-raised", ratio, !framed && className)}>
      {video ? (
        <video
          ref={ref}
          className={mediaCls}
          poster={video.poster}
          muted
          loop
          playsInline
          preload="none"
          aria-label={alt || undefined}
          aria-hidden={alt ? undefined : true}
        >
          {load && video.webm && <source src={video.webm} type="video/webm" />}
          {load && <source src={video.mp4} type="video/mp4" />}
        </video>
      ) : image ? (
        <Image
          src={image.src}
          alt={alt ?? localizeAlt(image.alt, params?.locale)}
          fill
          sizes={sizes}
          priority={priority}
          placeholder={image.blurDataURL ? "blur" : "empty"}
          blurDataURL={image.blurDataURL}
          className={mediaCls}
        />
      ) : null}
      {overlay && (
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-paper/95 via-paper/55 to-transparent" />
      )}
      {children && <div className="relative h-full">{children}</div>}
    </div>
  );

  if (!framed) return frame;
  return <div className={cn("frame-card border border-line p-2 md:p-3", className)}>{frame}</div>;
}
