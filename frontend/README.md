# FasTravel – Frontend

Aplicação React (Create React App) com Tailwind para busca e reserva de voos.

## Scripts

- `npm start` – roda o app em desenvolvimento (http://localhost:3000)
- `npm run build` – gera artefatos de produção em `build/`
- `npm test` – roda testes (se configurados)

## Variáveis de ambiente (.env)

Copie `.env.example` para `.env` e ajuste:

```
REACT_APP_API_URL=http://localhost:3001
REACT_APP_HERO_IMAGE=
REACT_APP_ASSETS_BASE_URL=
```

- `REACT_APP_API_URL`: URL do backend (Express)
- `REACT_APP_HERO_IMAGE`: URL total do banner principal da Home (opcional)
- `REACT_APP_ASSETS_BASE_URL`: base de CDN/bucket para imagens dos destinos (opcional)

Observação: reinicie o `npm start` após mudar o `.env`.

## Logos & Ícones

- Troque arquivos em `public/`:
  - `favicon.ico` (multi-tamanho recomendado: 16/32/48/64)
  - `logo192.png` e `logo512.png` (PWA)
  - `logo192.svg` e `logo512.svg` (usados no Footer/Navbar)
  - `manifest.json` (nome do app e ícones)

## Imagens da Home

- Hero: usa `REACT_APP_HERO_IMAGE` ou `REACT_APP_ASSETS_BASE_URL/hero.jpg` (fallback para `/hero.jpg`).
- Destinos: usam `REACT_APP_ASSETS_BASE_URL + /destinos/{arquivo}.jpg` ou caminhos locais em `/public/destinos/`.

Tamanhos sugeridos:

- Hero: 1920×1080 (JPG otimizado, < 300 KB)
- Destinos: 800×600 (JPG otimizado, < 150 KB)

## Build & Deploy

`npm run build` cria `build/`. Publique essa pasta em um host estático (Nginx/Apache/S3/Netlify). A pasta `build/` é gerada – não edite manualmente.
