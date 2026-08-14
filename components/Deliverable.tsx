import SectionHeading from "@/components/SectionHeading";
import { CheckIcon } from "@/components/Icons";
import { deliverable } from "@/lib/copy";

export default function Deliverable() {
  return (
    <section id="o-que-recebe" className="section bg-bg-soft">
      <div className="shell">
        <SectionHeading eyebrow={deliverable.eyebrow} title={deliverable.h2} lead={deliverable.lead} />

        <div className="mt-10 grid grid-cols-1 gap-4 md:mt-14 md:grid-cols-2 md:gap-5">
          {deliverable.items.map((item) => (
            <div key={item.title} className="card flex items-start gap-4 p-5 md:p-6">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
                <CheckIcon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <h3 className="text-h3 text-ink">{item.title}</h3>
                <p className="mt-1.5 text-body text-muted break-words">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
