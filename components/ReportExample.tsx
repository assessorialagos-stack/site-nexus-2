"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { reportExample, type ReportTabId } from "@/lib/copy";
import { AlertIcon, CheckIcon, PlusIcon, XIcon } from "@/components/Icons";
import SectionHeading from "@/components/SectionHeading";

type Tone = "success" | "warning" | "danger";

/** Classes literais por tom — JIT do Tailwind não resolve strings montadas em runtime. */
const TONE: Record<Tone, { text: string; softBg: string; softBorder: string; bar: string; barSoft: string }> = {
  success: {
    text: "text-success",
    softBg: "bg-success/10",
    softBorder: "border-success/40",
    bar: "bg-success",
    barSoft: "bg-success/25",
  },
  warning: {
    text: "text-highlight",
    softBg: "bg-highlight/10",
    softBorder: "border-highlight/40",
    bar: "bg-highlight",
    barSoft: "bg-highlight/25",
  },
  danger: {
    text: "text-danger",
    softBg: "bg-danger/10",
    softBorder: "border-danger/50",
    bar: "bg-danger",
    barSoft: "bg-danger/30",
  },
};

function ToneIcon({ tone, className }: { tone: Tone; className?: string }) {
  if (tone === "success") return <CheckIcon className={className} />;
  if (tone === "danger") return <XIcon className={className} />;
  return <AlertIcon className={className} />;
}

/** Degradê semântico da escala: topo verde → meio amarelo → base vermelho (cores sólidas por faixa). */
function bandOf(index: number, total: number): Tone {
  if (index < total / 3) return "success";
  if (index < (total * 2) / 3) return "warning";
  return "danger";
}

const tabDomId = (id: ReportTabId) => `report-tab-${id}`;
/** Painel único e remontado a cada troca — o id precisa ser estável pro aria-controls das 3 abas. */
const PANEL_DOM_ID = "report-panel";

export default function ReportExample() {
  const tabs = reportExample.tabs;
  const [activeId, setActiveId] = useState<ReportTabId>(tabs[0].id);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const activeIndex = tabs.findIndex((t) => t.id === activeId);
  const active = tabs[activeIndex] ?? tabs[0];
  const tone = TONE[active.tone];

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

  const levels = reportExample.scaleLevels;

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
            const t = TONE[tab.tone];
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
                className={`flex flex-1 items-center justify-center gap-2 rounded-ctl border px-3 py-3 text-center text-body transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-success ${
                  isActive
                    ? "border-border bg-bg font-semibold text-ink"
                    : "border-transparent text-muted hover:text-ink"
                }`}
              >
                <ToneIcon tone={tab.tone} className={`h-4 w-4 shrink-0 ${t.text}`} />
                <span className="break-words">{tab.tabLabel}</span>
              </button>
            );
          })}
        </div>

        <div
          key={activeId}
          id={PANEL_DOM_ID}
          role="tabpanel"
          aria-labelledby={tabDomId(active.id)}
          tabIndex={0}
          className="surface animate-fade-slide-up mt-4 p-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-success md:p-7"
        >
          {/* a) Cabeçalho tipo documento */}
          <header className="border-b border-border pb-4 md:pb-5">
            <div className="flex justify-end">
              <span className="text-micro text-muted">{reportExample.doc.timestamp}</span>
            </div>
            <h3 className="mt-1 text-h3 uppercase tracking-[0.18em] text-ink break-words">
              {reportExample.doc.title}
            </h3>
            <p className="mt-2 text-micro text-muted break-words">{reportExample.doc.author}</p>
          </header>

          {/* b) Conclusão */}
          <div className="mt-5 rounded-ctl bg-bg p-4 md:mt-6 md:p-5">
            <div className="flex items-start gap-3">
              <ToneIcon tone={active.tone} className={`mt-1 h-5 w-5 shrink-0 ${tone.text}`} />
              <h3 className="text-ink break-words">{reportExample.conclusionTitle}</h3>
            </div>
            <p className="mt-3 text-body text-muted break-words">{active.conclusion}</p>
          </div>

          {/* c) Escala vertical de risco */}
          <div className="mt-5 md:mt-6">
            <h3 className="text-ink break-words">{reportExample.scaleTitle}</h3>

            <ul className="mt-4 flex flex-col gap-1.5">
              {levels.map((level, index) => {
                const band = TONE[bandOf(index, levels.length)];
                const isCurrent = level === active.rating;
                // Trilha mais cheia no topo da escala e mais curta na base.
                const fill = 100 - index * 8;

                return (
                  <li
                    key={level}
                    aria-current={isCurrent ? "true" : undefined}
                    className={`flex items-center gap-3 rounded-ctl border px-2 py-1.5 transition-colors duration-150 ${
                      isCurrent
                        ? `${band.softBg} ${band.softBorder}`
                        : "border-transparent"
                    }`}
                  >
                    <span
                      className={`w-9 shrink-0 text-micro ${
                        isCurrent ? `font-bold ${band.text}` : "text-muted"
                      }`}
                    >
                      {level}
                    </span>

                    <span className="h-2 flex-1 overflow-hidden rounded-full bg-border">
                      <span
                        className={`block h-full rounded-full ${isCurrent ? band.bar : band.barSoft}`}
                        style={{ width: `${fill}%` }}
                      />
                    </span>

                    <span className={`w-4 shrink-0 text-micro ${band.text}`} aria-hidden="true">
                      {isCurrent ? "◀" : ""}
                    </span>
                  </li>
                );
              })}
            </ul>

            <p className="mt-3 text-micro text-muted break-words">{reportExample.scaleCaption}</p>
          </div>

          {/* d) KPIs */}
          <div className="mt-5 grid grid-cols-1 gap-3 md:mt-6 md:grid-cols-3 md:gap-4">
            <div className="surface-gold rounded-ctl bg-bg p-4">
              <p className="text-micro text-muted break-words">{reportExample.kpiLabels.commitment}</p>
              <p className={`num mt-2 text-h3 font-bold break-words ${tone.text}`}>
                {active.kpis.commitment}
              </p>
              <p className="mt-2 text-micro text-muted break-words">
                {reportExample.kpiDescriptions.commitment}
              </p>
            </div>

            <div className="surface-gold rounded-ctl bg-bg p-4">
              <p className="text-micro text-muted break-words">{reportExample.kpiLabels.capacity}</p>
              <p className="num mt-2 text-h3 font-bold text-ink break-words">{active.kpis.capacity}</p>
              {/* kpiDescriptions.capacity é vazio — nada a renderizar */}
            </div>

            <div className="surface-gold rounded-ctl bg-bg p-4">
              <p className="text-micro text-muted break-words">
                {reportExample.kpiLabels.suggestedLimit}
              </p>
              <p className="mt-2">
                <span className="money num inline-block text-h3 break-words">
                  {active.kpis.suggestedLimit}
                </span>
              </p>
              <p className="mt-2 text-micro text-muted break-words">
                {reportExample.kpiDescriptions.suggestedLimit}
              </p>
            </div>
          </div>

          {/* e) Rodapé do painel */}
          <p className="mt-5 border-t border-border pt-4 text-center text-micro text-muted break-words md:mt-6">
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
