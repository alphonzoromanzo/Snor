const REPORT_CONTENT = {
  green: {
    title: "Resultado Verde · risco baixo na triagem atual",
    meaning:
      "Os dados recolhidos não mostram sinais fortes de alarme neste momento. Ainda assim, o ronco pode ter impacto no descanso e deve ser reavaliado se piorar.",
    doNow: [
      "Adotar medidas de higiene do sono (horários regulares, evitar deitar muito tarde).",
      "Controlar peso, consumo de álcool noturno e posição de dormir.",
      "Vigiar sintomas nas próximas semanas e repetir triagem se surgirem novos sinais.",
    ],
    avoid: [
      "Ignorar agravamento progressivo do ronco ou cansaço diurno.",
      "Assumir que ausência de sintomas graves exclui totalmente doença do sono.",
    ],
    specialist: "Acompanhamento inicial com médico de família, se necessário.",
  },
  yellow: {
    title: "Resultado Amarelo · risco intermédio",
    meaning:
      "Existe suspeita moderada de distúrbio respiratório do sono. Não é um cenário de emergência, mas justifica avaliação médica programada.",
    doNow: [
      "Marcar consulta com médico de família nas próximas semanas.",
      "Levar registo de sintomas: frequência do ronco, pausas respiratórias observadas e sonolência diurna.",
      "Reforçar medidas de estilo de vida e segurança na condução quando cansado.",
    ],
    avoid: [
      "Adiar avaliação por vários meses perante sintomas persistentes.",
      "Conduzir quando existir sonolência relevante.",
    ],
    specialist:
      "Médico de família e possível referenciação para consulta de sono/otorrinolaringologia.",
  },
  orange: {
    title: "Resultado Laranja · risco elevado",
    meaning:
      "Há sinais consistentes com risco elevado de apneia obstrutiva do sono ou complicações associadas. É importante acelerar avaliação clínica.",
    doNow: [
      "Contactar médico de família com prioridade (idealmente em poucos dias).",
      "Considerar avaliação em consulta de sono, pneumologia ou otorrinolaringologia.",
      "Se houver sonolência diurna, reduzir atividades de risco (condução, máquinas).",
    ],
    avoid: [
      "Minimizar episódios de pausas respiratórias observadas por terceiros.",
      "Uso de álcool/sedativos noturnos sem orientação clínica.",
    ],
    specialist:
      "Consulta prioritária de medicina do sono (pneumologia/ORL) após triagem médica inicial.",
  },
  red: {
    title: "Resultado Vermelho · sinais de alerta",
    meaning:
      "Foram identificados sinais potencialmente graves. Esta triagem não substitui observação médica urgente.",
    doNow: [
      "Procurar avaliação médica urgente (SNS 24, urgência ou 112 conforme gravidade).",
      "Não conduzir nem realizar tarefas perigosas até orientação clínica.",
      "Levar este resumo para apoiar a avaliação inicial.",
    ],
    avoid: [
      "Esperar por consulta de rotina perante sinais neurológicos, dor torácica ou episódios de quase-acidente por sonolência.",
      "Autoajustar medicação sedativa sem falar com profissional de saúde.",
    ],
    specialist:
      "Via urgente; após estabilização, avaliação dirigida (sono, cardiologia, neurologia ou ORL).",
  },
};

function hasRedFlag(answer) {
  if (!Array.isArray(answer)) return false;
  return answer.some((item) => item !== "none");
}

function computeDerived(answers) {
  const bmi = Number(answers.bmi_value);
  const obesity = Number.isFinite(bmi) && bmi >= 30;

  const heavySnoring = ["most_nights", "every_night"].includes(answers.snore_frequency);
  const severeSleepiness = answers.day_sleepiness === "severe";
  const moderateSleepiness = ["moderate", "severe"].includes(answers.day_sleepiness);
  const apneasObserved = answers.witnessed_apneas === "yes";
  const nightChoking = answers.choking_night === "frequent";
  const drivingRisk = ["near_miss", "yes"].includes(answers.driving_sleepiness);
  const hardHypertension = answers.hypertension === "uncontrolled";

  return {
    obesity,
    heavySnoring,
    severeSleepiness,
    moderateSleepiness,
    apneasObserved,
    nightChoking,
    drivingRisk,
    hardHypertension,
    redFlagSymptoms: hasRedFlag(answers.urgent_red_flags),
  };
}

function determineCategory(d) {
  if (d.redFlagSymptoms || d.drivingRisk) return "red";

  const orangeScore = [d.apneasObserved, d.nightChoking, d.severeSleepiness, d.hardHypertension, d.obesity, d.heavySnoring].filter(Boolean).length;
  if (orangeScore >= 3 || (d.apneasObserved && d.severeSleepiness)) return "orange";

  const yellowScore = [d.heavySnoring, d.moderateSleepiness, d.apneasObserved, d.obesity].filter(Boolean).length;
  if (yellowScore >= 2) return "yellow";

  return "green";
}

function buildCriticalAreas(answers, d) {
  const areas = [];

  if (d.redFlagSymptoms) areas.push("Sinais de alerta clínico recente.");
  if (d.drivingRisk) areas.push("Risco de segurança por sonolência em condução/tarefas de risco.");
  if (d.apneasObserved) areas.push("Pausas respiratórias observadas durante o sono.");
  if (d.nightChoking) areas.push("Despertares com sensação de sufoco frequentes.");
  if (d.moderateSleepiness) areas.push("Sonolência diurna clinicamente relevante.");
  if (d.hardHypertension) areas.push("Hipertensão difícil de controlar.");
  if (d.obesity) areas.push("IMC elevado, fator associado a risco respiratório do sono.");
  if (answers.alcohol_sedatives_night === "frequent") {
    areas.push("Uso frequente de álcool/sedativos à noite, potencial agravante.");
  }

  if (!areas.length) {
    areas.push("Sem áreas críticas de alto risco identificadas nesta triagem.");
  }

  return areas;
}

export function classifyTriage(answers) {
  const derived = computeDerived(answers);
  const category = determineCategory(derived);
  const content = REPORT_CONTENT[category];
  const criticalAreas = buildCriticalAreas(answers, derived);

  return {
    category,
    ...content,
    criticalAreas,
    derived,
  };
}
