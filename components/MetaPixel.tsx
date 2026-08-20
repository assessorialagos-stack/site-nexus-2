"use client";

import Script from "next/script";
import { useEffect } from "react";
import { sendServerEvent } from "@/lib/track";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

declare global {
  interface Window {
    __metaPageViewId?: string;
  }
}

/**
 * Meta Pixel + PageView.
 *
 * O PageView sai de dentro do próprio script (como no snippet oficial) porque
 * o efeito do React pode rodar antes do fbq existir — e aí o evento se perderia.
 * O id do evento fica guardado em window para o envio pela Conversions API usar
 * o MESMO id: é isso que faz o Meta deduplicar em vez de contar duas vezes.
 */
export default function MetaPixel() {
  useEffect(() => {
    if (!PIXEL_ID) return;
    let tries = 0;
    const send = () => {
      const id = window.__metaPageViewId;
      if (id) {
        sendServerEvent("PageView", id);
        return;
      }
      if (tries++ < 20) window.setTimeout(send, 150);
    };
    send();
  }, []);

  if (!PIXEL_ID) return null;

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${PIXEL_ID}');
window.__metaPageViewId = (self.crypto && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(16).slice(2);
fbq('track', 'PageView', {}, { eventID: window.__metaPageViewId });`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}
