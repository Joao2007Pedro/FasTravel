// Centraliza construção de URLs de imagens usando variáveis de ambiente (CRA)
// REACT_APP_ASSETS_BASE_URL: base do CDN (ex: https://cdn.example.com/fastravel/assets)
// REACT_APP_HERO_IMAGE: URL completa para a imagem hero

const RAW_ASSET_BASE = process.env.REACT_APP_ASSETS_BASE_URL || "";
const ASSET_BASE = RAW_ASSET_BASE.replace(/\/$/, "");

export function getAsset(path) {
  if (!path) return "";
  const str = String(path).trim();
  // Se já for URL absoluta (http, https, data, protocolo relativo), retorna como está
  if (/^(https?:)?\/\//i.test(str) || /^data:/i.test(str)) return str;
  const clean = str.replace(/^\/+/, "");
  if (ASSET_BASE) return `${ASSET_BASE}/${clean}`;
  // fallback para pasta public
  return `/${clean}`;
}

export function getHeroUrl() {
  const hero = (process.env.REACT_APP_HERO_IMAGE || "").trim();
  if (hero) return hero;
  if (ASSET_BASE) return `${ASSET_BASE}/hero.jpg`;
  return "/hero.jpg";
}

export function getAssetBase() {
  return ASSET_BASE;
}
