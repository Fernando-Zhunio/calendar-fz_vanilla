import { ICalendar } from "../domain/calendar/contracts/ICalendar";
import { CalendarTask } from "../domain/calendar/entities/Task/CalendarTask";

export interface IOptionsRender {
    tasks:CalendarTask
}
export class CalendarMonth implements ICalendar {
    addTask(): void {
        throw new Error("Method not implemented.");
    }
    listEvent: any;

    render(options: IOptionsRender): void {
        this.element.setAttribute("calendar-id", this.calendarId);
        CommunicationService.registerCalendar(this.calendarId, this);
        this.assignClassCss();
    }
}