import { CommunicationService } from "../../../application/CommunicationService";
import { listHoursByInterval } from "../../tools/tools";
import { ICalendarBody, IWeekViewOptions } from "../contracts/ICalendar";
import { IColumn } from "../contracts/IColumn";
import { ColumnBody } from "./ColumnBody";
import { RowBody } from "./RowBody";
import { ITaskPosition, TaskBody } from "./TaskBody";

export class BodyWeek implements ICalendarBody {
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
      const column = new ColumnBody(this.elementBodyColumns, new Date(auxDate));
      column.render();
      this.columns.push(column);
      auxDate.addDays(1);
    }
    this.elementBodyColumns.style.gridTemplateColumns = `var(--width-label-hours) repeat(${numColumns}, calc(calc(100% - var(--width-label-hours)) / ${numColumns}))`;
  }

  changeInterval(intervalMinutes: number) {
    this.getOptions()!.intervalMinutes = intervalMinutes;
    this.rows = [];  
    this.renderRows();
  }

  updateTasks() {}

  addTask(day: number, start: string, duration: number, template: HTMLElement | string) {
    debugger
    const columnDay = this.columns.find((column) =>  column.getDay() === day)!;
    const position = this.calculePositionTask(start, duration);
    const task = new TaskBody(position);
    columnDay.addTask(task);
  }

  calculePositionTask(startTime: string, duration: number): ITaskPosition {
    const heightPixelsRow = this.rows[0].getElement()!.getBoundingClientRect().height;
    // const intervalMinutes = this.getOptions()!.intervalMinutes;
    const PxM = this.convertPixelsForMinutes(heightPixelsRow);
    const diffMinutes = this.getMinutesDistance(this.getStartTime(), startTime);

    return {
      top: (diffMinutes * PxM) + "px",
      height: (duration * PxM) + "px",
    };
  }

  getMinutesDistance(startTime: string, endTime: string) {
    const start = startTime.split(":").map(Number);
    const end = endTime.split(":").map(Number);
    return (end[0] - start[0]) * 60 + (end[1] - start[1]);
  }

  getStartTime() {
    return this.getOptions()!.startTime;
  }

  convertPixelsForMinutes(pixels: number) {
    const intervalMinutes = this.getOptions()!.intervalMinutes;
    return pixels / intervalMinutes;
  }
}
