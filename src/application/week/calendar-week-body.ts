import { IWeekViewOptions } from "../../domain/calendar/contracts/ICalendar";
import { ICalendarBody } from "../../domain/calendar/entities/iview";
import { CalendarTask } from "../../domain/calendar/entities/Task/CalendarTask";
import { CalendarWeekBodyColumns } from "./calendar-week-body-columns";
//import { CalendarWeekBodyRow } from "./calendar-week-body-row";
import { CalendarWeekBodyRows } from "./calendar-week-body-rows";

export class CalendarWeekBody implements ICalendarBody  {
 // protected rows: CalendarWeekBodyRow[] = [];
  element: HTMLElement = document.createElement("div");
  bodyRows!: CalendarWeekBodyRows;
  bodyColumns!: CalendarWeekBodyColumns;
  constructor(protected options: IWeekViewOptions) {
    this.initBody();
  }
  
  nextBody(): void {
    throw new Error("Method not implemented.");
  }

  previousBody(): void {
    throw new Error("Method not implemented.");
  }
  
  initBody() {
    this.bodyRows = new CalendarWeekBodyRows(this.options);
    this.bodyColumns = new CalendarWeekBodyColumns(this.options);
    this.assignClassCss();
    this.element.append(this.bodyRows.getElement());
    this.element.append(this.bodyColumns.getElement());
  }

  getElementBody() {
    return this.element;
  }

  assignClassCss() {
    this.element.classList.add("calendar__body_week");
    // this.elementRows.classList.add("calendar__body_week_rows");
  }

  removeTask(task: CalendarTask): boolean {
    return !!this.bodyColumns.getDays().get(task.getDate().toLocaleDateString())?.removeTask(task.getId())
  }
}
