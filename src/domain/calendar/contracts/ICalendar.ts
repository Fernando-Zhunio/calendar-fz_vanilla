import { CalendarBodyBackdrop } from "../entities/CalendarBodyBackdrop";
import { CalendarBodyColumn } from "../entities/CalendarBodyColumn";
import { CalendarBodyRow } from "../entities/CalendarBodyRow";
import { CalendarTask } from "../entities/Task/CalendarTask";

export interface IWeekViewOptions extends IViewOptions {
  omitDays?: number[];
  startDay: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  sprintDays: 1 | 2 | 3 | 4 | 5 | 6 | 7;
}

export interface IViewOptions {
  currentDate: Date;
  intervalMinutes: number;
  startTime: string;
  endTime: string;
  idFormCreateOrEditTask: string;
  heightRow: number;
  cbRemoveTask: (task: CalendarTask) => Promise<any>;
  cbEditTask: (task: CalendarTask) => Promise<any>;
}

export interface IDayViewOptions extends IViewOptions {
  gL: string;
}

const defaultViewOptions = {
  currentDate: new Date(),
  intervalMinutes: 15,
  startTime: "08:00",
  endTime: "18:00",
};

export const defaultDayViewOptions = { ...defaultViewOptions, ...{} };

export const defaultWeekViewOptions: IWeekViewOptions = {
  ...defaultViewOptions,
  omitDays: [],
  startDay: 1,
  sprintDays: 7,
  idFormCreateOrEditTask: "",
  heightRow: 36,
  cbRemoveTask: fetchGet,
  cbEditTask: fetchGet,
};

async function fetchGet(task: CalendarTask): Promise<any> {
  return await fetch("https://jsonplaceholder.typicode.com/todos/1")
    .then((response) => response.json())
    .catch(() => {alert('A ocurrido un error'+ task.getId()); throw new Error();});
}

export interface IHeaderCalendar {
    // next(): void;
    // previous(): void;
}

export interface ICalendarBody {
  getColumns(): CalendarBodyColumn[];
  getTaskForId(id: any): CalendarTask;
  getRows(): CalendarBodyRow[];
  getHeightRow(): number;
  getBackdrop(): CalendarBodyBackdrop

}

export interface ICalendarDataWeek extends ICalendarData {
  startDate: Date;
  endDate: Date;

}

export interface ICalendarData {

}