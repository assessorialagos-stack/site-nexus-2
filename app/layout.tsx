import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import { meta } from "@/lib/copy";
import Clarity from "@/components/Clarity";
import "./globals.css";

/** Contêiner do Google Tag Manager. */
const GTM_ID = "GTM-N7FRK6GV";

// Corpo — sans institucional.
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Títulos — sans geométrica, moderna e confiável.
const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        {/* Google Tag Manager — o mais alto possível no <head>, já no HTML do servidor */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
        {/* End Google Tag Manager */}
        {/* Verificação de domínio do Meta — precisa estar no HTML, não pode vir por JavaScript */}
        <meta name="facebook-domain-verification" content="vfck4wyfuh4nvj4j381tnihk8vih6z" />
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <body>
        {/* Google Tag Manager (noscript) — logo após a abertura do <body> */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
        <Clarity />
      </body>
    </html>
  );
}
