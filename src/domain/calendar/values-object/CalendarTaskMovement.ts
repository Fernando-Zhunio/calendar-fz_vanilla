import { CalendarFz } from "../entities/CalendarFz";
// import { CalendarFz } from "../entities/CalendarFz";
import { CalendarTask } from "../entities/Task/CalendarTask";

export class CalendarTaskMovement {
  task!: CalendarTask | null;
  //calendar!: CalendarFz | null;
  isMovement: boolean = false;
  // lastY = 0;
  pxm = 0;
  incrementHeightInterval: number = 5;
  //currentHeight: number = 0;
  currentElement!: HTMLElement;
  originalHeight: number = 0;
  originalY: number = 0;
  originalMouseY: number = 0;
  minimumSize: number = 20;

  constructor(protected calendar: CalendarFz) {
    this.listenersInit();
  }
  listenersInit() {
    document.addEventListener("mousedown", this.cbMouseDown.bind(this));
    // document.addEventListener("mouseup", this.cbMouseUp.bind(this));
  }

  getAttributes(target: HTMLElement, attr: string) {
    return target.getAttribute(attr)!;
  }

  cbMouseDown(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (target.classList.contains("calendar__body_task")) {
      this.isMovement = true;
      this.pxm = this.convertPixelsForMinutes();
      this.task = this.calendar?.view
        .getBody()
        .getTaskForId(this.getAttributes(target, "task-id"))!;
      this.currentElement = this.task?.getElement();
      this.originalHeight = this.currentElement.getBoundingClientRect().height!;
      this.originalMouseY = e.pageY;

      window.addEventListener("mousemove", this.cbMouseMove.bind(this));
      window.addEventListener("mouseup", this.cbMouseUp.bind(this));
    }
  }
  resize(e: any) {
    const offset = e.pageY - this.originalMouseY;
    if (offset%this.pxm != 0) {
      return;
    }
    const height = this.originalHeight + (e.pageY - this.originalMouseY);
    if (height > this.minimumSize) {
      this.task?.setHeight(height + "px", offset > 0 ? this.incrementHeightInterval : -this.incrementHeightInterval);
    }
  }



  cbMouseMove(e: MouseEvent) {
    if (this.isMovement) {
      this.resize(e);
    }
  }

  cbMouseUp() {
    if (this.isMovement) {
      this.isMovement = false;
      this.task = null;
      window.removeEventListener("mousemove", this.cbMouseMove.bind(this));
      window.removeEventListener("mouseup", this.cbMouseUp.bind(this));
    }
  }

  convertPixelsForMinutes() {
    const pixels = this.calendar?.getView().getBody().getHeightRow()!;
    const { intervalMinutes } = this.calendar?.getOptions()!;
    return (pixels / intervalMinutes) * 5;
  }

}
