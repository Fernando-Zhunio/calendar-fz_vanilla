import { IDayViewOptions, IWeekViewOptions } from "../../domain/calendar/contracts/ICalendar";
import { type CalendarFz } from "../../domain/calendar/entities/CalendarFz";
import { CalendarTask } from "../../domain/calendar/entities/Task/CalendarTask";
import { convertMinutesToPixels, TypesView } from "../../domain/tools/tools";
import { ScopeCalendar, ScopeTokens } from "../../infraestructure/dependency-container";
import { CalendarWeek } from "../week/calendar-week";

//const classSelector = 'calendar__body_task';

export class CalendarTaskMovements {
    parent!: HTMLElement;
    calendar!: CalendarFz;

    instance!: CalendarTaskMovements;
    options!: IWeekViewOptions | IDayViewOptions

    currentTask!: CalendarTask
    numColumns: number = 0;
    columnWidth: number = 0;
    hits: number = 0;
    childClone!: HTMLElement
    positions = {
      currentX: 0,
      currentY: 0,
      startX: 0,
      startY: 0
    };

    constructor() {
      document.onmouseup = this.onMouseUp.bind(this);
      document.onmousemove = this.onMouseMove.bind(this)
    }

    getCalendar(){
      return this.currentTask.getScope().getValue(ScopeTokens.CALENDAR) as CalendarFz
    }

    getView<T>() {
      return this.getCalendar().view as T
    }

    getElementTask() {
      return this.currentTask.getElement();
    }

    addMovements(task: CalendarTask){
      console.log('movements', task)
      task.getElement().onmousedown = ((e:MouseEvent) => {this.onMouseDown(e, task)}).bind(this)
    }

    getOptions(){
      return this.getCalendar().getOptions();
    }

    private copyElement(element:HTMLElement, width: number) {
      const newElement = element.cloneNode(true) as HTMLElement;
      newElement.classList.remove("calendar__task_animation")
      newElement.style.width = `${width}px`
      newElement.style.opacity = '0.5'
      newElement.onmousedown = null;
      return newElement;
    }

    private onMouseDown(e: MouseEvent, task: CalendarTask) {
      e = e || window.event;
      e.preventDefault();
      this.currentTask = task;
      console.log({task})
      const element = this.getElementTask();
      const calendarWeek = this.getView<CalendarWeek>().body.bodyColumns;
      this.parent = calendarWeek.getElement();
      this.numColumns = calendarWeek.getDays().size;
      this.columnWidth = calendarWeek.getElement().offsetWidth / this.numColumns
      this.childClone = this.copyElement(element, this.columnWidth);
      this.parent.appendChild(this.childClone);
      this.options = this.getOptions();
      // this.hits = convertMinutesToPixels(5,this.options.heightRow, this.options.intervalMinutes)

      element.style.opacity = '0'
      // get the mouse cursor position at startup:
      this.positions.startX = e.clientX;
      this.positions.startY = e.clientY;

      let rectParent = this.parent.getBoundingClientRect();
      let column = Math.floor((e.clientX - rectParent.x) / this.columnWidth)
      column = Math.min(Math.max(column, 0), this.numColumns - 1);

      this.childClone.style.left = `${column * this.columnWidth}px`;
    }


    private onMouseMove(e: MouseEvent) {
      e = e || window.event;
      e.preventDefault();
      if (!this.currentTask) return
      // calculate the new cursor position:
      this.positions.currentX = this.positions.startX - e.clientX;
      this.positions.currentY = this.positions.startY - e.clientY;
      this.positions.startX = e.clientX;
      this.positions.startY = e.clientY;
      let rectParent = this.parent.getBoundingClientRect();
      let rectClone = this.childClone.getBoundingClientRect();

      let column = Math.floor((e.clientX - rectParent.x) / this.columnWidth)

      column = Math.min(Math.max(column, 0), this.numColumns - 1);
      // console.log('Hola',this.childClone.offsetTop - this.positions.clientY)
      // let row = Math.max(this.childClone.offsetTop - this.positions.clientY,  0);
      // //row = Math.min(this.childClone.offsetTop - this.positions.clientY,  0);
      // // this.childClone.style.top = this.childClone.offsetTop - this.positions.clientY + "px";
      // this.childClone.style.top = row + "px";
      this.childClone.style.left = `${column * this.columnWidth}px`;

      console.log(rectClone.y - rectParent.y)
      // test row 
      const currentPosition = this.childClone.offsetTop - this.positions.currentY
      let row = Math.max(currentPosition,  0);
      //row = Math.min(this.childClone.offsetTop - this.positions.clientY,  0);
      // this.childClone.style.top = this.childClone.offsetTop - this.positions.clientY + "px";
      this.childClone.style.top = row + "px";
  }

  private onMouseUp(_e: MouseEvent) {
      if(this.currentTask){
        this.currentTask.getElement().style.opacity = '1'
        this.childClone.remove();
        (this.currentTask as any) = null;
      }
  }
}

