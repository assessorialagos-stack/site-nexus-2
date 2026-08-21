/**
 * Eventos do Meta Pixel (só no navegador).
 * Não há envio server-side: o site usa apenas o Pixel.
 */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export type MetaEvent = "PageView" | "ViewContent" | "InitiateCheckout" | "Lead";

export type EventData = { value?: number; currency?: string; content_name?: string };

export function trackEvent(eventName: MetaEvent, data: EventData = {}): void {
  if (typeof window === "undefined") return;
  try {
    window.fbq?.("track", eventName, data);
  } catch {
    /* nunca deixar o rastreamento quebrar a página */
  }
}
