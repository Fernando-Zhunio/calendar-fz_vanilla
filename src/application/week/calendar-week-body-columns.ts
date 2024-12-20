import { IWeekViewOptions } from "../../domain/calendar/contracts/ICalendar";
import { getStartDateOfWeek } from "../../domain/tools/tools";
import { CalendarBodyColumn } from "../shared/calendar-body-column";
// import { CalendarWeekBodyRow } from "./calendar-week-body-row";

export class CalendarWeekBodyColumns {
  element = document.createElement("div");
//   protected abstract options: IWeekViewOptions;
  protected days: CalendarBodyColumn[] = [];

  constructor(private options : IWeekViewOptions) {
    this.assignClassCss();
    this.initColumns();
  }

  getDays() {
    return this.days;
  }

  assignClassCss() {
    this.element.classList.add("calendar__body_week_columns");
  }

  getElement() {
    return this.element;
  }

  initColumns() {
        const element = this.getElement();
        const columnDate = getStartDateOfWeek(
              this.options.startDate,
              this.options.startDay
            );
        element.innerHTML = "";
        this.days = [];
        const omitDays = this.options.omitDays;
        for (let dayNumber = 1; dayNumber <= 7; dayNumber++) {
          if (omitDays.includes(dayNumber as any)) {
            columnDate.addDays(1);
            continue;
          }
          const column = new CalendarBodyColumn(
            new Date(columnDate),
            this.isDayDisable(columnDate.getDay())
          );
          columnDate.addDays(1);
          element.append(column.getElement());
          this.days.push(column);
        }
        const colsLength = this.days.length;
        this.element.style.gridTemplateColumns = `repeat(${colsLength}, ${
          100 / colsLength
        }%)`;
  }

  isDayDisable(day: number): boolean {
    return this.options.disabledDays.includes(day as any);
  }

  nextBody() {
    this.options.startDate = this.options.startDate.addDays(7);
    this.days.forEach((x) => {
      x.setDate(x.getDate().addDays(7));
    });
  }

  previousBody() {
    this.options.startDate = this.options.startDate.addDays(-7);
    this.days.forEach((x) => {
      x.setDate(x.getDate().addDays(-7));
    });
  }
}
