import SectionHeading from "@/components/SectionHeading";
import { BoltIcon, CheckIcon, CoffeeIcon } from "@/components/Icons";
import { offer } from "@/lib/copy";

export default function Offer() {
  return (
    <section id="oferta" className="section">
      <div className="shell">
        <SectionHeading title={offer.h2} lead={offer.lead} />

        {/* mt-14 dá folga pro selo que fica "montado" na borda superior do card */}
        <div className="surface-gold relative mx-auto mt-14 max-w-[560px] px-6 pb-6 pt-10 text-center md:px-8 md:pb-8 md:pt-12">
          <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-danger px-4 py-1.5 text-micro font-bold uppercase text-white">
            <BoltIcon className="h-3.5 w-3.5 shrink-0" />
            {offer.badge}
          </span>

          <h3 className="text-h3 text-ink break-words">{offer.productName}</h3>
          <p className="mt-2 text-body text-muted break-words">{offer.productSubtitle}</p>

          <hr className="my-6 border-t border-border" />

          <p className="text-body text-muted line-through">{offer.priceStrike}</p>
          <p className="mt-1 text-micro text-muted">{offer.priceLabel}</p>
          <p className="mt-2 text-[56px] font-extrabold leading-none tracking-tight text-ink md:text-[68px]">
            {offer.price}
          </p>
          <p className="mt-2 text-body text-muted">{offer.priceComplement}</p>

          <p className="mt-4 text-body text-ink break-words">{offer.installments}</p>

          <p className="mx-auto mt-4 inline-flex max-w-[420px] items-start gap-2 text-left text-micro text-muted">
            <CoffeeIcon className="mt-0.5 h-4 w-4 shrink-0" />
            <span className="min-w-0 break-words">{offer.micro}</span>
          </p>

          <div className="mt-6">
            <a href={offer.ctaHref} className="btn-cta">
              {offer.cta}
            </a>
          </div>

          <ul className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 border-t border-border pt-6">
            {/* min-w-0 deixa o chip encolher e o texto quebrar em 320px */}
            {offer.seals.map((seal) => (
              <li key={seal} className="trust-chip min-w-0 max-w-full items-start text-left">
                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                <span className="min-w-0 break-words">{seal}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
