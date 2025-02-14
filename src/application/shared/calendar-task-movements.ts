import { Time } from "../../application-contract/hour";
import {
  IDayViewOptions,
  IViewOptions,
  IWeekViewOptions,
} from "../../domain/calendar/contracts/ICalendar";
import { type CalendarFz } from "../../domain/calendar/entities/CalendarFz";
import { CalendarTask } from "../../domain/calendar/entities/Task/CalendarTask";
import { addMinutes, calculeDistanceTime, convertMinutesToPixels, convertPixelsToTime } from "../../domain/tools/tools";
import {
  ScopeTokens,
} from "../../infraestructure/dependency-container";
import { TaskFactory } from "../factories/task-factory";
import { CalendarWeek } from "../week/calendar-week";
import { CalendarWeekBody } from "../week/calendar-week-body";

//const classSelector = 'calendar__body_task';

export class CalendarTaskMovements {
  parent!: HTMLElement;
  calendar!: CalendarFz;

  instance!: CalendarTaskMovements;
  options!: IWeekViewOptions | IDayViewOptions;

  currentTask!: CalendarTask;
  numColumns: number = 0;
  columnWidth: number = 0;
  hits: number = 0;
  childCloneElement!: HTMLElement;
  positions = {
    currentX: 0,
    currentY: 0,
    startX: 0,
    startY: 0,
  };
  rectParent!: DOMRect;
  childCloneColumn!: number;
  intervalMinutes!: number;
  distanceTime!:number;
  ditstanceStartTime!: number;
  //currentColumn!: number;
  newTime!: {startTime: Time, endTime: Time}

  constructor() {
    document.onmouseup = this.onMouseUp.bind(this);
    document.onmousemove = this.onMouseMove.bind(this);
  }

  getCalendar() {
    return this.currentTask
      .getScope()
      .getValue(ScopeTokens.CALENDAR) as CalendarFz;
  }

  getView<T>() {
    return this.getCalendar().view as T;
  }

  getElementTask() {
    return this.currentTask.getElement();
  }

  addMovements(task: CalendarTask) {
    console.log("movements", task);
    task.getElement().onmousedown = ((e: MouseEvent) => {
      this.onMouseDown(e, task);
    }).bind(this);
  }

  getOptions<T = IViewOptions>() {
    return this.getCalendar().getOptions() as T;
  }

  getPositionUpDown() {
    let rectClone = this.childCloneElement.getBoundingClientRect();
    let currentPosition = this.childCloneElement.offsetTop - this.positions.currentY;

    currentPosition = Math.floor(currentPosition / this.hits) * this.hits;
    return Math.min(
      Math.max(currentPosition, 0),
      this.rectParent.height - rectClone.height
    );
  }

  private copyElement(element: HTMLElement, width: number) {
    const newElement = element.cloneNode(true) as HTMLElement;
    newElement.classList.remove("calendar__task_animation");
    newElement.style.width = `${width}px`;
    newElement.style.opacity = "0.5";
    newElement.onmousedown = null;
    return newElement;
  }

  private onMouseDown(e: MouseEvent, task: CalendarTask) {
    e = e || window.event;
    e.preventDefault();
    this.currentTask = task;
    const element = this.getElementTask();
    const calendarWeek = this.getView<CalendarWeek>().body.bodyColumns;
    this.parent = calendarWeek.getElement();
    this.numColumns = calendarWeek.getDays().size;
    this.columnWidth = calendarWeek.getElement().offsetWidth / this.numColumns;
    this.childCloneElement = this.copyElement(element, this.columnWidth);

    //this.parent.appendChild(this.childClone);

    this.options = this.getOptions();
    this.intervalMinutes = this.options.intervalMinutes;
    this.distanceTime = calculeDistanceTime(task.getStartTime(), task.getEndTime())
    this.ditstanceStartTime = calculeDistanceTime('00:00', this.options.startTime)
    this.hits = convertMinutesToPixels(
      5,
      this.options.heightRow,
      this.options.intervalMinutes
    );
    element.style.opacity = "0";
    this.positions.startX = e.pageX;
    this.positions.startY = e.pageY;

    this.rectParent = this.parent.getBoundingClientRect();
    let column = Math.floor((e.clientX - this.rectParent.x) / this.columnWidth);
    column = Math.min(Math.max(column, 0), this.numColumns - 1);
    console.log('column', column, this.parent.childNodes[column])
    this.parent.childNodes[column].appendChild(this.childCloneElement);
    this.childCloneColumn = column;
    //this.childClone.style.left = `${column * this.columnWidth}px`;
  }

