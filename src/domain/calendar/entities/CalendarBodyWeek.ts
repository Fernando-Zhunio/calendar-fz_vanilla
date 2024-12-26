// import { CommunicationService } from "../../../application/CommunicationService";
// import { listHoursByInterval } from "../../tools/tools";
import {  IWeekViewOptions } from "../contracts/ICalendar";
import { CalendarBodyRowsTools } from "../values-object/CalendarBodyRowsAndTaskTools";
import { CalendarBodyBackdrop } from "./CalendarBodyBackdrop";
import { CalendarBodyColumn } from "./CalendarBodyColumn";
import { CalendarBodyContainerColumnsWeek } from "./CalendarBodyContainerColumnsWeek";
import { CalendarTask } from "./Task/CalendarTask";
// import { TaskBody } from "./TaskBody";
// import { CalendarBodyColumn } from "./CalendarBodyColumn";

export class CalendarBodyWeek
  extends CalendarBodyRowsTools<IWeekViewOptions>
{
  element = document.createElement("div");
  containerColumns!: CalendarBodyContainerColumnsWeek;
  taskList: CalendarTask[] = [];
  calendarBackdrop!: CalendarBodyBackdrop;
  constructor(protected calendarId: string) {
    super(calendarId);
    this.init();
    this.assignClassCss();
    this.calendarBackdrop = new CalendarBodyBackdrop(this.element);
  }

  getBackdrop() {
    return this.calendarBackdrop;
  }

  init() {
    this.containerColumns = new CalendarBodyContainerColumnsWeek(this.calendarId, this.element);
    this.assignClassCss();
    this.element.append(this.elementRows);
    this.buildRows();
  }

  getColumns() {
    return this.containerColumns.columns;
  }

  private assignClassCss() {
    this.element.classList.add("calendar__body_week");
    this.elementRows.classList.add("calendar__body_week_rows");
  }

  getElement() {
    return this.element;
  }

  addTask(task: CalendarTask) {
    const columnBody = this.columnByRangeDateTask(task.getDate());
    if (columnBody) {
      columnBody.addTask(task);
      this.taskList.push(task);
    }
  }

  private columnByRangeDateTask(date: Date): CalendarBodyColumn | null {
    const columnBody = this.containerColumns.columns.find(
      (x) =>
        x.getDate().toLocaleDateString() ===
        date.toLocaleDateString()
    );

    return columnBody || null;
  }

  getHeightRow() {
    return this.rows[0].getElement().getBoundingClientRect().height
  }

  getContainerColumns() {
    return this.containerColumns
  }

  // addTask(
  //   day: number,
  //   dateTime: Date,
  //   duration: number,
  //   template: HTMLElement | string
  // ) {
  //   if (!this.validatorTask(dateTime)) {
  //     return;
  //   }
  //   const columnDay = this.getColumnByKey(day);
  //   const start = dateTime.toTimeString().split(" ")[0];
  //   const position = this.calculePositionTask(start, duration);
  //   const task = new TaskBody(position);
  //   columnDay.addTask(task);
  //   this.addEventListener("update-task", (e: any) => {
  //     const position = this.calculePositionTask(start, duration);
  //     console.log(position);
  //     task.setTaskPosition(position);
  //   });
  // }

  // validatorTask(dateTime: Date) {
  //   const { currentDate, startTime, endTime, sprintDays } = this.getOptions()!;
  //   const endDate = new Date(currentDate).addDays(sprintDays);
  //   if (dateTime < currentDate || dateTime > endDate) {
  //     return false;
  //   }
  //   const hour = dateTime.toTimeString().split(" ")[0];

  //   if (hour < startTime || hour > endTime) {
  //     return false;
  //   }

  //   return true;
  // }

  changeIntervalEffect() {
    this.dispatchEvent(new Event('update-task'));
  }

  getTaskForId(id: string) {
    return this.taskList.find((task) => task.getId() === id)!;
  }
}
