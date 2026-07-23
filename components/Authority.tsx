import SectionHeading from "@/components/SectionHeading";
import { PersonSilhouetteIcon, QuoteMarkIcon } from "@/components/Icons";
import { authority } from "@/lib/copy";

export default function Authority() {
  return (
    <section id="autoridade" className="section">
      <div className="shell">
        <SectionHeading title={authority.h2} lead={authority.lead} />

        <div className="mt-10 grid grid-cols-1 items-start gap-8 md:mt-14 md:grid-cols-[minmax(0,340px)_1fr]">
          {/* Coluna da foto — no mobile fica no topo e com largura limitada */}
          <div className="mx-auto w-full max-w-[260px] md:mx-0 md:max-w-none">
            <div className="flex aspect-[4/5] w-full items-center justify-center rounded-card bg-border">
              <PersonSilhouetteIcon className="h-24 w-24 shrink-0 text-white/70 md:h-28 md:w-28" />
            </div>
            <p className="mt-3 text-center text-micro uppercase tracking-[0.16em] text-muted break-words">
              {authority.photoPlaceholderLabel}
            </p>
          </div>

          <div>
            <h3 className="text-h2 font-bold text-ink break-words">{authority.name}</h3>
            <p className="mt-2 text-body text-muted break-words">{authority.role}</p>

            <ul className="mt-6 grid grid-cols-3 gap-3">
              {authority.stats.map((stat) => (
                <li key={stat.value} className="surface p-3 text-center md:p-4">
                  <p className="text-h3 font-bold text-ink break-words">{stat.value}</p>
                  <p className="mt-1 text-micro text-muted break-words">{stat.label}</p>
                </li>
              ))}
            </ul>

            <blockquote className="surface-gold mt-6 border-l-4 border-gold p-5 md:p-6">
              <QuoteMarkIcon className="h-8 w-8 shrink-0 text-gold md:h-10 md:w-10" />
              <p className="mt-3 text-body italic text-ink break-words">{authority.quote}</p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
