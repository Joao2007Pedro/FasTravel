# ✈️ FasTravel – Sistema de Venda de Passagens

## 📌 Sobre o Projeto

O **FasTravel** é um sistema **Fullstack** para venda de passagens aéreas, permitindo:

- Cadastro e gerenciamento de voos (admin)
- Listagem de voos disponíveis (usuário)
- Reserva de passagens com cálculo de preço total
- Testes automatizados de API e interface

O projeto é desenvolvido como parte de um trabalho acadêmico, dividido em **três entregas**:

1. **Planejamento** – Tema, protótipos, backlog
2. **Implementação** – Frontend + Backend
3. **Testes e Documentação** – Jest, Postman, Selenium e Swagger

---

## 🛠️ Tecnologias

### **Backend**

- Node.js + Express
- Sequelize (MySQL)
- Jest + Supertest (testes)

### **Frontend**

- React (Create React App)
- Tailwind CSS

### **Ferramentas de apoio**

- Postman (coleção de endpoints)
- Selenium IDE (testes de funcionalidade)
- Swagger (documentação da API)

---

## 📂 Estrutura de Pastas

```
/FasTravel
├─ backend
│  ├─ .env.example
│  ├─ README.md
│  ├─ package.json
│  └─ src/
│     ├─ app.js
│     ├─ config/
│     ├─ controllers/
│     ├─ middlewares/
│     ├─ migrations/
│     ├─ models/
│     └─ routers/
│
├─ frontend
│  ├─ package.json
│  ├─ public/
│  └─ src/
│     ├─ components/
│     ├─ context/
│     ├─ pages/
│     ├─ services/
│     ├─ App.jsx
│     └─ index.js
│
└─ README.md
```

---

## ▶️ Como Rodar o Projeto

### **Pré-requisitos**

- Node.js instalado
- MySQL rodando localmente ou em Docker

### **Rodando o Backend**

```powershell
cd backend
npm install
Copy-Item .env.example .env
# Edite .env (PORT, credenciais do banco, CORS_ORIGIN)
notepad .env
npm run dev
```

Observações:
- Porta padrão: se `PORT` não for definida, o backend sobe em `3001`.
- CORS: defina `CORS_ORIGIN` (ex.: `http://localhost:3000` ou múltiplas origens separadas por vírgula) para outro ambiente.
- Banco: em modo não-produção, o backend faz `sequelize.sync({ alter: true })`, criando/ajustando as tabelas automaticamente (sem necessidade de rodar migrations manualmente para a demo).

### **Rodando o Frontend**

```powershell
cd frontend
npm install
Copy-Item .env.example .env
# Ajuste REACT_APP_API_URL para apontar para o backend
notepad .env
npm start
```

O app sobe em `http://localhost:3000`.

Se estiver usando Tailwind, você pode rodar o watcher (opcional) em outro terminal:

```bash
cd frontend
npm run tailwind:build
```

---

---

## 🔧 Configuração de Ambiente (.env)

O frontend usa variáveis `REACT_APP_*` (Create React App):

Frontend (`frontend/.env.example`):

```
REACT_APP_API_URL=http://localhost:3001
REACT_APP_HERO_IMAGE=
REACT_APP_ASSETS_BASE_URL=
```

Crie `frontend/.env` copiando do exemplo e ajuste os valores locais. O arquivo `.env` já está no `.gitignore` do frontend e não será commitado.

Backend: configure as credenciais do banco e a `PORT` no `.env` do backend (ver `backend/.env.example`). Você também pode ajustar `CORS_ORIGIN` para a URL do frontend no ambiente onde rodará.

---

## 🖼️ Logos & Ícones (Frontend)

- Troque os ícones em `frontend/public/`:
  - `favicon.ico` (ideal ter 16/32/48/64 dentro do .ico)
  - `logo192.png` e `logo512.png` (PWA)
  - `manifest.json` (nome do app e ícones; pode usar `purpose: "any maskable"`)
- Navbar usa `/logo512.svg` e Footer usa `/logo192.svg` por padrão (coloque os arquivos em `frontend/public`).
- Para usar imagens sem colocar arquivos no projeto, configure:
  - `REACT_APP_HERO_IMAGE` com a URL do banner
  - `REACT_APP_ASSETS_BASE_URL` (CDN/bucket) para as imagens dos destinos

---

## 📦 Build & Deploy (Frontend)

- A pasta `frontend/build/` é gerada pelo `npm run build` e contém os artefatos estáticos de produção. Não edite manualmente, faça alterações em `src/` e `public/`.
- Para publicar, sirva a pasta `build/` em um host estático (Nginx/Apache/S3/CloudFront, Netlify, etc.).

---

## ✅ Próximos Passos

- [ ] Completar CRUD de usuários e voos (GET/PUT/DELETE)
- [ ] Proteger rotas sensíveis com JWT e rate limit
- [ ] Filtros/paginação em voos e reservas
- [ ] Testes (Jest + Supertest) e coleção Postman
- [ ] Documentar API com Swagger
- [ ] Seeders de dados para desenvolvimento

---
