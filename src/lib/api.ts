import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:5000/api",
  headers: {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
  },
});

export default api;