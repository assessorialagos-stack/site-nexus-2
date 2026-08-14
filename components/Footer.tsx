import { Fragment } from "react";
import { footer } from "@/lib/copy";

const columnTitle = "text-micro font-bold uppercase tracking-wider text-ink";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg-soft">
      <div className="shell py-12 md:py-14">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <h2 className={columnTitle}>{footer.about.title}</h2>
            <p className="mt-3 text-micro leading-relaxed text-muted break-words">{footer.about.body}</p>
          </div>

          <div>
            <h2 className={columnTitle}>{footer.contact.title}</h2>
            <p className="mt-3 text-micro text-muted">{footer.contact.hours}</p>
          </div>

          <div>
            <h2 className={columnTitle}>{footer.institutional.title}</h2>
            <p className="mt-3 text-body font-semibold text-ink break-words">
              {footer.institutional.name}
            </p>
          </div>
        </div>
      </div>

      <div className="shell">
        <div className="flex flex-col gap-3 border-t border-border py-5 md:flex-row md:items-center md:justify-between">
          <nav className="flex flex-wrap items-center gap-x-2 gap-y-1">
            {footer.links.map((link, i) => (
              <Fragment key={link.label}>
                {i > 0 ? (
                  <span aria-hidden="true" className="text-micro text-muted">
                    ·
                  </span>
                ) : null}
                <a
                  href={link.href}
                  className="text-micro text-muted transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                >
                  {link.label}
                </a>
              </Fragment>
            ))}
          </nav>

          <p className="text-micro text-muted break-words">
            {footer.copyright}
            {" · "}
            {footer.credit.prefix}
            <a
              href={footer.credit.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand transition-colors hover:text-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              {footer.credit.name}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
