import { CommunicationService } from "../../../application/CommunicationService";
// import { CalendarFz } from "../entities/CalendarFz";
import { CalendarTask } from "../entities/Task/CalendarTask";

export class CalendarTaskMovement {
  task!: CalendarTask | null;
  calendar!: CalendarFz | null;
  isMovement: boolean = false;
  lastY = 0;
  pxm = 0;

  constructor(protected calendar: CalendarFz) {
    this.listenersInit();
  }
  listenersInit() {
    document.addEventListener("mousedown", this.cbMouseDown.bind(this));
    document.addEventListener("mousemove", this.cbMouseMove.bind(this));
    document.addEventListener("mouseup", this.cbMouseUp.bind(this));
  }

  getAttributes(target: HTMLElement, attr: string) {
    return target.getAttribute(attr)!;
  }

  cbMouseDown(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (target.classList.contains("calendar__body_task")) {
        this.isMovement = true;
        console.log('isMovement', this.isMovement)
      this.pxm = this.convertPixelsForMinutes()
      this.calendar = CommunicationService.getCalendarForId(
        this.getAttributes(target, "calendar-id")
      )!;
      this.task = this.calendar?.view
        .getBody()
        .getTaskForId(this.getAttributes(target, "task-id"))!;
    }
  }

  cbMouseMove(e: MouseEvent) {
    if (this.isMovement) {
        const currentY = e.clientY; // Posición vertical actual del ratón

        if (this.lastY !== 0) { // Asegúrate de que no se ejecute en el primer movimiento
            const deltaY = currentY - this.lastY; // Diferencia en la posición vertical

            // Solo ajusta la altura si el ratón se mueve verticalmente hacia arriba o abajo
            if (Math.abs(deltaY) > 0) {
                // Calcula el nuevo tamaño en pasos de 15px
                // const stepSize = 5;
                const currentHeight = this.task?.getElement().getBoundingClientRect().height!//parseInt(window.getComputedStyle(resizableDiv).height);
                this.task?.setHeight(
                    `${Math.max(0, currentHeight + Math.floor(deltaY / this.pxm) * this.pxm)}`,
                    5
                )
                console.log({currentHeight})
            }
        }

        // Actualiza la última posición vertical del ratón
        this.lastY = currentY
    }
  }

  cbMouseUp() {
    if (this.isMovement) {
      this.isMovement = false;
      this.task = null;
      this.calendar = null;
    }
    console.log('isMovement', this.isMovement)
  }

  convertPixelsForMinutes() {
    const pixels = this.calendar?.getView().getBody().getHeightRow()!   
    const { intervalMinutes } = this.calendar?.getOptions()!;
    return (pixels / intervalMinutes) * 5;
  }

//   getOptions<T>(): T {
//     return this.calendar?.getOptions()! as T;
//   }
}
