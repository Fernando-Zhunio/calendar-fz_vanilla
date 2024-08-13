import { CommunicationService } from "../../../application/CommunicationService";
import { IViewOptions } from "../contracts/ICalendar";
import { CalendarElement } from "../values-object/CalendarElement";
import { CalendarTask } from "./Task/CalendarTask";

export class CalendarBodyColumn extends CalendarElement {
  taskList = new Map<any, CalendarTask>();
  date!: Date;
  constructor(protected calendarId: string, date: Date, parent: HTMLElement) {
    super(parent);
    this.init(date);
    this.getElement().setAttribute("data-date", this.date.toLocaleDateString());
  }

  init(date: Date) {
    this.date = new Date(date);
  }

  assignClassCss() {
    this.element.classList.add("calendar__body_week_columns__column");
  }

  addTask(task: CalendarTask) {
    this.element.append(task.getElement());
    this.taskList.set(task.getId(), task);
    task.addEventListener(this.addListenerTask.bind(this));
  }

  removeTask(id: any) {
    if (this.taskList.has(id)) {
      const taskElement = this.taskList.get(id)?.getElement();
      taskElement?.addEventListener("animationend", () => {
        taskElement.remove();
        this.taskList.delete(id);
        console.log("remove task");
      });
      taskElement?.classList.add("calendar-remove_task-transition");
    }
  }


  addListenerTask(eventInfo: { event: "delete" | "edit"; task: CalendarTask }) {
    console.log(eventInfo);
    const task = eventInfo.task;
    const { cbRemoveTask, cbEditTask } = this.getOptions();
    if (eventInfo.event === "edit") {
      const actions = task.getActions();
      actions.disabledButtons();
      actions.setIsLoadingEdit(true);

      cbEditTask(task).catch((error: any) => {
        console.error(error);
      }).finally(() => {
        actions.setIsLoadingEdit(false);
          actions.disabledButtons({
            disabledEdit: false,
            disabledRemove: false,
          });
      })

    } else if (eventInfo.event === "delete") {
      const actions = task.getActions();
      actions.disabledButtons();
      actions.setIsLoadingDelete(true);
      cbRemoveTask(task)
        .then(() => {
          this.removeTask(eventInfo.task.getId());
        })
        .catch((error: any) => {
          console.error(error);
        }).finally(() => {
          actions.setIsLoadingDelete(false);
          actions.disabledButtons({
            disabledEdit: false,
            disabledRemove: false,
          });   
        });
    }
  }

  

  next(sprintDays = 7) {
    this.date.addDays(sprintDays);
    this.getElement().setAttribute("data-date", this.date.toLocaleDateString());
    return this;
  }

  previous(sprintDays = 7) {
    this.next(-sprintDays);
    this.getElement().setAttribute("data-date", this.date.toLocaleDateString());
    return this;
  }

  getDate() {
    return this.date;
  }

  // calculePositionTask(
  //   startDate: Date,
  //   duration: number,
  // ): ITaskPosition {
  //   const { startTime: calendarStartTime, heightRow } = this.getOptions<IViewOptions>()!;
  //   const startTime = new Date(startDate).toTimeString().split(" ")[0];
  //   const PxM = this.convertPixelsForMinutes(heightRow);
  //   const diffMinutes = this.getMinutesDistance(calendarStartTime, startTime);

  //   return {
  //     top: diffMinutes * PxM + "px",
  //     height: duration * PxM + "px",
  //   };
  // }

  // getMinutesDistance(startTime: string, endTime: string) {
  //   const start = startTime.split(":").map(Number);
  //   const end = endTime.split(":").map(Number);
  //   return (end[0] - start[0]) * 60 + (end[1] - start[1]);
  // }

  // convertPixelsForMinutes(pixels: number) {
  //   const { intervalMinutes } = this.getOptions<IViewOptions>()!;
  //   return pixels / intervalMinutes;
  // }

  getOptions<T = IViewOptions>() {
    return CommunicationService.getOptions(this.calendarId) as T;
  }
}
