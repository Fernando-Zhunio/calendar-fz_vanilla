import { CommunicationService } from "../../../application/CommunicationService";
import { IViewOptions } from "../contracts/ICalendar";
import { CalendarElement } from "../values-object/CalendarElement";
import { ITaskPosition, TaskBody } from "./TaskBody";

export class CalendarBodyColumn extends CalendarElement {
  taskList = new Map<any, TaskBody>();
  date!: Date;
  constructor(protected calendarId: symbol, date: Date, parent: HTMLElement) {
    super(parent);
    this.init(date);
    this.getElement().setAttribute("data-date", this.date.toLocaleDateString());
  }

  init(date: Date) {
    this.date = new Date(date);
  }

  assignClassCss() {
    this.element.classList.add("calendar__body_week_columns__column");
  }

  addTask(startDate: Date, duration: number, heightPixelsRow: number) {
      debugger
    const position = this.calculePositionTask(
      startDate,
      duration,
      heightPixelsRow
    );
    const task = new TaskBody(position);
    this.element.append(task.getElement());
    this.taskList.set(task.getId(), task);
  }

  removeTask(id: any) {
    if (this.taskList.has(id)) {
      this.taskList.get(id)?.getElement().remove();
      this.taskList.delete(id);
    }
  }

  next(sprintDays = 7) {
    this.date.addDays(sprintDays);
    this.getElement().setAttribute("data-date", this.date.toLocaleDateString());

    return this;
  }

  previous(sprintDays = 7) {
    this.next(-sprintDays);
    this.getElement().setAttribute("data-date", this.date.toLocaleDateString());
    return this;
  }

  getDate() {
    return this.date;
  }

  calculePositionTask(
    startDate: Date,
    duration: number,
    heightPixelsRow: number
  ): ITaskPosition {
    const { startTime: calendarStartTime } = this.getOptions<IViewOptions>()!;
    // const heightPixelsRow = this.rows[0]
    //   .getElement()!
    //   .getBoundingClientRect().height;
    const startTime = new Date(startDate).toTimeString().split(" ")[0];
    const PxM = this.convertPixelsForMinutes(heightPixelsRow);
    const diffMinutes = this.getMinutesDistance(calendarStartTime, startTime);

    return {
      top: diffMinutes * PxM + "px",
      height: duration * PxM + "px",
    };
  }

  getMinutesDistance(startTime: string, endTime: string) {
    const start = startTime.split(":").map(Number);
    const end = endTime.split(":").map(Number);
    return (end[0] - start[0]) * 60 + (end[1] - start[1]);
  }

  convertPixelsForMinutes(pixels: number) {
    const { intervalMinutes } = this.getOptions<IViewOptions>()!;
    return pixels / intervalMinutes;
  }

  getOptions<T>() {
    return CommunicationService.getInstance().getOptions(this.calendarId) as T;
  }
}
