import { CommunicationService } from "../../../application/CommunicationService";
// import { Popover } from "../../popover/Popover";
import { IWeekViewOptions } from "../contracts/ICalendar";
import { TypesCalendarEvent } from "../contracts/IEventsCalendar";
import { IRow } from "../contracts/IRow";

export class RowBody implements IRow {
  private elementRow = document.createElement("div");
  private elementColumnHours = document.createElement("div");
  // private elementColumn = document.createElement("div");

  constructor(
    private parent: HTMLElement,
    protected hour: string,
    private id: symbol
  ) {
    this.elementRow.classList.add("calendar__row");
    this.elementRow.addEventListener("click", (e: MouseEvent) => {
      const position =
        e.clientX - (e.target as any).getBoundingClientRect().left;
      const customEvent = new CustomEvent(TypesCalendarEvent.CalendarRowClick, {
        detail: {
          hour: this.hour,
          elementRow: this.elementRow,
          event: e,
          columnNumber: this.getColumnForPosition(position),
        },
      });

      document.dispatchEvent(customEvent);
    });
    this.parent.appendChild(this.elementRow);
    this.elementRow.appendChild(this.elementColumnHours);
  }

  getColumnForPosition(position: number): number {
    const widthRow =
      this.elementRow.clientWidth - this.elementColumnHours.clientWidth;

    const { omitDays } = CommunicationService.getInstance().getOptions(
      this.id
    )! as IWeekViewOptions;
    return Math.floor((position - this.elementColumnHours.clientWidth) / (widthRow / (7 - omitDays!.length))+1);
  }

  getElement(): HTMLElement {
    return this.elementRow;
  }

  getKey(): string {
    return this.hour;
  }

  render() {
    this.elementColumnHours.classList.add("calendar__row__hours");
    this.elementColumnHours.textContent = this.hour;
    this.elementRow.append(this.elementColumnHours);
    // this.elementColumn.classList.add("calendar__row__column");
    // this.parent.append(this.elementColumn);
  }
}
