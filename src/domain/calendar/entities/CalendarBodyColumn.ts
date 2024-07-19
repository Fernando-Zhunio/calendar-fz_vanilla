import { CommunicationService } from "../../../application/CommunicationService";
import { generateUuid } from "../../tools/tools";
import { IViewOptions } from "../contracts/ICalendar";
import { CalendarElement } from "../values-object/CalendarElement";
import { ITaskPosition, CalendarTask } from "./Task/CalendarTask";

export class CalendarBodyColumn extends CalendarElement {
  taskList = new Map<any, CalendarTask>();
  date!: Date;
  constructor(protected calendarId: string, date: Date, parent: HTMLElement) {
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

  addTask(task: CalendarTask, heightPixelsRow: number) {
    const position = this.calculePositionTask(
      task.getDate(),
      task.getDuration(),
      heightPixelsRow
    );

    task.setPosition(position);
    this.element.append(task.getElement());
    task.getElement().setAttribute("calendar-id", this.calendarId);
    task.setTaskId(generateUuid());
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
    return CommunicationService.getOptions(this.calendarId) as T;
  }
}
