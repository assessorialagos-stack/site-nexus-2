/**
 * Copy da landing v2 — Diagnóstico Financeiro Completo (Especialista Roberto).
 *
 * Tema claro/institucional. Estrutura de funil comum no nicho (revelação →
 * diferenciação → processo → entregável → especialista → oferta → FAQ → CTA),
 * com copy ORIGINAL escrita para o produto do Roberto.
 *
 * REGRAS DE CONTEÚDO:
 * - Entrega: reunião VIP por WhatsApp ou Online. Em até 48h um especialista
 *   entra em contato para marcá-la.
 * - Sem CNPJ da empresa / razão social. O responsável é "Roberto Nogueira".
 */

const CHECKOUT = "https://payfast.greenn.com.br/redirect/307493"; // R$ 97
const CHECKOUT_DESCONTO = "https://payfast.greenn.com.br/redirect/307507"; // R$ 79 → R$ 77

export const brand = {
  name: "Roberto Nogueira",
  product: "Diagnóstico Financeiro Completo",
  specialist: "Roberto Nogueira",
} as const;

/* ------------------------------------------------------------------ */
/* Metadata                                                            */
/* ------------------------------------------------------------------ */

export const meta = {
  title: "Diagnóstico Financeiro Completo",
  description:
    "Descubra o que os bancos realmente enxergam do seu CPF ou CNPJ no SCR/BACEN — e o que está travando o seu crédito. Relatório completo e reunião com especialista em até 48h.",
} as const;

/* ------------------------------------------------------------------ */
/* 1. Hero                                                             */
/* ------------------------------------------------------------------ */

export const hero = {
  eyebrow: "Dados oficiais do SCR / BACEN",
  h1: "Descubra o que o banco realmente vê no seu CPF ou CNPJ — e o que está travando o seu crédito",
  sub: "O SPC e o Serasa mostram só uma fração da sua vida financeira. O Diagnóstico Financeiro Completo revela o que os bancos enxergam de verdade antes de aprovar (ou negar) o seu crédito.",
  cta: "Fazer meu Diagnóstico agora",
  ctaHref: CHECKOUT,
  ctaSub: "Pagamento único · Um especialista fará contato em até 48h para agendar sua reunião por WhatsApp ou Online",
  badges: ["Dados oficiais SCR/BACEN", "Sem consulta que suja o nome", "100% online"],
  videoCaption: "Aperte o play e entenda em 2 minutos",
} as const;

/* ------------------------------------------------------------------ */
/* 1b. Faixa de benefícios (3 destaques rápidos)                       */
/* ------------------------------------------------------------------ */

export type Benefit = { title: string; text: string };

export const benefits = {
  items: [
    { title: "Um especialista fará o contato em até 48h", text: "Para marcar uma reunião VIP e exclusiva." },
    { title: "Para CPF e CNPJ", text: "Serve pra pessoa física e pra empresa." },
    { title: "Com especialista de verdade", text: "Nada de robô: quem lê o seu caso entende do assunto." },
  ] satisfies Benefit[] as Benefit[],
} as const;

/* ------------------------------------------------------------------ */
/* 2. Diferenciação — o que você vê x o que o banco vê                 */
/* ------------------------------------------------------------------ */

export const differentiation = {
  eyebrow: "A parte que ninguém te mostra",
  h2: "O que o Serasa mostra é só a ponta do iceberg",
  lead: "Quando um banco analisa o seu CPF ou CNPJ, ele não olha só se o seu nome está sujo. Ele consulta a base oficial do Banco Central — e é lá que está a informação que decide a sua aprovação.",
  visible: {
    tag: "O que VOCÊ vê",
    title: "SPC & Serasa",
    percent: "~20%",
    caption: "A ponta visível",
    items: [
      "Se o seu nome está negativado",
      "Dívidas já em atraso",
      "Um score genérico, sem contexto",
    ],
  },
  hidden: {
    tag: "O que o BANCO vê",
    title: "SCR / BACEN",
    percent: "~80%",
    caption: "O que fica oculto de você",
    items: [
      "A sua nota de risco real, de AAA a C-",
      "O quanto da sua renda já está comprometida",
      "Toda a sua carteira de crédito, aberta operação por operação",
      "A busca recente por crédito e o limite que já te enquadram",
    ],
  },
  note: "É por isso que muita gente com o nome limpo continua tomando não do banco: o problema está no que ninguém te mostra.",
} as const;

