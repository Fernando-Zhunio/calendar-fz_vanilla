import { Time } from "../../../../application-contract/hour";
import { CommunicationService } from "../../../../application/CommunicationService";
import { TaskFactory } from "../../../../application/factories/task-factory";
import { ScopeCalendar, ScopeTokens } from "../../../../infraestructure/dependency-container";
import { generateUuid, sanitizeHTML } from "../../../tools/tools";
import { CalendarTaskActions } from "./CalendarTaskActions";
import { CalendarTaskDuration } from "./CalendarTaskDuration";

export interface ITaskPosition {
  top?: string;
  left?: string;
  height?: string;
  width?: string;
}

export interface ITemplateTask {
  title: string;
  isTemplate?: boolean;
  body: string;
  template?: string;
}

export class CalendarTask {
  private readonly element = document.createElement("div");
  private taskId: Symbol = Symbol();

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
  private scope!: ScopeCalendar;
  constructor(
    protected date: Date,
    protected startTime: Time,
    protected endTime: Time,
    protected templateOptions: ITemplateTask = { title: "", body: "", template: undefined },
  ) {
    this.assignClassCssAndAttributes();
    //this.taskActions = new CalendarTaskActions(this.element);
    //this.element.append(this.elementScaleY);
    //this.taskDuration = new CalendarTaskDuration(duration, this.element);
    if (templateOptions?.template) {
      this.element.innerHTML = sanitizeHTML(templateOptions.template);
    } else {
      templateOptions.title = templateOptions.title || `${date.toDateString()}`;
      this.generateTemplateDefault();
    }
  }

  changeDate(date: Date) {
    this.date = date;
    TaskFactory.assignDayColumnTask(this, this.scope.getValue(ScopeTokens.CALENDAR)!);
  }

  changeTime(timeStart: Time, timeEnd: Time) {
    this.startTime = timeStart;
    this.endTime = timeEnd;
    TaskFactory.assignPositionByTime(this, this.scope.getValue(ScopeTokens.CALENDAR)!);
    this.template.footer.element.textContent = `${this.startTime} - ${this.endTime}`;
   // TaskFactory.changeTime(this, this.scope);
  }


  setScope(scope:ScopeCalendar){
    this.scope = scope;
    this.changeDate(this.getDate());
    this.changeTime(this.getStartTime(), this.getEndTime());
  }

  getScope() {
    return this.scope;
  }

  template = {
    header: {
      element: document.createElement("div"),
    },
    body: {
      element: document.createElement("div"),
    },
    footer: {
      element: document.createElement("div"),
    },
    element: document.createElement("div"),
    
  }

  bodyTemplate = document.createElement("div");
  titleTemplate = document.createElement("div");
  timeTemplate = document.createElement("div");

  generateTemplateDefault() {

    this.element.append(this.template.element);

    this.template.element.append(this.template.header.element);
    this.template.element.append(this.template.body.element);
    this.template.element.append(this.template.footer.element);
    this.template.header.element.textContent = this.templateOptions.title;
    this.template.body.element.textContent = this.templateOptions.body;
    this.template.footer.element.textContent = `${this.startTime} - ${this.endTime}`;

    // this.template.header.element.classList.add("calendar__task__header");
    // this.template.body.element.classList.add("calendar__task__body");
    // this.template.footer.element.classList.add("calendar__task__footer");

    // this.bodyTemplate.classList.add("calendar__body_task_content");
    // this.titleTemplate.classList.add("calendar__body_task_content_title");
    // this.timeTemplate.classList.add("calendar__body_task_content_hour");
    // this.titleTemplate.textContent = sanitizeHTML(this.options.templateOrTitle);
    // this.timeTemplate.textContent = `${this.startTime} - ${this.endTime}`;
    // this.bodyTemplate.append(this.titleTemplate);
    // this.bodyTemplate.append(this.timeTemplate);
    // return this.bodyTemplate;
    // return `
    //   <div class="calendar__body_task_content">
    //     <div class="calendar__body_task_content_title">${sanitizeHTML(this.options.templateOrTitle)}</div>
    //     <div class="calendar__body_task_content_hour">${this.startTime} - ${this.endTime}</div>
    //   </div>
    // `;
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
    this.element.classList.add("calendar__task_animation");
    this.elementScaleY.classList.add("calendar__body_task_scaleY");

    this.template.header.element.classList.add("calendar__task__header");
    this.template.body.element.classList.add("calendar__task__body");
    this.template.footer.element.classList.add("calendar__task__footer");
    this.template.element.classList.add("calendar__task");
  }


  getDate() {
    return this.date;
  }

  getStartTime(): Time {
    return this.startTime;
  }
  getEndTime(): Time {
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
