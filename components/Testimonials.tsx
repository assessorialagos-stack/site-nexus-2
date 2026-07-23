import { testimonials } from "@/lib/copy";
import { StarIcon } from "@/components/Icons";
import SectionHeading from "@/components/SectionHeading";

const STARS = [0, 1, 2, 3, 4];

export default function Testimonials() {
  return (
    <section id="depoimentos" className="section">
      <div className="shell">
        <SectionHeading title={testimonials.h2} lead={testimonials.lead} />

        <ul className="mt-10 grid items-stretch gap-5 md:grid-cols-3">
          {testimonials.items.map((item) => (
            <li key={item.name} className="h-full">
              <article className="surface flex h-full flex-col p-6">
                <h3 className="text-[20px] font-bold leading-snug text-ink break-words">
                  {item.title}
                </h3>

                <div className="mt-3 flex items-center gap-0.5">
                  <span className="sr-only">Avaliação: 5 de 5 estrelas</span>
                  {STARS.map((i) => (
                    <StarIcon key={i} className="h-4 w-4 shrink-0 text-gold-soft" />
                  ))}
                </div>

                <blockquote className="mt-4 flex-1 text-body italic text-muted break-words">
                  {`“${item.quote}”`}
                </blockquote>

                <footer className="mt-auto flex items-center gap-3 border-t border-border pt-5">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-bold text-white"
                    style={{ backgroundColor: item.avatarColor }}
                    aria-hidden="true"
                  >
                    {item.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="text-body font-semibold text-ink break-words">{item.name}</p>
                    <p className="text-micro text-muted break-words">{item.description}</p>
                  </div>
                </footer>
              </article>
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-8 max-w-2xl text-center text-micro text-muted">
          {testimonials.disclaimer}
        </p>
      </div>
    </section>
  );
}
