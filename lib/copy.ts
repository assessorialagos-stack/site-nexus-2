/**
 * Copy definitiva da landing — v1 (aprovação visual).
 *
 * Todo o texto exibido no site mora neste arquivo. Os componentes não devem
 * conter strings de conteúdo hardcoded: para ajustar a copy, edite só aqui.
 *
 * REGRAS DE CONTEÚDO:
 * - Nenhuma menção a CNPJ ou razão social.
 * - O responsável é referido como "Especialista Roberto".
 */

export const brand = {
  name: "Especialista Roberto",
  product: "Diagnóstico do Rating Bancário",
  specialist: "Especialista Roberto",
} as const;

/* ------------------------------------------------------------------ */
/* 1. Hero                                                             */
/* ------------------------------------------------------------------ */

export const hero = {
  h1: "Quer saber, na real, quanto o seu CPF deveria ter liberado de crédito?",
  badges: ["Sem cadastro", "Sem cartão"],
  // Vazio = sem rótulo de placeholder (o slot da VSL segue no lugar até o vídeo real entrar).
  videoPlaceholderLabel: "",
  videoCaption: "Toque para assistir",
  cta: "Quero ver o meu agora →",
  ctaHref: "#calculadora",
} as const;

/* ------------------------------------------------------------------ */
/* 2. O que É / O que NÃO é                                            */
/* ------------------------------------------------------------------ */

export const whatItIs = {
  h2: "Antes de continuar: fica claro o que você recebe (e o que não recebe)",
  lead: "Transparência total pra você decidir com a informação na mão.",
  isNot: {
    title: "O que NÃO é",
    items: [
      'Não é serviço de "limpa nome"',
      "Não é garantia de que o banco vai te aprovar",
      "Não é chute, palpite ou consultoria genérica",
      "Não é parceiro oficial do BACEN, SPC ou Serasa",
      "Não pede nenhuma taxa antecipada de empréstimo",
    ],
  },
  is: {
    title: "O que É",
    items: [
      "Relatório informativo de até 8 páginas com dados coletados em fontes bancárias, Receita Federal e Banco Central do Brasil",
      "Nota de risco de AAA a C- cruzada com a sua renda presumida, mostrando o limite atual e o limite adequado",
      "Mapa completo da carteira de crédito do seu CPF, com valores e vencimentos",
      "Leitura combinada de 15+ indicadores que explicam o que trava a sua aprovação",
    ],
  },
} as const;

/* ------------------------------------------------------------------ */
/* 3. Calculadora                                                      */
/* ------------------------------------------------------------------ */

export const calculator = {
  h2: "Em 30 segundos, veja quanto o seu CPF deveria estar liberando.",
  lead: "São 4 perguntas rápidas. Sem cadastro, sem cartão. O resultado aparece na hora e mostra qual seria o crédito coerente com o seu perfil.",
  fields: {
    income: {
      label: "Renda mensal líquida",
      placeholder: "R$ 0,00",
      micro: "A renda é o ponto de partida do cálculo.",
    },
    age: {
      label: "Idade",
      placeholder: "Ex: 34",
      micro: "O sistema favorece a faixa 30–55 anos.",
    },
    situation: {
      label: "Situação atual",
      placeholder: "Selecione a sua situação",
      micro: "Cada situação tem um multiplicador diferente.",
    },
    state: {
      label: "Estado",
      placeholder: "Selecione o seu estado",
    },
  },
  submit: "Calcular meu limite",
  result: {
    emptyTitle: "Preencha o formulário ao lado",
    emptyTitleMobile: "Preencha o formulário acima",
    label: "O seu poder de crédito deveria ser no mínimo de:",
    rangeLabel: "Faixa estimada:",
    immediateLabel: "Média que as instituições deveriam liberar imediato: entre",
    alert: "Você pode estar deixando de acessar até {gap} em crédito.",
    cta: "Quero descobrir o que está travando meu CPF",
    ctaSub: "Clique no link, preencha as informações e em até 48h um especialista irá marcar sua reunião",
    ctaHref: "#oferta",
  },
  accordion: {
    title: "Como esse número é calculado",
    body: "O número é uma estimativa estatística que reproduz o ponto de partida do sistema bancário brasileiro: renda mensal × multiplicador da sua situação × ajuste por faixa etária.",
  },
} as const;

