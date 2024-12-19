
export class CalendarWeekBodyRow {
  elementRow = document.createElement("div");
  elementHour = document.createElement("span");
  element = document.createElement("span");
  //elementRow = document.createElement("div");
  //public abstract options: IWeekViewOptions;
  //public abstract rows: CalendarBodyRow[];

  constructor(private hour: string) {
    this.assignClassCss();
    this.element.append(this.elementHour);
    this.elementRow.append(this.element);
  }

  setHour(hour: string) {
    this.elementHour.textContent = hour;
    this.hour = hour;
  }

  getHour() {
    return this.hour;
  }

  assignClassCss() {
    this.element.classList.add("calendar__body_week__rows__row");
    this.elementHour.classList.add("calendar__body_week__rows__row__hour");
  }

}
