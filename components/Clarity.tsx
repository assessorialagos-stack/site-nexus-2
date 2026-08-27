"use client";

import Script from "next/script";

/** ID do projeto no Microsoft Clarity. É público (aparece no código da página). */
const CLARITY_ID = "y8xmtzlu27";

/** Microsoft Clarity — mapas de calor e gravação de sessão. */
export default function Clarity() {
  return (
    <Script id="ms-clarity" strategy="afterInteractive">
      {`(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "${CLARITY_ID}");`}
    </Script>
  );
}
