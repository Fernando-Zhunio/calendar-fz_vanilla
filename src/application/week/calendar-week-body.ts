import { IWeekViewOptions } from "../../domain/calendar/contracts/ICalendar";
import { CalendarWeekBodyColumns } from "./calendar-week-body-columns";
import { CalendarWeekBodyRow } from "./calendar-week-body-row";
import { CalendarWeekBodyRows } from "./calendar-week-body-rows";

export class CalendarWeekBody  {
  protected rows: CalendarWeekBodyRow[] = [];
  element: HTMLElement = document.createElement("div");
  bodyRows!: CalendarWeekBodyRows;
  bodyColumns!: CalendarWeekBodyColumns;
  constructor(protected options: IWeekViewOptions) {
    this.initBody();
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
}
