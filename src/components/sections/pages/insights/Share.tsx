"use client";

import { useState } from "react";

type Props = { url: string; title: string; labels: { share: string; copyLink: string; linkCopied: string; email: string } };

/** Share row: LinkedIn, email, copy link. No third-party scripts. */
export function Share({ url, title, labels }: Props) {
  const [copied, setCopied] = useState(false);
  const cls = "font-mono text-[11.5px] uppercase tracking-[0.12em] text-fg-muted transition-colors hover:text-ember-ink";
  return (
    <div>
      <p className="eyebrow text-fg-dim">{labels.share}</p>
      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
        <li>
          <a className={cls} href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </li>
        <li>
          <a className={cls} href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`}>
            {labels.email}
          </a>
        </li>
        <li>
          <button
            type="button"
            className={cls}
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(url);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              } catch {
                /* clipboard unavailable */
              }
            }}
          >
            <span aria-live="polite">{copied ? labels.linkCopied : labels.copyLink}</span>
          </button>
        </li>
      </ul>
    </div>
  );
}
