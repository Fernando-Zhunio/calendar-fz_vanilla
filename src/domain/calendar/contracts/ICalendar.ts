import { Time } from "../../../application-contract/hour";
import { CalendarEvents, TypesView } from "../../tools/tools";
import { CalendarTask } from "../entities/Task/CalendarTask";
export interface IWeekViewOptions extends IViewOptions {
  omitDays: (0 | 1 | 2 | 3 | 4 | 5 | 6 | 7)[];
  disabledDays: (0 | 1 | 2 | 3 | 4 | 5 | 6 | 7)[];
  startDay: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  sprintDays: 1 | 2 | 3 | 4 | 5 | 6 | 7;
}
export interface IViewOptions {
  startDate: Date;
  intervalMinutes: number;
  startTime: Time;
  endTime: Time;
  idFormCreateOrEditTask: string;
  heightRow: number;
  cbRemoveTask: (task: CalendarTask) => Promise<any>;
  cbEditTask: (task: CalendarTask) => Promise<any>;
  cbChangePositionTask:(taskOld: CalendarTask,taskNew: CalendarTask) => Promise<boolean>
}

export interface IDayViewOptions extends IViewOptions {
  gL: string;
}

export interface IMonthViewOptions extends IViewOptions {
  gL: string;
}



type Period = TypesView;

export type OptionsCalendar<T extends Period> = T extends TypesView.weeks
  ? IWeekViewOptions
  : T extends TypesView.days
  ? IDayViewOptions
  : T extends TypesView.months
  ? IMonthViewOptions
  : never;

export type IEventData<T extends CalendarEvents> = T extends CalendarEvents.ChangePositionTask
? IChangePositionTask :
 T extends CalendarEvents.RowClick
? IRowClick : never

interface IChangePositionTask {
  
}

interface IRowClick {}


//#region Data default
export const defaultViewOptions = {
  startDate: new Date(),
  intervalMinutes: 15,
  startTime: "01:00" as Time,
  endTime: "24:00" as Time,
  heightRow: 36,
};

export const defaultDayViewOptions = { ...defaultViewOptions, ...{} };

export const defaultWeekViewOptions: IWeekViewOptions = {
  ...defaultViewOptions,
  omitDays: [],
  disabledDays: [],
  startDay: 1,
  sprintDays: 7,
  idFormCreateOrEditTask: "",
  cbRemoveTask: fetchGet,
  cbEditTask: fetchGet,
  cbChangePositionTask: (_old, _new) => Promise.resolve(true)
};
//#endregion

async function fetchGet(task: CalendarTask): Promise<any> {
  return await fetch("https://jsonplaceholder.typicode.com/todos/1")
    .then((response) => response.json())
    .catch(() => {
      alert("A ocurrido un error" + task.getId());
      throw new Error();
    });
}

export interface IHeaderCalendar {
  // next(): void;
  // previous(): void;
}

