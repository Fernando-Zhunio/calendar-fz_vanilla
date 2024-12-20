import { IWeekViewOptions } from "../../domain/calendar/contracts/ICalendar";
import { listHoursByInterval } from "../../domain/tools/tools";
import { CalendarWeekBodyRow } from "./calendar-week-body-row";

export class CalendarWeekBodyRows {
  element = document.createElement("div");
//   protected abstract options: IWeekViewOptions;
  protected rows: CalendarWeekBodyRow[] = [];

  constructor(private options : IWeekViewOptions) {
    this.assignClassCss();
    this.initRows();
  }

  assignClassCss() {
    this.element.classList.add("calendar__body_week_rows");
  }

  getElement() {
    return this.element;
  }

  initRows() {
    this.element.innerHTML = "";
    this.rows = [];
    const { intervalMinutes, startTime, endTime } = this.options;
    const listHours = listHoursByInterval(intervalMinutes, startTime, endTime);
    listHours.forEach((hour) => {
      const row = new CalendarWeekBodyRow(hour);
      this.element.append(row.element);
      this.rows.push(row);
    });
  }

  setHeightRow(height: number) {
    this.rows.forEach((row) => {
      row.element.style.height = height + "px";
    });
  }
}
