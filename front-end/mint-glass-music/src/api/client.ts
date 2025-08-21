// src/api/client.ts
import axios from "axios";

const baseURL =
  (typeof import.meta !== "undefined" && (import.meta as any)?.env?.VITE_API_BASE_URL) ||
  (typeof process !== "undefined" && (process as any)?.env?.REACT_APP_API_BASE_URL) ||
  "/api";

const client = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

export default client;
