import { CheckIcon, PlayIcon } from "@/components/Icons";
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

        <div className="mx-auto mt-8 w-full max-w-[720px] md:mt-10">
          {/* Placeholder estático do VSL: sem <video>/<img> até o vídeo final existir. */}
          <div className="flex aspect-video w-full items-center justify-center rounded-card border border-border bg-surface">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-cta md:h-20 md:w-20">
              <PlayIcon className="ml-1 h-6 w-6 shrink-0 text-white md:h-7 md:w-7" />
            </span>
          </div>

          <p className="mt-4 text-center text-micro uppercase tracking-[0.18em] text-muted break-words">
            {hero.videoPlaceholderLabel}
          </p>
          <p className="mt-2 text-center text-micro text-muted">{hero.videoCaption}</p>
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
