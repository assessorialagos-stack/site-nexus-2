import { closing } from "@/lib/copy";
import { CheckIcon } from "@/components/Icons";

/**
 * Seção 8 — Fechamento.
 * Optei pelo card .surface (em vez de pintar a seção inteira) porque o fundo da página
 * já é escuro: o card cria o "quadro" do fecho sem competir com as seções vizinhas.
 */
export default function Closing() {
  return (
    <section className="section" aria-labelledby="closing-title">
      <div className="shell">
        <div className="surface mx-auto max-w-3xl p-6 text-center md:p-10">
          <h2 id="closing-title" className="text-balance text-h2 text-ink">
            {closing.h2}
          </h2>

          <p className="mt-4 text-body text-muted">{closing.paragraph}</p>

          <div className="mx-auto mt-8 max-w-[480px]">
            <a href={closing.ctaHref} className="btn-cta break-words">
              {closing.cta}
            </a>
          </div>

          <p className="mx-auto mt-4 max-w-xl text-micro text-muted">{closing.meta}</p>

          <ul className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 border-t border-border pt-6">
            {closing.seals.map((seal) => (
              <li key={seal} className="trust-chip">
                <CheckIcon className="h-4 w-4 shrink-0 text-success" />
                <span className="break-words">{seal}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