/* ------------------------------------------------------------------ */
/* 4. Exemplo do relatório                                             */
/* ------------------------------------------------------------------ */

export type ReportTabId = "aprovado" | "atencao" | "reprovado";

export type ReportTab = {
  id: ReportTabId;
  /** Rótulo curto da aba, sem o ícone (o ícone é SVG no componente). */
  tabLabel: string;
  /** Ícone semântico da aba. */
  tone: "success" | "warning" | "danger";
  /**
   * Imagem do relatório exibida na aba (servida de /public).
   * Basta soltar o arquivo com este nome na pasta public/ que ela aparece.
   */
  image: string;
  imageAlt: string;
  /** Campos abaixo ficam como referência; o conteúdo visível hoje é a imagem. */
  rating: string;
  conclusion: string;
  kpis: {
    commitment: string;
    capacity: string;
    suggestedLimit: string;
  };
};

export const reportExample = {
  h2: "Veja um EXEMPLO de como chega o Diagnóstico depois da compra",
  lead: "Clique nas abas abaixo pra explorar cada cenário.",
  warning: "Exemplo simulado · Dados fictícios",
  doc: {
    timestamp: "29/04/2026, 14:32",
    title: "RATING BANCÁRIO",
    author: `${brand.specialist} · Especialista em Rating`,
  },
  conclusionTitle: "Conclusão de Análise Inteligente",
  scaleTitle: "Classificação do Risco de Crédito",
  scaleLevels: ["AAA", "AA", "A", "B+", "B", "B-", "C+", "C", "C-"],
  scaleCaption:
    "A escala serve pra estimar o perfil financeiro com base em modelos estatísticos e pode não corresponder à sua renda real. A decisão final segue sendo do cedente do crédito, que avalia outros pontos além dessa estimativa.",
  kpiLabels: {
    commitment: "Comprometimento de Renda",
    capacity: "Capacidade Mensal de Pagamento",
    suggestedLimit: "Limite de Crédito Sugerido",
  },
  kpiDescriptions: {
    commitment:
      "É a análise que mede a fatia da renda disponível já comprometida com dívidas, financiamentos e despesas fixas.",
    capacity: "",
    suggestedLimit:
      "Mostra, em faixa de valores em reais, o teto mensal razoável de concessão de crédito pro grupo em que o seu perfil se enquadra.",
  },
  panelFooter: "+ 7 páginas com Resumo, Detalhes e Carteira de Crédito completa",
  upsell:
    "Além do relatório, você pode receber orientação individual dos nossos especialistas pra corrigir o que ficou exposto no diagnóstico.",
  tabs: [
    {
      id: "aprovado",
      tabLabel: "Aprovado AAA",
      tone: "success",
      image: "/relatorio-aprovado.png",
      imageAlt: "Exemplo de Diagnóstico com resultado Aprovado (rating AAA)",
      rating: "AAA",
      conclusion:
        "Nenhum registro de inadimplência foi identificado, nem indicadores de risco relevantes. O score aparece em faixa alta, o que sugere boa confiabilidade. A renda estimada sustenta a capacidade de pagamento.",
      kpis: {
        commitment: "7%",
        capacity: "R$ 13.875,00",
        suggestedLimit: "R$ 41.625,00",
      },
    },
    {
      id: "atencao",
      tabLabel: "Atenção B",
      tone: "warning",
      image: "/relatorio-atencao.png",
      imageAlt: "Exemplo de Diagnóstico com resultado em Atenção (rating B)",
      rating: "B",
      conclusion:
        "Foram identificados sinais moderados de risco: comprometimento de renda acima do ideal e presença de operações de crédito recentes. A pontuação está numa faixa média, o que exige atenção antes de novas contratações.",
      kpis: {
        commitment: "34%",
        capacity: "R$ 6.240,00",
        suggestedLimit: "R$ 12.800,00",
      },
    },
    {
      id: "reprovado",
      tabLabel: "Reprovado C-",
      tone: "danger",
      image: "/relatorio-reprovado.png",
      imageAlt: "Exemplo de Diagnóstico com resultado Reprovado (rating C-)",
      rating: "C-",
      conclusion:
        "Foram identificadas ocorrências relevantes na carteira do CPF — dívidas ativas em atraso, comprometimento elevado da renda e registros negativos. A pontuação está na faixa mais baixa e explica a recorrência de negativas.",
      kpis: {
        commitment: "71%",
        capacity: "R$ 1.180,00",
        suggestedLimit: "R$ 2.400,00",
      },
    },
  ] satisfies ReportTab[] as ReportTab[],
} as const;

