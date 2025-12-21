import axios from "axios";

const BASE = import.meta.env.VITE_API_BASE_URL;

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

  // ✅ 추가: 본사 주문 목록
  headOrders: async ({ headOfficeId, status }) => {
    const { data } = await http.get("/head/orders", {
      params: { headOfficeId, status },
    });
    return data;
  },

  // ✅ 추가: 본사 주문 상세
  headOrderDetail: async (orderId) => {
    const { data } = await http.get(`/head/orders/${orderId}`);
    return data;
  },
};
