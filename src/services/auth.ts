import axiosInstance from "../utils/axios";

export const loginService = async (email: string, password: string) => {
  return await axiosInstance.post("/auth/login", { email, password });
};

export const signInService = async (name: string, email: string, password: string) => {
  return await axiosInstance.post("/auth/signIn", { name, email, password });
};
