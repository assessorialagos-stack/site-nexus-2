import type { Config } from "tailwindcss";

/**
 * As cores de superfície (bg / surface / border / muted) são resolvidas em
 * runtime a partir de variáveis CSS, porque a landing alterna entre dois temas
 * escuros seção a seção — verde-petróleo e navy — como o carrossel do cliente.
 * Os temas vivem em globals.css (.theme-green / .theme-navy).
 *
 * O formato "R G B" (sem vírgulas) é o que permite o Tailwind aplicar o
 * modificador de opacidade em cima da variável: bg-surface/50 continua valendo.
 */
const themed = (v: string) => `rgb(var(${v}) / <alpha-value>)`;

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // Breakpoint único do projeto: 768px (mobile < 768 <= desktop)
    screens: {
      md: "768px",
      lg: "1024px",
      xl: "1440px",
    },
    extend: {
      // A escala padrão do Tailwind pula 12/15/35/…, e o modificador de opacidade
      // (bg-danger/12) só aceita valores que existam nela. Preenchemos as lacunas
      // usadas no projeto para não termos classes que somem silenciosamente.
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
        // Trocam conforme o tema da seção
        bg: themed("--c-bg"),
        surface: themed("--c-surface"),
        "surface-2": themed("--c-surface-2"),
        border: themed("--c-border"),
        muted: themed("--c-muted"),

        // Fixas em toda a página
        ink: "#f5f2e9",
        gold: {
          DEFAULT: "#c9a227",
          soft: "#e0c265",
          deep: "#8a6f14",
        },
        royal: {
          DEFAULT: "#1b6fe8",
          soft: "#4f92f2",
        },
        cta: {
          DEFAULT: "#1f9e4a",
          hover: "#178a3f",
        },
        danger: "#c1121f",
        highlight: "#fff59d",
        success: "#22c55e",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "Times New Roman", "serif"],
      },
      fontSize: {
        h1: ["clamp(2.75rem, 5vw, 3.5rem)", { lineHeight: "1.05", letterSpacing: "-0.01em", fontWeight: "900" }],
        h2: ["clamp(1.875rem, 3.4vw, 2.5rem)", { lineHeight: "1.12", letterSpacing: "-0.005em", fontWeight: "800" }],
        h3: ["clamp(1.375rem, 2vw, 1.625rem)", { lineHeight: "1.22", fontWeight: "700" }],
        body: ["clamp(1rem, 1.15vw, 1.125rem)", { lineHeight: "1.6" }],
        micro: ["clamp(0.8125rem, 0.9vw, 0.875rem)", { lineHeight: "1.5" }],
      },
      borderRadius: {
        card: "14px",
        ctl: "12px",
      },
      boxShadow: {
        cta: "0 6px 0 rgba(0,0,0,.25)",
        "cta-active": "0 2px 0 rgba(0,0,0,.25)",
        gold: "0 0 0 1px rgba(201,162,39,.28)",
      },
      maxWidth: {
        shell: "1120px",
      },
      keyframes: {
        "fade-slide-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-slide-up": "fade-slide-up .38s cubic-bezier(.16,.84,.44,1) both",
      },
    },
  },
  plugins: [],
};

export default config;
