// axiosConfig.js
import axios from "axios";

const api = axios.create({
  // for production
  baseURL: import.meta.env.VITE_API_URL_PROD || "http://localhost:8080",
  // for development
  // baseURL: import.meta.env.VITE_API_URL_DEV
});


// Interceptor to dynamically attach token for every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor for handling 401 errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only handle 401 globally if NOT the login endpoint
    if (
      error.response &&
      error.response.status === 401 &&
      !error.config.url.includes("/auth/login")
    ) {
      localStorage.removeItem("token");
      alert("You must be logged in before accessing this section");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default api;
