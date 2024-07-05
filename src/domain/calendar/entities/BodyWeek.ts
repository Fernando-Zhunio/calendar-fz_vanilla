import { CommunicationService } from "../../../application/CommunicationService";
import { listHoursByInterval } from "../../tools/tools";
import { IWeekViewOptions } from "../contracts/ICalendar";
import { IColumn } from "../contracts/IColumn";
import { ColumnBody } from "./ColumnBody";
import { RowBody } from "./RowBody";

export class BodyWeek {
  elementBody = document.createElement("div");
  elementBodyColumns = document.createElement("div");
  elementBodyRows = document.createElement("div");
  //options!: IBodyWeekOptions;
  columns: IColumn[] = [];
  rows: RowBody[] = [];
  constructor(private id: symbol) {
    this.elementBody.classList.add("calendar__body_week");
    this.elementBodyColumns.classList.add("calendar__body_week_columns");
    this.elementBodyRows.classList.add("calendar__body_week_rows");
    //this.options = { ...defaultBodyWeekOptions, ...options };
    this.render();
  }

  getElement() {
    return this.elementBody;
  }

  getOptions() {
    return CommunicationService.getInstance().getOptions(this.id) as IWeekViewOptions;
  }

  buildStartDate() {
    const { currentDate } = this.getOptions()!;
    const dayNum = new Date(currentDate).getDay();
    if (dayNum === 0) {
      return currentDate;
    } else {
      return currentDate.addDays(-dayNum + 1);
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
    this.elementBodyRows.innerHTML = "";
    const { intervalMinutes, startTime, endTime } = this.getOptions()!;
    const listHours = listHoursByInterval(intervalMinutes, startTime, endTime);
    listHours.forEach((hour) => {
      const row = new RowBody(this.elementBodyRows, hour, this.id);
      row.render();
      this.rows.push(row);
    });
  }

  renderColumns() {
    const { omitDays } = this.getOptions()!;
    this.elementBodyColumns.innerHTML = "";
    this.elementBodyColumns.append(document.createElement("div"));
    let numColumns = 0;
    const startDate = this.buildStartDate();
    const auxDate = new Date(startDate);
    for (let i = 0; i < 7; i++) {
      if (omitDays!.includes(auxDate.getDay())) {
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

  changeInterval(intervalMinutes: number) {
    this.getOptions()!.intervalMinutes = intervalMinutes;   
    this.renderRows();
  }
}
