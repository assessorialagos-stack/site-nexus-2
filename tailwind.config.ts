import type { Config } from "tailwindcss";

/**
 * Tema CLARO / institucional (branco + azul) — v2.
 * Página de conversão do Check-up do Rating Bancário (Especialista Roberto).
 * Estrutura inspirada no padrão de funil do nicho; copy e design originais.
 */
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      md: "768px",
      lg: "1024px",
      xl: "1440px",
    },
    extend: {
      opacity: {
        8: "0.08",
        12: "0.12",
        15: "0.15",
        18: "0.18",
        35: "0.35",
        45: "0.45",
        55: "0.55",
        65: "0.65",
        85: "0.85",
      },
      colors: {
        // Fundos
        bg: "#ffffff",
        "bg-soft": "#f4f8fc", // seções alternadas / faixas suaves
        surface: "#ffffff", // cards
        "surface-soft": "#f4f8fc",

        // Texto
        ink: "#0e1c2f", // títulos (navy quase preto)
        body: "#33475b", // corpo
        muted: "#64748b", // secundário

        border: "#e3e9f1",

        // Azul institucional (primária)
        brand: {
          DEFAULT: "#1b6fe8",
          dark: "#1557b8",
          soft: "#e8f1fe", // fundo de chips/realces claros
        },
        navy: "#12294a", // faixas/rodapé escuros

        // Ação (CTA) — verde, alto contraste de conversão
        cta: {
          DEFAULT: "#16a34a",
          hover: "#15803d",
        },

        danger: "#dc2626",
        "danger-soft": "#fef2f2",
        success: "#16a34a",
        star: "#f59e0b",
      },
      fontFamily: {
        // Corpo — sans institucional
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        // Títulos — sans geométrica, moderna e confiável
        display: ["var(--font-poppins)", "var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        h1: ["clamp(2.25rem, 4.6vw, 3.25rem)", { lineHeight: "1.08", letterSpacing: "-0.02em", fontWeight: "800" }],
        h2: ["clamp(1.75rem, 3.2vw, 2.375rem)", { lineHeight: "1.14", letterSpacing: "-0.015em", fontWeight: "700" }],
        h3: ["clamp(1.25rem, 1.9vw, 1.5rem)", { lineHeight: "1.24", letterSpacing: "-0.01em", fontWeight: "700" }],
        body: ["clamp(1rem, 1.1vw, 1.125rem)", { lineHeight: "1.65" }],
        micro: ["clamp(0.8125rem, 0.9vw, 0.875rem)", { lineHeight: "1.5" }],
      },
      borderRadius: {
        card: "16px",
        ctl: "12px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(15,28,47,.04), 0 8px 24px -12px rgba(15,28,47,.15)",
        "card-hover": "0 2px 4px rgba(15,28,47,.06), 0 16px 40px -16px rgba(15,28,47,.22)",
        cta: "0 6px 16px -4px rgba(22,163,74,.5)",
      },
      maxWidth: {
        shell: "1120px",
      },
      keyframes: {
        "fade-slide-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pop-in": {
          "0%": { opacity: "0", transform: "scale(.94) translateY(10px)" },
          "100%": { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-slide-up": "fade-slide-up .38s cubic-bezier(.16,.84,.44,1) both",
        "pop-in": "pop-in .34s cubic-bezier(.16,.84,.44,1) both",
        "fade-in": "fade-in .25s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