  private onMouseMove(e: MouseEvent) {
    e = e || window.event;
    e.preventDefault();
    if (!this.currentTask) return;

    //RESUME: si sale fuera del rectangulo del padre regresa
    if (e.pageY - this.rectParent.y < 0) return;

    //RESUME: calcula nueva posicion del cursor
    this.positions.currentX = this.positions.startX - e.pageX;
    this.positions.currentY = this.positions.startY - e.pageY;
    this.positions.startX = e.pageX;
    //this.positions.startY = e.pageY;

    //RESUME: calcula la posicion de la columna
    this.calculeColumn(e.clientX);

    //RESUME: calcula la posicion de la fila
    let currentPositionY = this.getPositionUpDown();

    if (Math.abs(this.positions.currentY) >= this.hits) {
      this.positions.startY = e.pageY;
      this.childCloneElement.style.top = currentPositionY + "px";
       this.newTime = this.calculeNewHours()
      if (this.childCloneElement.querySelector('.calendar__body_task_content_hour') ) {
        this.childCloneElement.querySelector('.calendar__body_task_content_hour')!.textContent = `${this.newTime.startTime} - ${this.newTime.endTime}`
      }
    }
  }

  calculeColumn(clientX: number) {
    let column = Math.floor((clientX - this.rectParent.x) / this.columnWidth);
    column = Math.min(Math.max(column, 0), this.numColumns - 1);
    if (this.childCloneColumn == column) return;
    //this.childClone.style.left = `${column * this.columnWidth}px`;
    this.childCloneColumn = column;
    this.parent.childNodes[column].appendChild(this.childCloneElement);
  }



  private onMouseUp(_e: MouseEvent) {
    if (!this.currentTask) return;

    if (this.isChange()) {
      this.getOptions().cbChangePositionTask(this.currentTask, this.currentTask).then((res) => {
        if (res) {
          const calendar = this.getCalendar();
          const body = calendar.view.getBody() as CalendarWeekBody;
          const calendarColumn = body.bodyColumns.getDayByIndex(this.childCloneColumn)!;
          this.currentTask.changeDate(calendarColumn.getDate());
          this.currentTask.changeTime(this.newTime.startTime, this.newTime.endTime);
          //TaskFactory.assignDayColumnTask(this.currentTask, this.getCalendar())
          this.confirmChangePosition();
          // this.calendar.view.getBody().addTask(this.currentTask, this.newTime.startTime, this.newTime.endTime, this.currentColumn)
        } else {
          this.cancelChangePosition()
        }
      }).catch(_err => {
        debugger;
        this.cancelChangePosition()
      })
    } else {
      debugger;
      this.cancelChangePosition()
    }
  }

  confirmChangePosition() {
   // this.removeTask()
    this.childCloneElement.remove();
    //(this.currentTask as any) = null;
  }

  removeTask(){
    this.getCalendar().view.getBody().removeTask(this.currentTask)
  }

  cancelChangePosition(){
    this.currentTask.getElement().style.opacity = "1";
    this.childCloneElement.remove();
    (this.currentTask as any) = null;
  }

  calculeNewHours(){
    let startTime = convertPixelsToTime(this.options.heightRow, this.childCloneElement.offsetTop, this.intervalMinutes)
    startTime = addMinutes(startTime, this.ditstanceStartTime)
    return {
      startTime,
      endTime: addMinutes(startTime, this.distanceTime)
    }
  }

  isChange(): boolean {
    const currentTaskColumn = this.getColumnByDate(this.currentTask.getDate());
     return (this.getElementTask().style.top != this.childCloneElement.style.top)
     || currentTaskColumn == this.childCloneColumn
  }

  getColumnByDate(date: Date, isReturnObject: boolean = false) {
    const columns =
    this.getCalendar()
    .getView()
    .getHeader()
    .getColumns();
    return isReturnObject ? 
    columns.find(x => x.getDate().toLocaleDateString() == date.toLocaleDateString())
    :columns.findIndex(x => x.getDate().toLocaleDateString() == date.toLocaleDateString())
  }
}

