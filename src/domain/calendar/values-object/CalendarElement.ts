export class CalendarElement {
    element = document.createElement('div');
    getElement() {
        return this.element
    }

    constructor(parent: HTMLElement) {
        parent.append(this.element)
    }
}