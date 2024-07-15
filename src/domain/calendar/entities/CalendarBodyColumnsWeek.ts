import { CalendarElement } from "../values-object/CalendarElement";
import { CalendarBodyColumn } from "./CalendarBodyColumn";

export class CalendarBodyContainerColumnsWeek extends CalendarElement {
  //element = document.createElement("div");

  columns: CalendarBodyColumn[] = [];
  constructor(protected parent: HTMLElement) {
    super(parent)
    this.init();
    this.assignClassCss();
  }

  init() {
    // este div es para la hora
    this.element.append(document.createElement("div"));
    //parent.append(this.element);
  }

  assignClassCss() {
    this.element.classList.add("calendar__body_container_columns_week");
  }

  addColumn(date: Date) {
    const column = new CalendarBodyColumn(date, this.element);
    this.columns.push(column);
    return column;
  }

  updateGridStyle() {
    this.element.style.gridTemplateColumns = `var(--width-label-hours) repeat(${this.columns.length}, calc(calc(100% - var(--width-label-hours)) / ${this.columns.length}))`;
  }

}
