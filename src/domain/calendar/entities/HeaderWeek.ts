import { IColumn } from "../contracts/IColumn";
import { ColumnHead } from "./ColumnHead";

export interface IHeaderWeekOptions {
  currentDate: Date;
  omitDays: number[];
}

const defaultHeaderWeekOptions = {
  currentDate: new Date(),
  omitDays: [],
};


export class HeaderWeek {
  elementHeader = document.createElement("div");
  options!: IHeaderWeekOptions;
  columns: IColumn[] = [];

  constructor(options: IHeaderWeekOptions | {} = {}) {
    this.elementHeader.classList.add("calendar__header_week");
    this.options = { ...defaultHeaderWeekOptions, ...options };
    this.render();
  }

  getElement() {
    return this.elementHeader;
  }

  setCurrentDate(currentDate: Date) {
    this.options.currentDate = currentDate;
    return this;
  }

  buildStartDate() {
    const dayNum = new Date(this.options.currentDate).getDay();
    if (dayNum === 0) {
      return this.options.currentDate;
    } else {
      return this.options.currentDate.addDays(-dayNum + 1);
    }
  }

  render() {
    this.elementHeader.innerHTML = "";
    // element para la columna de hora
    this.elementHeader.append(document.createElement("div"));
    let numColumns = 0;
    const startDate = this.buildStartDate();
    const auxDate = new Date(startDate);
    for (let i = 0; i < 7; i++) {
        // si hay dias de descanso no apareceran en el calendario
      if (this.options.omitDays.includes(auxDate.getDay())) {
        auxDate.addDays(1);
        continue;
      }
      numColumns++;
      const column = new ColumnHead(this.elementHeader, auxDate);
      column.render();
      this.columns.push(column);
      auxDate.addDays(1);
    }
    this.elementHeader.style.gridTemplateColumns = `var(--width-label-hours) repeat(${numColumns}, calc(calc(100% - var(--width-label-hours)) / ${numColumns}))`;
  }
}
