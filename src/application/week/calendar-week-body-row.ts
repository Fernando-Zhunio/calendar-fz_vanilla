
export class CalendarWeekBodyRow {
  elementRow = document.createElement("div");
  elementHour = document.createElement("span");
  element = document.createElement("div");

  constructor(private hour: string) {
    this.assignClassCss();
    this.element.append(this.elementHour);
    this.element.append(this.elementRow);
    this.setHour(hour);
  }

  setHour(hour: string) {
    this.elementHour.innerHTML = '<span>' + hour + "</span>";
    this.hour = hour;
  }

  getHour() {
    return this.hour;
  }

  assignClassCss() {
    this.element.classList.add("calendar__body_week__rows__row");
    this.elementHour.classList.add("calendar__row__hour");
  }

}
