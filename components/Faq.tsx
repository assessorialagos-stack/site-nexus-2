"use client";

import { useId, useState } from "react";
import { faq } from "@/lib/copy";
import { PlusIcon } from "@/components/Icons";
import SectionHeading from "@/components/SectionHeading";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  const baseId = useId();

  return (
    <section id="faq" className="section bg-bg-soft">
      <div className="shell">
        <SectionHeading eyebrow={faq.eyebrow} title={faq.h2} lead={faq.lead} />

        <div className="mx-auto mt-10 max-w-3xl space-y-3 md:mt-12">
          {faq.items.map((item, i) => {
            const isOpen = open === i;
            const buttonId = `${baseId}-btn-${i}`;
            const panelId = `${baseId}-panel-${i}`;
            return (
              <div key={item.question} className="card overflow-hidden">
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-bg-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                >
                  <span className="text-body font-semibold text-ink">{item.question}</span>
                  <PlusIcon
                    className={`h-5 w-5 shrink-0 text-brand transition-transform duration-200 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  />
                </button>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-body text-muted break-words">{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
