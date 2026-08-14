import { CheckIcon } from "@/components/Icons";
import { benefits } from "@/lib/copy";

export default function Benefits() {
  return (
    <section className="border-y border-border bg-bg-soft py-8 md:py-10">
      <div className="shell">
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-4">
          {benefits.items.map((item) => (
            <li key={item.title} className="flex items-start gap-3 text-left">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
                <CheckIcon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="text-body font-bold text-ink">{item.title}</p>
                <p className="mt-0.5 text-micro text-muted break-words">{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
