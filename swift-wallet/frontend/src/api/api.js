import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:4000/api" });

export const register = (payload) => API.post("/auth/register", payload);
export const login = (payload) => API.post("/auth/login", payload);

export const getTransactions = (phone) => API.get("/tx", { params: { phone } });
export const sendMoney = (payload) => API.post("/tx/send", payload);
