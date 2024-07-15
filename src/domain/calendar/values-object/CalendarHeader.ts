import { CommunicationService } from "../../../application/CommunicationService";
import { IViewOptions } from "../contracts/ICalendar";
import { CalendarElement } from "./CalendarElement";

export class CalendarHeader extends CalendarElement {

    constructor(protected calendarId: any, protected parent: HTMLElement) {
        super(parent);
    }
    getOptions<T= IViewOptions>() {
        return CommunicationService.getInstance().getOptions(
            this.calendarId
          )! as T;
    }
}