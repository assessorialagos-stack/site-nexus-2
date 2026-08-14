import SectionHeading from "@/components/SectionHeading";
import { process } from "@/lib/copy";

export default function Process() {
  return (
    <section id="como-funciona" className="section bg-bg">
      <div className="shell">
        <SectionHeading eyebrow={process.eyebrow} title={process.h2} lead={process.lead} />

        <ol className="mt-10 grid grid-cols-1 gap-5 md:mt-14 md:grid-cols-3 md:gap-6">
          {process.steps.map((step) => (
            <li key={step.n} className="card flex h-full flex-col p-6 md:p-7">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand text-[20px] font-extrabold text-white shadow-cta">
                {step.n}
              </span>
              <h3 className="mt-5 text-h3 text-ink">{step.title}</h3>
              <p className="mt-2.5 text-body text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
