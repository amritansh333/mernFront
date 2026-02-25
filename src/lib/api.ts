import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const api = axios.create({
  baseURL: '${BASE_URL}/api',
  headers: {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
  },
});

export default api;