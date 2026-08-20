"use client";

import type { ReactNode } from "react";
import { trackEvent, type MetaEvent } from "@/lib/track";

/**
 * Botão de checkout que avisa o Meta antes de mandar a pessoa pro pagamento.
 * O envio é por sendBeacon, então não atrasa a navegação.
 */
export default function CtaLink({
  href,
  children,
  className = "btn-cta",
  event = "InitiateCheckout",
  value,
  contentName,
  onClick,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  event?: MetaEvent;
  value?: number;
  contentName?: string;
  onClick?: () => void;
}) {
  return (
    <a
      href={href}
      className={className}
      onClick={() => {
        trackEvent(event, {
          value,
          currency: "BRL",
          content_name: contentName,
        });
        onClick?.();
      }}
    >
      {children}
    </a>
  );
}
