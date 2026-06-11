# Node.js CI/CD Demo

API simples em Express com pipeline **CI/CD** usando **GitHub Actions** e deploy no **Render**.

## O que foi feito

- API com rotas `GET /` e `GET /palindromo/:texto`
- Testes automatizados com **Jest** e **Supertest**
- Análise de código com **ESLint** (`eslint.config.mjs`)
- Pipeline CI: lint + testes em todo push/PR na `main`
- Pipeline CD: empacotamento simulado + deploy no **Render** (somente push na `main`)

## Rotas

| Método | Rota                 | Resposta                                          |
|--------|----------------------|---------------------------------------------------|
| GET    | `/`                  | `{ "mensagem": "CI/CD funcionando!" }`            |
| GET    | `/palindromo/radar`  | `{ "texto": "radar", "palindromo": true, ... }`   |
| GET    | `/palindromo/cursor` | `{ "texto": "cursor", "palindromo": false, ... }` |

## Rodar localmente

```bash
npm install
npm run lint
npm test
npm start
```

## Pipeline (`.github/workflows/ci.yml`)

### CI — `build-and-test`

Dispara em **push** e **pull request** para `main`:

1. Checkout do código
2. Setup do Node.js 20
3. `npm ci` — instala dependências
4. `npm run lint` — verifica estilo/erros com ESLint
5. `npm test` — roda os testes

### CD — Após o CI passar, dois jobs de CD são executados em paralelo: `deploy-simulation` e `deploy-to-render`

Disparam **somente** em push na `main`, **depois** do CI passar (os dois jobs rodam em paralelo):

**deploy-simulation**
1. Copia `src/` e `package.json` para uma pasta `build/` (simula empacotamento)

**deploy-to-render**
1. Chama o Deploy Hook do Render (`RENDER_DEPLOY_HOOK`)

Na aba **Actions** do GitHub você verá os 3 jobs: `build-and-test` → `deploy-simulation` e `deploy-to-render`.

## Configurar o Render

1. Crie um **Web Service** em [render.com](https://render.com) apontando para este repositório
2. **Build command:** `npm install`
3. **Start command:** `npm start`
4. Em Settings → **Deploy Hook**, copie a URL
5. No GitHub: **Settings → Secrets → Actions** → crie `RENDER_DEPLOY_HOOK` com essa URL
6. (Recomendado) Desative **Auto-Deploy** no Render para o deploy só acontecer via pipeline

## Tecnologias

- Node.js + Express
- Jest + Supertest
- ESLint
- GitHub Actions
- Render
