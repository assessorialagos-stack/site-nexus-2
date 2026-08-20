import { NextResponse } from "next/server";

/**
 * Conversions API do Meta (envio server-side).
 *
 * O token NUNCA aparece no navegador nem no repositório: ele vem de
 * META_CAPI_TOKEN (variável de ambiente da Vercel) e é usado só aqui.
 * O evento sai com o mesmo event_id do Pixel para o Meta deduplicar.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const TOKEN = process.env.META_CAPI_TOKEN;
const API_VERSION = process.env.META_API_VERSION || "v21.0";

/** O endpoint é público: só aceitamos os eventos que a landing realmente usa. */
const ALLOWED = new Set(["PageView", "ViewContent", "InitiateCheckout", "Lead"]);

type Body = {
  eventName?: string;
  eventId?: string;
  eventSourceUrl?: string;
  fbp?: string;
  fbc?: string;
  customData?: Record<string, unknown>;
};

export async function POST(request: Request) {
  if (!PIXEL_ID || !TOKEN) {
    return NextResponse.json({ ok: false, reason: "not-configured" }, { status: 200 });
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, reason: "bad-json" }, { status: 400 });
  }

  const eventName = body.eventName;
  if (!eventName || !ALLOWED.has(eventName)) {
    return NextResponse.json({ ok: false, reason: "event-not-allowed" }, { status: 400 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const userAgent = request.headers.get("user-agent") ?? undefined;

  const userData: Record<string, string> = {};
  if (ip) userData.client_ip_address = ip;
  if (userAgent) userData.client_user_agent = userAgent;
  if (body.fbp) userData.fbp = body.fbp;
  if (body.fbc) userData.fbc = body.fbc;

  const payload = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: body.eventId,
        event_source_url: body.eventSourceUrl,
        action_source: "website",
        user_data: userData,
        custom_data: body.customData ?? {},
      },
    ],
    access_token: TOKEN,
  };

  try {
    const res = await fetch(`https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const json = (await res.json()) as Record<string, unknown>;

    if (!res.ok) {
      // Não devolvemos o erro cru do Meta para o navegador.
      console.error("[meta-capi] falha", res.status, json);
      return NextResponse.json({ ok: false }, { status: 200 });
    }
    // eventName/eventId voltam só para conferência (são gerados no próprio cliente).
    return NextResponse.json(
      { ok: true, received: json.events_received ?? null, eventName, eventId: body.eventId },
      { status: 200 },
    );
  } catch (err) {
    console.error("[meta-capi] erro de rede", err);
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
