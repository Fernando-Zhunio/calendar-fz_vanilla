import { CalendarElement } from "../../values-object/CalendarElement";

export class CalendarTaskDuration extends CalendarElement {
    constructor(protected duration: number, protected parent: HTMLElement) {
        super(parent);
        this.setDuration(duration)
    }

    setDuration(duration: number) {
        this.duration = duration
        this.element.textContent = this.duration.toString()
    }

    getDuration() {
        return this.duration
    }
}