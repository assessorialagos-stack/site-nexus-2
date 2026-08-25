"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { exitOffer } from "@/lib/copy";
import { XIcon, AlertIcon, CheckIcon } from "@/components/Icons";
import { trackEvent } from "@/lib/track";

const SESSION_KEY = "exitOfferShown";

/** Só começa a valer depois disso, pra não pular na cara de quem acabou de chegar. */
const ARMAR_APOS = 2500;
/** Parada longa sem tocar em nada (e sem vídeo rodando). */
const PARADO_POR = 40000;

/**
 * Pop-up de saída (exit-intent), 100% no próprio site — sem plataforma terceira.
 * Aparece uma única vez por sessão.
 *
 * No computador dá pra ler a intenção de sair pelo cursor. No celular isso não
 * existe: abrir o menu do navegador ou tocar na barra de abas não gera evento
 * nenhum na página. Por isso o celular usa os sinais que realmente dão pra
 * detectar — voltar, sair do app/aba, subir a tela correndo e parada longa.
 */
export default function ExitIntentPopup() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const firedRef = useRef(false);

  const trigger = useCallback(() => {
    if (firedRef.current) return;
    if (typeof window !== "undefined" && sessionStorage.getItem(SESSION_KEY)) return;
    firedRef.current = true;
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* indisponível — segue mesmo assim */
    }
    setOpen(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    let armado = false;
    const armar = window.setTimeout(() => {
      armado = true;
    }, ARMAR_APOS);

    const limpar: Array<() => void> = [];
    const ouvir = (
      alvo: Window | Document,
      evento: string,
      fn: EventListenerOrEventListenerObject,
      opts?: AddEventListenerOptions,
    ) => {
      alvo.addEventListener(evento, fn, opts);
      limpar.push(() => alvo.removeEventListener(evento, fn, opts));
    };

    /* --- Computador: o cursor sai pelo topo da janela --- */
    ouvir(document, "mouseout", ((e: MouseEvent) => {
      if (armado && e.clientY <= 0 && !e.relatedTarget) trigger();
    }) as EventListener);

    const ehToque =
      window.matchMedia?.("(pointer: coarse)").matches || "ontouchstart" in window;

    if (ehToque) {
      /* --- 1) Botão voltar --- */
      history.pushState(null, "", window.location.href);
      ouvir(window, "popstate", () => {
        if (armado) trigger();
      });

      /* --- 2) Trocou de aba, minimizou ou foi pra outro app --- */
      ouvir(document, "visibilitychange", () => {
        if (armado && document.visibilityState === "hidden") trigger();
      });

      /* --- 3) Subiu a tela correndo (padrão de quem vai fechar) --- */
      let ultimoY = window.scrollY;
      let ultimoT = Date.now();
      let maisFundo = window.scrollY;
      ouvir(
        window,
        "scroll",
        () => {
          const y = window.scrollY;
          const t = Date.now();
          const subiu = ultimoY - y;
          const dt = t - ultimoT || 1;
          maisFundo = Math.max(maisFundo, y);
          // subida rápida, chegando perto do topo, depois de já ter descido a página
          if (armado && subiu > 0 && subiu / dt > 1.2 && y < 400 && maisFundo > 600) {
            trigger();
          }
          ultimoY = y;
          ultimoT = t;
        },
        { passive: true },
      );

      /* --- 4) Parada longa (sem contar quem está assistindo ao vídeo) --- */
      let parado: number | undefined;
      const vídeoRodando = () =>
        Array.from(document.querySelectorAll("video")).some((v) => !v.paused && !v.ended);
      const reiniciarParado = () => {
        window.clearTimeout(parado);
        parado = window.setTimeout(() => {
          if (armado && document.visibilityState === "visible" && !vídeoRodando()) trigger();
        }, PARADO_POR);
      };
      (["touchstart", "scroll", "click", "keydown"] as const).forEach((ev) =>
        ouvir(window, ev, reiniciarParado, { passive: true }),
      );
      reiniciarParado();
      limpar.push(() => window.clearTimeout(parado));
    }

    return () => {
      window.clearTimeout(armar);
      limpar.forEach((fn) => fn());
    };
  }, [trigger]);

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
      <div className="animate-fade-in absolute inset-0 bg-navy/70 backdrop-blur-sm" aria-hidden="true" />

      {/* Card */}
      <div
        className="animate-pop-in relative z-10 w-full max-w-[540px] overflow-hidden rounded-2xl bg-white shadow-[0_24px_70px_-20px_rgba(15,28,47,.5)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Faixa de urgência */}
        <div className="relative bg-danger px-10 py-2.5 text-center">
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
            className="absolute right-2.5 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-white/85 transition-colors hover:bg-white/20 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <XIcon className="h-4 w-4" />
          </button>
        </div>

        {/* Corpo */}
        <div className="px-8 pb-7 pt-6 text-center md:px-12">
          <h2 id="exit-title" className="text-balance text-[26px] font-extrabold leading-tight text-ink md:text-[30px]">
            {exitOffer.title.pre}
            <span className="text-danger">{exitOffer.title.hi}</span>
            {exitOffer.title.post}
          </h2>

          <p className="mx-auto mt-3 max-w-[440px] text-body text-muted">
            {exitOffer.body.pre}
            <strong className="font-bold text-ink">{exitOffer.body.hi}</strong>
            {exitOffer.body.post}
          </p>

          <div className="my-5 border-t border-dashed border-border" />

          <p className="text-micro font-semibold uppercase tracking-wide text-muted">
            {exitOffer.priceLead}
          </p>
          <p className="mt-1 text-[56px] font-extrabold leading-none tracking-tight text-cta md:text-[66px]">
            {exitOffer.priceNew}
          </p>
          <p className="mt-2.5 inline-flex items-center gap-1.5 text-micro font-semibold text-ink">
            <CheckIcon className="h-4 w-4 shrink-0 text-cta" />
            {exitOffer.paymentNote}
          </p>

          <div className="mt-6">
            <a
              href={exitOffer.ctaHref}
              className="btn-cta"
              onClick={() => {
                trackEvent("InitiateCheckout", { value: 77, currency: "BRL", content_name: "Oferta de saida" });
                setOpen(false);
              }}
            >
              {exitOffer.cta}
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="mt-3 text-micro text-muted underline-offset-2 transition-colors hover:text-ink hover:underline"
          >
            {exitOffer.dismiss}
          </button>

          <p className="mt-3 text-micro text-muted">{exitOffer.note}</p>
        </div>
      </div>
    </div>
  );
}
