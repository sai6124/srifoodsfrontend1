import axios from "axios";

const apiurl = axios.create({
  baseURL: "srifoodsbackend.vercel.app",
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
