import { questions } from "./data/questions.js";
import { classifyTriage } from "./logic/classifier.js";

const state = {
  answers: {},
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
};

function checkCondition(rule) {
  const answer = state.answers[rule.question];

  if (Object.hasOwn(rule, "equals")) {
    return answer === rule.equals;
  }

  if (Object.hasOwn(rule, "includes")) {
    return Array.isArray(answer) && answer.includes(rule.includes);
  }

  return false;
}

function evaluateShowIf(showIf) {
  if (!showIf) return true;

  if (showIf.all) return showIf.all.every(checkCondition);
  if (showIf.any) return showIf.any.some(checkCondition);

  return true;
}

function getVisibleQuestions() {
  return questions.filter((q) => evaluateShowIf(q.show_if));
}

function clampCurrentIndex() {
  const visible = getVisibleQuestions();
  if (!visible.length) {
    state.currentIndex = 0;
    return;
  }
  if (state.currentIndex > visible.length - 1) {
    state.currentIndex = visible.length - 1;
  }
}

function renderQuestion() {
  clampCurrentIndex();
  const visible = getVisibleQuestions();
  const question = visible[state.currentIndex];

  elements.validation.textContent = "";
  elements.report.classList.add("hidden");

  if (!question) return;

  elements.container.innerHTML = buildQuestionMarkup(question);
  hydrateInput(question);
  updateProgress();
  elements.backBtn.disabled = state.currentIndex === 0;
  elements.nextBtn.textContent = state.currentIndex === visible.length - 1 ? "Ver resultado" : "Seguinte";
}

function buildQuestionMarkup(question) {
  if (question.type === "single") {
    const selected = state.answers[question.id];
    const options = question.options
      .map(
        (option) => `
        <label class="option">
          <input type="radio" name="${question.id}" value="${option.value}" ${selected === option.value ? "checked" : ""} />
          <span>${option.label}</span>
        </label>`
      )
      .join("");

    return `<fieldset class="question">
      <legend>${question.label}</legend>
      <div class="options">${options}</div>
    </fieldset>`;
  }

  if (question.type === "multi") {
    const selected = state.answers[question.id] || [];
    const options = question.options
      .map(
        (option) => `
        <label class="option">
          <input type="checkbox" name="${question.id}" value="${option.value}" ${selected.includes(option.value) ? "checked" : ""} />
          <span>${option.label}</span>
        </label>`
      )
      .join("");

    return `<fieldset class="question">
      <legend>${question.label}</legend>
      <div class="options">${options}</div>
    </fieldset>`;
  }

  const value = state.answers[question.id] ?? "";
  return `<div class="question">
    <label class="question-label" for="${question.id}">${question.label}</label>
    ${question.help ? `<p class="help">${question.help}</p>` : ""}
    <input id="${question.id}" name="${question.id}" type="number" min="${question.min ?? ""}" max="${question.max ?? ""}" step="${question.step ?? "1"}" value="${value}" />
  </div>`;
}

function hydrateInput(question) {
  const inputs = elements.container.querySelectorAll("input");

  inputs.forEach((input) => {
    input.addEventListener("change", () => {
      persistAnswer(question);
      if (question.id === "day_sleepiness" || question.id === "bmi_known") {
        clampCurrentIndex();
        renderQuestion();
      }
    });
  });
}

function persistAnswer(question) {
  if (question.type === "single") {
    const checked = elements.container.querySelector(`input[name="${question.id}"]:checked`);
    state.answers[question.id] = checked ? checked.value : undefined;
    return;
  }

  if (question.type === "multi") {
    const checked = [...elements.container.querySelectorAll(`input[name="${question.id}"]:checked`)].map((i) => i.value);
    if (checked.includes("none") && checked.length > 1) {
      state.answers[question.id] = checked.filter((v) => v !== "none");
    } else {
      state.answers[question.id] = checked;
    }
    return;
  }

  const input = elements.container.querySelector(`#${question.id}`);
  state.answers[question.id] = input.value;
}

function validateAnswer(question) {
  persistAnswer(question);
  const value = state.answers[question.id];

  if (question.type === "number") {
    const numericValue = Number(value);
    if (!value || !Number.isFinite(numericValue)) return "Indique um valor válido.";
    if (question.min !== undefined && numericValue < question.min) return `Valor mínimo: ${question.min}.`;
    if (question.max !== undefined && numericValue > question.max) return `Valor máximo: ${question.max}.`;
    return "";
  }

  if (question.type === "single" && !value) return "Selecione uma opção para continuar.";
  if (question.type === "multi" && (!Array.isArray(value) || !value.length)) return "Selecione pelo menos uma opção.";

  return "";
}

