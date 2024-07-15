// import { CommunicationService } from "../../../application/CommunicationService";
// import { listHoursByInterval } from "../../tools/tools";
import { ICalendarBody, IWeekViewOptions } from "../contracts/ICalendar";
import { CalendarBodyRowsAndTaskTools } from "../values-object/CalendarViewBody";
import { CalendarBodyContainerColumnsWeek } from "./CalendarBodyColumnsWeek";
// import { CalendarBodyColumn } from "./CalendarBodyColumn";

export class CalendarBodyWeek
  extends CalendarBodyRowsAndTaskTools<IWeekViewOptions>
  implements ICalendarBody
{
  element = document.createElement("div");
  containerColumns!: CalendarBodyContainerColumnsWeek
  //columns: CalendarBodyColumn[] = [];
  constructor(protected calendarId: symbol) {
    super(calendarId);
    this.init();
    this.assignClassCss();
  }

  init() {
    this.containerColumns = new CalendarBodyContainerColumnsWeek(this.element);
    this.assignClassCss();
    this.element.append(this.elementRows);
    this.buildRows();
  }

  private assignClassCss() {
    this.element.classList.add("calendar__body_week");
    this.elementRows.classList.add("calendar__body_week_rows");
  }

  getElement() {
    return this.element;
  }

  // addColumn(date: Date) {

  //   const column = new CalendarBodyColumn(date, this.containerColumns.getElement());
  //   //this.columns.push(column);
  //   return column;
  // }

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

  validatorTask(dateTime: Date) {
    const { currentDate, startTime, endTime, sprintDays } = this.getOptions()!;
    const endDate = new Date(currentDate).addDays(sprintDays);
    if (dateTime < currentDate || dateTime > endDate) {
      return false;
    }
    const hour = dateTime.toTimeString().split(" ")[0];

    if (hour < startTime || hour > endTime) {
      return false;
    }

    return true;
  }

  // getColumnByKey(day: number) {
  //   return this.columns.find((column) => column.getKey() === day)!;
  // }

  changeIntervalEffect() {
    this.dispatchEvent(new Event('update-task'));
  }
}
