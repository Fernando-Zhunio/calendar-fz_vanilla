import { IRow } from "../contracts/IRow";

 
export class RowBody implements IRow {
  private elementRow = document.createElement("div");
  private elementColumnHours = document.createElement("div");
  private elementColumn = document.createElement("div");

  constructor(private parent: HTMLElement, protected hour: string, event:  Event) {
    this.elementRow.classList.add("calendar__row");
    this.elementRow.addEventListener("click", () => {
        var event = new CustomEvent("calendar_row_click", { "detail": this });
        document.dispatchEvent(event);
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
