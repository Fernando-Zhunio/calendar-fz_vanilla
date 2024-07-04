import { getLabelDays } from "../../tools/tools";
import { Column } from "./Column";

export class ColumnHead extends Column {
    elementLabel = document.createElement("div");
    elementDay = document.createElement("div");

    constructor(public parent: HTMLElement, protected date: Date) {
        super(parent, date);
    }
    
    setDate() {
        this.date = new Date(this.date);
        return this;
    }
    render() {
        super.render();
        this.renderDay();
        this.renderLabel();
    }

    renderDay() {
        this.elementDay.textContent = this.date.getDate().toString();
        this.elementDay.classList.add("calendar__day");
        this.getElement().append(this.elementDay);
    }

    renderLabel() {
        this.elementLabel.textContent = getLabelDays(this.date.getDay());
        this.elementLabel.classList.add("calendar__label");
        this.getElement().append(this.elementLabel);
    }

    setTextDay(text: string) {
        this.elementDay.textContent = text;
    }

    setTextLabel(text: string) {
        this.elementLabel.textContent = text;
    }


}