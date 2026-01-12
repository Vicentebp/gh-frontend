import axiosInstance from "../utils/axios";

export const loginService = async (email: string, password: string) => {
  const response = await axiosInstance.post<string>("/auth/login", { email, password });
  return response.data;
};

export const signInService = async (name: string, email: string, password: string) => {
  const response = await axiosInstance.post<string>("/auth/signIn", { name, email, password });
  return response.data;
};
