/**
 * Motor da calculadora de poder de crédito.
 *
 * Fórmula (conforme briefing, implementada literalmente):
 *
 *   base     = renda × multiplicadorSituacao × ajusteIdade
 *   faixaMin = base × 0.8
 *   faixaMax = base × 1.3
 *   gap      = max(0, base − (renda × 1.5))
 */

export type SituationId =
  | "clt"
  | "servidor"
  | "autonomo"
  | "mei"
  | "aposentado"
  | "empresario";

export type SituationOption = {
  id: SituationId;
  label: string;
  multiplier: number;
};

export const SITUATIONS: SituationOption[] = [
  { id: "clt", label: "CLT (carteira assinada)", multiplier: 3.0 },
  { id: "servidor", label: "Servidor público", multiplier: 3.5 },
  { id: "autonomo", label: "Autônomo ou Profissional liberal", multiplier: 1.8 },
  { id: "mei", label: "MEI", multiplier: 2.0 },
  { id: "aposentado", label: "Aposentado ou Pensionista INSS", multiplier: 2.5 },
  { id: "empresario", label: "Empresário (LTDA, EIRELI)", multiplier: 2.2 },
];

/** Ajuste por faixa etária. */
export function ageAdjustment(age: number): number {
  if (age < 25) return 0.7;
  if (age <= 29) return 0.85; // 25–29
  if (age <= 55) return 1.0; // 30–55
  if (age <= 65) return 0.9; // 56–65
  return 0.75; // > 65
}

export function situationMultiplier(id: SituationId): number {
  const found = SITUATIONS.find((s) => s.id === id);
  return found ? found.multiplier : 0;
}

export type CalculationInput = {
  income: number;
  age: number;
  situation: SituationId;
  state: string;
};

export type CalculationResult = {
  base: number;
  rangeMin: number;
  rangeMax: number;
  gap: number;
};

export function calculate(input: CalculationInput): CalculationResult {
  const base =
    input.income * situationMultiplier(input.situation) * ageAdjustment(input.age);

  return {
    base,
    rangeMin: base * 0.8,
    rangeMax: base * 1.3,
    gap: Math.max(0, base - input.income * 1.5),
  };
}

/** As 27 unidades federativas. */
export const UFS: { uf: string; name: string }[] = [
  { uf: "AC", name: "Acre" },
  { uf: "AL", name: "Alagoas" },
  { uf: "AP", name: "Amapá" },
  { uf: "AM", name: "Amazonas" },
  { uf: "BA", name: "Bahia" },
  { uf: "CE", name: "Ceará" },
  { uf: "DF", name: "Distrito Federal" },
  { uf: "ES", name: "Espírito Santo" },
  { uf: "GO", name: "Goiás" },
  { uf: "MA", name: "Maranhão" },
  { uf: "MT", name: "Mato Grosso" },
  { uf: "MS", name: "Mato Grosso do Sul" },
  { uf: "MG", name: "Minas Gerais" },
  { uf: "PA", name: "Pará" },
  { uf: "PB", name: "Paraíba" },
  { uf: "PR", name: "Paraná" },
  { uf: "PE", name: "Pernambuco" },
  { uf: "PI", name: "Piauí" },
  { uf: "RJ", name: "Rio de Janeiro" },
  { uf: "RN", name: "Rio Grande do Norte" },
  { uf: "RS", name: "Rio Grande do Sul" },
  { uf: "RO", name: "Rondônia" },
  { uf: "RR", name: "Roraima" },
  { uf: "SC", name: "Santa Catarina" },
  { uf: "SP", name: "São Paulo" },
  { uf: "SE", name: "Sergipe" },
  { uf: "TO", name: "Tocantins" },
];
