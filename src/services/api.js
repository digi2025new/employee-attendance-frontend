import axios from "axios";

const api = axios.create({
  baseURL: "https://employee-attendance-backend-00m5.onrender.com",
});

// Automatically attach JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;