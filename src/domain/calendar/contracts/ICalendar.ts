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
  startDay: 7,
  sprintDays: 7,
};

export interface IHeaderCalendar {
    next(): void;
    previous(): void;
}

export interface ICalendarBody {
  // addTask(column: number, dateTime: Date, duration: number, template: HTMLElement | string): void;
}

export interface ICalendarDataWeek extends ICalendarData {
  startDate: Date;
  endDate: Date;

}

export interface ICalendarData {

}