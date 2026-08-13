"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { exitOffer } from "@/lib/copy";
import { XIcon, BoltIcon } from "@/components/Icons";

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
      /* sessionStorage indisponível (modo privado antigo) — segue mesmo assim */
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
      window.matchMedia?.("(pointer: coarse)").matches ||
      "ontouchstart" in window;
    const onPopState = () => {
      if (armed) trigger();
    };
    if (isTouch) {
      // Empilha um estado; o primeiro "voltar" cai aqui em vez de sair.
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
      <div className="absolute inset-0 bg-black/75" aria-hidden="true" />

      {/* Card */}
      <div
        className="surface-gold animate-fade-slide-up relative z-10 w-full max-w-md p-6 text-center md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Fechar"
          className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-ink/8 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          <XIcon className="h-5 w-5" />
        </button>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-danger px-4 py-1.5 text-micro font-bold uppercase text-white">
          <BoltIcon className="h-3.5 w-3.5 shrink-0" />
          {exitOffer.eyebrow}
        </span>

        <h2 id="exit-title" className="mt-4 text-h3 text-ink text-balance">
          {exitOffer.title}
        </h2>
        <p className="mt-2 text-body text-muted">{exitOffer.body}</p>

        <div className="mt-5 flex items-end justify-center gap-3">
          <span className="text-body text-muted line-through">{exitOffer.priceOld}</span>
          <span className="text-[44px] font-extrabold leading-none tracking-tight text-gold md:text-[52px]">
            {exitOffer.priceNew}
          </span>
        </div>

        <div className="mt-6">
          <a href={exitOffer.ctaHref} className="btn-cta" onClick={() => setOpen(false)}>
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

        <p className="mt-4 text-micro text-muted">{exitOffer.note}</p>
      </div>
    </div>
  );
}
