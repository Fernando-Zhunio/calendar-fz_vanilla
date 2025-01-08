import { Hour } from "../../../application-contract/hour";
import { TypesView } from "../../tools/tools";
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
  startTime: Hour;
  endTime: Hour;
  idFormCreateOrEditTask: string;
  heightRow: number;
  cbRemoveTask: (task: CalendarTask) => Promise<any>;
  cbEditTask: (task: CalendarTask) => Promise<any>;
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


//#region Data default
export const defaultViewOptions = {
  startDate: new Date(),
  intervalMinutes: 15,
  startTime: "01:00" as Hour,
  endTime: "24:00" as Hour,
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

// export interface ICalendarBody {
//   getColumns(): CalendarBodyColumn[];
//   getTaskForId(id: any): CalendarTask;
//   getRows(): CalendarBodyRow[];
//   getHeightRow(): number;
//   getBackdrop(): CalendarBodyBackdrop;
// }

// export interface ICalendarDataWeek extends ICalendarData {
//   startDate: Date;
//   endDate: Date;
// }


// export interface ICalendar {
//   render(args?: any): void;
//   addTask(): void;
//   listEvent: any;
//   next(): void;
// }
