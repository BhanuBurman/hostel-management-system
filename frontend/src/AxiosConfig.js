// axiosConfig.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});


// ✅ Interceptor to dynamically attach token for every request
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

// ✅ Interceptor for handling 401 errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      alert("You must be logged in before accesing this section")
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default api;
