"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { exitOffer } from "@/lib/copy";
import { XIcon, BoltIcon, ShieldIcon } from "@/components/Icons";

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

      {/* Card */}
      <div
        className="animate-pop-in relative z-10 w-full max-w-[420px] overflow-hidden rounded-[18px] border border-gold/40 bg-surface shadow-[0_24px_70px_-20px_rgba(0,0,0,.8)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Fio + brilho dourado no topo */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-gold to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-gold/15 to-transparent"
        />

        <button
          ref={closeRef}
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Fechar"
          className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-ink/8 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          <XIcon className="h-5 w-5" />
        </button>

        <div className="relative px-6 pb-7 pt-9 text-center md:px-8">
          {/* Selo */}
          <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1 text-micro font-extrabold uppercase tracking-wider text-gold-soft">
            <BoltIcon className="h-3.5 w-3.5 shrink-0" />
            {exitOffer.eyebrow}
          </span>

          <h2
            id="exit-title"
            className="mt-4 text-balance font-display text-[26px] font-bold leading-tight text-ink md:text-[28px]"
          >
            {exitOffer.title}
          </h2>
          <p className="mx-auto mt-2 max-w-[300px] text-body text-muted">{exitOffer.body}</p>

          {/* Preço */}
          <div className="mt-6">
            <p className="text-micro font-semibold uppercase tracking-wide text-muted">
              De <span className="line-through">{exitOffer.priceOld}</span> por apenas
            </p>
            <p className="mt-1 text-[52px] font-extrabold leading-none tracking-tight text-gold md:text-[60px]">
              {exitOffer.priceNew}
            </p>
            <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-gold/25 bg-gold/10 px-3 py-1 text-micro font-bold text-gold-soft">
              Você economiza {exitOffer.save}
            </span>
          </div>

          {/* CTA */}
          <div className="mt-6">
            <a href={exitOffer.ctaHref} className="btn-cta" onClick={() => setOpen(false)}>
              {exitOffer.cta}
            </a>
          </div>

          {/* Confiança */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-micro text-muted">
            <span className="inline-flex items-center gap-1.5">
              <ShieldIcon className="h-4 w-4 shrink-0 text-success" />
              Pagamento seguro
            </span>
            <span aria-hidden="true">·</span>
            <span>{exitOffer.note}</span>
          </div>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="mt-4 text-micro text-muted underline-offset-2 transition-colors hover:text-ink hover:underline"
          >
            {exitOffer.dismiss}
          </button>
        </div>
      </div>
    </div>
  );
}