/* ------------------------------------------------------------------ */
/* 5. Oferta principal                                                 */
/* ------------------------------------------------------------------ */

export const offer = {
  h2: "Pega agora o seu Diagnóstico e descobre, de fato, o que trava o seu crédito",
  lead: "Pagamento único. Você preenche seus dados e, em até 48h, um especialista marca a sua reunião.",
  badge: "Oferta limitada",
  productName: brand.product,
  productSubtitle: "Tudo o que o banco enxerga do seu CPF, condensado em 8 páginas.",
  priceStrike: "R$ 199",
  priceLabel: "por apenas:",
  price: "R$ 97",
  priceComplement: "à vista no PIX",
  installments: "ou em 12x no cartão de crédito",
  micro: "No cartão, sai por menos de um cafezinho por dia — clareza total sobre o seu CPF.",
  cta: "Quero meu Diagnóstico agora →",
  ctaHref: "#",
  seals: [
    "Compra segura",
    "Dados protegidos",
    "Suporte humano",
    "Reunião marcada em até 48h",
  ],
} as const;

/* ------------------------------------------------------------------ */
/* 6. Depoimentos                                                      */
/* ------------------------------------------------------------------ */

export type Testimonial = {
  title: string;
  quote: string;
  initials: string;
  /** Cor sólida do avatar (3 cores distintas). */
  avatarColor: string;
  name: string;
  description: string;
};

export const testimonials = {
  h2: "Quem passou pelo Diagnóstico, entendeu o próprio jogo",
  lead: "Três relatos reais de quem enxergou o que o banco vê e mudou a rota.",
  disclaimer:
    "Depoimentos com base em experiências reais. Cada perfil financeiro reage de um jeito e os resultados variam.",
  items: [
    {
      title: "Crédito recusado do nada",
      quote:
        "Estava com o nome limpo fazia mais de 2 anos e mesmo assim nenhum banco aprovava o financiamento do meu carro. O Diagnóstico revelou uma dívida interna de R$ 1.247, num cartão que nem lembrava mais. Quitei essa pendência e, em 18 dias, o financiamento saiu.",
      initials: "MF",
      avatarColor: "#2e7be8",
      name: "Marcelo Ferreira",
      description: "Eletricista autônomo · Belo Horizonte/MG",
    },
    {
      title: "Ela desacreditou",
      quote:
        "Confesso que fiquei em dúvida antes de comprar. Meu crédito já era bom e imaginei que o relatório não teria utilidade. Ao receber, entendi na hora onde dava pra ajustar e, em poucas semanas, meu limite subiu mais R$ 12.000.",
      initials: "RS",
      avatarColor: "#1e40af",
      name: "Rafaela Santana",
      description: "Vendedora CLT · Goiânia/GO",
    },
    {
      title: "Especialista virou o placar",
      quote:
        "Depois de receber o relatório, conversei com o especialista e, seguindo as orientações, resolvi todas as pendências. Hoje meu score deu um salto grande e é o próprio banco que oferece crédito sem eu pedir. Trocou o meu jogo financeiro.",
      initials: "CE",
      avatarColor: "#0369a1",
      name: "Carlos Eduardo Lima",
      description: "Empresário (MEI) · Curitiba/PR",
    },
  ] satisfies Testimonial[] as Testimonial[],
} as const;

