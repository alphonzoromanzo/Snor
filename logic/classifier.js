function isYes(value) {
  return value === "yes";
}

function countTrue(flags) {
  return flags.filter(Boolean).length;
}

export function computeDerived(answers) {
  const major_red_flag =
    answers.observed_breathing_pauses === "yes" ||
    answers.waking_gasping_or_choking === "two_plus" ||
    answers.dangerous_sleepiness === "yes_driving_or_risk" ||
    (answers.snoring_with_silent_pauses === "yes" && answers.excessive_daytime_sleepiness === "yes");

  const current_nasal_component =
    answers.nasal_blockage_at_bedtime === "yes" ||
    answers.morning_nasal_blockage === "yes" ||
    answers.mouth_breathing_at_night === "yes";

  const recurrent_non_cold_nasal_pattern =
    answers.nasal_issue_only_with_colds === "also_outside_colds" ||
    answers.allergic_or_rhinitis_pattern === "yes" ||
    answers.diagnosed_allergic_rhinitis === "yes";

  const clinical_burden_count = countTrue([
    isYes(answers.excessive_daytime_sleepiness),
    isYes(answers.non_restorative_sleep),
    isYes(answers.morning_headaches),
    isYes(answers.daytime_cognitive_impact),
    isYes(answers.known_hypertension),
    isYes(answers.dry_mouth_on_waking),
    isYes(answers.snoring_worsening_recently),
    isYes(answers.functional_daytime_impact),
    isYes(answers.activity_limited_by_sleepiness),
  ]);

  const modifiable_factor_count = countTrue([
    isYes(answers.regular_supine_sleep),
    isYes(answers.alcohol_before_sleep),
    isYes(answers.sedative_use_before_sleep),
    isYes(answers.current_smoker),
    isYes(answers.sleep_deprivation_pattern),
    isYes(answers.weight_gain_5kg_plus),
    current_nasal_component,
  ]);

  const simple_measures_failed =
    (answers.recent_side_sleep_trial === "yes" && answers.side_sleep_effect === "no_improvement") ||
    (answers.recent_alcohol_reduction_trial === "yes" && answers.alcohol_reduction_effect === "no_improvement") ||
    (answers.recent_nasal_support_trial === "yes" && answers.nasal_support_effect === "no_improvement") ||
    (answers.recent_nasal_treatment_used === "yes" && answers.nasal_treatment_effect === "no_improvement");

  const strong_ent_pattern =
    answers.known_upper_airway_anatomical_issue === "yes" &&
    current_nasal_component &&
    recurrent_non_cold_nasal_pattern;

  const snoring_core_pattern = answers.frequent_snoring === "yes" && answers.loud_snoring === "yes";

  return {
    major_red_flag,
    current_nasal_component,
    recurrent_non_cold_nasal_pattern,
    clinical_burden_count,
    modifiable_factor_count,
    simple_measures_failed,
    strong_ent_pattern,
    snoring_core_pattern,
  };
}

export function classify(answers, derived) {
  const isRed =
    answers.observed_breathing_pauses === "yes" ||
    answers.waking_gasping_or_choking === "two_plus" ||
    answers.dangerous_sleepiness === "yes_driving_or_risk" ||
    (answers.snoring_with_silent_pauses === "yes" && answers.excessive_daytime_sleepiness === "yes") ||
    (answers.loud_snoring === "yes" &&
      answers.excessive_daytime_sleepiness === "yes" &&
      answers.known_hypertension === "yes") ||
    derived.major_red_flag === true;

  if (isRed) return "red";

  const isOrange =
    derived.clinical_burden_count >= 3 ||
    answers.functional_daytime_impact === "yes" ||
    answers.snoring_worsening_recently === "yes" ||
    derived.strong_ent_pattern === true ||
    derived.simple_measures_failed === true ||
    (answers.frequent_snoring === "yes" &&
      answers.loud_snoring === "yes" &&
      answers.non_restorative_sleep === "yes");

  if (isOrange) return "orange";

  const isYellow =
    derived.modifiable_factor_count >= 2 ||
    (answers.snoring_worse_supine === "yes" && derived.clinical_burden_count < 3) ||
    (derived.current_nasal_component === true && derived.major_red_flag === false);

  if (isYellow) return "yellow";

  return "green";
}

