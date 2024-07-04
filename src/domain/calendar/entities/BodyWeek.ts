import { listHoursByInterval } from "../../tools/tools";
import { IColumn } from "../contracts/IColumn";
import { ColumnBody } from "./ColumnBody";
import { RowBody } from "./RowBody";

export interface IBodyWeekOptions {
  currentDate: Date;
  omitDays: number[];
  intervalMinutes: number;
  startTime: string;
  endTime: string;
}

const defaultBodyWeekOptions = {
  currentDate: new Date(),
  omitDays: [],
  intervalMinutes: 15,
  startTime: "08:00",
  endTime: "18:00",
};

export class BodyWeek {
  elementBody = document.createElement("div");
  elementBodyColumns = document.createElement("div");
  elementBodyRows = document.createElement("div");
  options!: IBodyWeekOptions;
  columns: IColumn[] = [];
  rows: RowBody[] = [];
  constructor(options: IBodyWeekOptions | {} = {}) {
    this.elementBody.classList.add("calendar__body_week");
    this.elementBodyColumns.classList.add("calendar__body_week_columns");
    this.elementBodyRows.classList.add("calendar__body_week_rows");
    this.options = { ...defaultBodyWeekOptions, ...options };
    this.render();
  }

  getElement() {
    return this.elementBody;
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
    this.elementBody.innerHTML = "";
    this.elementBody.append(this.elementBodyColumns);
    this.elementBody.append(this.elementBodyRows);
    this.renderColumns();
    this.renderRows();
  }

  renderRows() {
    const { intervalMinutes, startTime, endTime } = this.options;
    const listHours = listHoursByInterval(intervalMinutes, startTime, endTime);
    listHours.forEach((hour) => {
      const row = new RowBody(this.elementBodyRows, hour);
      row.render();
      this.rows.push(row);
    })
  }

  renderColumns() {
    this.elementBodyColumns.innerHTML = "";
    this.elementBodyColumns.append(document.createElement("div"));
    let numColumns = 0;
    const startDate = this.buildStartDate();
    const auxDate = new Date(startDate);
    for (let i = 0; i < 7; i++) {
      if (this.options.omitDays.includes(auxDate.getDay())) {
        auxDate.addDays(1);
        continue;
      }
      numColumns++;
      const column = new ColumnBody(this.elementBodyColumns, auxDate);
      column.render();
      this.columns.push(column);
      auxDate.addDays(1);
    }
    this.elementBodyColumns.style.gridTemplateColumns = `var(--width-label-hours) repeat(${numColumns}, calc(calc(100% - var(--width-label-hours)) / ${numColumns}))`;
  }
}
