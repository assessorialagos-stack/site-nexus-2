import SectionHeading from "@/components/SectionHeading";
import { QuoteMarkIcon } from "@/components/Icons";
import { authority } from "@/lib/copy";

export default function Authority() {
  return (
    <section id="especialista" className="section bg-bg-soft">
      <div className="shell">
        <SectionHeading title={authority.h2} />

        <div className="mt-10 grid grid-cols-1 items-center gap-8 md:mt-14 md:grid-cols-[minmax(0,320px)_1fr] md:gap-12">
          {/* Foto */}
          <div className="mx-auto w-full max-w-[300px] md:mx-0 md:max-w-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={authority.photo}
              alt={authority.photoAlt}
              className="aspect-[4/5] w-full rounded-card border border-border object-cover object-top shadow-card"
              loading="lazy"
            />
          </div>

          {/* Texto */}
          <div>
            <p className="text-h3 text-brand">{authority.name}</p>
            <p className="mt-1.5 text-body font-medium text-ink break-words">{authority.role}</p>

            <div className="mt-5 space-y-4">
              {authority.bio.map((p, i) => (
                <p key={i} className="text-body text-body break-words">
                  {p}
                </p>
              ))}
            </div>

            <blockquote className="mt-6 rounded-card border-l-4 border-brand bg-white p-5 shadow-card md:p-6">
              <QuoteMarkIcon className="h-7 w-7 shrink-0 text-brand md:h-8 md:w-8" />
              <p className="mt-3 text-body font-medium italic text-ink break-words">{authority.quote}</p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
