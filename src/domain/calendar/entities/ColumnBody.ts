// import { TypesCalendarEvent } from "../../tools/tools";
import { Column } from "./Column";
import { TaskBody } from "./TaskBody";

export class ColumnBody extends Column {


    taskList = new Map<any, TaskBody>();
    constructor(public parent: HTMLElement, protected date: Date) {
        super(parent, date);
        this.getElement().classList.add("calendar__body_week_columns__column");
    }
    
    setDate() {
        this.date = new Date(this.date);
        return this;
    }
    render() {
        super.render();
    }

    addTask(task: TaskBody) {
        this.getElement().append(task.getElement());
        this.taskList.set(task.getId(), task);
    }

    removeTask(id: any) {
        if (this.taskList.has(id)) {
            this.taskList.get(id)?.getElement().remove();
            this.taskList.delete(id);
        }
    }

}