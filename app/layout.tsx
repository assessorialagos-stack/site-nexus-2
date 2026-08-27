import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import { meta } from "@/lib/copy";
import MetaPixel from "@/components/MetaPixel";
import Clarity from "@/components/Clarity";
import "./globals.css";

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
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <body>
        {children}
        <MetaPixel />
        <Clarity />
      </body>
    </html>
  );
}