function updateProgress() {
  const visible = getVisibleQuestions();
  const total = visible.length || 1;
  const current = Math.min(state.currentIndex + 1, total);
  const percent = Math.round((current / total) * 100);

  elements.progressText.textContent = `Pergunta ${current} de ${total}`;
  elements.progressPercent.textContent = `${percent}%`;
  elements.progressFill.style.width = `${percent}%`;
}

function reportToText(report) {
  const critical = report.criticalAreas.map((item) => `- ${item}`).join("\n");
  const doNow = report.doNow.map((item) => `- ${item}`).join("\n");
  const avoid = report.avoid.map((item) => `- ${item}`).join("\n");

  return [
    "Triagem de Ronco - Resumo",
    "",
    report.title,
    "",
    "O que significa:",
    report.meaning,
    "",
    "Áreas críticas identificadas:",
    critical,
    "",
    "O que fazer agora:",
    doNow,
    "",
    "O que evitar:",
    avoid,
    "",
    `Próximo passo provável: ${report.specialist}`,
    "",
    "Nota: Esta ferramenta faz triagem e não substitui avaliação médica.",
  ].join("\n");
}

async function copySummary(text) {
  try {
    await navigator.clipboard.writeText(text);
    alert("Resumo copiado para a área de transferência.");
  } catch {
    alert("Não foi possível copiar automaticamente. Utilize o botão de descarregar.");
  }
}

function downloadSummary(text) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "resumo-triagem-ronco.txt";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function renderReport() {
  const result = classifyTriage(state.answers);
  const summaryText = reportToText(result);

  elements.form.classList.add("hidden");
  elements.report.classList.remove("hidden");
  elements.report.innerHTML = `
    <span class="result-badge result-${result.category}">${result.category.toUpperCase()}</span>
    <h2>${result.title}</h2>

    <div class="report-section">
      <h3>O que este resultado significa</h3>
      <p>${result.meaning}</p>
    </div>

    <div class="report-section">
      <h3>Áreas críticas identificadas</h3>
      <ul>${result.criticalAreas.map((item) => `<li>${item}</li>`).join("")}</ul>
    </div>

    <div class="report-section">
      <h3>O que deve fazer agora</h3>
      <ul>${result.doNow.map((item) => `<li>${item}</li>`).join("")}</ul>
    </div>

    <div class="report-section">
      <h3>O que deve evitar</h3>
      <ul>${result.avoid.map((item) => `<li>${item}</li>`).join("")}</ul>
    </div>

    <div class="report-section">
      <h3>Especialista / próximo passo provável</h3>
      <p>${result.specialist}</p>
    </div>

    <div class="report-actions">
      <button type="button" id="copy-btn" class="btn btn-secondary">Copiar resumo</button>
      <button type="button" id="download-btn" class="btn btn-secondary">Descarregar resumo (.txt)</button>
      <button type="button" id="restart-btn" class="btn btn-primary">Reiniciar triagem</button>
    </div>
  `;

  document.getElementById("copy-btn").addEventListener("click", () => copySummary(summaryText));
  document.getElementById("download-btn").addEventListener("click", () => downloadSummary(summaryText));
  document.getElementById("restart-btn").addEventListener("click", restart);
}

function restart() {
  state.answers = {};
  state.currentIndex = 0;
  elements.form.classList.remove("hidden");
  elements.report.classList.add("hidden");
  renderQuestion();
}

elements.backBtn.addEventListener("click", () => {
  if (state.currentIndex > 0) {
    state.currentIndex -= 1;
    renderQuestion();
  }
});

elements.nextBtn.addEventListener("click", () => {
  const visible = getVisibleQuestions();
  const question = visible[state.currentIndex];
  if (!question) return;

  const validationMessage = validateAnswer(question);
  elements.validation.textContent = validationMessage;
  if (validationMessage) return;

  if (state.currentIndex >= visible.length - 1) {
    renderReport();
  } else {
    state.currentIndex += 1;
    renderQuestion();
  }
});

renderQuestion();
