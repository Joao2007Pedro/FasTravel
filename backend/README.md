# FasTravel Backend

Guia rápido para rodar em diferentes ambientes (dev, test, prod).

## 1) Pré-requisitos

- Node.js 18+ (recomendado 20)
- MySQL Server 8+
- NPM

## 2) Configurar variáveis de ambiente

Crie um arquivo `.env` na pasta `backend/` baseado no `.env.example`:

```
cp .env.example .env
```

## 3) Instalar dependências

```
npm install
```

## 4) Preparar o banco de dados

Crie os bancos (ou use migrations):

```
# criar bancos se necessário (ajuste usuário/senha)
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS fastravel_dev; CREATE DATABASE IF NOT EXISTS fastravel_test; CREATE DATABASE IF NOT EXISTS fastravel_prod;"

# rodar migrations (opcional em dev; obrigatório em prod)
npx sequelize db:migrate
```

Observação: Em desenvolvimento o projeto faz `sequelize.sync()` por padrão, o que cria/atualiza tabelas automaticamente. Em produção, prefira somente migrations.

## 5) Rodar

- Desenvolvimento (autoreload):

```
npm run dev
```

- Produção:

```
NODE_ENV=production npm start
```

O servidor lê `.env` automaticamente.

## 6) Endpoints úteis

- `POST /users` — cria usuário
- `POST /auth/login` — login e token JWT
- `GET /flights` — lista voos
- `POST /bookings` — cria reserva (requer Bearer token)

## 7) Dicas para outros ambientes

- Ajuste os valores de `DEV_DB_*`, `TEST_DB_*`, `PROD_DB_*` no `.env` conforme as credenciais locais.
- `DB_DIALECT` pode ser `mysql`, `postgres`, etc. (se trocar, instale o client correspondente).
- Defina `JWT_SECRET` forte e único por ambiente.
- Se usar Docker ou cloud, use variáveis de ambiente do serviço, não copie `.env` com segredos em repositórios.

## 8) Problemas comuns

- AccessDeniedError: verifique usuário/senha/host/porta no `.env`, se o MySQL está rodando e se o banco existe.
- CORS: ajuste `origin` no `src/app.js` se o frontend rodar em outra URL.
- Porta em uso: mude `PORT` no `.env`.
