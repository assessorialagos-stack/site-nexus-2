/** Formatação de moeda em pt-BR. */

const BRL = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** 41625 → "R$ 41.625,00" */
export function formatBRL(value: number): string {
  if (!Number.isFinite(value)) return "R$ 0,00";
  // O Intl usa NBSP entre o símbolo e o número; normaliza pra espaço comum
  // para não quebrar de forma estranha em telas pequenas.
  return BRL.format(value).replace(/ /g, " ");
}

/**
 * Máscara de digitação para o campo de renda: aceita só dígitos e trata os
 * dois últimos como centavos. "123456" → "1.234,56"
 */
export function maskCurrencyInput(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 11);
  if (!digits) return "";
  const cents = Number(digits) / 100;
  return cents.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/** "1.234,56" → 1234.56 */
export function parseCurrencyInput(masked: string): number {
  const digits = masked.replace(/\D/g, "");
  if (!digits) return 0;
  return Number(digits) / 100;
}
