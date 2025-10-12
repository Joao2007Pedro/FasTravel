# FasTravel Backend

Guia de configuração e execução do backend (Express + Sequelize).

## 1) Pré-requisitos

- Node.js 18+ (recomendado 20)
- MySQL Server 8+
- NPM

## 2) Variáveis de ambiente

Crie `backend/.env` a partir de `backend/.env.example`:

```
cp .env.example .env
```

Conteúdo do `.env.example` (resumo):

- `PORT` — porta do servidor (recomendado 3001)
- `DEV_DB_*`, `TEST_DB_*`, `PROD_DB_*` — credenciais por ambiente
- `DB_DIALECT` — mysql (padrão) ou outro suportado
- `JWT_SECRET` — segredo forte para tokens

Observação: o app carrega o `.env` automaticamente (ver `src/app.js`).

## 3) Instalar dependências

```
npm install
```

## 4) Banco de dados (migrations e sync)

Crie os bancos e rode migrations:

```
# criar bancos (ajuste usuário/senha)
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS fastravel_dev; CREATE DATABASE IF NOT EXISTS fastravel_test; CREATE DATABASE IF NOT EXISTS fastravel_prod;"

# rodar migrations
npx sequelize db:migrate
```

No desenvolvimento, o projeto também executa `sequelize.sync()` (apenas fora de produção) para facilitar. Em produção, use somente migrations.

## 5) Executar

- Desenvolvimento (com autoreload):

```
npm run dev
```

- Produção:

```
NODE_ENV=production npm start
```

## 6) CORS

O CORS está configurado em `src/app.js` para `http://localhost:3000`. Se o frontend estiver em outra origem, ajuste o valor de `origin`.

## 7) Endpoints principais

- `POST /users` — cria usuário
- `POST /auth/login` — autenticação (retorna JWT)
- `GET /flights` — lista voos
- `POST /bookings` — cria reserva (requer Authorization: Bearer <token>)

## 8) Dicas e problemas comuns

- Erro de acesso ao banco: confira variáveis `*_DB_*` no `.env`, se o MySQL está rodando e se o banco existe.
- Dialeto diferente (Postgres, etc.): ajuste `DB_DIALECT` e instale o client correspondente.
- JWT: use um `JWT_SECRET` diferente por ambiente.
- Porta em uso: altere `PORT`.
