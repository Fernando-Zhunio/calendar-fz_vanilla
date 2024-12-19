import { CalendarElement } from "../../domain/calendar/values-object/CalendarElement";
import { CssWeekHeader } from "../../shared/Css";

export class CalendarHeaderColumn extends CalendarElement {
    elementLabel = document.createElement("div");
    elementDay = document.createElement("div");

    constructor(private label: string, private date: Date, protected isDisabled: boolean) {
        super();
        this.elementDay.innerHTML = date.getDate().toString();
        this.elementLabel.innerHTML = label;
        this.assignStylesCss();

        const element = this.getElement();
        element.append(this.elementDay)
        element.append(this.elementLabel)
    }

    setLabel(label: string) {
        this.label = label;
        this.elementLabel.innerHTML = this.label;
    }

    getDate() {
        return this.date;
    }

    getLabel() {
        return this.label;
    }

    setDate(date: Date) {
        this.date = date;
        this.elementDay.innerHTML = date.getDate().toString();
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
        this.elementLabel.classList.add(CssWeekHeader.columnLabel);
        this.elementDay.classList.add(CssWeekHeader.columnDay);
        this.getElement().classList.add(CssWeekHeader.column);
        if (this.isDisabled)
            this.getElement().classList.add(CssWeekHeader.columnDisabled);
    }
    
}