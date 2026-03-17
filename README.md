# Triagem de Ronco (pt-PT)

Aplicação web **totalmente estática** para triagem inicial de sintomas relacionados com ronco e possível apneia do sono.

> **Aviso importante:** esta ferramenta faz triagem e **não** faz diagnóstico. Não substitui avaliação médica.

## Estrutura do projeto

- `index.html`
- `styles.css`
- `app.js`
- `data/questions.js`
- `logic/classifier.js`
- `assets/`
- `.nojekyll`

## Como executar localmente

Como usa módulos ES em JavaScript, execute através de um servidor HTTP local (não abrir diretamente como `file://`).

Exemplos:

```bash
python3 -m http.server 8080
```

Depois abrir no navegador:

- `http://localhost:8080/`

## Publicar no GitHub Pages

A aplicação usa apenas caminhos relativos, por isso funciona em:

1. **Root do repositório** (`/`), ou
2. **Pasta `/docs`**.

### Opção A: publicar a partir da root

1. Faça commit e push dos ficheiros para o branch pretendido (ex.: `main`).
2. No GitHub, abrir **Settings → Pages**.
3. Em **Build and deployment**, escolher:
   - **Source:** `Deploy from a branch`
   - **Branch:** `main`
   - **Folder:** `/ (root)`
4. Guardar e aguardar a publicação.

### Opção B: publicar a partir de `/docs`

1. Copiar os ficheiros da app para a pasta `docs/`.
2. Garantir que `docs/.nojekyll` existe.
3. Fazer commit e push.
4. Em **Settings → Pages**, escolher:
   - **Source:** `Deploy from a branch`
   - **Branch:** `main`
   - **Folder:** `/docs`
5. Guardar e aguardar a publicação.

## Notas clínicas e de segurança

- A classificação em **verde / amarelo / laranja / vermelho** representa prioridade de triagem, não diagnóstico definitivo.
- O relatório final indica:
  - categoria,
  - significado clínico,
  - áreas críticas identificadas,
  - ações recomendadas,
  - o que evitar,
  - próximo passo/especialidade provável.
- Em caso de agravamento súbito, sinais neurológicos, dor torácica ou risco de acidente por sonolência, procurar avaliação urgente.
