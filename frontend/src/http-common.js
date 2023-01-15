import axios from "axios";
import store from "@/store/index.js";

const instance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-type": "application/json"
  }
});

instance.interceptors.request.use(
  (config) => {
    const token = store.state.auth.token; // localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;