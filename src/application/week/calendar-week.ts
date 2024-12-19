import {
  ICalendarBody,
  ICalendarDataWeek,
  IWeekViewOptions,
} from "../../domain/calendar/contracts/ICalendar";
import { IViewWeek } from "../../domain/calendar/entities/iview";
import { CalendarTask } from "../../domain/calendar/entities/Task/CalendarTask";
import { getStartDateOfWeek } from "../../domain/tools/tools";
import { CalendarWeekBody } from "./calendar-week-body";
import { CalendarWeekHeader } from "./calendar-week-header";

export interface IOptionsRender {
  tasks: CalendarTask;
}
export class CalendarWeek implements IViewWeek {
  public currentDate!: Date;
  public key!: symbol;
  //public days: string[];
  public options!: IWeekViewOptions;
  protected startDate!: Date;
  listEvent: any;
  body!: CalendarWeekBody;
  header!: CalendarWeekHeader;
  constructor(options: IWeekViewOptions, private elementCalendar: HTMLElement) {
    this.body = new CalendarWeekBody(options);
    this.header = new CalendarWeekHeader(options);
    this.options = options;
    this.init();
  }

  changeDate(date: Date): void {
    //this.currentDate = date;
    this.options.startDate = date;
    this.startDate = this.getStartDate();
    this.header.changeDateHeader();
  }

  init() {
    this.startDate = this.getStartDate();
    this.render();
    this.elementCalendar.append(this.header.element);
    this.elementCalendar.append(this.body.element);
  }

  protected getStartDate(date?: Date, startDay?: number): Date {
    return  getStartDateOfWeek(date || this.options.startDate, startDay || this.options.startDay);
  }

  previous(): void {
    this.header.previousHeader();
  }

  changeInterval(_interval: number): void {
    throw new Error("Method not implemented.");
  }

  getBody(): ICalendarBody {
    throw new Error("Method not implemented.");
  }
  getData(): ICalendarDataWeek {
    throw new Error("Method not implemented.");
  }
  next(): void {
    this.header.nextHeader();
  }
  addTask(): void {
    throw new Error("Method not implemented.");
  }

  render(): void {
    this.header.initHeader();
  }
}
