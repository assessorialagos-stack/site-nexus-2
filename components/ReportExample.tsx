"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { reportExample, type ReportTabId } from "@/lib/copy";
import { AlertIcon, CheckIcon, PlusIcon, XIcon } from "@/components/Icons";
import SectionHeading from "@/components/SectionHeading";

type Tone = "success" | "warning" | "danger";

/** Cor do ícone de cada aba, por tom. (success = azul nesta marca.) */
const TONE_TEXT: Record<Tone, string> = {
  success: "text-success",
  warning: "text-highlight",
  danger: "text-danger",
};

function ToneIcon({ tone, className }: { tone: Tone; className?: string }) {
  if (tone === "success") return <CheckIcon className={className} />;
  if (tone === "danger") return <XIcon className={className} />;
  return <AlertIcon className={className} />;
}

const tabDomId = (id: ReportTabId) => `report-tab-${id}`;
/** Painel único e remontado a cada troca — o id precisa ser estável pro aria-controls das 3 abas. */
const PANEL_DOM_ID = "report-panel";

export default function ReportExample() {
  const tabs = reportExample.tabs;
  const [activeId, setActiveId] = useState<ReportTabId>(tabs[0].id);
  // Guarda as imagens que ainda não existem em /public, pra mostrar o aviso no lugar.
  const [missing, setMissing] = useState<Record<string, boolean>>({});
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const activeIndex = tabs.findIndex((t) => t.id === activeId);
  const active = tabs[activeIndex] ?? tabs[0];

  function focusTab(index: number) {
    const next = (index + tabs.length) % tabs.length;
    setActiveId(tabs[next].id);
    tabRefs.current[next]?.focus();
  }

  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      focusTab(index + 1);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      focusTab(index - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      focusTab(0);
    } else if (event.key === "End") {
      event.preventDefault();
      focusTab(tabs.length - 1);
    }
  }

  return (
    <section id="exemplo-relatorio" className="section">
      <div className="shell">
        <SectionHeading title={reportExample.h2} lead={reportExample.lead} />

        {/* Tarja de aviso — largura do conteúdo, centralizada */}
        <div className="mt-6 flex justify-center">
          <p className="inline-flex max-w-full items-center gap-2 rounded-ctl bg-highlight px-4 py-2.5 text-center text-micro font-semibold text-bg">
            <AlertIcon className="h-4 w-4 shrink-0" />
            <span className="break-words">{reportExample.warning}</span>
          </p>
        </div>

        {/* Abas: empilhadas no mobile (3 rótulos completos não cabem lado a lado em 320px,
            e a coluna evita scroll horizontal escondendo a 3ª aba) e em linha no md. */}
        <div
          role="tablist"
          aria-label={reportExample.h2}
          className="surface mx-auto mt-8 flex w-full flex-col gap-1 rounded-ctl p-1 md:flex-row"
        >
          {tabs.map((tab, index) => {
            const isActive = tab.id === activeId;
            return (
              <button
                key={tab.id}
                id={tabDomId(tab.id)}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={PANEL_DOM_ID}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveId(tab.id)}
                onKeyDown={(event) => onTabKeyDown(event, index)}
                className={`flex flex-1 items-center justify-center gap-2 rounded-ctl border px-3 py-3 text-center text-body transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta ${
                  isActive
                    ? "border-border bg-bg font-semibold text-ink"
                    : "border-transparent text-muted hover:text-ink"
                }`}
              >
                <ToneIcon tone={tab.tone} className={`h-4 w-4 shrink-0 ${TONE_TEXT[tab.tone]}`} />
                <span className="break-words">{tab.tabLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Painel — mostra a imagem do relatório da aba ativa. */}
        <div
          key={activeId}
          id={PANEL_DOM_ID}
          role="tabpanel"
          aria-labelledby={tabDomId(active.id)}
          tabIndex={0}
          className="surface-gold animate-fade-slide-up mt-4 p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta md:p-4"
        >
          {missing[active.image] ? (
            // Aviso de imagem pendente — some sozinho assim que o arquivo entrar em /public.
            <div className="flex min-h-[360px] flex-col items-center justify-center gap-3 rounded-ctl border border-dashed border-border bg-bg p-8 text-center">
              <ToneIcon
                tone={active.tone}
                className={`h-10 w-10 shrink-0 ${TONE_TEXT[active.tone]}`}
              />
              <p className="text-body font-semibold text-ink">Exemplo · {active.tabLabel}</p>
              <p className="text-micro text-muted break-words">
                Adicione a imagem em{" "}
                <span className="font-sans text-ink">public{active.image}</span>
              </p>
            </div>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={active.image}
              alt={active.imageAlt}
              onError={() => setMissing((m) => ({ ...m, [active.image]: true }))}
              className="w-full rounded-ctl"
              loading="lazy"
            />
          )}

          {/* Rodapé do painel */}
          <p className="mt-4 border-t border-border pt-4 text-center text-micro text-muted break-words">
            {reportExample.panelFooter}
          </p>
        </div>

        {/* Upsell */}
        <div className="surface mt-6 flex items-start gap-4 p-5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cta/15 text-success">
            <PlusIcon className="h-5 w-5" />
          </span>
          <p className="text-body text-ink break-words">{reportExample.upsell}</p>
        </div>
      </div>
    </section>
  );
}
