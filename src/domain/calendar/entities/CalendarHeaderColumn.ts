import { getLabelDays } from "../../tools/tools";
import { IColumnHead } from "../contracts/IColumn";
import { CalendarColumn } from "./CalendarColumn";

export class CalendarHeaderColumn extends CalendarColumn implements IColumnHead {
    
    elementLabel = document.createElement("div");
    elementDay = document.createElement("div");

    constructor(protected date: Date, protected parent: HTMLElement) {
        super(parent);
        this.init();
    }
    
    init() {
        this.renderDay();
        this.buildLabel();
        // this.element.append(this.elementDay, this.elementLabel);
    }

    next(sprintDays = 7) {
        this.date.addDays(sprintDays);
        this.setTextLabel()
        this.setTextDay();
        return this;
    }

    previous(sprintDays = 7) {
        this.next(-sprintDays);
    }

    getDate() {
        return this.date;
    }

    renderDay() {
        this.elementDay.textContent = this.date.getDate().toString();
        this.elementDay.classList.add("calendar__day");
        this.getElement().append(this.elementDay);
    }

    buildLabel() {
        this.elementLabel.textContent = getLabelDays(this.date.getDay());
        this.elementLabel.classList.add("calendar__label");
        this.getElement().append(this.elementLabel);
    }

    setTextDay(text?: string) {
        this.elementDay.textContent = text ?? this.date.getDate().toString();
    }

    setTextLabel(text?: string) {
        this.elementLabel.textContent = text ?? getLabelDays(this.date.getDay());

    }


}