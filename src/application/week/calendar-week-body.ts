import { IWeekViewOptions } from "../../domain/calendar/contracts/ICalendar";
import { CalendarWeekBodyRows } from "./calendar-week-body-rows";

export class CalendarWeekBody extends CalendarWeekBodyRows {
  element: HTMLElement = document.createElement("div");
  
  constructor(protected options: IWeekViewOptions) {
    super();
  }

  initBody() {
    // const elementBody = this.getElementBody();
    this.element.append(this.getElementRows());
  }

  getElementBody() {
    return this.element;
  }

  assignClassCss() {
    this.element.classList.add("calendar__body_week");
    // this.elementRows.classList.add("calendar__body_week_rows");
  }
}
