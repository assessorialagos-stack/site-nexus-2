import { CheckIcon } from "@/components/Icons";
import { hero } from "@/lib/copy";

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-bg">
      {/* leve tom azul no topo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-gradient-to-b from-brand-soft to-transparent"
      />
      <div className="shell relative pt-12 pb-14 md:pt-16 md:pb-20">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12">
          {/* Texto */}
          <div className="text-center md:text-left">
            <span className="eyebrow">{hero.eyebrow}</span>

            <h1 className="text-h1 mt-5 text-ink text-balance">{hero.h1}</h1>

            <p className="mx-auto mt-5 max-w-xl text-body text-muted md:mx-0">{hero.sub}</p>

            <div className="mx-auto mt-8 max-w-md md:mx-0">
              <a href={hero.ctaHref} className="btn-cta">
                {hero.cta}
              </a>
              <p className="mt-3 text-micro font-medium text-muted">{hero.ctaSub}</p>
            </div>

            <ul className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2 md:justify-start">
              {hero.badges.map((badge) => (
                <li key={badge} className="trust-chip">
                  <CheckIcon className="h-4 w-4 shrink-0 text-cta" />
                  <span>{badge}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* VSL vertical (9:16) */}
          <div className="mx-auto w-full max-w-[320px] md:max-w-[360px]">
            <div className="overflow-hidden rounded-card border border-border bg-navy shadow-card-hover">
              <video
                className="aspect-[9/16] w-full bg-navy object-cover"
                src="/vsl.mp4"
                poster="/vsl-poster.jpg"
                controls
                playsInline
                preload="metadata"
              />
            </div>
            <p className="mt-3 text-center text-micro font-medium text-muted">{hero.videoCaption}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
