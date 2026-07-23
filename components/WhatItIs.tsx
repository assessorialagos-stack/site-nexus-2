import SectionHeading from "@/components/SectionHeading";
import { CheckIcon, XIcon } from "@/components/Icons";
import { whatItIs } from "@/lib/copy";

type Tone = "danger" | "success";

type ColumnProps = {
  title: string;
  items: readonly string[];
  tone: Tone;
};

const toneStyles: Record<Tone, { badge: string; icon: string }> = {
  danger: { badge: "bg-danger/15 text-danger", icon: "text-danger" },
  success: { badge: "bg-success/15 text-success", icon: "text-success" },
};

function Column({ title, items, tone }: ColumnProps) {
  const styles = toneStyles[tone];
  const Icon = tone === "danger" ? XIcon : CheckIcon;

  return (
    // h-full + flex-col garante que as duas colunas terminem na mesma altura no desktop
    <article className="surface flex h-full flex-col p-6 md:p-7">
      <header className="flex items-center gap-3 border-b border-border pb-4">
        <span
          className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-ctl ${styles.badge}`}
        >
          <Icon className="h-5 w-5" />
        </span>
        <h3 className="min-w-0 break-words text-h3 text-ink">{title}</h3>
      </header>

      <ul className="mt-6 flex-1 list-none space-y-4">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <Icon className={`mt-1 h-5 w-5 shrink-0 ${styles.icon}`} />
            <span className="min-w-0 break-words text-body text-ink">{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function WhatItIs() {
  return (
    <section id="o-que-e" className="section">
      <div className="shell">
        <SectionHeading title={whatItIs.h2} lead={whatItIs.lead} />

        <div className="mt-10 grid grid-cols-1 items-stretch gap-5 md:mt-12 md:grid-cols-2 md:gap-6">
          <Column title={whatItIs.isNot.title} items={whatItIs.isNot.items} tone="danger" />
          <Column title={whatItIs.is.title} items={whatItIs.is.items} tone="success" />
        </div>
      </div>
    </section>
  );
}
