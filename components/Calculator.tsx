"use client";

import { useRef, useState, type FormEvent } from "react";
import { calculator } from "@/lib/copy";
import {
  SITUATIONS,
  UFS,
  calculate,
  type CalculationResult,
  type SituationId,
} from "@/lib/calculator";
import { formatBRL, maskCurrencyInput, parseCurrencyInput } from "@/lib/format";
import { AlertIcon, ChevronDownIcon, PlusIcon } from "@/components/Icons";
import SectionHeading from "@/components/SectionHeading";

/* Estilo compartilhado dos controles (input + select). */
const control =
  "w-full rounded-ctl border bg-bg px-4 py-3 text-body text-ink placeholder:text-muted " +
  "transition-colors focus:border-cta focus:outline-none focus:ring-2 focus:ring-cta/40";

const controlBorder = (invalid: boolean) => (invalid ? "border-danger" : "border-border");

const labelClass = "block text-micro font-semibold text-ink mb-1.5";
const microClass = "text-micro text-muted mt-1.5";
const errorClass = "text-micro text-danger mt-1.5";

const FIELD_ERROR = "Informe um valor válido.";
const FORM_ERROR = "Preencha todos os campos para calcular.";

type FieldErrors = {
  income: boolean;
  age: boolean;
  situation: boolean;
  state: boolean;
};

const NO_ERRORS: FieldErrors = {
  income: false,
  age: false,
  situation: false,
  state: false,
};

/** O placeholder da copy já traz "R$", que aqui é renderizado como prefixo fixo. */
const incomePlaceholder = calculator.fields.income.placeholder.replace("R$", "").trim();