/* ------------------------------------------------------------------ */
/* 3. Processo em 3 passos                                             */
/* ------------------------------------------------------------------ */

export type ProcessStep = { n: string; title: string; text: string };

export const process = {
  eyebrow: "Simples e rápido",
  h2: "Do pagamento à sua reunião, em 3 passos",
  lead: "Você não precisa entender de sistema bancário. A gente levanta tudo, traduz e senta com você pra explicar.",
  steps: [
    {
      n: "1",
      title: "Você garante o seu Diagnóstico Financeiro Completo",
      text: "Pagamento único, à vista no PIX ou parcelado no cartão. Sem cadastro complicado e sem mensalidade.",
    },
    {
      n: "2",
      title: "A gente levanta e analisa o seu CPF ou CNPJ",
      text: "Cruzamos mais de 15 fontes oficiais — SCR/BACEN, Receita Federal, cartórios, CCF e outras — e um especialista analisa o seu caso ponto a ponto.",
    },
    {
      n: "3",
      title: "Um especialista marca a sua reunião",
      text: "Em até 48h, um especialista entra em contato pra marcar uma reunião e apresentar o seu Diagnóstico Financeiro Completo, com o que fazer a seguir.",
    },
  ] satisfies ProcessStep[] as ProcessStep[],
} as const;

/* ------------------------------------------------------------------ */
/* 4. O que vem no Diagnóstico (entregável)                               */
/* ------------------------------------------------------------------ */

export const deliverable = {
  eyebrow: "O que você recebe",
  h2: "Um raio-X completo do seu CPF ou CNPJ em ± 8 páginas",
  lead: "Tudo o que o banco consulta sobre você, reunido, traduzido e explicado por quem entende de Rating Bancário.",
  items: [
    {
      title: "Conclusão de análise",
      text: "O veredito direto: aprovado, atenção ou reprovado, com o porquê por trás do resultado.",
    },
    {
      title: "Nota de risco AAA a C-",
      text: "A sua classificação real de crédito, a mesma escala que as instituições usam pra te enquadrar.",
    },
    {
      title: "Comprometimento de renda",
      text: "Quanto da sua renda já está comprometida — o número que mais pesa na hora da aprovação.",
    },
    {
      title: "Limite de crédito sugerido",
      text: "A faixa de crédito que o seu perfil deveria estar liberando hoje, com base na sua renda presumida.",
    },
    {
      title: "Carteira de crédito detalhada",
      text: "Cada operação ativa no seu CPF ou CNPJ, com valor, vencimento e situação — inclusive as que você já nem lembra.",
    },
    {
      title: "Registros que travam a aprovação",
      text: "RGI, cheque sem fundo (BACEN), protesto nacional e recuperação judicial cruzados no seu nome.",
    },
  ],
  proofLabel: "Veja um exemplo real de como chega o seu Diagnóstico Financeiro Completo",
} as const;

/* ------------------------------------------------------------------ */
/* 5. Exemplo do relatório — carrossel (páginas do PDF redigidas)      */
/* ------------------------------------------------------------------ */

export type ReportSlide = { image: string; caption: string; alt: string };

export const reportExample = {
  eyebrow: "Exemplo real",
  h2: "Veja, página por página, como chega o seu Diagnóstico Financeiro Completo",
  lead: "Um relatório completo com média de 8 páginas: score de rating, comprometimento de renda, limite sugerido, ocorrências, protestos e a sua carteira de crédito aberta. Deslize para ver cada seção.",
  warning: "Exemplo real · dados pessoais do titular protegidos",
  note: "Os dados pessoais do titular foram borrados para proteger a privacidade. Você recebe o seu com os seus próprios dados.",
  slides: [
    { image: "/relatorio-p1.webp", caption: "Resumo executivo e score de rating", alt: "Página 1 do relatório — resumo executivo e score de rating" },
    { image: "/relatorio-p2.webp", caption: "Leitura técnica e dados cadastrais", alt: "Página 2 do relatório — leitura técnica e dados cadastrais" },
    { image: "/relatorio-p3.webp", caption: "Ocorrências e restrições", alt: "Página 3 do relatório — ocorrências e restrições" },
    { image: "/relatorio-p4.webp", caption: "Bureau e restrições — detalhamento", alt: "Página 4 do relatório — bureau e restrições detalhado" },
    { image: "/relatorio-p5.webp", caption: "Protestos em cartório e histórico de consultas", alt: "Página 5 do relatório — protestos e histórico de consultas" },
    { image: "/relatorio-p6.webp", caption: "Carteira de crédito — SCR/BACEN", alt: "Página 6 do relatório — carteira de crédito no SCR/BACEN" },
    { image: "/relatorio-p7.webp", caption: "Carteira de crédito — detalhamento completo", alt: "Página 7 do relatório — carteira de crédito detalhada" },
    { image: "/relatorio-p8.webp", caption: "Síntese final e resumo geral", alt: "Página 8 do relatório — síntese final e resumo geral" },
  ] satisfies ReportSlide[] as ReportSlide[],
} as const;

