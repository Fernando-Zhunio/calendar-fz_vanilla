import { CalendarFz } from "../../domain/calendar/entities/CalendarFz";
import { CalendarTask } from "../../domain/calendar/entities/Task/CalendarTask";
import {
  calculeTopAndHeight,
  getPixelsForMinutes,
  TypesView,
} from "../../domain/tools/tools";
import { ScopeCalendar, ScopeTokens } from "../../infraestructure/dependency-container";
import { CalendarWeekBody } from "../week/calendar-week-body";

export class TaskFactory {
  //options!: Partial<IWeekViewOptions | IDayViewOptions>

  taskList: Map<string, CalendarTask> = new Map();

  static createTask(task: CalendarTask, scope: ScopeCalendar) {
    const calendar = scope.getValue<CalendarFz>(ScopeTokens.CALENDAR);
    this.generatePositionAndHeightTask(task, calendar);
    this.assignDayColumnTask(task, calendar);
  }

  static createTasks(tasks: CalendarTask[], scope: ScopeCalendar) {
    const calendar = scope.getValue<CalendarFz>(ScopeTokens.CALENDAR);
    tasks.forEach((task) => {
      this.generatePositionAndHeightTask(task, calendar);
      //this.assignDayColumnTask(task, calendar);
    });
    this.assignDayColumnTasks(tasks, calendar);
  }

  private static assignDayColumnTask(task: CalendarTask, calendar: CalendarFz) {
    if (calendar.typeView == TypesView.weeks) {
      const body = calendar.view.getBody() as CalendarWeekBody;
      const key = task.getDate().toLocaleDateString();
      const days = body.bodyColumns.getDays();
      const columnDay = days
        .get(key);
      if (!columnDay) {
        console.log('La tarea no esta en el rango de fecha de la vista');
        return;
      }
        columnDay.addTask(task);
    }
  }

  private static assignDayColumnTasks(tasks: CalendarTask[], calendar: CalendarFz) {
    if (calendar.typeView == TypesView.weeks) {
      const body = calendar.view.getBody() as CalendarWeekBody;
      const days = body.bodyColumns.getDays();
      const tasksObjects: {[key: string]: CalendarTask[]} = {}; 
      tasks.forEach(task => {
        const key = task.getDate().toLocaleDateString();
        const columnDay = days
          .get(key);
        if (!columnDay) {
          console.warn(`CalendarFz: La tarea con fecha ${key} no esta en el rango de fecha de la vista`);
        } else {
          if (!tasksObjects[key]) {
            tasksObjects[key] = [];
          }
          tasksObjects[key].push(task) ;
        }
      });
      Object.keys(tasksObjects).forEach(key => {
        const columnDay = days.get(key)!;
        columnDay.addTask(tasksObjects[key]);
        // tasksObjects[key].forEach(task => {
        //   columnDay.addTask(task);
        // });
      });
        //columnDay.addTask(task);
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
      pixelsForMinutes,
    );
    Object.assign(task.getElement().style, { height, top });
  }
}
