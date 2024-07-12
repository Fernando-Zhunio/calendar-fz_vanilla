//import { CalendarBodyRow } from "./CalendarBodyRow";

import { CalendarBodyRow } from "./CalendarBodyRow";


export class CalendarBodyRowsWeek {
  element = document.createElement("div");

  rows: CalendarBodyRow[] = [];
  constructor(private parent: HTMLElement) {
    this.init(this.parent);
    this.assignClassCss();
  }

  init(parent: HTMLElement) {
    // este div es para la hora
    this.element.append(document.createElement("div"));
    parent.append(this.element);
  }

  assignClassCss() {
    this.element.classList.add("calendar__body_week_rows");
  }

  // addColumn(date: Date) {
  //   const column = new CalendarColumnBody(date, this.element);
  //   this.columns.push(column);
  //   return column;
  // }

}
