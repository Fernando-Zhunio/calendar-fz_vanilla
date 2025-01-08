import { CalendarFz } from "../../domain/calendar/entities/CalendarFz";
import { CalendarTask } from "../../domain/calendar/entities/Task/CalendarTask";
import {
  calculeTopAndHeight,
  getPixelsForMinutes,
  TypesView,
} from "../../domain/tools/tools";
import {
  ScopeCalendar,
  ScopeTokens,
} from "../../infraestructure/dependency-container";
import { CalendarTaskMovements } from "../shared/calendar-task-movements";
import { CalendarWeek } from "../week/calendar-week";
import { CalendarWeekBody } from "../week/calendar-week-body";

export class TaskFactory {
  //options!: Partial<IWeekViewOptions | IDayViewOptions>

  //taskList: Map<string, CalendarTask> = new Map();
  // private static currentTaskMovement!: CalendarTask

  private static movements: CalendarTaskMovements = new CalendarTaskMovements()

  static createTask(task: CalendarTask, scope: ScopeCalendar) {
    const calendar = scope.getValue<CalendarFz>(ScopeTokens.CALENDAR);
    this.generatePositionAndHeightTask(task, calendar);
    this.assignDayColumnTask(task, calendar);
  }

  static createTasks(tasks: CalendarTask[], scope: ScopeCalendar) {
    const calendar = scope.getValue<CalendarFz>(ScopeTokens.CALENDAR);
    tasks.forEach((task) => {
      this.generatePositionAndHeightTask(task, calendar);
      this.addMovement(task, scope);
      task.setScope(scope);
    });
    this.assignDayColumnTasks(tasks, calendar);
  }

  private static assignDayColumnTask(task: CalendarTask, calendar: CalendarFz) {
    if (calendar.getTypeView() == TypesView.weeks) {
      const body = calendar.view.getBody() as CalendarWeekBody;
      const key = task.getDate().toLocaleDateString();
      const days = body.bodyColumns.getDays();
      const columnDay = days.get(key);
      if (!columnDay) {
        console.log("La tarea no esta en el rango de fecha de la vista");
        return;
      }
      columnDay.addTask(task);
    }
  }

  private static assignDayColumnTasks(
    tasks: CalendarTask[],
    calendar: CalendarFz
  ) {
    if (calendar.getTypeView() == TypesView.weeks) {
      const body = calendar.view.getBody() as CalendarWeekBody;
      const days = body.bodyColumns.getDays();
      const tasksObjects: { [key: string]: CalendarTask[] } = {};
      tasks.forEach((task) => {
        const key = task.getDate().toLocaleDateString();
        const columnDay = days.get(key);
        if (!columnDay) {
          console.warn(
            `CalendarFz: La tarea con fecha ${key} no esta en el rango de fecha de la vista`
          );
        } else {
          if (!tasksObjects[key]) {
            tasksObjects[key] = [];
          }
          tasksObjects[key].push(task);
        }
      });
      Object.keys(tasksObjects).forEach((key) => {
        const columnDay = days.get(key)!;
        columnDay.addTask(tasksObjects[key]);
      });
    }
  }

  private static generatePositionAndHeightTask(
    task: CalendarTask,
    calendar: CalendarFz
  ) {
    const { heightRow, startTime, intervalMinutes } = calendar.getOptions()!;
    const pixelsForMinutes = getPixelsForMinutes(heightRow!, intervalMinutes!);
    const { height, top } = calculeTopAndHeight(
      startTime!,
      task.getStartTime(),
      task.getEndTime(),
      pixelsForMinutes
    );
    Object.assign(task.getElement().style, { height, top });
  }

  private static getCalendarByScope(scope: ScopeCalendar) {
    return scope.getValue<CalendarFz>(ScopeTokens.CALENDAR);
  }

  private static addMovement(calendarTask: CalendarTask, scope: ScopeCalendar) {
    switch (this.getCalendarByScope(scope).getTypeView()) {
      case TypesView.weeks: {
        this.movementForWeek(calendarTask, scope);
        break;
      }
      case TypesView.days:
        return 1;
      default:
        return (
          this.getCalendarByScope(scope).getView() as CalendarWeek
        ).body.bodyColumns.getDays().size;
    }
  }

  private static movementForWeek(task: CalendarTask, scope: ScopeCalendar) {
    const calendarWeek = this.getCalendarByScope(
      scope
    ).getView() as CalendarWeek;

    this.movements.addMovements(task)
    //this.addDragEvents(task.getElement(), calendarWeek);
  }

  // Función para agregar eventos de drag a cada elemento
  private static addDragEvents(child: HTMLElement, calendarWeek: CalendarWeek) {
    child.setAttribute("draggable", "true");
    let childClone!: HTMLElement;
    let columnWidth!: number;
    let numColumns!: number;
    const parent = calendarWeek.body.bodyColumns.getElement();
    // #region mouse event
    const positions = {
      clientX: 0,
      clientY: 0,
      startClientX: 0,
      startClientY: 0
    };

    child.onmousedown = (e) => {
      e = e || window.event;
      e.preventDefault();
      numColumns = calendarWeek.body.bodyColumns.getDays().size;
      columnWidth = calendarWeek.body.bodyColumns.getElement().offsetWidth / numColumns
      childClone = this.copyElement(child, columnWidth);
      parent.appendChild(childClone)

      child.style.opacity = '0'
      // get the mouse cursor position at startup:
      positions.startClientX = e.clientX;
      positions.startClientY = e.clientY;

      let rectParent = parent.getBoundingClientRect();
      let column = Math.floor((e.clientX - rectParent.x) / columnWidth)
      column = Math.min(Math.max(column, 0), numColumns - 1);

      let row = Math.floor((e.clientY - rectParent.y) / 5);
      row = Math.min(Math.max(row, 0), numColumns - 1);

      childClone.style.left = `${column * columnWidth}px`;
      document.onmouseup = (_e: any) => {
        child.style.opacity = '1'
        childClone.remove();
      };

      // call a function whenever the cursor moves:
      document.onmousemove = (e) => {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        positions.clientX = positions.startClientX - e.clientX;
        positions.clientY = positions.startClientY - e.clientY;
        positions.startClientX = e.clientX;
        positions.startClientY = e.clientY;
        let rectParent = parent.getBoundingClientRect();

        let column = Math.floor((e.clientX - rectParent.x) / columnWidth)
        
        column = Math.min(Math.max(column, 0), numColumns - 1);
        // set the element's new position:
        childClone.style.top = childClone.offsetTop - positions.clientY + "px";
        childClone.style.left = `${column * columnWidth}px`;
      };
    };
    //#endregion mouse event
  }

  private static copyElement(element:HTMLElement, width: number) {
    const newElement = element.cloneNode(true) as HTMLElement;
    newElement.classList.remove("calendar__task_animation")
    newElement.style.width = `${width}px`
    newElement.style.opacity = '0.5'
    newElement.onmousedown = null;
    return newElement;
  }

}
