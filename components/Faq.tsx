"use client";

import { useId, useState } from "react";
import { faq } from "@/lib/copy";
import { PlusIcon } from "@/components/Icons";
import SectionHeading from "@/components/SectionHeading";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const uid = useId();

  return (
    <section id="faq" className="section">
      <div className="shell">
        <SectionHeading title={faq.h2} lead={faq.lead} />

        <div className="mx-auto mt-10 max-w-3xl space-y-3">
          {faq.items.map((item, index) => {
            const open = openIndex === index;
            const buttonId = `${uid}-faq-btn-${index}`;
            const panelId = `${uid}-faq-panel-${index}`;

            return (
              <div key={item.question} className="surface overflow-hidden rounded-card">
                <button
                  type="button"
                  id={buttonId}
                  aria-expanded={open}
                  aria-controls={panelId}
                  // Clicar no item já aberto fecha (volta pra null)
                  onClick={() => setOpenIndex((current) => (current === index ? null : index))}
                  className="group flex w-full items-center justify-between gap-4 p-5 text-left
                             transition-colors duration-150 hover:bg-border/40
                             focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2
                             focus-visible:outline-success"
                >
                  <span className="text-body font-semibold text-ink break-words">
                    {item.question}
                  </span>
                  <PlusIcon
                    className={
                      "h-5 w-5 shrink-0 text-muted transition-transform duration-200 group-hover:text-ink " +
                      (open ? "rotate-45" : "")
                    }
                  />
                </button>

                <div
                  role="region"
                  id={panelId}
                  aria-labelledby={buttonId}
                  // Fora da árvore de acessibilidade quando fechado: sem isso o leitor
                  // de tela lê as 8 respostas em sequência mesmo com o painel colapsado.
                  aria-hidden={!open}
                  className={
                    "grid transition-all duration-300 ease-out " +
                    (open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")
                  }
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-body leading-relaxed text-muted break-words">
                      {item.answer}
                    </p>
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
