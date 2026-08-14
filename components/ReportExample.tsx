"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { reportExample, deliverable, type ReportTabId } from "@/lib/copy";
import { AlertIcon, CheckIcon, XIcon } from "@/components/Icons";

type Tone = "success" | "warning" | "danger";

const TONE_TEXT: Record<Tone, string> = {
  success: "text-cta",
  warning: "text-star",
  danger: "text-danger",
};

function ToneIcon({ tone, className }: { tone: Tone; className?: string }) {
  if (tone === "success") return <CheckIcon className={className} />;
  if (tone === "danger") return <XIcon className={className} />;
  return <AlertIcon className={className} />;
}

const tabDomId = (id: ReportTabId) => `report-tab-${id}`;
const PANEL_DOM_ID = "report-panel";

export default function ReportExample() {
  const tabs = reportExample.tabs;
  const [activeId, setActiveId] = useState<ReportTabId>(tabs[0].id);
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
    <section id="exemplo" className="section bg-bg">
      <div className="shell">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-h2 text-ink text-balance">{deliverable.proofLabel}</h2>
          <div className="rule mx-auto mt-5" />
        </div>

        {/* Aviso */}
        <div className="mt-6 flex justify-center">
          <p className="inline-flex max-w-full items-center gap-2 rounded-full border border-star/30 bg-star/10 px-4 py-2 text-micro font-semibold text-ink">
            <AlertIcon className="h-4 w-4 shrink-0 text-star" />
            <span className="break-words">{reportExample.warning}</span>
          </p>
        </div>

        {/* Abas */}
        <div
          role="tablist"
          aria-label={deliverable.proofLabel}
          className="mx-auto mt-8 flex w-full max-w-xl flex-col gap-1.5 rounded-ctl border border-border bg-bg-soft p-1.5 md:flex-row"
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
                className={`flex flex-1 items-center justify-center gap-2 rounded-[9px] px-3 py-2.5 text-center text-body font-semibold transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
                  isActive ? "bg-white text-ink shadow-card" : "text-muted hover:text-ink"
                }`}
              >
                <ToneIcon tone={tab.tone} className={`h-4 w-4 shrink-0 ${TONE_TEXT[tab.tone]}`} />
                <span className="break-words">{tab.tabLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Painel */}
        <div
          key={activeId}
          id={PANEL_DOM_ID}
          role="tabpanel"
          aria-labelledby={tabDomId(active.id)}
          tabIndex={0}
          className="card animate-fade-slide-up mx-auto mt-4 max-w-2xl p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand md:p-4"
        >
          {missing[active.image] ? (
            <div className="flex min-h-[320px] flex-col items-center justify-center gap-3 rounded-ctl border border-dashed border-border bg-bg-soft p-8 text-center">
              <ToneIcon tone={active.tone} className={`h-10 w-10 shrink-0 ${TONE_TEXT[active.tone]}`} />
              <p className="text-body font-semibold text-ink">Exemplo · {active.tabLabel}</p>
              <p className="text-micro text-muted break-words">
                Adicione a imagem em <span className="font-medium text-ink">public{active.image}</span>
              </p>
            </div>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={active.image}
              alt={active.imageAlt}
              onError={() => setMissing((m) => ({ ...m, [active.image]: true }))}
              className="w-full rounded-ctl border border-border"
              loading="lazy"
            />
          )}

          <p className="mt-4 border-t border-border pt-4 text-center text-micro text-muted break-words">
            {reportExample.panelFooter}
          </p>
        </div>
      </div>
    </section>
  );
}
