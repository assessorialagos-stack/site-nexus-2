"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/track";

/**
 * Se o vídeo não conseguir nem começar a carregar nesse tempo, liberamos a
 * página assim mesmo. Ninguém pode ficar preso olhando uma tela morta por
 * causa de conexão ruim ou de um navegador que não deu conta do arquivo.
 */
const ESPERA_MAXIMA = 15000;
/** Ativar o som logo no começo volta pro início — o gancho não pode se perder. */
const REINICIA_ATE = 10;

type Motivo = "fim" | "falha";

type Props = {
  src: string;
  poster: string;
  onComplete: (motivo: Motivo) => void;
  /** Depois de liberado o player vira um player comum, sem travas. */
  liberado: boolean;
};

export default function VslPlayer({ src, poster, onComplete, liberado }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  /** Ponto mais avançado já assistido de verdade — é o que impede pular pro fim. */
  const maisLonge = useRef(0);
  const concluido = useRef(false);
  const [iniciado, setIniciado] = useState(false);
  const [mudo, setMudo] = useState(true);
  const [pausado, setPausado] = useState(true);
  const [pct, setPct] = useState(0);
  const [falhou, setFalhou] = useState(false);

  const concluir = useCallback(
    (motivo: Motivo) => {
      if (concluido.current) return;
      concluido.current = true;
      if (motivo === "fim") {
        trackEvent("ViewContent", { content_name: "VSL assistida ate o fim" });
      } else {
        setFalhou(true);
      }
      onComplete(motivo);
    },
    [onComplete],
  );

  /* Rede de segurança: vídeo que nem carrega não pode prender a pessoa. */
  useEffect(() => {
    if (liberado) return;
    const t = window.setTimeout(() => {
      const v = ref.current;
      // readyState < 2 = nem o primeiro quadro chegou
      if (!v || v.readyState < 2) concluir("falha");
    }, ESPERA_MAXIMA);
    return () => window.clearTimeout(t);
  }, [liberado, concluir]);

  /* Tenta começar mudo sozinho (é o que os navegadores permitem). */
  useEffect(() => {
    const v = ref.current;
    if (!v || liberado) return;
    v.muted = true;
    v.play()
      .then(() => {
        setIniciado(true);
        setPausado(false);
      })
      .catch(() => {
        /* autoplay bloqueado — a pessoa toca para começar */
      });
  }, [liberado]);

  const tocarComSom = async () => {
    const v = ref.current;
    if (!v) return;
    v.muted = false;
    setMudo(false);
    if (v.currentTime < REINICIA_ATE) {
      v.currentTime = 0;
    }
    try {
      await v.play();
      setIniciado(true);
      setPausado(false);
    } catch {
      setFalhou(true);
    }
  };

  const alternarPausa = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) void v.play();
    else v.pause();
  };

  const aoAvancar = () => {
    const v = ref.current;
    if (!v) return;
    if (v.currentTime > maisLonge.current) maisLonge.current = v.currentTime;
    if (v.duration) {
      setPct(Math.min(100, (maisLonge.current / v.duration) * 100));
      // Alguns navegadores engolem o "ended"; fechamos pelo tempo também.
      if (v.duration - v.currentTime < 0.35) concluir("fim");
    }
  };

  /* Impede pular pra frente. Voltar atrás continua liberado. */
  const aoBuscar = () => {
    const v = ref.current;
    if (!v || liberado) return;
    if (v.currentTime > maisLonge.current + 0.5) {
      v.currentTime = maisLonge.current;
    }
  };

  /*
    Enquanto travado o vídeo se encaixa na altura que sobra na tela, mantendo o
    9:16 — assim ele aparece inteiro de primeira, sem obrigar ninguém a rolar
    atrás do próprio vídeo. Depois de liberado volta ao tamanho normal.
  */
  const larguraTravada = "max(190px, min(320px, 90vw, calc((100dvh - 300px) * 9 / 16)))";

  return (
    <div
      className="mx-auto w-full max-w-[320px] md:max-w-[340px]"
      style={liberado ? undefined : { width: larguraTravada, maxWidth: "100%" }}
    >
      <div className="relative overflow-hidden rounded-card border border-border bg-navy shadow-card-hover">
        <video
          ref={ref}
          className="aspect-[9/16] w-full bg-navy object-cover"
          src={src}
          poster={poster}
          playsInline
          preload="auto"
          controls={liberado}
          controlsList={liberado ? undefined : "nodownload noplaybackrate"}
          disablePictureInPicture={!liberado}
          onTimeUpdate={aoAvancar}
          onSeeking={aoBuscar}
          onEnded={() => concluir("fim")}
          onError={() => concluir("falha")}
          onPlay={() => setPausado(false)}
          onPause={() => setPausado(true)}
          onContextMenu={(e) => !liberado && e.preventDefault()}
        />

        {/* Camada de toque enquanto o vídeo está travado */}
        {!liberado && (
          <button
            type="button"
            onClick={iniciado && !mudo ? alternarPausa : tocarComSom}
            aria-label={iniciado && !mudo ? (pausado ? "Continuar" : "Pausar") : "Assistir com som"}
            className="absolute inset-0 flex flex-col items-center justify-end pb-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white"
          >
            {/* Escurece só quando está parado — vídeo rodando fica limpo */}
            {(!iniciado || pausado) && (
              <>
                <span className="absolute inset-0 bg-navy/50" aria-hidden="true" />
                <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 shadow-lg">
                  <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-navy" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </>
            )}

            {/* Rodando no mudo: chama pro som sem tapar a imagem */}
            {(!iniciado || pausado || mudo) && (
              <span className="relative inline-flex items-center gap-1.5 rounded-full bg-white/95 px-4 py-2 text-micro font-bold text-navy shadow-lg">
                <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 fill-navy" aria-hidden="true">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4zM14 3.2v2.1a6.8 6.8 0 0 1 0 13.4v2.1a8.9 8.9 0 0 0 0-17.6z" />
                </svg>
                {!iniciado ? "Toque para assistir" : pausado ? "Toque para continuar" : "Toque para ativar o som"}
              </span>
            )}
          </button>
        )}
      </div>

      {/* Progresso — só indica, não dá para arrastar */}
      {!liberado && !falhou && (
        <div className="mt-3">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-border" role="presentation">
            <div
              className="h-full rounded-full bg-brand transition-[width] duration-300"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
