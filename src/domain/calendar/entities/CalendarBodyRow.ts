import { CommunicationService } from "../../../application/CommunicationService";
import { IWeekViewOptions } from "../contracts/ICalendar";
import { TypesCalendarEvent } from "../contracts/IEventsCalendar";
import { IRow } from "../contracts/IRow";
import { CalendarRows } from "../values-object/CalendarRows";

export class CalendarBodyRow extends CalendarRows implements IRow {
  private elementHour = document.createElement("div");

  constructor(
    protected parent: HTMLElement,
    protected hour: string,
    protected calendarId: string
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
      // debugger;
      console.log((e.target as any).getBoundingClientRect())
      const position =
        e.clientX - (e.target as any).getBoundingClientRect().left;
      console.log({position})
      const columnNumber = this.getColumnForPosition(position);
      if (columnNumber === 0) return
      const calendar = CommunicationService.getCalendarForId(this.calendarId);
      const date = calendar?.getView().getBody().getColumns()[columnNumber - 1].getDate();
      const customEvent = new CustomEvent(TypesCalendarEvent.CalendarRowClick, {
        detail: {
          hour: this.hour,
          elementRow: this.element,
          event: e,
          date, 
          columnNumber,
        },
      });
      document.dispatchEvent(customEvent);
    });
  }

  getColumnForPosition(position: number): number {
    const widthColumnHour = document.querySelector('.calendar__column_hours')!.getBoundingClientRect().width;
    console.log(this.element.clientWidth, this.element.getBoundingClientRect().width, widthColumnHour)
    const widthRow = this.element.getBoundingClientRect().width - widthColumnHour;
    const { omitDays } = this.getOptions<IWeekViewOptions>();
    return Math.floor((position - widthColumnHour) / (widthRow / (7 - omitDays!.length))+1);
  }

  getHour(): string {
    return this.hour;
  }

}
