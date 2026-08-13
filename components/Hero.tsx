import { CheckIcon } from "@/components/Icons";
import { hero } from "@/lib/copy";

export default function Hero() {
  return (
    <section id="hero" className="pt-12 pb-14 md:pt-20 md:pb-20">
      <div className="shell">
        <h1 className="text-h1 text-balance text-center text-ink break-words">{hero.h1}</h1>

        <ul className="mt-6 flex flex-wrap items-center justify-center gap-2 md:mt-7 md:gap-3">
          {hero.badges.map((badge) => (
            <li
              key={badge}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-micro text-muted"
            >
              <CheckIcon className="h-3.5 w-3.5 shrink-0 text-success" />
              <span>{badge}</span>
            </li>
          ))}
        </ul>

        {/* VSL: o vídeo é vertical (9:16). No mobile ocupa o quadro retrato inteiro;
            no desktop fica num quadro 16:9 com tarjas pretas nas laterais (só pra
            preencher o espaço). object-contain garante que o vídeo nunca é cortado. */}
        <div className="mx-auto mt-8 w-full max-w-[340px] md:mt-10 md:max-w-[800px]">
          <div className="aspect-[9/16] overflow-hidden rounded-card border border-border bg-black md:aspect-video">
            <video
              className="h-full w-full object-contain"
              src="/vsl.mp4"
              poster="/vsl-poster.jpg"
              controls
              playsInline
              preload="metadata"
            />
          </div>
          <p className="mt-4 text-center text-micro text-muted">{hero.videoCaption}</p>
        </div>

        <div className="mx-auto mt-8 w-full max-w-[420px] md:mt-10">
          <a href={hero.ctaHref} className="btn-cta">
            {hero.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
