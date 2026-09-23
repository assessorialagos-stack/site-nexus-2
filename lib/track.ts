/**
 * Eventos do site enviados ao Google Tag Manager (dataLayer).
 * O site não carrega nenhum pixel diretamente: quem decide o que disparar
 * (Meta, Google Ads etc.) é o GTM, a partir destes eventos.
 */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export type MetaEvent = "PageView" | "ViewContent" | "InitiateCheckout" | "Lead";

export type EventData = { value?: number; currency?: string; content_name?: string };

export function trackEvent(eventName: MetaEvent, data: EventData = {}): void {
  if (typeof window === "undefined") return;
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: eventName, ...data });
  } catch {
    /* nunca deixar o rastreamento quebrar a página */
  }
}
