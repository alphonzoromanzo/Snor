# Triagem de Ronco (pt-PT)

Aplicação web **100% estática** para triagem inicial de sintomas relacionados com ronco e possível apneia do sono.

> **Aviso importante:** esta ferramenta faz triagem e **não** faz diagnóstico. Não substitui avaliação médica.

## Estrutura do projeto

- `index.html`
- `styles.css`
- `app.js`
- `data/questions.js`
- `logic/classifier.js`
- `assets/`
- `.nojekyll`

## Garantias de compatibilidade com GitHub Pages

- Sem backend, sem base de dados, sem APIs, sem autenticação.
- Sem SSR, sem bundlers e sem ferramenta de build.
- Apenas ficheiros estáticos (`HTML`, `CSS`, `JavaScript` vanilla).
- Todos os caminhos são **relativos** (ex.: `./app.js`, `./styles.css`, `./data/questions.js`), por isso funciona tanto em `/` como em `/docs/`.

## Executar localmente

Como usa módulos ES em JavaScript, execute com um servidor HTTP simples (não abrir como `file://`).

```bash
python3 -m http.server 8080
```

Abrir no navegador:

- `http://localhost:8080/`

## Publicar no GitHub Pages (instruções exatas)

### Opção A — Publicar a partir da root (`/`)

1. Confirmar que `index.html` está na raiz do repositório.
2. Confirmar que `.nojekyll` existe na raiz.
3. Fazer commit e push para o branch alvo (ex.: `main`).
4. No GitHub: **Settings → Pages**.
5. Em **Build and deployment**:
   - **Source:** `Deploy from a branch`
   - **Branch:** `main`
   - **Folder:** `/ (root)`
6. Clicar **Save** e aguardar o URL final do Pages.

### Opção B — Publicar a partir de `docs/`

1. Criar a pasta `docs/` (se ainda não existir).
2. Copiar para `docs/` estes ficheiros/pastas:
   - `index.html`
   - `styles.css`
   - `app.js`
https://github.com/alphonzoromanzo/Snor/pull/3/conflict?name=README.md&ancestor_oid=490cf28bfe18e27d40129c10b502fc4faa8ee74c&base_oid=67b2c02107154bfe79cd22c1689678a4357a2f2e&head_oid=6db027d2fdc5b2664331b2f8117fb962dc1b689d   - `data/`
   - `logic/`
   - `assets/`
   - `.nojekyll` (ficheiro vazio dentro de `docs/`)
3. Fazer commit e push.
4. No GitHub: **Settings → Pages**.
5. Em **Build and deployment**:
   - **Source:** `Deploy from a branch`
   - **Branch:** `main`
   - **Folder:** `/docs`
6. Clicar **Save** e aguardar o URL final do Pages.

## Segurança clínica

- A classificação em **verde / amarelo / laranja / vermelho** representa prioridade de triagem e não diagnóstico definitivo.
- Em caso de agravamento súbito, dor torácica, sinais neurológicos ou risco de acidente por sonolência, procurar avaliação urgente.
