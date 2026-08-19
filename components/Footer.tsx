import { footer } from "@/lib/copy";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg-soft">
      <div className="shell py-6">
        <p className="text-center text-micro text-muted break-words">
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
    </footer>
  );
}