/* ------------------------------------------------------------------ */
/* 7. Autoridade                                                       */
/* ------------------------------------------------------------------ */

export const authority = {
  h2: "Quem assina o Diagnóstico",
  lead: "Time especializado em leitura de Rating Bancário e SCR/BACEN.",
  /** Foto real do especialista servida de /public. */
  photo: "/especialista.jpg",
  photoAlt: "Especialista Roberto, especialista em análise de crédito bancário",
  name: brand.specialist,
  role: "Especialista em análise de crédito bancário",
  quote:
    "A maioria dos brasileiros nunca leu o relatório que os bancos usam pra decidir o crédito do próprio nome. Esse trabalho existe pra traduzir esses dados e devolver essa decisão pra mão de quem é dono do CPF.",
} as const;

/* ------------------------------------------------------------------ */
/* 8. Fechamento                                                       */
/* ------------------------------------------------------------------ */

export const closing = {
  h2: "Você já assistiu ao vídeo, simulou o limite, viu o modelo do relatório e leu a conclusão.",
  paragraph:
    "Agora só falta descobrir, com dados oficiais, o que está impresso no seu CPF hoje. Em até 48h um especialista marca a sua reunião.",
  cta: "Fazer meu Diagnóstico por R$ 97 →",
  ctaHref: "#",
  meta: "Pagamento seguro. Em até 48h um especialista marca a sua reunião. Time especializado em análise de Rating Bancário.",
  seals: [
    "8 páginas detalhadas",
    "Dados oficiais SCR/BACEN",
    "Reunião marcada em até 48h",
    "Compra segura",
  ],
} as const;

/* ------------------------------------------------------------------ */
/* 9. FAQ                                                              */
/* ------------------------------------------------------------------ */

export type FaqItem = { question: string; answer: string };

export const faq = {
  h2: "Perguntas frequentes",
  lead: "As dúvidas mais comuns antes de pedir o seu Diagnóstico.",
  items: [
    {
      question: "Os dados do relatório são confiáveis?",
      answer:
        "Sim. As informações vêm direto do SCR/BACEN (Sistema de Informações de Crédito do Banco Central), regulamentado pela Resolução BCB 4.571/2017 — a mesma base que o banco consulta antes de qualquer operação. O relatório também cruza dados oficiais da Receita Federal (renda presumida, situação cadastral) e de cartórios públicos (protestos, RGI, cheque sem fundo). Nenhuma fonte informal, nenhuma raspagem: tudo oficial, atualizado mensalmente e protegido pela LGPD.",
    },
    {
      question: "O que é o BACEN?",
      answer:
        "O BACEN (Banco Central do Brasil) é o órgão público que regula todo o sistema financeiro nacional — bancos, financeiras, fintechs, cooperativas e meios de pagamento. É ele que mantém o SCR, banco de dados oficial onde fica o histórico de crédito de todos os CPFs do país. Quando o banco analisa a sua ficha, é aqui que ele olha antes de SPC ou Serasa.",
    },
    {
      question: "O que é o SCR?",
      answer:
        'O SCR (Sistema de Informações de Crédito) é o registro mais completo do seu histórico financeiro. Diferente de SPC e Serasa, que só mostram dívida em atraso, o SCR mostra tudo: financiamentos, empréstimos, cartões, cheque especial, consórcios, parcelas em dia, parcelas por vencer, classificação de risco (AAA a C-) e busca recente por crédito. Foi criado pela Resolução BCB 4.571/2017 e é alimentado mensalmente pelas instituições autorizadas. É esse banco que define a sua "renda presumida" e o "limite sugerido" que cada instituição vai te oferecer.',
    },
    {
      question: "Como as dívidas são verificadas?",
      answer:
        "A carteira do seu CPF é montada a partir do cruzamento de várias bases oficiais: o SCR/BACEN (operações ativas e a vencer), o CCF (Cadastro de Cheques Sem Fundo do Banco Central), o RGI (Registro Geral de Inadimplentes), cartórios de protesto e o sistema de Recuperação Judicial. Cada operação sai com valor, instituição credora, data de vencimento e situação (em dia, a vencer, em atraso). É por aqui que aparecem dívidas internas esquecidas, marcações antigas e operações invisíveis pra SPC e Serasa.",
    },
    {
      question: "O Diagnóstico garante que meu crédito será aprovado?",
      answer:
        "Não. É um relatório informativo de diagnóstico que mostra o que o banco enxerga e os pontos invisíveis que podem estar travando aprovações. O resultado depende do que você faz a partir das informações reveladas.",
    },
    {
      question: "Em quanto tempo um especialista fala comigo?",
      answer:
        "Após a confirmação do pagamento, você preenche seus dados e, em até 48h, um especialista entra em contato para marcar a sua reunião.",
    },
    {
      question: "O que aparece dentro do relatório?",
      answer:
        "8 páginas cobrindo: Identificação, Conclusão de Análise (Aprovado/Atenção/Reprovado), Classificação de Risco AAA–C, Comprometimento de Renda, Endividamento, Saúde Financeira, Capacidade Mensal de Pagamento, Limite Sugerido, RGI, Cheque Sem Fundo BACEN, Protesto Nacional, Recuperação Judicial e Carteira de Crédito Detalhada (cada operação ativa hoje no seu CPF).",
    },
    {
      question: "Como funciona o pagamento?",
      answer:
        "Pagamento via checkout seguro no cartão de crédito (até 12x de R$ 9,91), PIX à vista (R$ 97 com desconto) ou boleto. Ambiente seguro, dados protegidos pela LGPD.",
    },
  ] satisfies FaqItem[] as FaqItem[],
} as const;

