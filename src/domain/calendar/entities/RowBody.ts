import { CommunicationService } from "../../../application/CommunicationService";
import { IWeekViewOptions } from "../contracts/ICalendar";
import { IRow } from "../contracts/IRow";

 
export class RowBody implements IRow {
  private elementRow = document.createElement("div");
  private elementColumnHours = document.createElement("div");
  private elementColumn = document.createElement("div");

  constructor(private parent: HTMLElement, protected hour: string, id: symbol) {
    this.elementRow.classList.add("calendar__row");
    this.elementRow.addEventListener("click", (e: MouseEvent) => {
        const position = e.clientX - (e.target as any).getBoundingClientRect().left;
        // var event = new CustomEvent("calendar_row_click", { "detail": this });
        const widthRow = this.elementRow.clientWidth - this.elementColumnHours.clientWidth
        const { omitDays } = CommunicationService.getInstance().getOptions(id)! as IWeekViewOptions
        const column = position /((widthRow) / (7 - omitDays!.length ))
        console.log({width: this.elementRow.clientWidth, withHour: this.elementColumnHours.clientWidth})
        console.log({position, widthRow, column, column2: Math.floor(column)});
    })
    this.parent.appendChild(this.elementRow);
    this.elementRow.appendChild(this.elementColumnHours);
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
