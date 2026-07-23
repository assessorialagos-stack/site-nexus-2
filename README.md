# Landing Nexus Crédito — v1 (aprovação visual)

Landing de conversão do **Diagnóstico Nexus do Rating Bancário**. Esta versão funciona como um
mockup navegável no browser, para aprovação visual do cliente antes da fase de integrações.

## Rodar localmente

```bash
npm install
npm run dev
```

Abre em http://localhost:3000

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS v3 — breakpoint único em `768px` (`md`)
- Fonte Inter via `next/font/google`

## Onde mexer

| O quê | Arquivo |
| --- | --- |
| **Toda a copy do site** | [`lib/copy.ts`](lib/copy.ts) |
| Fórmula da calculadora | [`lib/calculator.ts`](lib/calculator.ts) |
| Paleta, tipografia, raios, sombras | [`tailwind.config.ts`](tailwind.config.ts) |
| Classes compartilhadas (`.shell`, `.btn-cta`, `.surface`, `.money`) | [`app/globals.css`](app/globals.css) |
| Ordem das seções | [`app/page.tsx`](app/page.tsx) |

Os componentes **não têm texto hardcoded** — tudo vem de `lib/copy.ts`. Para trocar qualquer
palavra do site, edite só esse arquivo.

## Fórmula da calculadora

```
base     = renda × multiplicadorSituacao × ajusteIdade
faixaMin = base × 0.8
faixaMax = base × 1.3
gap      = max(0, base − renda × 1.5)
```

| Situação | Multiplicador |
| --- | --- |
| CLT | 3.0 |
| Servidor público | 3.5 |
| Autônomo / Profissional liberal | 1.8 |
| MEI | 2.0 |
| Aposentado / Pensionista INSS | 2.5 |
| Empresário (LTDA, EIRELI) | 2.2 |

| Faixa etária | Ajuste |
| --- | --- |
| < 25 | 0.7 |
| 25–29 | 0.85 |
| 30–55 | 1.0 |
| 56–65 | 0.9 |
| > 65 | 0.75 |

## Escopo desta versão

**Incluído:** as 10 seções com a copy definitiva, layout responsivo, calculadora funcional,
FAQ em accordion, tabs do exemplo de relatório, scroll suave nas âncoras, `noindex, nofollow`.

**Fora desta versão (fase seguinte):** pop-up de exit-intent, vídeo real na hero, fotos reais,
integração de checkout, Pixel Meta, GA4 e WhatsApp.

## Placeholders

Nenhum asset visual real é carregado. No lugar entram blocos padronizados:

- **Vídeo VSL** — bloco 16:9 com botão de play em SVG (sem tag `<video>`)
- **Foto do especialista** — bloco 4:5 com silhueta em SVG
- **Avatares dos depoimentos** — círculos de 48px com iniciais
- **Dados do especialista** — `[Especialista Nexus]`, `[X]+ anos`, `[dado 1]`…

## Restrições de conteúdo

O site **não** menciona CNPJ, razão social nem o nome real do responsável. O rodapé traz
apenas contato e o nome fantasia "Nexus Crédito".

## Deploy

Projeto novo na Vercel, sem domínio customizado. A URL de preview é o entregável.

```bash
npx vercel        # preview
```

O `metadata.robots` já está em `noindex, nofollow` — o preview não é indexado.