/* ------------------------------------------------------------------ */
/* 10. Rodapé                                                          */
/* ------------------------------------------------------------------ */
/* ATENÇÃO: nada de razão social ou CNPJ nesta seção — só contato e     */
/* institucional (apenas o nome fantasia).                              */

export const footer = {
  about: {
    title: "Sobre",
    body: "O Diagnóstico do Rating Bancário é um serviço informativo de análise financeira, baseado em dados oficiais do SCR/BACEN (Resolução BCB 4.571/2017). Não constitui promessa de aprovação de crédito. Este site não é vinculado ao Facebook nem ao Instagram.",
  },
  contact: {
    title: "Contato",
    hours: "Atendimento: seg–sex, 9h–18h",
  },
  institutional: {
    title: "Institucional",
    name: brand.name,
  },
  links: [
    { label: "Política de Privacidade", href: "#" },
    { label: "Termos de Uso", href: "#" },
  ],
  copyright: "© 2026 Especialista Roberto. Todos os direitos reservados.",
  // Crédito de desenvolvimento — "Assessoria Lagos" leva ao site da agência.
  credit: {
    prefix: "Site desenvolvido pela ",
    name: "Assessoria Lagos",
    href: "https://assessorialagos.com.br",
  },
} as const;

/* ------------------------------------------------------------------ */
/* Metadata                                                            */
/* ------------------------------------------------------------------ */

export const meta = {
  title: "Diagnóstico do Rating Bancário",
  description:
    "Relatório informativo de até 8 páginas com dados oficiais do SCR/BACEN. Descubra o que trava o crédito do seu CPF. Em até 48h um especialista marca a sua reunião.",
} as const;

/* ------------------------------------------------------------------ */
/* Pop-up de saída (exit-intent)                                       */
/* ------------------------------------------------------------------ */
/* Aparece uma vez por sessão quando a pessoa demonstra intenção de     */
/* sair, oferecendo o desconto de R$ 97 para R$ 79.                     */

export const exitOffer = {
  eyebrow: "Espera!",
  title: "Antes de fechar, um desconto só seu",
  body: "Garante o seu Diagnóstico agora por menos:",
  priceOld: "R$ 97",
  priceNew: "R$ 79",
  cta: "Quero por R$ 79 →",
  ctaHref: "#oferta",
  dismiss: "Agora não, obrigado",
  note: "Oferta válida só nesta visita.",
} as const;
