export interface IWeekViewOptions extends IViewOptions {
  omitDays?: number[];
}

interface IViewOptions {
  currentDate: Date;
  intervalMinutes: number;
  startTime: string;
  endTime: string;
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
};

export interface IHeaderCalendar {
    next(): void;
    previous(): void;
}

export interface ICalendarBody {
  addTask(column: number, startHour: string, duration: number, template: HTMLElement | string): void;
}