const RESULT_CONTENT = {
  green: {
    title: "Provável ressonar simples",
    meaning:
      "Não surgem sinais fortes de alarme neste momento. O padrão parece de menor gravidade clínica.",
    doNow: [
      "Dormir de lado na maioria das noites",
      "Regularizar horas de sono",
      "Observar se o problema piora",
    ],
    avoid: [
      "Ignorar agravamento progressivo",
      "Usar sedativos para tentar resolver o ressonar",
    ],
    specialistHint: [
      "Sem necessidade imediata de consulta, salvo agravamento ou novos sinais de alarme.",
    ],
  },
  yellow: {
    title: "Ressonar provavelmente agravado por hábitos, posição ou nariz",
    meaning: "Foram identificados fatores modificáveis que podem estar a agravar o ressonar.",
    doNow: [
      "Dormir de lado em pelo menos 5 noites por semana",
      "Evitar álcool nas 4 horas antes de dormir",
      "Melhorar a respiração nasal se houver obstrução",
      "Reavaliar após 2 semanas",
    ],
    avoid: [
      "Comprar dispositivos caros demasiado cedo",
      "Assumir que melhoria parcial resolve tudo",
    ],
    specialistHint: [
      "Se não melhorar após 2 semanas, considerar consulta médica.",
      "Se houver componente nasal persistente, considerar ORL.",
    ],
  },
  orange: {
    title: "Ressonar com necessidade de avaliação médica",
    meaning:
      "Há sinais suficientes para justificar consulta médica. O problema pode ir além de ressonar simples.",
    doNow: [
      "Marcar consulta médica",
      "Manter medidas conservadoras enquanto aguarda",
      "Levar resumo dos sintomas",
    ],
    avoid: ["Adiar avaliação durante meses", "Depender apenas de apps ou gadgets"],
    specialistHint: [
      "Médico de família.",
      "ORL se o padrão nasal ou anatómico for forte.",
      "Medicina do sono se houver suspeita crescente de apneia do sono.",
    ],
  },
  red: {
    title: "Suspeita relevante de apneia do sono",
    meaning:
      "Foram identificados sinais de alarme compatíveis com maior risco clínico.",
    doNow: [
      "Marcar consulta médica com prioridade",
      "Evitar álcool antes de dormir",
      "Evitar sedativos sem orientação médica",
      "Dormir de lado enquanto aguarda avaliação",
      "Se tem sonolência ao volante, evitar condução em condições inseguras",
    ],
    avoid: [
      "Tratar isto como simples incómodo social",
      "Assumir que soluções caseiras chegam",
    ],
    specialistHint: [
      "Médico de família.",
      "Medicina do sono.",
      "ORL se houver sintomas nasais persistentes ou suspeita anatómica importante.",
    ],
  },
};

export function buildResult(level, answers, derived) {
  const criticalAreas = [];

  if (derived.major_red_flag) criticalAreas.push("Sinais de alarme respiratórios ou de sonolência");
  if (derived.current_nasal_component) criticalAreas.push("Componente nasal ou respiração pela boca");
  if (derived.strong_ent_pattern) criticalAreas.push("Possível componente anatómica ORL");
  if (derived.modifiable_factor_count >= 2) criticalAreas.push("Fatores agravantes modificáveis");
  if (derived.clinical_burden_count >= 3) criticalAreas.push("Carga sintomática clínica relevante");
  if (answers.functional_daytime_impact === "yes") criticalAreas.push("Impacto funcional durante o dia");

  const content = RESULT_CONTENT[level] ?? RESULT_CONTENT.green;

  return {
    level,
    title: content.title,
    meaning: content.meaning,
    criticalAreas,
    doNow: content.doNow,
    avoid: content.avoid,
    specialistHint: content.specialistHint,
  };
}
