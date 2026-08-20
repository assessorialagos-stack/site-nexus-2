/**
 * Disparo de eventos do Meta pelos dois caminhos ao mesmo tempo:
 *  - navegador (Pixel)
 *  - servidor (Conversions API, via /api/meta)
 *
 * Os dois levam o MESMO event_id, então o Meta deduplica e conta uma vez só.
 * O envio ao servidor usa sendBeacon para não travar a navegação quando o
 * clique leva a pessoa para o checkout.
 */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export type MetaEvent = "PageView" | "ViewContent" | "InitiateCheckout" | "Lead";

export type EventData = { value?: number; currency?: string; content_name?: string };

function cookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const m = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return m ? decodeURIComponent(m[2]) : undefined;
}

function newEventId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }
}

/** Envia só pelo servidor (Conversions API), com um event_id já definido. */
export function sendServerEvent(eventName: MetaEvent, eventId: string, data: EventData = {}): void {
  if (typeof window === "undefined") return;
  try {
    const body = JSON.stringify({
      eventName,
      eventId,
      eventSourceUrl: window.location.href,
      fbp: cookie("_fbp"),
      fbc: cookie("_fbc"),
      customData: data,
    });
    const sent =
      typeof navigator !== "undefined" &&
      typeof navigator.sendBeacon === "function" &&
      navigator.sendBeacon("/api/meta", new Blob([body], { type: "application/json" }));

    if (!sent) {
      void fetch("/api/meta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    /* nunca deixar o rastreamento quebrar a página */
  }
}

/** Dispara o evento nos dois caminhos (navegador + servidor) com o mesmo id. */
export function trackEvent(eventName: MetaEvent, data: EventData = {}): void {
  if (typeof window === "undefined") return;
  const eventId = newEventId();
  try {
    window.fbq?.("track", eventName, data, { eventID: eventId });
  } catch {
    /* pixel bloqueado por adblock — o envio pelo servidor abaixo cobre */
  }
  sendServerEvent(eventName, eventId, data);
}
