import { CheckIcon } from "@/components/Icons";
import { closing } from "@/lib/copy";

export default function Closing() {
  return (
    <section className="section bg-navy" aria-labelledby="closing-title">
      <div className="shell">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="closing-title" className="text-h2 text-white text-balance">
            {closing.h2}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-body text-white/75">{closing.paragraph}</p>

          <div className="mx-auto mt-8 max-w-md">
            <a href={closing.ctaHref} className="btn-cta">
              {closing.cta}
            </a>
          </div>

          <p className="mx-auto mt-4 max-w-lg text-micro text-white/60">{closing.meta}</p>

          <ul className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2 border-t border-white/15 pt-6">
            {closing.seals.map((seal) => (
              <li key={seal} className="inline-flex items-center gap-2 text-micro font-medium text-white/80">
                <CheckIcon className="h-4 w-4 shrink-0 text-cta" />
                <span className="break-words">{seal}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
