import { CalendarElement } from "../values-object/CalendarElement";
// import { CalendarColumn } from "./CalendarColumn";
import { TaskBody } from "./TaskBody";

export class CalendarBodyColumn extends CalendarElement {

    taskList = new Map<any, TaskBody>();
    date!: Date
    constructor(date: Date, parent: HTMLElement) {
        super(parent);
        this.init(date);
    }

    init(date: Date) {
        //parent.append(this.element);
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

}