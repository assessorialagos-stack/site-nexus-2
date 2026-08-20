import { CheckIcon } from "@/components/Icons";
import { hero } from "@/lib/copy";
import CtaLink from "@/components/CtaLink";

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-bg">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[380px] bg-gradient-to-b from-brand-soft to-transparent"
      />
      <div className="shell relative pt-12 pb-14 md:pt-16 md:pb-20">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">{hero.eyebrow}</span>

          <h1 className="text-h1 mx-auto mt-5 max-w-3xl text-ink text-balance">{hero.h1}</h1>

          <p className="mx-auto mt-5 max-w-2xl text-body text-muted">{hero.sub}</p>

          {/* VSL vertical (9:16), centralizada abaixo do título */}
          <div className="mx-auto mt-9 w-full max-w-[320px] md:max-w-[340px]">
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
            <p className="mt-3 text-micro font-medium text-muted">{hero.videoCaption}</p>
          </div>

          {/* CTA abaixo do vídeo */}
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
      </div>
    </section>
  );
}
