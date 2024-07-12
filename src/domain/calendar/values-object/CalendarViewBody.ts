import { CommunicationService } from "../../../application/CommunicationService";
import { listHoursByInterval } from "../../tools/tools";
import { IViewOptions, IWeekViewOptions } from "../contracts/ICalendar";
// import { IView } from "../entities/iview";
import { CalendarBodyRow } from "../entities/CalendarBodyRow";
import { ITaskPosition } from "../entities/TaskBody";

export abstract class CalendarViewBody<O = IViewOptions> extends EventTarget {
  elementRows = document.createElement("div");
  rows: CalendarBodyRow[] = [];
  constructor(protected calendarId: any /* public body: ICalendarBody */) {
    super();
  }
  protected abstract changeIntervalEffect(): void;
  getOptions<T = O>() {
    return CommunicationService.getInstance().getOptions(this.calendarId) as T;
  }

  getRows() {
    return this.rows;
  }

//   protected buildRows() {
//     this.elementRows.innerHTML = "";
//     this.rows = [];
//     const { intervalMinutes, startTime, endTime } =
//       this.getOptions<IViewOptions>()!;
//     const listHours = listHoursByInterval(intervalMinutes, startTime, endTime);
//     listHours.forEach((hour) => {
//       const row = new RowBody(this.elementRows, hour, this.calendarId);
//       this.rows.push(row);
//     });
//   }

  changeInterval(intervalMinutes: number) {
    this.getOptions<IViewOptions>()!.intervalMinutes = intervalMinutes;
    //this.buildRows();
    this.changeIntervalEffect();
  }

  calculePositionTask(startTime: string, duration: number): ITaskPosition {
    const { startTime: calendarStartTime } = this.getOptions<IViewOptions>()!;
    const heightPixelsRow = this.rows[0]
      .getElement()!
      .getBoundingClientRect().height;
    const PxM = this.convertPixelsForMinutes(heightPixelsRow);
    const diffMinutes = this.getMinutesDistance(calendarStartTime, startTime);

    return {
      top: diffMinutes * PxM + "px",
      height: duration * PxM + "px",
    };
  }

  getMinutesDistance(startTime: string, endTime: string) {
    const start = startTime.split(":").map(Number);
    const end = endTime.split(":").map(Number);
    return (end[0] - start[0]) * 60 + (end[1] - start[1]);
  }

  convertPixelsForMinutes(pixels: number) {
    const { intervalMinutes } = this.getOptions<IViewOptions>()!;
    return pixels / intervalMinutes;
  }

}
