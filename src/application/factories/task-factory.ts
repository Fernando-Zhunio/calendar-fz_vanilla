// import { Time } from "../../application-contract/hour";
import { CalendarFz } from "../../domain/calendar/entities/CalendarFz";
import { CalendarTask } from "../../domain/calendar/entities/Task/CalendarTask";
import {
  calculeTopAndHeight,
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
  private static listTask: any[] = []
  static add(task: CalendarTask) {
    // const calendar = scope.getValue<CalendarFz>(ScopeTokens.CALENDAR);
    // this.assignPositionByTime(task, calendar);
    // this.assignDayColumnTask(task, calendar);
    this.listTask.push(task)
    this.addMovement(task, task.getScope())
  }

  static createTasks(tasks: CalendarTask[], scope: ScopeCalendar) {
    const calendar = scope.getValue<CalendarFz>(ScopeTokens.CALENDAR);
    tasks.forEach((task) => {
      this.assignPositionByTime(task, calendar);
      this.addMovement(task, scope);
      task.setScope(scope);
    });
    this.assignDayColumnTasks(tasks, calendar);
  }

  // static changeTime(time: Time, task: CalendarTask, scope: ScopeCalendar) {
  //   this.generatePositionByTime(task, this.getCalendarByScope(scope));
  //   this.movements.addMovements(task)

  // }

  static assignDayColumnTask(task: CalendarTask, calendar: CalendarFz) {
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

  static assignPositionByTime(
    task: CalendarTask,
    calendar: CalendarFz
  ) {
    const { heightRow, startTime, intervalMinutes } = calendar.getOptions()!;
    //const pixelsForMinutes = getPixelsForMinutes(heightRow!, intervalMinutes!);
    const { height, top } = calculeTopAndHeight(
      startTime!,
      task.getStartTime(),
      task.getEndTime(),
      (heightRow! / intervalMinutes)
    );
    Object.assign(task.getElement().style, { height, top });
  }

  private static getCalendarByScope(scope: ScopeCalendar) {
    return scope.getValue<CalendarFz>(ScopeTokens.CALENDAR);
  }

  private static addMovement(calendarTask: CalendarTask, scope: ScopeCalendar) {
    switch (this.getCalendarByScope(scope).getTypeView()) {
      case TypesView.weeks: {
        this.movements.addMovements(calendarTask)
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

}
