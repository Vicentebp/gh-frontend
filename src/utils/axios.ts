import axios from "axios";
import Cookies from "js-cookie";
const axiosInstance = axios.create({ baseURL: "http://localhost:3000", timeout: 10000 });

axiosInstance.interceptors.request.use((config) => {
  const path = config.url?.match(/^\/*(auth)\/+.*$/)?.[1];
  if (path) {
    return config;
  }
  const token = Cookies.get("token");
  config.headers.set("x-token", token);

  return config;
});
export default axiosInstance;
