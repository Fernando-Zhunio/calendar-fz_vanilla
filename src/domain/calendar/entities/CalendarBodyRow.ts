import { IWeekViewOptions } from "../contracts/ICalendar";
import { TypesCalendarEvent } from "../contracts/IEventsCalendar";
import { IRow } from "../contracts/IRow";
import { CalendarRows } from "../values-object/CalendarRows";

export class CalendarBodyRow extends CalendarRows implements IRow {
  private elementHour = document.createElement("div");

  constructor(
    protected parent: HTMLElement,
    protected hour: string,
    protected calendarId: symbol
  ) {
    super(calendarId, parent);
    this.generateEventClick();
    this.assignStyleClass();
    this.element.appendChild(this.elementHour);

    this.elementHour.textContent = this.hour;
    this.element.append(this.elementHour);
  }

  assignStyleClass() {
    this.element.classList.add("calendar__row");
    this.elementHour.classList.add("calendar__row__hours");
  }

  private generateEventClick() {
    this.element.addEventListener("click", (e: MouseEvent) => {
      const position =
        e.clientX - (e.target as any).getBoundingClientRect().left;
      const customEvent = new CustomEvent(TypesCalendarEvent.CalendarRowClick, {
        detail: {
          hour: this.hour,
          elementRow: this.element,
          event: e,
          columnNumber: this.getColumnForPosition(position),
        },
      });
      document.dispatchEvent(customEvent);
    });
  }

  getColumnForPosition(position: number): number {
    const widthRow = this.element.clientWidth - this.elementHour.clientWidth;
    const { omitDays } = this.getOptions<IWeekViewOptions>();
    return Math.floor((position - this.elementHour.clientWidth) / (widthRow / (7 - omitDays!.length))+1);
  }

  getHour(): string {
    return this.hour;
  }

}
