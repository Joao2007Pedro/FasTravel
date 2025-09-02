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
* Bootstrap

### **Ferramentas de apoio**

* Postman (coleção de endpoints)
* Selenium IDE (testes de funcionalidade)
* Swagger (documentação da API)

---

## 📂 Estrutura de Pastas (sugerida)

```
/FasTravel
├─ backend
│  ├─ src
│  │  ├─ app.js
│  │  ├─ server.js
│  │  ├─ config/
│  │  ├─ models/
│  │  ├─ routes/
│  │  ├─ controllers/
│  │  └─ tests/
│  └─ package.json
│
├─ frontend
│  ├─ public/
│  ├─ src/
│  │  ├─ pages/
│  │  ├─ services/
│  │  └─ App.js
│  └─ package.json
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

O servidor sobe em `http://localhost:3001`.

### **Rodando o Frontend**

```bash
cd frontend
npm install
npm start
```

O app sobe em `http://localhost:3000`.

---

## ✅ Próximos Passos

* [ ] Implementar CRUD de voos no backend
* [ ] Criar interface inicial de listagem de voos no frontend
* [ ] Adicionar testes automatizados (Jest + Supertest)
* [ ] Configurar Postman com requests prontos
* [ ] Documentar API com Swagger
---

👉 Você quer que eu já crie esse `README.md` formatado em **Markdown** e os arquivos `.gitkeep` nas pastas `backend/` e `frontend/` pra você só dar `git add . && git commit && git push`?
