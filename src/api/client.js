// src/api/client.js
import axios from "axios";

const BASE = import.meta.env.VITE_API_BASE_URL; // https://api.taeback.net

const http = axios.create({
  baseURL: BASE,
  headers: { "Content-Type": "application/json" },
});

export const api = {
  verifyHead: async (inviteCode) => {
    const { data } = await http.post("/auth/verify-head", { inviteCode });
    return data;
  },

  // ✅ 본사 주문 목록
  headOrders: async (headOfficeId, status) => {
    const { data } = await http.get("/head/orders", {
      params: { headOfficeId, status },
    });
    return data;
  },

  // ✅ 본사 주문 상세
  headOrderDetail: async (orderId) => {
    const { data } = await http.get(`/head/orders/${orderId}`);
    return data;
  },
};
