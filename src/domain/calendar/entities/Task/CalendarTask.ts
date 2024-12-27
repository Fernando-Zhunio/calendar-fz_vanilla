import { Hour } from "../../../../application-contract/hour";
import { CommunicationService } from "../../../../application/CommunicationService";
import { generateUuid, sanitizeHTML } from "../../../tools/tools";
import { CalendarTaskActions } from "./CalendarTaskActions";
import { CalendarTaskDuration } from "./CalendarTaskDuration";

export interface ITaskPosition {
  top?: string;
  left?: string;
  height?: string;
  width?: string;
}

export interface IOptionsTask {
  templateOrTitle: string;
  isTemplate?: boolean;

}

export class CalendarTask {
  element = document.createElement("div");
  taskId!: string;

  elementScaleY = document.createElement("div");
  taskActions!: CalendarTaskActions

  position: ITaskPosition = {
    top: "0",
    left: "0",
    height: "0px",
    width: "100%",
  };

  pxm: number = 0;
  private calendarId: any;

  taskDuration!: CalendarTaskDuration;
  constructor(
    protected date: Date,
    protected startTime: Hour,
    protected endTime: Hour,
    protected options: IOptionsTask = { templateOrTitle: "", isTemplate: false },
  ) {
    this.assignClassCssAndAttributes();
    //this.taskActions = new CalendarTaskActions(this.element);
    //this.element.append(this.elementScaleY);
    //this.taskDuration = new CalendarTaskDuration(duration, this.element);
    if (options?.isTemplate) {
      this.element.innerHTML = sanitizeHTML(options.templateOrTitle);
    } else {
      this.element.innerHTML = this.generateTemplateDefault();
    }
  }

  generateTemplateDefault() {
    return `
      <div class="calendar__body_task_content">
        <div class="calendar__body_task_content_title">${this.options.templateOrTitle}</div>
        <div class="calendar__body_task_content_hour">${this.startTime} - ${this.endTime}</div>
      </div>
    `;
  }

  public update() {
    // this.updateId();
    // this.updatePixelPXM();
    // this.updatePosition();
    this.element.setAttribute("calendar-id", this.calendarId);
  }

  // private callbackEvent(event: {event: 'delete'| 'edit'}) {
  //   this.addEventListenerEditOrDelete(event);
  // }

  addEventListener( cb: (eventInfo: {event: 'delete'| 'edit', task: CalendarTask}) => void) {
    this.taskActions
    .addEventListener((eventInfo: {event: 'delete'| 'edit'}) => {
      cb({event: eventInfo.event, task: this});
    });
  }

  delete() {
    this.element.remove();
  }
  
  private assignClassCssAndAttributes() {
    this.element.classList.add("calendar__body_task");
    this.elementScaleY.classList.add("calendar__body_task_scaleY");
  }
  
  updateId(){
    this.taskId = generateUuid();
    this.element.setAttribute("task-id", this.taskId);
  }

  getDate() {
    return this.date;
  }

  getStartTime(): Hour {
    return this.startTime;
  }
  getEndTime(): Hour {
    return this.endTime;
  }

  getDuration() {
    return this.taskDuration.getDuration();
  }

  setDuration(duration: number) {
    this.taskDuration.setDuration(duration);
    return this;
  }


  getId() {
    return this.taskId;
  }

  getElement() {
    return this.element;
  }

  setPosition(position: ITaskPosition) {
    this.position = position;
    Object.assign(this.element.style, this.position);
  }

  setCalendarId(id: any) {
    this.calendarId = id;
  }

  getPosition() {
    return this.position;
  }

  render(parent: HTMLElement) {
    parent.append(this.element);
  }

  updatePixelPXM() {
    const { heightRow, intervalMinutes } = CommunicationService.getOptions(
      this.calendarId
    )!;
    this.pxm = heightRow / intervalMinutes;
  }

  setHeight(height: number) {
    this.position.height = height + "px";
    this.setDuration(height / this.pxm);
    this.element.style.height = height + "px";
  }

  // calculePosition() {
  //   const { startTime } = CommunicationService.getOptions(this.calendarId)!;
  //   const endTime = this.date.toTimeString().split(" ")[0];

  //   return {
  //     top: this.diffMinutes(startTime, endTime) * this.pxm  + "px",
  //     height: this.getDuration() * this.pxm + "px",
  //   }
  // }

  getActions() {
    return this.taskActions;
  }

  // updatePosition(){
  //   const position = this.calculePosition();
  //   Object.assign(this.element.style, position);
  // }

  // diffMinutes(startTime: string, endTime: string) {
  //   const start = startTime.split(":").map(Number);
  //   const end = endTime.split(":").map(Number);
  //   return (end[0] - start[0]) * 60 + (end[1] - start[1]);
  // }
}
