"use client";

import { CheckIcon } from "@/components/Icons";
import { hero } from "@/lib/copy";
import CtaLink from "@/components/CtaLink";
import VslPlayer from "@/components/VslPlayer";

type Props = {
  /** Chamado quando o vídeo termina (ou falha), liberando o restante da página. */
  onVideoEnd?: (motivo: "fim" | "falha") => void;
  /** Enquanto false, só o vídeo fica em pé — o resto do hero espera. */
  isVideoFinished?: boolean;
};

export default function Hero({ onVideoEnd, isVideoFinished = true }: Props) {
  return (
    <section id="hero" className="relative overflow-hidden bg-bg">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[380px] bg-gradient-to-b from-brand-soft to-transparent"
      />
      <div className={`shell relative ${isVideoFinished ? "pt-10 pb-12 md:pt-16 md:pb-20" : "pt-5 pb-8 md:pt-10 md:pb-12"}`}>
        <div className="mx-auto max-w-3xl text-center">
          <span className={`eyebrow ${isVideoFinished ? "" : "[@media(max-height:720px)]:hidden"}`}>
            {hero.eyebrow}
          </span>

          <h1
            className={`mx-auto mt-4 max-w-3xl text-ink text-balance ${
              isVideoFinished
                ? "text-h1"
                : "text-[26px] font-extrabold leading-[1.15] [@media(max-height:720px)]:text-[20px] md:text-[38px]"
            }`}
          >
            {hero.h1}
          </h1>

          {isVideoFinished && <p className="mx-auto mt-5 max-w-2xl text-body text-muted">{hero.sub}</p>}

          {/* VSL vertical (9:16) */}
          <div className={isVideoFinished ? "mt-8 md:mt-9" : "mt-5 md:mt-7"}>
            <VslPlayer
              src="/vsl.mp4"
              poster="/vsl-poster.jpg"
              liberado={isVideoFinished}
              onComplete={(motivo) => onVideoEnd?.(motivo)}
            />
            <p className="mx-auto mt-3 max-w-[340px] text-micro font-medium text-muted">
              {isVideoFinished ? hero.videoCaption : hero.videoGate}
            </p>
          </div>

          {isVideoFinished && (
            <div className="animate-fade-in">
              <div className="mx-auto mt-8 max-w-md">
                <CtaLink href={hero.ctaHref} value={97} contentName="Diagnostico Financeiro Completo">
                  {hero.cta}
                </CtaLink>
                <p className="mt-3 text-micro font-medium text-muted">{hero.ctaSub}</p>
              </div>

              <ul className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2">
                {hero.badges.map((badge) => (
                  <li key={badge} className="trust-chip">
                    <CheckIcon className="h-4 w-4 shrink-0 text-cta" />
                    <span>{badge}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
