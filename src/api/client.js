// src/api/client.js
import axios from "axios";

const BASE = import.meta.env.VITE_API_BASE_URL || "https://api.taeback.net";


const http = axios.create({
  baseURL: BASE,
  headers: { "Content-Type": "application/json" },
});

export const api = {
  verifyHead: async (inviteCode) => {
    const { data } = await http.post("/auth/verify-head", { inviteCode });
    return data;
  },
  loginStoreByCode: async (merchantCode) => {
    const { data } = await http.post("/auth/login-store-by-code", { merchantCode });
    return data;
  },
  getProducts: async (headOfficeId) => {
    const { data } = await http.get("/products", { params: { headOfficeId } });
    return data;
  },
};
