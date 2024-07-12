import { CommunicationService } from "../../../application/CommunicationService";
import { listHoursByInterval } from "../../tools/tools";
import { IViewOptions } from "../contracts/ICalendar";
import { CalendarBodyRow } from "../entities/CalendarBodyRow";
import { CalendarElement } from "./CalendarElement";

export class CalendarRows extends CalendarElement {
    protected rows: CalendarBodyRow[] = [];
    //elementRows = document.createElement("div");
    constructor(protected calendarId: any, protected parent: HTMLElement){
        super(parent);
    }
    protected buildRows() {
        this.element.innerHTML = "";
        this.rows = [];
        const { intervalMinutes, startTime, endTime } =
          this.getOptions<IViewOptions>()!;
        const listHours = listHoursByInterval(intervalMinutes, startTime, endTime);
        listHours.forEach((hour) => {
          const row = new CalendarBodyRow(this.element, hour, this.calendarId);
          this.rows.push(row);
        });
      }

    getOptions<T = IViewOptions>() {
        return CommunicationService.getInstance().getOptions(
          this.calendarId
        ) as T;

    }
}