export abstract class CalendarMonthBody {
  elementBody: HTMLElement = document.createElement("div");

  constructor() {}

  init() {

  }

  getElementBody() {
    return this.elementBody;
  }

  assignClassCss() {
    this.elementBody.classList.add("calendar__body_week");
    // this.elementRows.classList.add("calendar__body_week_rows");
  }
}
