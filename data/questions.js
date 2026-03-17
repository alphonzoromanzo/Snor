export const questions = [
  {
    id: "age",
    type: "number",
    min: 18,
    max: 120,
    label: "Qual é a sua idade?",
    help: "Ferramenta destinada a adultos.",
  },
  {
    id: "snore_frequency",
    type: "single",
    label: "Com que frequência ronca?",
    options: [
      { value: "rare", label: "Raramente" },
      { value: "weekly", label: "Algumas noites por semana" },
      { value: "most_nights", label: "Na maioria das noites" },
      { value: "every_night", label: "Todas as noites" },
    ],
  },
  {
    id: "witnessed_apneas",
    type: "single",
    label: "Alguém observou pausas respiratórias durante o sono?",
    options: [
      { value: "no", label: "Não" },
      { value: "unsure", label: "Não sei" },
      { value: "yes", label: "Sim" },
    ],
  },
  {
    id: "choking_night",
    type: "single",
    label: "Acorda subitamente com sensação de sufoco ou falta de ar?",
    options: [
      { value: "no", label: "Não" },
      { value: "occasionally", label: "Ocasionalmente" },
      { value: "frequent", label: "Frequentemente" },
    ],
  },
  {
    id: "day_sleepiness",
    type: "single",
    label: "Sente sonolência excessiva durante o dia?",
    options: [
      { value: "no", label: "Não" },
      { value: "mild", label: "Ligeira" },
      { value: "moderate", label: "Moderada" },
      { value: "severe", label: "Importante" },
    ],
  },
  {
    id: "driving_sleepiness",
    type: "single",
    label: "Já teve sonolência ao conduzir ou em tarefas de risco?",
    options: [
      { value: "no", label: "Não" },
      { value: "near_miss", label: "Já quase adormeci/perdi atenção" },
      { value: "yes", label: "Sim, aconteceu" },
    ],
    show_if: {
      any: [
        { question: "day_sleepiness", equals: "moderate" },
        { question: "day_sleepiness", equals: "severe" },
      ],
    },
  },
  {
    id: "hypertension",
    type: "single",
    label: "Tem hipertensão arterial diagnosticada?",
    options: [
      { value: "no", label: "Não" },
      { value: "controlled", label: "Sim, controlada" },
      { value: "uncontrolled", label: "Sim, difícil de controlar" },
    ],
  },
  {
    id: "bmi_known",
    type: "single",
    label: "Sabe o seu índice de massa corporal (IMC)?",
    options: [
      { value: "no", label: "Não" },
      { value: "yes", label: "Sim" },
    ],
  },
  {
    id: "bmi_value",
    type: "number",
    min: 15,
    max: 65,
    step: "0.1",
    label: "Indique o seu IMC aproximado.",
    show_if: { all: [{ question: "bmi_known", equals: "yes" }] },
  },
  {
    id: "alcohol_sedatives_night",
    type: "single",
    label: "Consome álcool à noite ou sedativos para dormir?",
    options: [
      { value: "never", label: "Nunca" },
      { value: "sometimes", label: "Às vezes" },
      { value: "frequent", label: "Frequentemente" },
    ],
  },
  {
    id: "urgent_red_flags",
    type: "multi",
    label: "Teve algum destes sinais de alerta recentes?",
    options: [
      { value: "none", label: "Nenhum" },
      { value: "chest_pain", label: "Dor torácica ou falta de ar em repouso" },
      { value: "fainting", label: "Desmaio ou quase-desmaio" },
      { value: "stroke_signs", label: "Alteração súbita da fala, força ou visão" },
    ],
  },
];