/* ------------------------------------------------------------------ */
/* 6. Autoridade — Especialista Roberto                                */
/* ------------------------------------------------------------------ */

export const authority = {
  h2: "Quem assina",
  name: "Roberto Nogueira",
  role: "Especialista Financeiro e em Direito Bancário e Promotor de Justiça Aposentado",
  photo: "/especialista.jpg",
  photoAlt: "Roberto Nogueira, especialista financeiro e em direito bancário",
  bio: [
    "O Roberto passou anos do outro lado do balcão, lendo o que os bancos leem antes de dizer sim ou não a um CPF ou CNPJ. Foi ali que percebeu uma coisa: a maioria das pessoas é negada por motivos que elas nem sabem que existem.",
    "Hoje ele traduz esses dados oficiais pra linguagem de gente normal e senta com cada cliente pra mostrar, na prática, o que está travando o crédito e qual é o caminho pra destravar.",
  ],
  quote:
    "A maioria dos brasileiros nunca leu o relatório que os bancos usam pra decidir o crédito do próprio nome. O Diagnóstico existe pra colocar essa informação na mão de quem é dono do CPF ou CNPJ.",
} as const;

/* ------------------------------------------------------------------ */
/* 7. Oferta                                                           */
/* ------------------------------------------------------------------ */

export const offer = {
  eyebrow: "Oferta desta página",
  h2: "Garanta agora o seu Diagnóstico Financeiro Completo",
  lead: "Pagamento único. Sem mensalidade, sem pegadinha. Um raio-X do seu CPF ou CNPJ e uma reunião com especialista pra você saber exatamente o que fazer.",
  badge: "Vagas limitadas por semana",
  productName: "Diagnóstico Financeiro Completo",
  productSubtitle: "Relatório completo com média de 8 páginas + reunião com especialista.",
  priceOld: "R$ 199",
  priceLabel: "por apenas:",
  price: "R$ 97",
  priceComplement: "à vista no PIX",
  installments: "ou em 12x no cartão de crédito",
  cta: "Fazer meu Diagnóstico agora",
  ctaHref: CHECKOUT,
  seals: [
    "Pagamento único, sem mensalidade",
    "Dados oficiais e protegidos (LGPD)",
    "Reunião com especialista em até 48h",
    "Ambiente de pagamento 100% seguro",
  ],
  guarantee: "Você paga uma vez e recebe o Diagnóstico Financeiro Completo do seu CPF ou CNPJ, com acompanhamento de um especialista de verdade.",
} as const;

/* ------------------------------------------------------------------ */
/* 8. FAQ                                                              */
/* ------------------------------------------------------------------ */

export type FaqItem = { question: string; answer: string };

