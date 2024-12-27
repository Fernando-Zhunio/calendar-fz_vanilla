import { CalendarTask } from "../../domain/calendar/entities/Task/CalendarTask";
import { CalendarElement } from "../../domain/calendar/values-object/CalendarElement";
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

  addTask(calendarTask: CalendarTask) {
    this.getElement().append(calendarTask.getElement());
    this.taskList.push(calendarTask);
    const taskintercepts = this.taskList
      .filter((task) =>
        this.checkOverlap(
          task.getStartTime(),
          task.getEndTime(),
          calendarTask.getStartTime(),
          calendarTask.getEndTime()
        )
      )
      ?.sort((a, b) => a.getStartTime().localeCompare(b.getStartTime()));
    
    if (taskintercepts.length > 1) {
      taskintercepts.forEach((task, index) => {
          const element = task.getElement();
        if (index != 0) {
            if (task.getStartTime() > taskintercepts[index-1].getStartTime() ) {
                //taskintercepts[index-1].getElement().style.width = `${100 / taskintercepts.length}%`;
                element.style.width = `100%`;
            } else {
                taskintercepts[index-1].getElement().style.width = `${100 / taskintercepts.length}%`;
                taskintercepts[index-1].getElement().style.left = `${(100 / taskintercepts.length) * index}%`;
            }
        }
        element.style.zIndex = (index + 2).toString();
      });

    //   taskintercepts.reduce((prev, current) => {
    //     prev.getElement().style.borderRight = "none";
    // });
    }
    //console.log("add task")
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
    return startTime1 < endTime2 && startTime2 < endTime1;
  }
}
