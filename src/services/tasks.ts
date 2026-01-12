import type { Task } from "../types";
import axiosInstance from "../utils/axios";

export const createTaskService = async (task: Task) => {
  const response = await axiosInstance.post<Task>("/task", task);
  return response.data;
};

export const deleteTaskService = async (taskId: string) => {
  const response = await axiosInstance.delete<string>(`/task/${taskId}`);
  return response.data;
};

export const getTasksService = async () => {
  const response = await axiosInstance.get<Array<Task>>("/task");
  return response.data;
};
