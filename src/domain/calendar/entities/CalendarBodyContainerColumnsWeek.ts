import { CalendarElement } from "../values-object/CalendarElement";
import { CalendarBodyColumn } from "./CalendarBodyColumn";

export class CalendarBodyContainerColumnsWeek extends CalendarElement {

  columns: CalendarBodyColumn[] = [];
  constructor(protected calendarId: symbol, protected parent: HTMLElement) {
    super(parent)
    this.init();
    this.assignClassCss();
  }

  init() {
    // este div es para la columna de la hora
    const element = document.createElement("div");
    element.classList.add("calendar__column_hours");
    this.element.append(element);
  }

  assignClassCss() {
    this.element.classList.add("calendar__body_container_columns_week");
  }

  addColumn(date: Date) {
    const column = new CalendarBodyColumn(this.calendarId, date, this.element);
    this.columns.push(column);
    return column;
  }

  updateGridStyle() {
    this.element.style.gridTemplateColumns = `var(--width-label-hours) repeat(${this.columns.length}, calc(calc(100% - var(--width-label-hours)) / ${this.columns.length}))`;
  }

}
