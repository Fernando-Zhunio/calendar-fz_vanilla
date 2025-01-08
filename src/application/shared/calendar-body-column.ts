import { CalendarTask } from "../../domain/calendar/entities/Task/CalendarTask";
import { CalendarElement } from "../../domain/calendar/values-object/CalendarElement";
import {
  diffMinutes,
} from "../../domain/tools/tools";
import { CssWeekHeader } from "../../shared/Css";

export class CalendarBodyColumn extends CalendarElement {
  taskList: CalendarTask[] = [];
  constructor(private date: Date, protected isDisabled: boolean) {
    super();
    this.assignStylesCss();
    this.element.setAttribute("data-date", this.date.toLocaleDateString());
  }

  getDate() {
    return this.date;
  }

  setDate(date: Date) {
    this.date = date;
  }

  setEnabled() {
    this.isDisabled = false;
    this.getElement().classList.remove(CssWeekHeader.columnDisabled);
  }

  setDisabled() {
    this.isDisabled = true;
    this.getElement().classList.add(CssWeekHeader.columnDisabled);
  }

  assignStylesCss() {
    this.getElement().classList.add("calendar__body_column");
    if (this.isDisabled)
      this.getElement().classList.add("calendar__body_column--disabled");
  }

  getIntercepters(_task: CalendarTask) {
    return this.taskList
      .filter((task) =>
        this.checkOverlap(
          task.getStartTime(),
          task.getEndTime(),
          _task.getStartTime(),
          _task.getEndTime()
        )
      )
      ?.sort((a, b) => a.getStartTime().localeCompare(b.getStartTime()));
  }

  renderTasks(tasks: CalendarTask[]) {
    tasks.forEach((task) => {
      this.getElement().append(task.getElement());
    });
  }

  addTask(taskOrTasks: CalendarTask | CalendarTask[]) {
    const tasks = Array.isArray(taskOrTasks) ? taskOrTasks : [taskOrTasks];
    this.taskList = [...this.taskList, ...tasks].sort((a, b) =>
      a.getStartTime().localeCompare(b.getStartTime()));

    let zIndex = 2;
    console.log("this.taskList", this.taskList.map((x) => x.getStartTime()+'-'+x.getEndTime()).join("\n"));
    this.taskList.forEach((task) => {
      let taskIntercepts = this.getIntercepters(task);
      if (taskIntercepts.length <= 1) {
        return;
      }
      console.log(`TaskIntercepts: \n ${taskIntercepts.map(x => x.getStartTime()+' - '+x.getEndTime()).join('\n')}`);
      taskIntercepts.forEach((task, index) => {
        const element = task.getElement();
        const startTime = task.getStartTime();
        const interceptsAux = [...taskIntercepts];
        interceptsAux.splice(index, 1);
        const hasFullWidth = interceptsAux.every(
          (x) => Math.abs(diffMinutes(x.getStartTime(), startTime)) > 5
        );
        if (hasFullWidth) {
          element.style.width = `97%`;
          element.style.left = `2%`;
          taskIntercepts.splice(index, 1);
        }
        element.style.zIndex = zIndex.toString();
        zIndex++;
        //console.log("taskIntercepts", task.getStartTime(), '-', task.getEndTime());
      });
      taskIntercepts.forEach((task, index) => {
        const element = task.getElement();
        element.style.width = `${100 / taskIntercepts.length}%`;
        element.style.left = `${(100 / taskIntercepts.length) * index}%`;
      });
    });
    this.renderTasks(tasks);
  }

  parseTime(time: string): Date {
    const [hours, minutes] = time.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0); // Establecer solo horas y minutos
    return date;
  }

  checkOverlap(
    start1: string,
    end1: string,
    start2: string,
    end2: string
  ): boolean {
    const startTime1 = this.parseTime(start1);
    const endTime1 = this.parseTime(end1);
    const startTime2 = this.parseTime(start2);
    const endTime2 = this.parseTime(end2);
    // Verificamos si los intervalos se solapan
    return startTime1 < endTime2 && endTime1 > startTime2;
  }
}