export default function Calculator() {
  const [income, setIncome] = useState("");
  const [age, setAge] = useState("");
  const [situation, setSituation] = useState<SituationId | "">("");
  const [state, setState] = useState("");

  const [errors, setErrors] = useState<FieldErrors>(NO_ERRORS);
  const [showFormError, setShowFormError] = useState(false);
  const [result, setResult] = useState<CalculationResult | null>(null);
  // Reinicia a animação do card a cada novo cálculo.
  const [runs, setRuns] = useState(0);

  const [open, setOpen] = useState(false);

  const resultRef = useRef<HTMLDivElement>(null);

  /** Limpa o erro do campo assim que o usuário mexe nele. */
  function clearFieldError(field: keyof FieldErrors) {
    setErrors((prev) => (prev[field] ? { ...prev, [field]: false } : prev));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const incomeValue = parseCurrencyInput(income);
    const ageValue = Number(age);
    const ageIsValid =
      age.trim() !== "" && Number.isFinite(ageValue) && ageValue >= 18 && ageValue <= 100;

    const next: FieldErrors = {
      income: !(incomeValue > 0),
      age: !ageIsValid,
      situation: situation === "",
      state: state === "",
    };

    setErrors(next);

    // `situation === ""` entra no teste também para estreitar o tipo abaixo.
    if (next.income || next.age || next.state || situation === "") {
      setShowFormError(true);
      setResult(null);
      return;
    }

    setShowFormError(false);
    setResult(
      calculate({ income: incomeValue, age: ageValue, situation, state })
    );
    setRuns((n) => n + 1);
    scrollToResultOnMobile();
  }

  /** Só rola no mobile (< md) e só se o usuário não pediu menos movimento. */
  function scrollToResultOnMobile() {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(min-width: 768px)").matches) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.requestAnimationFrame(() => {
      resultRef.current?.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "center",
      });
    });
  }

  const hasResult = result !== null;
  const shown: CalculationResult = result ?? { base: 0, rangeMin: 0, rangeMax: 0, gap: 0 };
  const dimmed = hasResult ? "" : "opacity-40";

  return (
    <section id="calculadora" className="section">
      <div className="shell">
        <SectionHeading title={calculator.h2} lead={calculator.lead} />

        <div className="mt-10 grid gap-6 md:grid-cols-2 md:items-start">
          {/* ---------------- Formulário ---------------- */}
          <form onSubmit={handleSubmit} noValidate className="surface p-5 md:p-6">
            <div className="space-y-5">
              {/* Renda */}
              <div>
                <label htmlFor="calc-income" className={labelClass}>
                  {calculator.fields.income.label}
                </label>
                <div className="relative">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-body text-muted"
                  >
                    R$
                  </span>
                  <input
                    id="calc-income"
                    name="income"
                    type="text"
                    inputMode="numeric"
                    autoComplete="off"
                    placeholder={incomePlaceholder}
                    value={income}
                    onChange={(e) => {
                      setIncome(maskCurrencyInput(e.target.value));
                      clearFieldError("income");
                    }}
                    aria-invalid={errors.income}
                    aria-describedby={
                      errors.income ? "calc-income-help calc-income-error" : "calc-income-help"
                    }
                    className={`${control} ${controlBorder(errors.income)} pl-12`}
                  />
                </div>
                <p id="calc-income-help" className={microClass}>
                  {calculator.fields.income.micro}
                </p>
                {errors.income ? (
                  <p id="calc-income-error" className={errorClass}>
                    {FIELD_ERROR}
                  </p>
                ) : null}
              </div>

              {/* Idade */}
              <div>
                <label htmlFor="calc-age" className={labelClass}>
                  {calculator.fields.age.label}
                </label>
                <input
                  id="calc-age"
                  name="age"
                  type="number"
                  min={18}
                  max={100}
                  step={1}
                  inputMode="numeric"
                  autoComplete="off"
                  placeholder={calculator.fields.age.placeholder}
                  value={age}
                  onChange={(e) => {
                    setAge(e.target.value);
                    clearFieldError("age");
                  }}
                  aria-invalid={errors.age}
                  aria-describedby={
                    errors.age ? "calc-age-help calc-age-error" : "calc-age-help"
                  }
                  className={`${control} ${controlBorder(errors.age)}`}
                />
                <p id="calc-age-help" className={microClass}>
                  {calculator.fields.age.micro}
                </p>
                {errors.age ? (
                  <p id="calc-age-error" className={errorClass}>
                    {FIELD_ERROR}
                  </p>
                ) : null}
              </div>

              {/* Situação */}
              <div>
                <label htmlFor="calc-situation" className={labelClass}>
                  {calculator.fields.situation.label}
                </label>
                <div className="relative">
                  <select
                    id="calc-situation"
                    name="situation"
                    value={situation}
                    onChange={(e) => {
                      setSituation(e.target.value as SituationId);
                      clearFieldError("situation");
                    }}
                    aria-invalid={errors.situation}
                    aria-describedby={
                      errors.situation
                        ? "calc-situation-help calc-situation-error"
                        : "calc-situation-help"
                    }
                    className={`${control} ${controlBorder(errors.situation)} appearance-none pr-11`}
                  >
                    <option value="" disabled className="bg-bg text-ink">
                      {calculator.fields.situation.placeholder}
                    </option>
                    {SITUATIONS.map((s) => (
                      <option key={s.id} value={s.id} className="bg-bg text-ink">
                        {s.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDownIcon className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                </div>
                <p id="calc-situation-help" className={microClass}>
                  {calculator.fields.situation.micro}
                </p>
                {errors.situation ? (
                  <p id="calc-situation-error" className={errorClass}>
                    {FIELD_ERROR}
                  </p>
                ) : null}
              </div>

              {/* Estado */}
              <div>
                <label htmlFor="calc-state" className={labelClass}>
                  {calculator.fields.state.label}
                </label>
                <div className="relative">
                  <select
                    id="calc-state"
                    name="state"
                    value={state}
                    onChange={(e) => {
                      setState(e.target.value);
                      clearFieldError("state");
                    }}
                    aria-invalid={errors.state}
                    aria-describedby={errors.state ? "calc-state-error" : undefined}
                    className={`${control} ${controlBorder(errors.state)} appearance-none pr-11`}
                  >
                    <option value="" disabled className="bg-bg text-ink">
                      {calculator.fields.state.placeholder}
                    </option>
                    {UFS.map((u) => (
                      <option key={u.uf} value={u.uf} className="bg-bg text-ink">
                        {`${u.uf} — ${u.name}`}
                      </option>
                    ))}
                  </select>
                  <ChevronDownIcon className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                </div>
                {errors.state ? (
                  <p id="calc-state-error" className={errorClass}>
                    {FIELD_ERROR}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="mt-6">
              <button type="submit" className="btn-cta">
                {calculator.submit}
              </button>
              <p aria-live="polite" className="min-h-[1.25rem]">
                {showFormError ? (
                  <span className="mt-2 block text-micro text-danger">{FORM_ERROR}</span>
                ) : null}
              </p>
            </div>
          </form>

          {/* ---------------- Resultado ---------------- */}
          <div ref={resultRef} className="md:sticky md:top-6">
            <div className="surface p-5 md:p-6">
              <div
                key={runs}
                className={hasResult ? "animate-fade-slide-up" : undefined}
              >
                {hasResult ? (
                  <p className="text-micro text-muted">{calculator.result.label}</p>
                ) : (
                  <p className="text-micro text-muted">
                    <span className="md:hidden">{calculator.result.emptyTitleMobile}</span>
                    <span className="hidden md:inline">{calculator.result.emptyTitle}</span>
                  </p>
                )}

                <p
                  className={`mt-2 break-words font-extrabold leading-none tracking-tight text-ink tabular-nums text-[clamp(2.125rem,11vw,3.25rem)] ${dimmed}`}
                >
                  {formatBRL(shown.base)}
                </p>

                <div className={`mt-5 space-y-3 text-body text-muted ${dimmed}`}>
                  <p className="break-words">
                    {calculator.result.rangeLabel}{" "}
                    <span className="money">{formatBRL(shown.rangeMin)}</span> a{" "}
                    <span className="money">{formatBRL(shown.rangeMax)}</span>
                  </p>
                  <p className="break-words">
                    {calculator.result.immediateLabel}{" "}
                    <span className="money">{formatBRL(shown.rangeMin)}</span> e{" "}
                    <span className="money">{formatBRL(shown.rangeMax)}</span>
                  </p>
                </div>

                <div
                  className={`mt-5 flex items-start gap-3 rounded-ctl border border-danger/40 bg-danger/12 p-4 ${dimmed}`}
                >
                  <AlertIcon className="mt-0.5 h-5 w-5 shrink-0 text-danger" />
                  <p className="break-words text-micro text-ink">
                    {calculator.result.alert.replace("{gap}", formatBRL(shown.gap))}
                  </p>
                </div>

                <div className="mt-6">
                  <a href={calculator.result.ctaHref} className="btn-cta">
                    {calculator.result.cta}
                  </a>
                  <p className="mt-3 text-center text-micro text-muted">
                    {calculator.result.ctaSub}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---------------- Accordion ---------------- */}
        <div className="surface mt-6 overflow-hidden">
          <h3 className="text-body">
            <button
              id="calc-accordion-trigger"
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="calc-accordion-body"
              className="flex w-full items-center justify-between gap-4 p-5 text-left text-body font-semibold text-ink transition-colors hover:bg-ink/8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-cta md:p-6"
            >
              <span className="break-words">{calculator.accordion.title}</span>
              <PlusIcon
                className={`h-5 w-5 shrink-0 text-muted transition-transform duration-200 ${
                  open ? "rotate-45" : ""
                }`}
              />
            </button>
          </h3>
          {/* Altura animada por grid-template-rows: 0fr → 1fr */}
          <div
            id="calc-accordion-body"
            role="region"
            aria-labelledby="calc-accordion-trigger"
            className={`grid transition-[grid-template-rows] duration-200 ease-out ${
              open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div className="overflow-hidden">
              <p className="px-5 pb-5 text-body text-muted md:px-6 md:pb-6">
                {calculator.accordion.body}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
