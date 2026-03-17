export const questions = {
  "version": "1.0.0",
  "locale": "pt-PT",
  "product": {
    "name": "snoring-triage",
    "title_pt": "Triagem de Ressonar",
    "description_pt": "Ferramenta de triagem para orientar o utilizador sobre o que fazer em caso de ressonar. Não faz diagnóstico médico."
  },
  "ui": {
    "intro_title_pt": "Antes de começar",
    "intro_text_pt": "Esta ferramenta faz triagem e não substitui avaliação médica. Se houver sinais de alarme, o resultado pode recomendar consulta médica com prioridade.",
    "result_titles": {
      "green": "Provável ressonar simples",
      "yellow": "Ressonar provavelmente agravado por hábitos, posição ou nariz",
      "orange": "Ressonar com necessidade de avaliação médica",
      "red": "Suspeita relevante de apneia do sono"
    }
  },
  "blocks": [
    {
      "id": "red_flags",
      "title_pt": "Sinais de alarme"
    },
    {
      "id": "snoring_pattern",
      "title_pt": "Padrão do ressonar"
    },
    {
      "id": "modifiable_factors",
      "title_pt": "Fatores agravantes modificáveis"
    },
    {
      "id": "ent_nasal",
      "title_pt": "Nariz, alergias e via aérea superior"
    },
    {
      "id": "functional_impact",
      "title_pt": "Impacto funcional"
    },
    {
      "id": "previous_attempts",
      "title_pt": "Tentativas recentes"
    }
  ],
  "questions": [
    {
      "id": "A1",
      "block": "red_flags",
      "question_pt": "Nas últimas 2 semanas, alguém observou que parou de respirar durante o sono, mesmo que por alguns segundos?",
      "response_type": "single_choice",
      "options": [
        { "label": "Sim", "value": "yes" },
        { "label": "Não", "value": "no" },
        { "label": "Não sei, porque durmo sozinho ou ninguém reparou", "value": "unknown" }
      ],
      "variable": "observed_breathing_pauses",
      "show_if": null,
      "weight": 3,
      "major_red_flag": true,
      "logic_usage": ["red_rule_direct"]
    },
    {
      "id": "A2",
      "block": "red_flags",
      "question_pt": "Nas últimas 2 semanas, acordou a engasgar, a ofegar, ou com sensação de falta de ar durante a noite?",
      "response_type": "single_choice",
      "options": [
        { "label": "Nunca", "value": "never" },
        { "label": "1 vez", "value": "once" },
        { "label": "2 ou mais vezes", "value": "two_plus" }
      ],
      "variable": "waking_gasping_or_choking",
      "show_if": null,
      "weight": 3,
      "major_red_flag": true,
      "logic_usage": ["red_rule_direct"]
    },
    {
      "id": "A3",
      "block": "red_flags",
      "question_pt": "Nas últimas 2 semanas, o seu ressonar teve períodos de silêncio seguidos de um ronco forte, um “snort” ou um som brusco ao retomar a respiração?",
      "response_type": "single_choice",
      "options": [
        { "label": "Sim", "value": "yes" },
        { "label": "Não", "value": "no" },
        { "label": "Não sei", "value": "unknown" }
      ],
      "variable": "snoring_with_silent_pauses",
      "show_if": null,
      "weight": 3,
      "major_red_flag": true,
      "logic_usage": ["red_rule_combo"]
    },
    {
      "id": "A4",
      "block": "red_flags",
      "question_pt": "Nas últimas 2 semanas, sentiu sono difícil de resistir durante o dia em 3 ou mais dias por semana?",
      "response_type": "single_choice",
      "options": [
        { "label": "Sim", "value": "yes" },
        { "label": "Não", "value": "no" }
      ],
      "variable": "excessive_daytime_sleepiness",
      "show_if": null,
      "weight": 3,
      "major_red_flag": true,
      "logic_usage": ["red_rule_combo", "clinical_burden"]
    },
    {
      "id": "A5",
      "block": "red_flags",
      "question_pt": "Nas últimas 2 semanas, adormeceu ou esteve prestes a adormecer em situações em que devia estar desperto, como a conduzir, em reuniões, a ver televisão sentado ou noutras situações semelhantes?",
      "response_type": "single_choice",
      "options": [
        { "label": "Não", "value": "no" },
        { "label": "Sim, mas nunca a conduzir", "value": "yes_not_driving" },
        { "label": "Sim, incluindo a conduzir ou em situação de risco", "value": "yes_driving_or_risk" }
      ],
      "variable": "dangerous_sleepiness",
      "show_if": null,
      "weight": 3,
      "major_red_flag": true,
      "logic_usage": ["red_rule_direct", "clinical_burden"]
    },
    {
      "id": "A6",
      "block": "red_flags",
      "question_pt": "Nas últimas 2 semanas, acordou sem sensação de descanso em 3 ou mais manhãs por semana?",
      "response_type": "single_choice",
      "options": [
        { "label": "Sim", "value": "yes" },
        { "label": "Não", "value": "no" }
      ],
      "variable": "non_restorative_sleep",
      "show_if": null,
      "weight": 2,
      "major_red_flag": false,
      "logic_usage": ["clinical_burden"]
    },
    {
      "id": "A7",
      "block": "red_flags",
      "question_pt": "Nas últimas 2 semanas, teve dores de cabeça ao acordar em 2 ou mais manhãs por semana?",
      "response_type": "single_choice",
      "options": [
        { "label": "Sim", "value": "yes" },
        { "label": "Não", "value": "no" }
      ],
      "variable": "morning_headaches",
      "show_if": null,
      "weight": 2,
      "major_red_flag": false,
      "logic_usage": ["clinical_burden"]
    },
    {
      "id": "A8",
      "block": "red_flags",
      "question_pt": "Nas últimas 2 semanas, sentiu pior concentração, lapsos de atenção, irritabilidade ou fadiga mental em 3 ou mais dias por semana?",
      "response_type": "single_choice",
      "options": [
        { "label": "Sim", "value": "yes" },
        { "label": "Não", "value": "no" }
      ],
      "variable": "daytime_cognitive_impact",
      "show_if": null,
      "weight": 2,
      "major_red_flag": false,
      "logic_usage": ["clinical_burden"]
    },
    {
      "id": "A9",
      "block": "red_flags",
      "question_pt": "Tem diagnóstico médico de hipertensão arterial?",
      "response_type": "single_choice",
      "options": [
        { "label": "Sim", "value": "yes" },
        { "label": "Não", "value": "no" },
        { "label": "Não sei", "value": "unknown" }
      ],
      "variable": "known_hypertension",
      "show_if": null,
      "weight": 2,
      "major_red_flag": false,
      "logic_usage": ["clinical_burden", "red_rule_combo"]
    },
    {
      "id": "A10",
      "block": "red_flags",
      "question_pt": "Nas últimas 2 semanas, acordou com boca ou garganta secas em 3 ou mais manhãs por semana?",
      "response_type": "single_choice",
      "options": [
        { "label": "Sim", "value": "yes" },
        { "label": "Não", "value": "no" }
      ],
      "variable": "dry_mouth_on_waking",
      "show_if": null,
      "weight": 1,
      "major_red_flag": false,
      "logic_usage": ["clinical_burden", "nasal_or_mouth_breathing_clue"]
    },
    {
      "id": "B1",
      "block": "snoring_pattern",
      "question_pt": "Nas últimas 2 semanas, ressonou em 3 ou mais noites por semana?",
      "response_type": "single_choice",
      "options": [
        { "label": "Sim", "value": "yes" },
        { "label": "Não", "value": "no" },
        { "label": "Não sei", "value": "unknown" }
      ],
      "variable": "frequent_snoring",
      "show_if": null,
      "weight": 1,
      "major_red_flag": false,
      "logic_usage": ["snoring_context"]
    },
    {
      "id": "B2",
      "block": "snoring_pattern",
      "question_pt": "Nas últimas 2 semanas, o seu ressonar foi suficientemente alto para ser ouvido noutra divisão, ou para acordar ou impedir o sono de outra pessoa?",
      "response_type": "single_choice",
      "options": [
        { "label": "Sim", "value": "yes" },
        { "label": "Não", "value": "no" },
        { "label": "Não sei", "value": "unknown" }
      ],
      "variable": "loud_snoring",
      "show_if": null,
      "weight": 2,
      "major_red_flag": false,
      "logic_usage": ["red_rule_combo", "snoring_core_pattern"]
    },
    {
      "id": "B3",
      "block": "snoring_pattern",
      "question_pt": "Nas últimas 2 semanas, o ressonar pareceu pior quando dormiu de barriga para cima?",
      "response_type": "single_choice",
      "options": [
        { "label": "Sim", "value": "yes" },
        { "label": "Não", "value": "no" },
        { "label": "Não sei", "value": "unknown" }
      ],
      "variable": "snoring_worse_supine",
      "show_if": null,
      "weight": 1,
      "major_red_flag": false,
      "logic_usage": ["modifiable_factor_hint"]
    },
    {
      "id": "B4",
      "block": "snoring_pattern",
      "question_pt": "Nos últimos 3 meses, sente que o ressonar se tornou mais frequente, mais alto, ou mais perturbador?",
      "response_type": "single_choice",
      "options": [
        { "label": "Sim", "value": "yes" },
        { "label": "Não", "value": "no" },
        { "label": "Não sei", "value": "unknown" }
      ],
      "variable": "snoring_worsening_recently",
      "show_if": null,
      "weight": 2,
      "major_red_flag": false,
      "logic_usage": ["clinical_burden", "orange_rule_direct"]
    },
    {
      "id": "C1",
      "block": "modifiable_factors",
      "question_pt": "Nas últimas 2 semanas, dormiu de barriga para cima em 3 ou mais noites por semana?",
      "response_type": "single_choice",
      "options": [
        { "label": "Sim", "value": "yes" },
        { "label": "Não", "value": "no" },
        { "label": "Não sei", "value": "unknown" }
      ],
      "variable": "regular_supine_sleep",
      "show_if": null,
      "weight": 1,
      "major_red_flag": false,
      "logic_usage": ["modifiable_factor_count"]
    },
    {
      "id": "C2",
      "block": "modifiable_factors",
      "question_pt": "Nas últimas 2 semanas, bebeu álcool nas 4 horas antes de se deitar em 2 ou mais noites por semana?",
      "response_type": "single_choice",
      "options": [
        { "label": "Sim", "value": "yes" },
        { "label": "Não", "value": "no" }
      ],
      "variable": "alcohol_before_sleep",
      "show_if": null,
      "weight": 1,
      "major_red_flag": false,
      "logic_usage": ["modifiable_factor_count"]
    },
    {
      "id": "C3",
      "block": "modifiable_factors",
      "question_pt": "Nas últimas 2 semanas, tomou medicação para dormir, ansiolíticos, sedativos ou anti-histamínicos sedativos ao deitar em 2 ou mais noites por semana?",
      "response_type": "single_choice",
      "options": [
        { "label": "Sim", "value": "yes" },
        { "label": "Não", "value": "no" },
        { "label": "Não sei", "value": "unknown" }
      ],
      "variable": "sedative_use_before_sleep",
      "show_if": null,
      "weight": 1,
      "major_red_flag": false,
      "logic_usage": ["modifiable_factor_count"]
    },
    {
      "id": "C4",
      "block": "modifiable_factors",
      "question_pt": "Atualmente fuma tabaco ou usa nicotina na maioria dos dias da semana?",
      "response_type": "single_choice",
      "options": [
        { "label": "Sim", "value": "yes" },
        { "label": "Não", "value": "no" }
      ],
      "variable": "current_smoker",
      "show_if": null,
      "weight": 1,
      "major_red_flag": false,
      "logic_usage": ["modifiable_factor_count"]
    },
    {
      "id": "C5",
      "block": "modifiable_factors",
      "question_pt": "Nas últimas 2 semanas, dormiu menos de 7 horas por noite em 5 ou mais noites por semana?",
      "response_type": "single_choice",
      "options": [
        { "label": "Sim", "value": "yes" },
        { "label": "Não", "value": "no" }
      ],
      "variable": "sleep_deprivation_pattern",
      "show_if": null,
      "weight": 1,
      "major_red_flag": false,
      "logic_usage": ["modifiable_factor_count"]
    },
    {
      "id": "C6",
      "block": "modifiable_factors",
      "question_pt": "Nos últimos 12 meses, aumentou pelo menos 5 kg de peso corporal?",
      "response_type": "single_choice",
      "options": [
        { "label": "Sim", "value": "yes" },
        { "label": "Não", "value": "no" },
        { "label": "Não sei", "value": "unknown" }
      ],
      "variable": "weight_gain_5kg_plus",
      "show_if": null,
      "weight": 1,
      "major_red_flag": false,
      "logic_usage": ["modifiable_factor_count"]
    },
    {
      "id": "D1",
      "block": "ent_nasal",
      "question_pt": "Nas últimas 2 semanas, teve o nariz entupido ao deitar em 3 ou mais noites por semana?",
      "response_type": "single_choice",
      "options": [
        { "label": "Sim", "value": "yes" },
        { "label": "Não", "value": "no" }
      ],
      "variable": "nasal_blockage_at_bedtime",
      "show_if": null,
      "weight": 1,
      "major_red_flag": false,
      "logic_usage": ["current_nasal_component", "modifiable_factor_count"]
    },
    {
      "id": "D2",
      "block": "ent_nasal",
      "question_pt": "Nas últimas 2 semanas, acordou com sensação de nariz tapado em 3 ou mais manhãs por semana?",
      "response_type": "single_choice",
      "options": [
        { "label": "Sim", "value": "yes" },
        { "label": "Não", "value": "no" }
      ],
      "variable": "morning_nasal_blockage",
      "show_if": null,
      "weight": 1,
      "major_red_flag": false,
      "logic_usage": ["current_nasal_component"]
    },
    {
      "id": "D3",
      "block": "ent_nasal",
      "question_pt": "Nas últimas 2 semanas, respirou principalmente pela boca durante a noite em 3 ou mais noites por semana?",
      "response_type": "single_choice",
      "options": [
        { "label": "Sim", "value": "yes" },
        { "label": "Não", "value": "no" },
        { "label": "Não sei", "value": "unknown" }
      ],
      "variable": "mouth_breathing_at_night",
      "show_if": null,
      "weight": 1,
      "major_red_flag": false,
      "logic_usage": ["current_nasal_component"]
    },
    {
      "id": "D4",
      "block": "ent_nasal",
      "question_pt": "Este problema de nariz tapado à noite acontece apenas quando está constipado?",
      "response_type": "single_choice",
      "options": [
        { "label": "Sim, apenas quando estou constipado", "value": "only_with_colds" },
        { "label": "Não, também acontece fora de constipações", "value": "also_outside_colds" },
        { "label": "Não sei", "value": "unknown" }
      ],
      "variable": "nasal_issue_only_with_colds",
      "show_if": [
        {
          "variable": "nasal_blockage_at_bedtime",
          "operator": "equals",
          "value": "yes"
        },
        {
          "variable": "morning_nasal_blockage",
          "operator": "equals",
          "value": "yes",
          "joiner": "or"
        },
        {
          "variable": "mouth_breathing_at_night",
          "operator": "equals",
          "value": "yes",
          "joiner": "or"
        }
      ],
      "weight": 0,
      "major_red_flag": false,
      "logic_usage": ["recurrent_non_cold_nasal_pattern"]
    },
    {
      "id": "D5",
      "block": "ent_nasal",
      "question_pt": "Fora de constipações, nas últimas 4 semanas teve nariz tapado, espirros, comichão no nariz ou corrimento aquoso em 2 ou mais dias por semana?",
      "response_type": "single_choice",
      "options": [
        { "label": "Sim", "value": "yes" },
        { "label": "Não", "value": "no" }
      ],
      "variable": "allergic_or_rhinitis_pattern",
      "show_if": null,
      "weight": 1,
      "major_red_flag": false,
      "logic_usage": ["recurrent_non_cold_nasal_pattern"]
    },
    {
      "id": "D6",
      "block": "ent_nasal",
      "question_pt": "Tem diagnóstico médico prévio de rinite alérgica?",
      "response_type": "single_choice",
      "options": [
        { "label": "Sim", "value": "yes" },
        { "label": "Não", "value": "no" },
        { "label": "Não sei", "value": "unknown" }
      ],
      "variable": "diagnosed_allergic_rhinitis",
      "show_if": null,
      "weight": 1,
      "major_red_flag": false,
      "logic_usage": ["recurrent_non_cold_nasal_pattern"]
    },
    {
      "id": "D7",
      "block": "ent_nasal",
      "question_pt": "Tem diagnóstico médico conhecido de desvio do septo nasal, pólipos nasais ou amígdalas aumentadas?",
      "response_type": "single_choice",
      "options": [
        { "label": "Sim", "value": "yes" },
        { "label": "Não", "value": "no" },
        { "label": "Não sei", "value": "unknown" }
      ],
      "variable": "known_upper_airway_anatomical_issue",
      "show_if": null,
      "weight": 2,
      "major_red_flag": false,
      "logic_usage": ["strong_ent_pattern"]
    },
    {
      "id": "D8",
      "block": "ent_nasal",
      "question_pt": "Nas últimas 2 semanas, usou algum tratamento para melhorar a respiração nasal à noite, como lavagem salina, spray nasal ou medicação anti-alérgica?",
      "response_type": "single_choice",
      "options": [
        { "label": "Sim", "value": "yes" },
        { "label": "Não", "value": "no" }
      ],
      "variable": "recent_nasal_treatment_used",
      "show_if": null,
      "weight": 0,
      "major_red_flag": false,
      "logic_usage": ["context_only"]
    },
    {
      "id": "D9",
      "block": "ent_nasal",
      "question_pt": "Se usou tratamento nasal nas últimas 2 semanas, a respiração pelo nariz à noite melhorou claramente?",
      "response_type": "single_choice",
      "options": [
        { "label": "Sim, melhorou claramente", "value": "clear_improvement" },
        { "label": "Melhorou um pouco", "value": "partial_improvement" },
        { "label": "Não melhorou", "value": "no_improvement" },
        { "label": "Não aplicável", "value": "not_applicable" }
      ],
      "variable": "nasal_treatment_effect",
      "show_if": [
        {
          "variable": "recent_nasal_treatment_used",
          "operator": "equals",
          "value": "yes"
        }
      ],
      "weight": 0,
      "major_red_flag": false,
      "logic_usage": ["simple_measures_failed"]
    },
    {
      "id": "E1",
      "block": "functional_impact",
      "question_pt": "Nas últimas 2 semanas, o cansaço ou sono durante o dia prejudicou o seu trabalho, a sua atenção ou o seu humor em 3 ou mais dias por semana?",
      "response_type": "single_choice",
      "options": [
        { "label": "Sim", "value": "yes" },
        { "label": "Não", "value": "no" }
      ],
      "variable": "functional_daytime_impact",
      "show_if": null,
      "weight": 2,
      "major_red_flag": false,
      "logic_usage": ["clinical_burden", "orange_rule_direct", "high_functional_impact"]
    },
    {
      "id": "E2",
      "block": "functional_impact",
      "question_pt": "Nas últimas 2 semanas, o seu ressonar perturbou o sono de outra pessoa em 3 ou mais noites por semana?",
      "response_type": "single_choice",
      "options": [
        { "label": "Sim", "value": "yes" },
        { "label": "Não", "value": "no" },
        { "label": "Não sei", "value": "unknown" }
      ],
      "variable": "partner_sleep_disruption",
      "show_if": null,
      "weight": 1,
      "major_red_flag": false,
      "logic_usage": ["impact_context"]
    },
    {
      "id": "E3",
      "block": "functional_impact",
      "question_pt": "Nas últimas 2 semanas, evitou alguma atividade, condução prolongada ou tarefa de atenção por receio de estar com demasiado sono?",
      "response_type": "single_choice",
      "options": [
        { "label": "Sim", "value": "yes" },
        { "label": "Não", "value": "no" }
      ],
      "variable": "activity_limited_by_sleepiness",
      "show_if": null,
      "weight": 2,
      "major_red_flag": false,
      "logic_usage": ["clinical_burden", "high_functional_impact"]
    },
    {
      "id": "F1",
      "block": "previous_attempts",
      "question_pt": "Nas últimas 2 semanas, tentou dormir de lado em pelo menos 5 noites por semana?",
      "response_type": "single_choice",
      "options": [
        { "label": "Sim", "value": "yes" },
        { "label": "Não", "value": "no" }
      ],
      "variable": "recent_side_sleep_trial",
      "show_if": null,
      "weight": 0,
      "major_red_flag": false,
      "logic_usage": ["simple_measures_failed"]
    },
    {
      "id": "F2",
      "block": "previous_attempts",
      "question_pt": "Se tentou dormir de lado nas últimas 2 semanas, o ressonar melhorou claramente?",
      "response_type": "single_choice",
      "options": [
        { "label": "Sim", "value": "clear_improvement" },
        { "label": "Melhorou um pouco", "value": "partial_improvement" },
        { "label": "Não", "value": "no_improvement" },
        { "label": "Não aplicável", "value": "not_applicable" }
      ],
      "variable": "side_sleep_effect",
      "show_if": [
        {
          "variable": "recent_side_sleep_trial",
          "operator": "equals",
          "value": "yes"
        }
      ],
      "weight": 0,
      "major_red_flag": false,
      "logic_usage": ["simple_measures_failed"]
    },
    {
      "id": "F3",
      "block": "previous_attempts",
      "question_pt": "Nas últimas 2 semanas, evitou álcool nas 4 horas antes de dormir na maioria das noites?",
      "response_type": "single_choice",
      "options": [
        { "label": "Sim", "value": "yes" },
        { "label": "Não", "value": "no" }
      ],
      "variable": "recent_alcohol_reduction_trial",
      "show_if": null,
      "weight": 0,
      "major_red_flag": false,
      "logic_usage": ["simple_measures_failed"]
    },
    {
      "id": "F4",
      "block": "previous_attempts",
      "question_pt": "Se reduziu álcool à noite nas últimas 2 semanas, o ressonar melhorou claramente?",
      "response_type": "single_choice",
      "options": [
        { "label": "Sim", "value": "clear_improvement" },
        { "label": "Melhorou um pouco", "value": "partial_improvement" },
        { "label": "Não", "value": "no_improvement" },
        { "label": "Não aplicável", "value": "not_applicable" }
      ],
      "variable": "alcohol_reduction_effect",
      "show_if": [
        {
          "variable": "recent_alcohol_reduction_trial",
          "operator": "equals",
          "value": "yes"
        }
      ],
      "weight": 0,
      "major_red_flag": false,
      "logic_usage": ["simple_measures_failed"]
    },
    {
      "id": "F5",
      "block": "previous_attempts",
      "question_pt": "Nas últimas 2 semanas, tentou melhorar a respiração nasal antes de dormir em pelo menos 5 noites por semana?",
      "response_type": "single_choice",
      "options": [
        { "label": "Sim", "value": "yes" },
        { "label": "Não", "value": "no" }
      ],
      "variable": "recent_nasal_support_trial",
      "show_if": null,
      "weight": 0,
      "major_red_flag": false,
      "logic_usage": ["simple_measures_failed"]
    },
    {
      "id": "F6",
      "block": "previous_attempts",
      "question_pt": "Se tentou melhorar a respiração nasal antes de dormir, o ressonar ou a respiração noturna melhoraram claramente?",
      "response_type": "single_choice",
      "options": [
        { "label": "Sim", "value": "clear_improvement" },
        { "label": "Melhorou um pouco", "value": "partial_improvement" },
        { "label": "Não", "value": "no_improvement" },
        { "label": "Não aplicável", "value": "not_applicable" }
      ],
      "variable": "nasal_support_effect",
      "show_if": [
        {
          "variable": "recent_nasal_support_trial",
          "operator": "equals",
          "value": "yes"
        }
      ],
      "weight": 0,
      "major_red_flag": false,
      "logic_usage": ["simple_measures_failed"]
    },
    {
      "id": "F7",
      "block": "previous_attempts",
      "question_pt": "Já teve consulta médica por este problema nos últimos 12 meses?",
      "response_type": "single_choice",
      "options": [
        { "label": "Sim", "value": "yes" },
        { "label": "Não", "value": "no" }
      ],
      "variable": "medical_review_last_12m",
      "show_if": null,
      "weight": 0,
      "major_red_flag": false,
      "logic_usage": ["context_only"]
    }
  ],
  "derived_variables": [
    {
      "name": "major_red_flag",
      "type": "boolean",
      "description_pt": "Ativado quando há sinais fortes de alarme que justificam prioridade clínica.",
      "logic": {
        "any": [
          { "variable": "observed_breathing_pauses", "equals": "yes" },
          { "variable": "waking_gasping_or_choking", "equals": "two_plus" },
          { "variable": "dangerous_sleepiness", "equals": "yes_driving_or_risk" },
          {
            "all": [
              { "variable": "snoring_with_silent_pauses", "equals": "yes" },
              { "variable": "excessive_daytime_sleepiness", "equals": "yes" }
            ]
          }
        ]
      }
    },
    {
      "name": "clinical_burden_count",
      "type": "count",
      "description_pt": "Conta sintomas e impacto funcional associados a maior carga clínica.",
      "count_positive": [
        { "variable": "excessive_daytime_sleepiness", "equals": "yes" },
        { "variable": "non_restorative_sleep", "equals": "yes" },
        { "variable": "morning_headaches", "equals": "yes" },
        { "variable": "daytime_cognitive_impact", "equals": "yes" },
        { "variable": "known_hypertension", "equals": "yes" },
        { "variable": "dry_mouth_on_waking", "equals": "yes" },
        { "variable": "snoring_worsening_recently", "equals": "yes" },
        { "variable": "functional_daytime_impact", "equals": "yes" },
        { "variable": "activity_limited_by_sleepiness", "equals": "yes" }
      ]
    },
    {
      "name": "current_nasal_component",
      "type": "boolean",
      "description_pt": "Sugere obstrução nasal ou respiração oral relevantes no momento atual.",
      "logic": {
        "any": [
          { "variable": "nasal_blockage_at_bedtime", "equals": "yes" },
          { "variable": "morning_nasal_blockage", "equals": "yes" },
          { "variable": "mouth_breathing_at_night", "equals": "yes" }
        ]
      }
    },
    {
      "name": "recurrent_non_cold_nasal_pattern",
      "type": "boolean",
      "description_pt": "Sugere componente nasal recorrente não limitada a constipações.",
      "logic": {
        "any": [
          { "variable": "nasal_issue_only_with_colds", "equals": "also_outside_colds" },
          { "variable": "allergic_or_rhinitis_pattern", "equals": "yes" },
          { "variable": "diagnosed_allergic_rhinitis", "equals": "yes" }
        ]
      }
    },
    {
      "name": "modifiable_factor_count",
      "type": "count",
      "description_pt": "Conta fatores agravantes modificáveis que podem justificar um plano conservador inicial.",
      "count_positive": [
        { "variable": "regular_supine_sleep", "equals": "yes" },
        { "variable": "alcohol_before_sleep", "equals": "yes" },
        { "variable": "sedative_use_before_sleep", "equals": "yes" },
        { "variable": "current_smoker", "equals": "yes" },
        { "variable": "sleep_deprivation_pattern", "equals": "yes" },
        { "variable": "weight_gain_5kg_plus", "equals": "yes" },
        { "derived_variable": "current_nasal_component", "equals": true }
      ]
    },
    {
      "name": "simple_measures_failed",
      "type": "boolean",
      "description_pt": "Indica que medidas simples recentes foram testadas e não melhoraram claramente o quadro.",
      "logic": {
        "any": [
          {
            "all": [
              { "variable": "recent_side_sleep_trial", "equals": "yes" },
              { "variable": "side_sleep_effect", "equals": "no_improvement" }
            ]
          },
          {
            "all": [
              { "variable": "recent_alcohol_reduction_trial", "equals": "yes" },
              { "variable": "alcohol_reduction_effect", "equals": "no_improvement" }
            ]
          },
          {
            "all": [
              { "variable": "recent_nasal_support_trial", "equals": "yes" },
              { "variable": "nasal_support_effect", "equals": "no_improvement" }
            ]
          },
          {
            "all": [
              { "variable": "recent_nasal_treatment_used", "equals": "yes" },
              { "variable": "nasal_treatment_effect", "equals": "no_improvement" }
            ]
          }
        ]
      }
    },
    {
      "name": "strong_ent_pattern",
      "type": "boolean",
      "description_pt": "Sugere padrão ORL/nasal forte e persistente.",
      "logic": {
        "all": [
          { "variable": "known_upper_airway_anatomical_issue", "equals": "yes" },
          { "derived_variable": "current_nasal_component", "equals": true },
          { "derived_variable": "recurrent_non_cold_nasal_pattern", "equals": true }
        ]
      }
    },
    {
      "name": "high_functional_impact",
      "type": "boolean",
      "description_pt": "Reflete impacto relevante do problema na função diurna.",
      "logic": {
        "any": [
          { "variable": "functional_daytime_impact", "equals": "yes" },
          { "variable": "activity_limited_by_sleepiness", "equals": "yes" }
        ]
      }
    },
    {
      "name": "snoring_core_pattern",
      "type": "boolean",
      "description_pt": "Ressonar frequente e alto, com maior relevância clínica do que ressonar ocasional.",
      "logic": {
        "all": [
          { "variable": "frequent_snoring", "equals": "yes" },
          { "variable": "loud_snoring", "equals": "yes" }
        ]
      }
    }
  ],
  "classification_rules": {
    "red": {
      "description_pt": "Suspeita relevante de apneia do sono ou necessidade de avaliação prioritária.",
      "any": [
        { "variable": "observed_breathing_pauses", "equals": "yes" },
        { "variable": "waking_gasping_or_choking", "equals": "two_plus" },
        { "variable": "dangerous_sleepiness", "equals": "yes_driving_or_risk" },
        {
          "all": [
            { "variable": "snoring_with_silent_pauses", "equals": "yes" },
            { "variable": "excessive_daytime_sleepiness", "equals": "yes" }
          ]
        },
        {
          "all": [
            { "variable": "loud_snoring", "equals": "yes" },
            { "variable": "excessive_daytime_sleepiness", "equals": "yes" },
            { "variable": "known_hypertension", "equals": "yes" }
          ]
        },
        { "derived_variable": "major_red_flag", "equals": true }
      ]
    },
    "orange": {
      "description_pt": "Consulta médica recomendada, mas sem critérios máximos de prioridade.",
      "all": [
        {
          "not": {
            "classification": "red"
          }
        },
        {
          "any": [
            { "derived_variable": "clinical_burden_count", "gte": 3 },
            { "variable": "functional_daytime_impact", "equals": "yes" },
            { "variable": "snoring_worsening_recently", "equals": "yes" },
            { "derived_variable": "strong_ent_pattern", "equals": true },
            { "derived_variable": "simple_measures_failed", "equals": true },
            {
              "all": [
                { "variable": "frequent_snoring", "equals": "yes" },
                { "variable": "loud_snoring", "equals": "yes" },
                { "variable": "non_restorative_sleep", "equals": "yes" }
              ]
            }
          ]
        }
      ]
    },
    "yellow": {
      "description_pt": "Provável ressonar agravado por fatores modificáveis, com indicação para plano conservador.",
      "all": [
        {
          "not": {
            "classification": "red"
          }
        },
        {
          "not": {
            "classification": "orange"
          }
        },
        {
          "any": [
            { "derived_variable": "modifiable_factor_count", "gte": 2 },
            {
              "all": [
                { "variable": "snoring_worse_supine", "equals": "yes" },
                { "derived_variable": "clinical_burden_count", "lt": 3 }
              ]
            },
            {
              "all": [
                { "derived_variable": "current_nasal_component", "equals": true },
                { "derived_variable": "major_red_flag", "equals": false }
              ]
            }
          ]
        }
      ]
    },
    "green": {
      "description_pt": "Provável ressonar simples, sem sinais fortes de alarme neste momento.",
      "all": [
        {
          "not": {
            "classification": "red"
          }
        },
        {
          "not": {
            "classification": "orange"
          }
        },
        {
          "not": {
            "classification": "yellow"
          }
        }
      ]
    }
  },
  "results": {
    "green": {
      "summary_title_pt": "Provável ressonar simples",
      "rationale_templates_pt": [
        "Não surgem sinais fortes de alarme neste momento.",
        "A carga sintomática e o impacto funcional parecem baixos.",
        "Pode começar por medidas simples e monitorização."
      ],
      "do_now_pt": [
        "Tente dormir de lado na maioria das noites.",
        "Mantenha um horário de sono regular.",
        "Observe se o problema piora, se passa a ser frequente ou se surgem pausas respiratórias."
      ],
      "avoid_pt": [
        "Não ignore agravamento progressivo.",
        "Não use medicação sedativa para tentar resolver o ressonar."
      ],
      "specialist_hint_pt": [
        "Sem necessidade imediata de consulta, salvo agravamento ou novos sinais de alarme."
      ]
    },
    "yellow": {
      "summary_title_pt": "Ressonar provavelmente agravado por hábitos, posição ou nariz",
      "rationale_templates_pt": [
        "Foram identificados fatores modificáveis que podem estar a agravar o ressonar.",
        "Pode fazer sentido testar um plano conservador estruturado antes de avançar para avaliação médica, desde que não existam sinais de alarme."
      ],
      "do_now_pt": [
        "Durma de lado em pelo menos 5 noites por semana.",
        "Evite álcool nas 4 horas antes de dormir.",
        "Evite sedativos ou medicação para dormir sem orientação médica.",
        "Melhore a respiração nasal se houver obstrução atual.",
        "Reavalie após 2 semanas de medidas consistentes."
      ],
      "avoid_pt": [
        "Não compre dispositivos caros como primeira resposta sem perceber o padrão do problema.",
        "Não assuma que a melhoria parcial significa que o problema está resolvido."
      ],
      "specialist_hint_pt": [
        "Se não melhorar após um teste consistente de 2 semanas, considere consulta médica.",
        "Se houver forte componente nasal persistente, considere ORL."
      ]
    },
    "orange": {
      "summary_title_pt": "Ressonar com necessidade de avaliação médica",
      "rationale_templates_pt": [
        "Há sinais suficientes para justificar consulta médica.",
        "O padrão descrito sugere que o problema pode ir além de ressonar simples ou puramente posicional."
      ],
      "do_now_pt": [
        "Marque consulta médica.",
        "Enquanto aguarda, mantenha medidas conservadoras como dormir de lado e evitar álcool antes de dormir.",
        "Se houver obstrução nasal persistente, leve esse detalhe para discussão clínica."
      ],
      "avoid_pt": [
        "Não adie durante meses.",
        "Não dependa apenas de apps, gravações ou dispositivos comprados sem avaliação."
      ],
      "specialist_hint_pt": [
        "Médico de família.",
        "ORL se o padrão nasal ou anatómico for forte.",
        "Medicina do sono se houver suspeita crescente de apneia do sono."
      ]
    },
    "red": {
      "summary_title_pt": "Suspeita relevante de apneia do sono",
      "rationale_templates_pt": [
        "Foram identificados sinais de alarme compatíveis com maior risco clínico.",
        "Este padrão justifica avaliação médica prioritária."
      ],
      "do_now_pt": [
        "Marque consulta médica com prioridade.",
        "Evite álcool nas horas antes de dormir.",
        "Evite medicação sedativa ou para dormir sem orientação médica.",
        "Durma de lado enquanto aguarda avaliação.",
        "Se tem sonolência ao volante, evite condução em condições inseguras."
      ],
      "avoid_pt": [
        "Não trate isto como simples incómodo social.",
        "Não assuma que gadgets ou apps resolvem o problema."
      ],
      "specialist_hint_pt": [
        "Médico de família.",
        "Medicina do sono.",
        "ORL se houver sintomas nasais persistentes ou suspeita anatómica importante."
      ]
    }
  },
  "editorial_rules": [
    {
      "id": "R1",
      "rule_pt": "Nenhuma pergunta pode usar “já”, “costuma”, “às vezes” ou “frequentemente” sem janela temporal definida."
    },
    {
      "id": "R2",
      "rule_pt": "Nenhuma pergunta deve medir mais do que uma variável principal."
    },
    {
      "id": "R3",
      "rule_pt": "Sempre que possível, usar frequência mínima objetiva, como “3 ou mais noites por semana”."
    },
    {
      "id": "R4",
      "rule_pt": "A opção “Não sei” deve existir quando o utilizador realisticamente pode não ter acesso à observação."
    },
    {
      "id": "R5",
      "rule_pt": "Perguntas sobre tentativas só contam se forem recentes e feitas com consistência."
    },
    {
      "id": "R6",
      "rule_pt": "Red flags sobrepõem-se sempre a score ou fatores modificáveis."
    }
  ]
};
