import { IWeekViewOptions } from "../../domain/calendar/contracts/ICalendar";
import { listHoursByInterval } from "../../domain/tools/tools";
import { CalendarWeekBodyRow } from "./calendar-week-body-row";

export class CalendarWeekBodyRows {
  elementRows = document.createElement("div");
  //protected  options: IWeekViewOptions;
   //rows: CalendarWeekBodyRow[];

  constructor(
    protected options: IWeekViewOptions,
    protected rows: CalendarWeekBodyRow[]
  ) {
    this.assignClassCss();
    this.initRows();
  }

  assignClassCss() {
    this.elementRows.classList.add("calendar__body_week_rows");
  }

  getElementRows() {
    return this.elementRows;
  }

  initRows() {
    this.elementRows.innerHTML = "";
    this.rows = [];
    const { intervalMinutes, startTime, endTime } = this.options;
    const listHours = listHoursByInterval(intervalMinutes, startTime, endTime);
    listHours.forEach((hour) => {
      const row = new CalendarWeekBodyRow(hour);
      this.elementRows.append(row.element);
      this.rows.push(row);
    });
  }
}
