import { useState, createContext, type ReactNode, useContext, useEffect } from "react";
import type { Task } from "../types";
import { createTaskService, deleteTaskService, getTasksService } from "../services/tasks";
import { AuthContext, type AuthContextType } from "./userContext";

export interface TaskContextType {
  tasks: Task[];
  createTask: (task: Task) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  getTasks: () => Promise<void>;
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

interface TaskProviderProps {
  children: ReactNode;
}

function TaskProvider({ children }: TaskProviderProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { user } = useContext(AuthContext) as AuthContextType;
  useEffect(() => {
    if (user && tasks.length <= 0) {
      const response = getTasks();
      setTasks(response);
    }
  }, [user]);

  const createTask = async (task: Task) => {
    try {
      const newTask: Task = await createTaskService({
        ...task,
        userId: user._id,
      });
      if (tasks.length <= 0) setTasks([newTask]);
      else setTasks([...tasks, newTask]);
      alert("Task criada");
      return tasks;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      const result = await deleteTaskService(taskId);
      setTasks(tasks.filter((task) => task._id !== taskId));
      alert(result);
    } catch (error) {
      alert(error.response.data);
    }
  };
  const getTasks = async () => {
    try {
      const response = await getTasksService();
      setTasks(response);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        deleteTask,
        getTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export default TaskProvider;
