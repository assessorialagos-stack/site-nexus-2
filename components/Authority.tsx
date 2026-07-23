import SectionHeading from "@/components/SectionHeading";
import { QuoteMarkIcon } from "@/components/Icons";
import { authority } from "@/lib/copy";

export default function Authority() {
  return (
    <section id="autoridade" className="section">
      <div className="shell">
        <SectionHeading title={authority.h2} lead={authority.lead} />

        <div className="mt-10 grid grid-cols-1 items-start gap-8 md:mt-14 md:grid-cols-[minmax(0,340px)_1fr]">
          {/* Foto real do especialista — no mobile fica no topo e com largura limitada */}
          <div className="mx-auto w-full max-w-[300px] md:mx-0 md:max-w-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={authority.photo}
              alt={authority.photoAlt}
              className="aspect-[4/5] w-full rounded-card border border-border object-cover object-top"
              loading="lazy"
            />
          </div>

          <div>
            <h3 className="text-h2 font-bold text-ink break-words">{authority.name}</h3>
            <p className="mt-2 text-body text-muted break-words">{authority.role}</p>

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
