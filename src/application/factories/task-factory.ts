import { IWeekViewOptions } from "../../domain/calendar/contracts/ICalendar";
import { CalendarFz } from "../../domain/calendar/entities/CalendarFz";
import { CalendarTask } from "../../domain/calendar/entities/Task/CalendarTask";
import {
  calculeTopAndHeight,
  getPixelsForMinutes,
  TypesView,
} from "../../domain/tools/tools";
import { DependencyContainer, ScopeCalendar, ScopeTokens } from "../../infraestructure/dependency-container";
import { CalendarWeekBody } from "../week/calendar-week-body";

export class TaskFactory {
  //options!: Partial<IWeekViewOptions | IDayViewOptions>

  taskList: Map<string, CalendarTask> = new Map();

  static createTask(task: CalendarTask, scope: ScopeCalendar) {
    const calendar = scope.getValue<CalendarFz>(ScopeTokens.CALENDAR);
    this.generatePositionAndHeightTask(task, calendar);
    this.assignDayColumnTask(task, calendar);
  }

  private static assignDayColumnTask(task: CalendarTask, calendar: CalendarFz) {
    if (calendar.typeView == TypesView.weeks) {
      const body = calendar.view.getBody() as CalendarWeekBody;
      const columnDay = body.bodyColumns
        .getDays()
        .get(task.getDate().toLocaleDateString());
      if (!columnDay) {
        return;
      }
        columnDay.addTask(task);
    }
  }

  private static generatePositionAndHeightTask(
    task: CalendarTask,
    calendar: CalendarFz
  ) {
    const duration = task.getDuration();
    const { heightRow, startTime } = calendar.getOptions()!;
    const pixelsForMinutes = getPixelsForMinutes(heightRow!, 60);
    const date = task.getDate();
    const { height, top } = calculeTopAndHeight(
      date,
      startTime!,
      pixelsForMinutes,
      duration
    );
    Object.assign(task.getElement().style, { height, top });
  }
}
