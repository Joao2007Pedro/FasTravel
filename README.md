# FasTravel

---

# ✈️ FasTravel – Sistema de Venda de Passagens

## 📌 Sobre o Projeto

O **FasTravel** é um sistema **Fullstack** para venda de passagens aéreas, permitindo:

* Cadastro e gerenciamento de voos (admin)
* Listagem de voos disponíveis (usuário)
* Reserva de passagens com cálculo de preço total
* Testes automatizados de API e interface

O projeto é desenvolvido como parte de um trabalho acadêmico, dividido em **três entregas**:

1. **Planejamento** – Tema, protótipos, backlog
2. **Implementação** – Frontend + Backend
3. **Testes e Documentação** – Jest, Postman, Selenium e Swagger

---

## 🛠️ Tecnologias

### **Backend**

* Node.js + Express
* Sequelize (MySQL)
* Jest + Supertest (testes)

### **Frontend**

* React (Create React App)
* Bootstrap 5
* Tailwind CSS

### **Ferramentas de apoio**

* Postman (coleção de endpoints)
* Selenium IDE (testes de funcionalidade)
* Swagger (documentação da API)

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

* Node.js instalado
* MySQL rodando localmente ou em Docker

### **Rodando o Backend**

```bash
cd backend
npm install
npm run dev
```

Por padrão, o backend usa a porta definida no `.env` (variável `PORT`).
Se não houver `PORT`, ele sobe em `http://localhost:3000`.
Recomenda-se definir `PORT=3001` no backend para evitar conflito com o frontend em `3000`.

### **Rodando o Frontend**

```bash
cd frontend
npm install
npm start
```

O app sobe em `http://localhost:3000`.

Se estiver usando Tailwind, você pode rodar o watcher (opcional) em outro terminal:

```bash
cd frontend
npm run tailwind:build
```

---

## ✅ Próximos Passos

* [ ] Completar CRUD de usuários e voos (GET/PUT/DELETE)
* [ ] Proteger rotas sensíveis com JWT e rate limit
* [ ] Filtros/paginação em voos e reservas
* [ ] Testes (Jest + Supertest) e coleção Postman
* [ ] Documentar API com Swagger
* [ ] Seeders de dados para desenvolvimento
---
