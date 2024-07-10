import { formatDateYYYYMMDD } from "../../tools/tools";
import { IColumn } from "../contracts/IColumn";
import { type TaskBody } from "./TaskBody";

export abstract class Column implements IColumn {
    private  elementColumn = document.createElement("div");
    private key!: string
    constructor(protected parent: HTMLElement, protected date: Date) {}

    getElement() {
        return this.elementColumn;
    }

    abstract addTask(task: TaskBody): void

    getKey() {
        return this.key;
    }

    getDay(): number {
        return this.date.getDay();
    }

    

     render() {
        this.elementColumn.classList.add("calendar__column");
        this.key = formatDateYYYYMMDD(this.date);;
        this.elementColumn.setAttribute("data-day", this.getKey());
        this.parent.append(this.elementColumn);
    }

    addChild(child: HTMLElement) {
        this.elementColumn.append(child);
    }
}