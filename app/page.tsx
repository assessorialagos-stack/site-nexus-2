"use client";

import { useCallback, useEffect, useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import Differentiation from "@/components/Differentiation";
import Process from "@/components/Process";
import Deliverable from "@/components/Deliverable";
import ReportExample from "@/components/ReportExample";
import Authority from "@/components/Authority";
import Offer from "@/components/Offer";
import Faq from "@/components/Faq";
import Closing from "@/components/Closing";
import Footer from "@/components/Footer";
import ExitIntentPopup from "@/components/ExitIntentPopup";

/** Quem já assistiu nesta sessão não é obrigado a ver tudo de novo ao recarregar. */
const SESSION_KEY = "vslAssistida";

/** Teclas que rolam a página — bloqueadas enquanto o vídeo não termina. */
const TECLAS_DE_ROLAGEM = new Set([
  " ",
  "PageDown",
  "PageUp",
  "End",
  "Home",
  "ArrowDown",
  "ArrowUp",
]);

export default function Page() {
  const [liberado, setLiberado] = useState(false);

  const liberar = useCallback(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* indisponível — segue mesmo assim */
    }
    setLiberado(true);
  }, []);

  /* Voltou na mesma sessão: já pode ver a página inteira. */
  useEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_KEY)) setLiberado(true);
    } catch {
      /* indisponível */
    }
  }, []);

  /* Trava a rolagem da página enquanto o vídeo não termina. */
  useEffect(() => {
    if (liberado) return;

    const html = document.documentElement;
    const overflowBody = document.body.style.overflow;
    const overflowHtml = html.style.overflow;
    document.body.style.overflow = "hidden";
    html.style.overflow = "hidden";

    const bloquearTeclas = (e: KeyboardEvent) => {
      const alvo = e.target as HTMLElement | null;
      // não atrapalha quem está digitando nem os controles do player
      if (alvo && /^(INPUT|TEXTAREA|SELECT|VIDEO)$/.test(alvo.tagName)) return;
      if (TECLAS_DE_ROLAGEM.has(e.key)) e.preventDefault();
    };
    window.addEventListener("keydown", bloquearTeclas, { passive: false });

    return () => {
      document.body.style.overflow = overflowBody;
      html.style.overflow = overflowHtml;
      window.removeEventListener("keydown", bloquearTeclas);
    };
  }, [liberado]);

  return (
    <>
      {/*
        Enquanto travado, o topo vira um painel que ocupa a tela toda: a página
        não rola, mas dentro do painel dá para alcançar o vídeo inteiro — no
        celular ele é mais alto que a tela. O Hero fica sempre na mesma posição
        da árvore para o vídeo não reiniciar na hora de liberar.
      */}
      <div
        className={
          liberado ? undefined : "fixed inset-0 z-40 overflow-y-auto overscroll-contain bg-bg"
        }
      >
        <Header />
        <main>
          <Hero onVideoEnd={liberar} isVideoFinished={liberado} />
          {liberado && (
            <>
              <Benefits />
              <Differentiation />
              <Process />
              <Deliverable />
              <ReportExample />
              <Authority />
              <Offer />
              <Faq />
              <Closing />
            </>
          )}
        </main>
      </div>

      {liberado && (
        <>
          <Footer />
          <ExitIntentPopup />
        </>
      )}
    </>
  );
}
