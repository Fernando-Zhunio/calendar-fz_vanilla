import {
  ICalendarDataWeek,
  IWeekViewOptions,
} from "../../domain/calendar/contracts/ICalendar";
import { ICalendarBody, IViewWeek } from "../../domain/calendar/entities/iview";
import { CalendarTask } from "../../domain/calendar/entities/Task/CalendarTask";
import { CalendarWeekBody } from "./calendar-week-body";
import { CalendarWeekHeader } from "./calendar-week-header";

export interface IOptionsRender {
  tasks: CalendarTask;
}
export class CalendarWeek implements IViewWeek {
  public currentDate!: Date;
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

  goDate(date: Date): void {
    this.header.goDate(date);

  }

  getHeader(): CalendarWeekHeader {
    return this.header;
  }



  init() {
    this.render();
    this.elementCalendar.append(this.header.element);
    this.elementCalendar.append(this.body.element);
  }

  previous(): void {
    this.header.previous();
    this.body.bodyColumns.previousBody();
  }

  changeInterval(_interval: number): void {
    throw new Error("Method not implemented.");
  }

  getBody(): ICalendarBody {
    return this.body;
  }

  getData(): ICalendarDataWeek {
    throw new Error("Method not implemented.");
  }

  next(): void {
    this.header.next();
    this.body.bodyColumns.nextBody();
  }

  addTask(task: CalendarTask): void {
    
  }

  render(): void {
    this.header.initHeader();
  }
}
