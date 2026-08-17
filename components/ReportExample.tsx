"use client";

import { useCallback, useRef, useState } from "react";
import { reportExample } from "@/lib/copy";
import { AlertIcon, ChevronDownIcon } from "@/components/Icons";
import SectionHeading from "@/components/SectionHeading";

export default function ReportExample() {
  const slides = reportExample.slides;
  const n = slides.length;
  const [i, setI] = useState(0);
  const touchX = useRef<number | null>(null);

  const go = useCallback(
    (delta: number) => setI((cur) => (cur + delta + n) % n),
    [n],
  );

  const current = slides[i];

  return (
    <section id="exemplo" className="section bg-bg">
      <div className="shell">
        <SectionHeading eyebrow={reportExample.eyebrow} title={reportExample.h2} lead={reportExample.lead} />

        {/* Aviso */}
        <div className="mt-6 flex justify-center">
          <p className="inline-flex max-w-full items-center gap-2 rounded-full border border-star/30 bg-star/10 px-4 py-2 text-micro font-semibold text-ink">
            <AlertIcon className="h-4 w-4 shrink-0 text-star" />
            <span className="break-words">{reportExample.warning}</span>
          </p>
        </div>

        {/* Carrossel */}
        <div
          className="mx-auto mt-8 w-full max-w-[600px]"
          role="group"
          aria-roledescription="carrossel"
          aria-label={reportExample.h2}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") {
              e.preventDefault();
              go(-1);
            } else if (e.key === "ArrowRight") {
              e.preventDefault();
              go(1);
            }
          }}
        >
          <div
            className="card overflow-hidden p-2 md:p-3"
            onTouchStart={(e) => {
              touchX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (touchX.current == null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (Math.abs(dx) > 45) go(dx < 0 ? 1 : -1);
              touchX.current = null;
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={current.image}
              src={current.image}
              alt={current.alt}
              className="animate-fade-in w-full rounded-ctl border border-border"
              loading="lazy"
            />
          </div>

          {/* Legenda */}
          <p aria-live="polite" className="mt-4 text-center text-body font-semibold text-ink break-words">
            {current.caption}
          </p>

          {/* Controles */}
          <div className="mt-4 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Página anterior"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-white text-brand shadow-card transition-colors hover:bg-brand-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              <ChevronDownIcon className="h-5 w-5 rotate-90" />
            </button>

            {/* Dots */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {slides.map((s, idx) => (
                <button
                  key={s.image}
                  type="button"
                  onClick={() => setI(idx)}
                  aria-label={`Ir para a página ${idx + 1}`}
                  aria-current={idx === i ? "true" : undefined}
                  className={`h-2.5 rounded-full transition-all ${
                    idx === i ? "w-6 bg-brand" : "w-2.5 bg-border hover:bg-muted"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Próxima página"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-white text-brand shadow-card transition-colors hover:bg-brand-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              <ChevronDownIcon className="h-5 w-5 -rotate-90" />
            </button>
          </div>

          <p className="mt-3 text-center text-micro font-medium text-muted">
            {i + 1} de {n}
          </p>
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-micro text-muted">{reportExample.note}</p>
      </div>
    </section>
  );
}
