import { CalendarFz } from "../entities/CalendarFz";
// import { CalendarFz } from "../entities/CalendarFz";
import { CalendarTask } from "../entities/Task/CalendarTask";

export class CalendarTaskMovement {
  task!: CalendarTask | null;
  //calendar!: CalendarFz | null;
  isMovement: boolean = false;
  // lastY = 0;
  pxm = 0;
  // incrementByMinutes = 0;
   incrementMinutes: number = 5;
   incrementPixels: number = 0;
  //currentHeight: number = 0;
  currentElement!: HTMLElement;
  originalHeight: number = 0;
  originalY: number = 0;
  originalMouseY: number = 0;
  minimumSize: number = 20;
  currentHeight: number = 0;

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
    if (target.classList.contains("calendar__body_task_scaleY")) {
      this.isMovement = true;
      this.pxm = this.convertPixelsForMinutes();
      this.incrementPixels = this.pxm * this.incrementMinutes;
      this.task = this.getTaskByElement(target.parentElement!);
      this.currentElement = this.task?.getElement();
      this.originalHeight = this.currentElement.getBoundingClientRect().height!;
      this.originalMouseY = e.pageY;

      window.addEventListener("mousemove", this.cbMouseMove.bind(this));
      window.addEventListener("mouseup", this.cbMouseUp.bind(this));
    }
  }
  resize(e: any) {
    const offset = e.pageY - this.originalMouseY;
    if (offset%this.incrementPixels != 0) {
      return;
    }
    const height = this.originalHeight + (e.pageY - this.originalMouseY);
    if (height > this.minimumSize && height != this.currentHeight) {
      this.task?.setHeight(height + "px", this.calculationDurationForHeight(height));
      this.currentHeight = height;
    }
  }

  getTaskByElement(element: HTMLElement) {
    return this.calendar?.view
      .getBody()
      .getTaskForId(this.getAttributes(element!, "task-id"))!;
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
    return (pixels / intervalMinutes);
  }

  calculationDurationForHeight(height: number) {
    return (height / this.pxm);
  }

}
