import SectionHeading from "@/components/SectionHeading";
import { CheckIcon } from "@/components/Icons";
import { deliverable } from "@/lib/copy";

export default function Deliverable() {
  return (
    <section id="o-que-recebe" className="section bg-bg-soft">
      <div className="shell">
        <SectionHeading eyebrow={deliverable.eyebrow} title={deliverable.h2} lead={deliverable.lead} />

        <ul className="mx-auto mt-10 max-w-2xl space-y-3 md:mt-12">
          {deliverable.items.map((item) => (
            <li key={item.title} className="card flex items-start gap-4 p-5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
                <CheckIcon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <h3 className="text-h3 text-ink">{item.title}</h3>
                <p className="mt-1 text-body text-muted break-words">{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
