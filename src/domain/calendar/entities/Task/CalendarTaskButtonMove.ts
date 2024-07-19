export class CalendarTaskButtonMove {
  element: HTMLElement;
  constructor(parent: HTMLElement) {
    this.element = document.createElement("div");
    this.element.classList.add("calendar__task_button_move");
    parent.append(this.element);
    this.element.style.height = "10px";
    this.element.style.width = "100%";
    this.element.style.position = "absolute";
    this.element.style.top = "0px";
    this.element.style.left = "0px";
  }
}
