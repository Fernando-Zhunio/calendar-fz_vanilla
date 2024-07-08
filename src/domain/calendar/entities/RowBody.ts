import { CommunicationService } from "../../../application/CommunicationService";
import { Popover } from "../../popover/Popover";
import { IWeekViewOptions } from "../contracts/ICalendar";
import { IRow } from "../contracts/IRow";

export class RowBody implements IRow {
  private elementRow = document.createElement("div");
  private elementColumnHours = document.createElement("div");
  private elementColumn = document.createElement("div");

  constructor(private parent: HTMLElement, protected hour: string, private id: symbol) {
    this.elementRow.classList.add("calendar__row");
    this.elementRow.addEventListener("click", (e: MouseEvent) => {
      const position =
        e.clientX - (e.target as any).getBoundingClientRect().left;
      this.getColumnForPosition(position);
      const t = new Popover('form-template');
      t.open(e.clientX, e.clientY);

    });
    this.parent.appendChild(this.elementRow);
    this.elementRow.appendChild(this.elementColumnHours);
  }

  getColumnForPosition(position: number): number {
    const widthRow =
      this.elementRow.clientWidth - this.elementColumnHours.clientWidth;
    const { omitDays } = CommunicationService.getInstance().getOptions(this.id)! as IWeekViewOptions;
    return position / (widthRow / (7 - omitDays!.length));
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
    this.elementColumn.classList.add("calendar__row__column");
    this.parent.append(this.elementColumn);
  }
}
