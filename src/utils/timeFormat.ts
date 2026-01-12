import type { Task } from "../types";

export const toIsoStringWithTimezone = (date: Date) => {
  const tzo = -date.getTimezoneOffset(),
    dif = tzo >= 0 ? "+" : "-",
    pad = (num: number) => {
      return (num < 10 ? "0" : "") + num;
    };

  return date.getFullYear() + "-" + pad(date.getMonth() + 1) + "-" + pad(date.getDate()) + "T" + pad(date.getHours()) + ":" + pad(date.getMinutes());
};

export const getTimeDifference = (startingTime: string, dueTime: string) => {
  const startingTimeDate = new Date(startingTime);
  const dueTimeDate = new Date(dueTime);
  const differenceMs = Math.abs(startingTimeDate.getTime() - dueTimeDate.getTime());

  const hours: number = Math.floor(differenceMs / (1000 * 60 * 60));

  const minutesMs = differenceMs % (1000 * 60 * 60);
  const minutes: number = Math.floor(minutesMs / (1000 * 60));
  const decimalHours = hours + minutes / 60;

  return { minutes, hours, decimalHours };
};
export const calcTimeByDay = (tasks: Task[]) => {
  const timeByDay = {};
  console.log(tasks);
  tasks.forEach((task) => {
    const startingTime = new Date(task.startingTime);
    const dueTime = new Date(task.dueTime);

    const msDif = dueTime - startingTime;

    const hrsDec = msDif / (1000 * 60 * 60);

    const data = task.startingTime.split("T")[0];

    timeByDay[data] = (timeByDay[data] || 0) + hrsDec;
  });

  const resultado = Object.entries(timeByDay).map(([data, horas]) => ({
    data,
    horas: parseFloat(horas.toFixed(2)),
  }));

  resultado.sort((a, b) => a.data.localeCompare(b.data));

  return resultado;
};
