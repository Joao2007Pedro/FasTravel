import axios from "axios";

// Base URL configurável via variável de ambiente do CRA
const baseURL = process.env.REACT_APP_API_URL || "http://localhost:3001";

const api = axios.create({ baseURL });

// Anexa o token JWT automaticamente, se existir
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Removidos logs de depuração para produção/dev

export default api;