export const faq = {
  eyebrow: "Ainda tem dúvida?",
  h2: "Perguntas frequentes",
  lead: "As dúvidas mais comuns antes de fazer o seu Diagnóstico.",
  items: [
    {
      question: "Os dados do Diagnóstico são confiáveis?",
      answer:
        "São. As informações vêm direto do SCR/BACEN (Sistema de Informações de Crédito do Banco Central), regulamentado pela Resolução BCB 4.571/2017 — a mesma base que o banco consulta antes de qualquer operação. Cruzamos ainda dados oficiais da Receita Federal e de cartórios públicos. Nada de fonte informal: tudo oficial, atualizado mensalmente e protegido pela LGPD.",
    },
    {
      question: "Isso vai fazer uma consulta que suja o meu nome?",
      answer:
        "Não. O Diagnóstico é uma leitura da sua situação nas bases oficiais — não é uma solicitação de crédito. Ele não gera negativação nem interfere no seu score.",
    },
    {
      question: "Qual a diferença pro SPC e pro Serasa?",
      answer:
        "SPC e Serasa mostram basicamente dívida em atraso. O SCR/BACEN mostra o quadro completo: financiamentos, empréstimos, cartões, cheque especial, consórcios, parcelas em dia e a vencer, a sua nota de risco (AAA a C-) e a busca recente por crédito. É esse quadro completo que o banco olha — e que o seu Diagnóstico revela.",
    },
    {
      question: "Em quanto tempo um especialista fala comigo?",
      answer:
        "Após a confirmação do pagamento, você preenche seus dados e, em até 48h, um especialista entra em contato para marcar a sua reunião e apresentar o Diagnóstico Financeiro Completo. A reunião acontece por WhatsApp ou Online.",
    },
    {
      question: "O Diagnóstico garante que meu crédito vai ser aprovado?",
      answer:
        "Não. É um diagnóstico: ele mostra o que o banco enxerga e o que está travando as suas aprovações. O resultado depende do que você faz a partir dessa informação — e é justamente nisso que o especialista te ajuda na reunião.",
    },
    {
      question: "Como funciona o pagamento?",
      answer:
        "Pagamento único, em ambiente seguro: PIX à vista (com desconto) ou cartão de crédito em até 12x. Sem mensalidade e sem cobrança recorrente. Dados protegidos pela LGPD.",
    },
  ] satisfies FaqItem[] as FaqItem[],
} as const;

/* ------------------------------------------------------------------ */
/* 9. Fechamento                                                       */
/* ------------------------------------------------------------------ */

export const closing = {
  h2: "Pare de tentar no escuro. Veja o que o banco vê.",
  paragraph:
    "Você já entendeu que o problema pode não estar onde você imagina. Faça o seu Diagnóstico e descubra, com dados oficiais, o que está travando o seu crédito — com um especialista do seu lado pra te mostrar o caminho.",
  cta: "Fazer meu Diagnóstico agora",
  ctaHref: CHECKOUT,
  meta: "Pagamento seguro. Em até 48h um especialista entra em contato para marcar a sua reunião por WhatsApp ou Online.",
  seals: [
    "Dados oficiais SCR/BACEN",
    "Reunião com especialista",
    "Pagamento único",
    "Ambiente seguro",
  ],
} as const;

/* ------------------------------------------------------------------ */
/* 10. Rodapé                                                          */
/* ------------------------------------------------------------------ */

export const footer = {
  about: {
    title: "Sobre",
    body: "O Diagnóstico Financeiro Completo é um serviço informativo de análise financeira, baseado em dados oficiais do SCR/BACEN (Resolução BCB 4.571/2017). Não constitui promessa de aprovação de crédito. Este site não é vinculado ao Facebook nem ao Instagram.",
  },
  contact: {
    title: "Contato",
    hours: "Atendimento: seg–sex, 9h–18h",
  },
  institutional: {
    title: "Institucional",
    name: "Roberto Nogueira",
  },
  links: [
    { label: "Política de Privacidade", href: "#" },
    { label: "Termos de Uso", href: "#" },
  ],
  copyright: "© 2026 Roberto Nogueira. Todos os direitos reservados.",
  credit: {
    prefix: "Site desenvolvido pela ",
    name: "Assessoria Lagos",
    href: "https://assessorialagos.com.br",
  },
} as const;

/* ------------------------------------------------------------------ */
/* 11. Pop-up de saída (exit-intent)                                   */
/* ------------------------------------------------------------------ */

export const exitOffer = {
  eyebrow: "Última chance",
  title: { pre: "Você tá saindo ", hi: "sem", post: " seu Diagnóstico" },
  body: {
    pre: "Fecha agora e, em ",
    hi: "até 48h",
    post: ", um especialista entra em contato pra marcar a sua reunião.",
  },
  priceLead: "De R$ 97 por apenas",
  priceNew: "R$ 77",
  paymentNote: "Pagamento único, sem mensalidade",
  cta: "Fazer meu Diagnóstico agora →",
  ctaHref: CHECKOUT_DESCONTO,
  dismiss: "Não, prefiro sair sem o meu Diagnóstico",
  note: "Oferta válida só nesta sessão. Pagamento 100% seguro.",
} as const;
