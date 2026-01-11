import axios from "axios";

const axiosInstance = axios.create({ baseURL: "http://localhost:3000", timeout: 10000 });
// axiosInstance.interceptors.response.use(
//   function onFulfilled(response) {
//     return response;
//   },
//   function onRejected(error) {
//     if (error.message) {
//       return Promise.reject(error.message);
//     }
//     return Promise.reject("");
//   }
// );

export default axiosInstance;
