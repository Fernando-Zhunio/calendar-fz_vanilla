import { CommunicationService } from "../../../application/CommunicationService";
import { IViewOptions } from "../contracts/ICalendar";

export class CalendarHeader {

    constructor(protected calendarId: any) {}
    getOptions<T= IViewOptions>() {
        return CommunicationService.getInstance().getOptions(
            this.calendarId
          )! as T;
    }
}