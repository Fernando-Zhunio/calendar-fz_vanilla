import { formatDateYYYYMMDD } from "../../tools/tools";
import { IColumn } from "../contracts/IColumn";

export class Column implements IColumn {
    private  elementColumn = document.createElement("div");
    private key!: string
    constructor(protected parent: HTMLElement, protected date: Date) {}

    getElement() {
        return this.elementColumn;
    }

    getKey() {
        return this.key;
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