import type { ReactNode } from "react";
import type { FaqItem, Headline } from "@/content";
import { Accordion, Section, type SectionTone } from "@/components/ui";
import { SectionHeader } from "./SectionHeader";
import { JsonLd } from "./JsonLd";
import { faqLd } from "./seo";

type FaqSectionProps = {
  eyebrow: string;
  index?: string;
  title: Headline | string;
  lead?: string;
  items: FaqItem[];
  tone?: SectionTone;
  id?: string;
  /** Emit FAQPage JSON-LD (default true). Disable if the page already emits it in a @graph. */
  jsonLd?: boolean;
  /** Optional link under the header (e.g. to the full FAQ page). */
  action?: ReactNode;
};

/** FAQ section: header in the left column, accordion on the right. */
export function FaqSection({ eyebrow, index, title, lead, items, tone = "dark", id, jsonLd = true, action }: FaqSectionProps) {
  if (items.length === 0) return null;
  return (
    <Section tone={tone} id={id}>
      {jsonLd && <JsonLd data={{ "@context": "https://schema.org", ...faqLd(items) }} />}
      <div className="grid grid-cols-4 gap-x-[var(--gutter)] gap-y-12 md:grid-cols-12">
        <div className="col-span-4 md:col-span-5">
          <div className="md:sticky md:top-[calc(var(--nav-h)+40px)]">
            <SectionHeader eyebrow={eyebrow} index={index} title={title} lead={lead} layout="stacked" size="h2" action={action} />
          </div>
        </div>
        <div className="col-span-4 md:col-span-7">
          <Accordion items={items} defaultOpen={0} />
        </div>
      </div>
    </Section>
  );
}
