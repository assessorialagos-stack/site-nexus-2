import SectionHeading from "@/components/SectionHeading";
import { CheckIcon, AlertIcon } from "@/components/Icons";
import { differentiation as d } from "@/lib/copy";

export default function Differentiation() {
  return (
    <section id="diferenca" className="section bg-bg-soft">
      <div className="shell">
        <SectionHeading eyebrow={d.eyebrow} title={d.h2} lead={d.lead} />

        <div className="mt-10 grid grid-cols-1 items-stretch gap-5 md:mt-14 md:grid-cols-2 md:gap-6">
          {/* O que VOCÊ vê — neutro */}
          <div className="card flex h-full flex-col p-6 md:p-7">
            <div className="flex items-baseline justify-between gap-3 border-b border-border pb-4">
              <div>
                <span className="text-micro font-bold uppercase tracking-wider text-muted">
                  {d.visible.tag}
                </span>
                <p className="mt-1 text-h3 text-ink">{d.visible.title}</p>
              </div>
              <div className="text-right">
                <p className="text-[34px] font-extrabold leading-none text-muted md:text-[40px]">
                  {d.visible.percent}
                </p>
                <p className="mt-1 text-micro text-muted">{d.visible.caption}</p>
              </div>
            </div>
            <ul className="mt-5 space-y-3.5">
              {d.visible.items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-body text-body">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted" />
                  <span className="min-w-0 break-words">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* O que o BANCO vê — destaque azul */}
          <div className="relative flex h-full flex-col rounded-card border-2 border-brand bg-white p-6 shadow-card md:p-7">
            <div className="flex items-baseline justify-between gap-3 border-b border-border pb-4">
              <div>
                <span className="text-micro font-bold uppercase tracking-wider text-brand">
                  {d.hidden.tag}
                </span>
                <p className="mt-1 text-h3 text-ink">{d.hidden.title}</p>
              </div>
              <div className="text-right">
                <p className="text-[34px] font-extrabold leading-none text-brand md:text-[40px]">
                  {d.hidden.percent}
                </p>
                <p className="mt-1 text-micro text-muted">{d.hidden.caption}</p>
              </div>
            </div>
            <ul className="mt-5 space-y-3.5">
              {d.hidden.items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-body text-ink">
                  <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-brand" />
                  <span className="min-w-0 break-words">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mx-auto mt-8 flex max-w-2xl items-start justify-center gap-2.5 rounded-ctl bg-danger-soft px-5 py-4 text-center text-body text-ink">
          <AlertIcon className="mt-0.5 h-5 w-5 shrink-0 text-danger" />
          <span className="min-w-0 break-words text-left">{d.note}</span>
        </p>
      </div>
    </section>
  );
}
