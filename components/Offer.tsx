import SectionHeading from "@/components/SectionHeading";
import { BoltIcon, CheckIcon, ShieldIcon } from "@/components/Icons";
import { offer } from "@/lib/copy";
import CtaLink from "@/components/CtaLink";

export default function Offer() {
  return (
    <section id="oferta" className="section bg-bg">
      <div className="shell">
        <SectionHeading eyebrow={offer.eyebrow} title={offer.h2} lead={offer.lead} />

        <div className="mx-auto mt-14 max-w-[560px]">
          <div className="card relative px-6 pb-6 pt-10 text-center md:px-8 md:pb-8 md:pt-12">
            {/* Selo de urgência */}
            <span className="absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-danger px-4 py-1.5 text-micro font-bold uppercase tracking-wide text-white shadow-cta">
              <BoltIcon className="h-3.5 w-3.5 shrink-0" />
              {offer.badge}
            </span>

            <h3 className="text-h3 text-ink break-words">{offer.productName}</h3>
            <p className="mt-2 text-body text-muted break-words">{offer.productSubtitle}</p>

            <hr className="my-6 border-t border-border" />

            <p className="text-body text-muted line-through">{offer.priceOld}</p>
            <p className="mt-1 text-micro font-semibold uppercase tracking-wide text-muted">
              {offer.priceLabel}
            </p>
            <p className="mt-1 text-[56px] font-extrabold leading-none tracking-tight text-ink md:text-[66px]">
              {offer.price}
            </p>
            <p className="mt-2 text-body text-muted">{offer.priceComplement}</p>
            <p className="mt-3 text-body font-semibold text-ink">{offer.installments}</p>

            <div className="mt-6">
              <CtaLink href={offer.ctaHref} value={97} contentName="Diagnostico Financeiro Completo">
                {offer.cta}
              </CtaLink>
            </div>

            <ul className="mt-6 space-y-2.5 text-left">
              {offer.seals.map((seal) => (
                <li key={seal} className="flex items-start gap-2.5 text-body text-body">
                  <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-cta" />
                  <span className="min-w-0 break-words">{seal}</span>
                </li>
              ))}
            </ul>

            <p className="mt-6 flex items-start gap-2.5 rounded-ctl bg-bg-soft p-4 text-left text-micro text-muted">
              <ShieldIcon className="mt-0.5 h-4 w-4 shrink-0 text-cta" />
              <span className="min-w-0 break-words">{offer.guarantee}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
