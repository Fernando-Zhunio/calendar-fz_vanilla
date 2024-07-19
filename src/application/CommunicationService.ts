import { IDayViewOptions, IWeekViewOptions } from "../domain/calendar/contracts/ICalendar";
import { CalendarFz } from "../domain/calendar/entities/CalendarFz";

export class CommunicationService {
    // private static instance: CommunicationService;
    private constructor() {}

    private static store = new Map<string, CalendarFz>();
    static registerCalendar(calendarId: string, calender: CalendarFz) {
        this.store.set(calendarId, calender);
    }

    static getCalendarForId(calendarId: string) {
        return CommunicationService.store.get(calendarId);
    }



    getCalendar(calendarId: string) {
        return CommunicationService.store.get(calendarId);
    }

    getColumnByIndex(calendarId: string, index: number) {
        return this.getCalendar(calendarId)?.view.getBody().getColumns()[index];
    }

    static getOptions(calendarId: string): IWeekViewOptions | IDayViewOptions | undefined {
        if(!this.store.get(calendarId)) return;
        return this.store.get(calendarId)!.getOptions();
    }

    static getData(calendarId: string) {
        if(!this.store.get(calendarId)) return;
        return this.store.get(calendarId)!.getData();
    }
}