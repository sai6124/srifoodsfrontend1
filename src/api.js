import axios from "axios";

const apiurl = axios.create({
  baseURL: "https://srifoodsbackend.vercel.app/api/v1/products",
});

// Attach token on every request
apiurl.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default apiurl;
