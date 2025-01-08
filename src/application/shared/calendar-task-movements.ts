import { IDayViewOptions, IWeekViewOptions } from "../../domain/calendar/contracts/ICalendar";
import { type CalendarFz } from "../../domain/calendar/entities/CalendarFz";
import { CalendarTask } from "../../domain/calendar/entities/Task/CalendarTask";
import { convertMinutesToPixels, TypesView } from "../../domain/tools/tools";
import { ScopeCalendar, ScopeTokens } from "../../infraestructure/dependency-container";
import { CalendarWeek } from "../week/calendar-week";

const classSelector = 'calendar__body_task';

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
      clientX: 0,
      clientY: 0,
      startClientX: 0,
      startClientY: 0
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
      this.hits = convertMinutesToPixels(5,this.options.heightRow, this.options.intervalMinutes)

      element.style.opacity = '0'
      // get the mouse cursor position at startup:
      this.positions.startClientX = e.clientX;
      this.positions.startClientY = e.clientY;

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
      this.positions.clientX = this.positions.startClientX - e.clientX;
      this.positions.clientY = this.positions.startClientY - e.clientY;
      this.positions.startClientX = e.clientX;
      this.positions.startClientY = e.clientY;
      let rectParent = this.parent.getBoundingClientRect();

      let column = Math.floor((e.clientX - rectParent.x) / this.columnWidth)
      
      column = Math.min(Math.max(column, 0), this.numColumns - 1);

      // let row = Math.floor((e.clientY - rectParent.y) / this.hits);
      // let row = Math.min(this.childClone.offsetTop - this.positions.clientY,  rectParent.y + rectParent.height);
      // set the element's new position:
      this.childClone.style.top = this.childClone.offsetTop - this.positions.clientY + "px";
      // this.childClone.style.top = row + "px";
      this.childClone.style.left = `${column * this.columnWidth}px`;
  }

  private onMouseUp(e: MouseEvent) {
      this.currentTask.getElement().style.opacity = '1'
      this.childClone.remove();
      (this.currentTask as any) = null;
    
  }
}

