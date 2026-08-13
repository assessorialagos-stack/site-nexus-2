"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { exitOffer } from "@/lib/copy";
import { XIcon, AlertIcon, CheckIcon } from "@/components/Icons";

const SESSION_KEY = "exitOfferShown";

/**
 * Pop-up de saída (exit-intent), 100% no próprio site — sem plataforma terceira.
 * Dispara uma única vez por sessão quando a pessoa demonstra intenção de sair:
 *  - Desktop: o cursor sobe pra fora da janela (barra de abas / botão fechar).
 *  - Mobile: toque no "voltar" do navegador (armadilha de histórico).
 */
export default function ExitIntentPopup() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  // Evita reabrir na mesma sessão mesmo antes do state atualizar.
  const firedRef = useRef(false);

  const trigger = useCallback(() => {
    if (firedRef.current) return;
    if (typeof window !== "undefined" && sessionStorage.getItem(SESSION_KEY)) return;
    firedRef.current = true;
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* sessionStorage indisponível — segue mesmo assim */
    }
    setOpen(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    // Pequena folga pra não disparar em movimentos logo no carregamento.
    let armed = false;
    const armTimer = window.setTimeout(() => {
      armed = true;
    }, 2500);

    // --- Desktop: cursor saindo pelo topo ---
    const onMouseOut = (e: MouseEvent) => {
      if (!armed) return;
      if (e.clientY <= 0 && !e.relatedTarget) trigger();
    };

    // --- Mobile / touch: botão voltar ---
    const isTouch =
      window.matchMedia?.("(pointer: coarse)").matches || "ontouchstart" in window;
    const onPopState = () => {
      if (armed) trigger();
    };
    if (isTouch) {
      history.pushState(null, "", window.location.href);
      window.addEventListener("popstate", onPopState);
    }

    document.addEventListener("mouseout", onMouseOut);

    return () => {
      window.clearTimeout(armTimer);
      document.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("popstate", onPopState);
    };
  }, [trigger]);

  // Trava o scroll do fundo e foca o botão fechar enquanto aberto.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-title"
      onClick={() => setOpen(false)}
    >
      {/* Backdrop */}
      <div
        className="animate-fade-in absolute inset-0 bg-black/80 backdrop-blur-sm"
        aria-hidden="true"
      />

      {/* Card — mais largo pra respirar nas laterais e ficar menos comprido */}
      <div
        className="animate-pop-in relative z-10 w-full max-w-[540px] overflow-hidden rounded-2xl border border-gold/40 bg-surface shadow-[0_24px_70px_-20px_rgba(0,0,0,.8)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Brilho dourado de fundo */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_40%,rgba(201,162,39,0.22),transparent_62%)]"
        />

        {/* Faixa de urgência no topo */}
        <div className="relative z-10 bg-danger px-10 py-2.5 text-center">
          <p className="flex items-center justify-center gap-2 text-micro font-extrabold uppercase tracking-wider text-white">
            <AlertIcon className="h-3.5 w-3.5 shrink-0" />
            {exitOffer.eyebrow}
            <AlertIcon className="h-3.5 w-3.5 shrink-0" />
          </p>
          <button
            ref={closeRef}
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Fechar"
            className="absolute right-2.5 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/20 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <XIcon className="h-4 w-4" />
          </button>
        </div>

        {/* Corpo */}
        <div className="relative z-10 px-8 pb-7 pt-6 text-center md:px-12">
          <h2
            id="exit-title"
            className="text-balance font-display text-[26px] font-bold leading-tight text-ink md:text-[31px]"
          >
            {exitOffer.title.pre}
            <span className="text-gold">{exitOffer.title.hi}</span>
            {exitOffer.title.post}
          </h2>

          <p className="mx-auto mt-3 max-w-[440px] text-body text-muted">
            {exitOffer.body.pre}
            <strong className="font-bold text-ink">{exitOffer.body.hi}</strong>
            {exitOffer.body.post}
          </p>

          {/* Divisor tracejado (eco da referência) */}
          <div className="my-5 border-t border-dashed border-border" />

          {/* Preço */}
          <p className="text-micro font-semibold uppercase tracking-wide text-muted">
            {exitOffer.priceLead}
          </p>
          <p className="mt-1 text-[56px] font-extrabold leading-none tracking-tight text-gold [text-shadow:0_2px_26px_rgba(201,162,39,0.45)] md:text-[70px]">
            {exitOffer.priceNew}
          </p>
          <p className="mt-3 inline-flex items-center gap-1.5 text-body font-semibold text-ink">
            <CheckIcon className="h-4 w-4 shrink-0 text-success" />
            {exitOffer.paymentNote}
          </p>

          {/* CTA — maior, com brilho */}
          <div className="mt-6">
            <a
              href={exitOffer.ctaHref}
              onClick={() => setOpen(false)}
              className="relative inline-flex w-full items-center justify-center gap-2 rounded-ctl bg-gradient-to-b from-royal to-cta px-6 py-5 text-[19px] font-extrabold uppercase tracking-wide text-white shadow-[0_6px_0_rgba(0,0,0,.25),0_0_36px_-2px_rgba(46,123,232,.85)] transition-all duration-150 hover:from-royal-soft hover:to-cta-hover active:translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold md:text-[21px]"
            >
              {exitOffer.cta}
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="mt-4 text-micro text-muted underline-offset-2 transition-colors hover:text-ink hover:underline"
          >
            {exitOffer.dismiss}
          </button>

          <p className="mt-3 text-micro text-muted">{exitOffer.note}</p>
        </div>
      </div>
    </div>
  );
}
