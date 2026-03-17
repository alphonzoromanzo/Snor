import { questions as questionsData } from "./data/questions.js";
import { buildResult, classify, computeDerived } from "./logic/classifier.js";

const allQuestions = questionsData.questions;

const state = {
  answers: {},
  visibleQuestions: [],
  currentIndex: 0,
};

const elements = {
  form: document.getElementById("wizard-form"),
  container: document.getElementById("question-container"),
  validation: document.getElementById("validation-message"),
  backBtn: document.getElementById("back-btn"),
  nextBtn: document.getElementById("next-btn"),
  progressText: document.getElementById("progress-text"),
  progressPercent: document.getElementById("progress-percent"),
  progressFill: document.getElementById("progress-fill"),
  report: document.getElementById("report"),
  progressWrapper: document.getElementById("progress-wrapper"),
};

function evaluateRule(rule) {
  if (!rule) return true;

  if (Array.isArray(rule)) {
    return rule.reduce((acc, condition, index) => {
      const isMatch = evaluateRule(condition);
      if (index === 0) return isMatch;
      return condition.joiner === "or" ? acc || isMatch : acc && isMatch;
    }, true);
  }

  if (rule.all) return rule.all.every(evaluateRule);
  if (rule.any) return rule.any.some(evaluateRule);

  if (rule.variable) {
    const answer = state.answers[rule.variable];

    if (rule.operator === "equals" || Object.hasOwn(rule, "equals")) {
      const expected = Object.hasOwn(rule, "value") ? rule.value : rule.equals;
      return answer === expected;
    }

    if (rule.operator === "not_equals") {
      return answer !== rule.value;
    }

    if (rule.operator === "in" && Array.isArray(rule.value)) {
      return rule.value.includes(answer);
    }

    if (rule.operator === "includes") {
      return Array.isArray(answer) && answer.includes(rule.value);
    }
  }

  return true;
}

function recomputeVisibleQuestions() {
  const currentQuestion = state.visibleQuestions[state.currentIndex];
  state.visibleQuestions = allQuestions.filter((question) => evaluateRule(question.show_if));

  if (!state.visibleQuestions.length) {
    state.currentIndex = 0;
    return;
  }

  if (currentQuestion) {
    const sameIndex = state.visibleQuestions.findIndex((item) => item.id === currentQuestion.id);
    if (sameIndex !== -1) {
      state.currentIndex = sameIndex;
      return;
    }
  }

  if (state.currentIndex > state.visibleQuestions.length - 1) {
    state.currentIndex = state.visibleQuestions.length - 1;
  }
}

function updateProgress() {
  const total = state.visibleQuestions.length || 1;
  const current = Math.min(state.currentIndex + 1, total);
  const percent = Math.round((current / total) * 100);

  elements.progressText.textContent = `Pergunta ${current} de ${total}`;
  elements.progressPercent.textContent = `${percent}%`;
  elements.progressFill.style.width = `${percent}%`;
}

function renderQuestion() {
  recomputeVisibleQuestions();

  const question = state.visibleQuestions[state.currentIndex];
  elements.validation.textContent = "";

  if (!question) {
    showResult();
    return;
  }

  elements.form.classList.remove("hidden");
  elements.report.classList.add("hidden");
  elements.progressWrapper.classList.remove("hidden");

  elements.container.innerHTML = `
    <fieldset class="question" aria-labelledby="q-${question.id}">
      <legend id="q-${question.id}">${question.question_pt}</legend>
      <div class="options">
        ${question.options
          .map((option) => {
            const checked = state.answers[question.variable] === option.value ? "checked" : "";
            const inputId = `${question.id}-${option.value}`;
            return `
              <label class="option" for="${inputId}">
                <input id="${inputId}" type="radio" name="${question.variable}" value="${option.value}" ${checked} />
                <span>${option.label}</span>
              </label>
            `;
          })
          .join("")}
      </div>
    </fieldset>
  `;

  elements.container.querySelectorAll(`input[name="${question.variable}"]`).forEach((input) => {
    input.addEventListener("change", () => {
      state.answers[question.variable] = input.value;
      recomputeVisibleQuestions();
      updateProgress();
    });
  });

  elements.backBtn.disabled = state.currentIndex === 0;
  elements.nextBtn.textContent =
    state.currentIndex === state.visibleQuestions.length - 1 ? "Ver resultado" : "Seguinte";

  updateProgress();
}

function validateCurrentQuestion() {
  const question = state.visibleQuestions[state.currentIndex];
  if (!question) return true;

  const value = state.answers[question.variable];
  if (!value) {
    elements.validation.textContent = "Selecione uma opção para continuar.";
    return false;
  }

  elements.validation.textContent = "";
  return true;
}

function summaryText(result) {
  const blocks = [
    `Resultado: ${result.title}`,
    `Nível: ${result.level.toUpperCase()}`,
    "",
    `O que significa: ${result.meaning}`,
    "",
    "Áreas críticas:",
    ...(result.criticalAreas.length ? result.criticalAreas.map((item) => `- ${item}`) : ["- Nenhuma área crítica identificada."]),
    "",
    "O que fazer agora:",
    ...result.doNow.map((item) => `- ${item}`),
    "",
    "O que evitar:",
    ...result.avoid.map((item) => `- ${item}`),
    "",
    "Próximo passo clínico provável:",
    ...result.specialistHint.map((item) => `- ${item}`),
  ];

  return blocks.join("\n");
}

function renderList(title, items) {
  const content = items.length ? items : ["Sem pontos adicionais."];
  return `
    <section class="report-section">
      <h3>${title}</h3>
      <ul>
        ${content.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </section>
  `;
}

function showResult() {
  elements.form.classList.add("hidden");
  elements.progressWrapper.classList.add("hidden");

  const derived = computeDerived(state.answers);
  const level = classify(state.answers, derived);
  const result = buildResult(level, state.answers, derived);

  elements.report.className = `report result-${level}`;
  elements.report.innerHTML = `
    <h2>${result.title}</h2>
    <p>${result.meaning}</p>
    ${renderList("Áreas críticas identificadas", result.criticalAreas)}
    ${renderList("O que fazer agora", result.doNow)}
    ${renderList("O que evitar", result.avoid)}
    ${renderList("Próximo passo clínico provável", result.specialistHint)}
    <div class="report-actions">
      <button type="button" id="copy-btn" class="btn btn-secondary">Copiar resumo</button>
      <button type="button" id="restart-btn" class="btn btn-primary">Recomeçar</button>
    </div>
    <p id="copy-status" class="copy-status" aria-live="polite"></p>
  `;
  elements.report.classList.remove("hidden");

  const copyButton = document.getElementById("copy-btn");
  const restartButton = document.getElementById("restart-btn");
  const copyStatus = document.getElementById("copy-status");

  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(summaryText(result));
      copyStatus.textContent = "Resumo copiado para a área de transferência.";
    } catch {
      copyStatus.textContent = "Não foi possível copiar automaticamente. Tente novamente.";
    }
  });

  restartButton.addEventListener("click", () => {
    state.answers = {};
    state.currentIndex = 0;
    state.visibleQuestions = [];
    renderQuestion();
  });
}

elements.backBtn.addEventListener("click", () => {
  if (state.currentIndex > 0) {
    state.currentIndex -= 1;
    renderQuestion();
  }
});

elements.nextBtn.addEventListener("click", () => {
  if (!validateCurrentQuestion()) return;

  if (state.currentIndex >= state.visibleQuestions.length - 1) {
    showResult();
    return;
  }

  state.currentIndex += 1;
  renderQuestion();
});

renderQuestion();
