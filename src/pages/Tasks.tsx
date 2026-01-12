import { useForm, type SubmitHandler } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { calcTimeByDay, toIsoStringWithTimezone } from "../utils/timeFormat";
import type { Task } from "../types";
import { TaskContext, type TaskContextType } from "../context/taskContext";
import LogOut from "../components/Logout";

function Tasks() {
  const [today] = useState<string>(toIsoStringWithTimezone(new Date()));
  const { tasks, createTask, deleteTask } = useContext(TaskContext) as TaskContextType;
  const [timeUsed, setTimeUsed] = useState<Array<Object>>([]);
  const { register, watch, handleSubmit } = useForm<Task>();

  const start = watch("startingTime");
  const due = watch("dueTime");

  const onSubmit: SubmitHandler<Task> = async (data: Task) => {
    await createTask(data);
  };

  const deleteBtn = async (taskId: string) => {
    await deleteTask(taskId);
  };

  useEffect(() => {
    if (tasks.length > 0) {
      const result = calcTimeByDay(tasks);
      setTimeUsed(result);
    }
  }, [tasks]);

  return (
    <>
      <LogOut></LogOut>
      <div className="flex flex-col gap-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2 content-center text-start">
            <label>Nome da tarefa:</label>
            <input {...register("name")} required></input>
            <label>Data de Início:</label>

            <input {...register("startingTime")} type="datetime-local" required defaultValue={today} min={today} max={due}></input>

            <label>Data Final:</label>
            <input {...register("dueTime")} type="datetime-local" required min={start}></input>
            <button type="submit">Criar tarefa</button>
          </div>
        </form>

        <table className="wrapper">
          <tr className="row ">
            <th className="box gridHeader">Nome</th>
            <th className="box gridHeader">Inicio</th>
            <th className="box gridHeader">Final</th>
            <th className="box gridHeader">Remover</th>
          </tr>
          {tasks.length > 0 ? (
            tasks.map((item, index) => (
              <>
                <tr className="row">
                  <td className="box" key={index}>
                    {item.name}
                  </td>
                  <td className="box">{new Date(item.startingTime).toLocaleString()}</td>
                  <td className="box">{new Date(item.dueTime).toLocaleString()}</td>
                  <button className="box" onClick={() => deleteBtn(item._id)}>
                    Deletar
                  </button>
                </tr>
              </>
            ))
          ) : (
            <></>
          )}
        </table>
        <table className="wrapper report">
          <tr className="row ">
            <th className="box gridHeader">Dia</th>
            <th className="box gridHeader">Tempo total gasto</th>
          </tr>
          {timeUsed.length > 0 ? (
            timeUsed.map((item) => (
              <>
                <tr className="row">
                  <td className="box">{item.data}</td>
                  <td className="box">{item.horas}</td>
                </tr>
              </>
            ))
          ) : (
            <></>
          )}
        </table>
      </div>
    </>
  );
}

export default Tasks;
