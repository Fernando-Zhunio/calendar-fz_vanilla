import { CalendarElement } from "../values-object/CalendarElement";

export class CalendarBodyBackdrop extends CalendarElement {
    //private element = document.createElement("div");
    constructor(parent: HTMLElement) {
        super(parent);
        this.element.classList.add("calendar__body-backdrop");
        this.hide();
    }

    show() {
        this.element.style.display = "block";
    }

    hide() {
        this.element.style.display = "none";
    }
}