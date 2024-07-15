import { CalendarElement } from "../values-object/CalendarElement";
import { TaskBody } from "./TaskBody";

export class CalendarBodyColumn extends CalendarElement {

    taskList = new Map<any, TaskBody>();
    date!: Date
    constructor(date: Date, parent: HTMLElement) {
        super(parent);
        this.init(date);
        this.getElement().setAttribute("data-date", this.date.toLocaleDateString());
    }

    init(date: Date) {
        this.date = new Date(date);
    }

    assignClassCss() {
        this.element.classList.add("calendar__body_week_columns__column")
    }

    addTask(task: TaskBody) {
        this.element.append(task.getElement());
        this.taskList.set(task.getId(), task);
    }

    removeTask(id: any) {
        if (this.taskList.has(id)) {
            this.taskList.get(id)?.getElement().remove();
            this.taskList.delete(id);
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

}