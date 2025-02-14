import { IWeekViewOptions } from "../../domain/calendar/contracts/ICalendar";
import { CalendarTask } from "../../domain/calendar/entities/Task/CalendarTask";
import { getStartDateOfWeek } from "../../domain/tools/tools";
import { CalendarBodyColumn } from "../shared/calendar-body-column";

export class CalendarWeekBodyColumns {
  
  /**
   * key of date is format to function toLocaleDateString()
   */
  protected days: Map<string,CalendarBodyColumn> = new Map();
  element = document.createElement("div");

  constructor(private options : IWeekViewOptions) {
    this.assignClassCss();
    this.initColumns();
  }

  /**
   * - clave se genera de la funcion toLocaleDateString() de un objeto Date
   * - valor es una clase CalendarBodyColumn
   * @returns 
   * Map<string,CalendarBodyColumn>
   */
  getDays() {
    return this.days;
  }

  getDayByIndex(index: number) {
    const sort = Array.from(this.days.keys()).sort((a,b) => new Date(a).getTime() - new Date(b).getTime());
    return this.days.get(
      sort[index]
    );
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
        this.days = new Map();
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
          this.days.set(new Date(columnDate).toLocaleDateString(), column);
          columnDate.addDays(1);
          element.append(column.getElement());
        }
        const colsLength = this.days.size;
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

  removeTask(task: CalendarTask){
    const key = task.getDate().toLocaleDateString();
    return this.days.get(key)?.removeTask(task.getId())
  }
}
