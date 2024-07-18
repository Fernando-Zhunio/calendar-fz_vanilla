import { IDayViewOptions, IWeekViewOptions } from "../domain/calendar/contracts/ICalendar";
import { CalendarFz } from "../domain/calendar/entities/CalendarFz";

export class CommunicationService {
    // private static instance: CommunicationService;
    private constructor() {}

    private static store = new Map<Symbol, CalendarFz>();
    static registerCalendar(key: Symbol, calender: CalendarFz) {
        this.store.set(key, calender);
    }

    static getCalendarForId(key: Symbol) {
        return CommunicationService.store.get(key);
    }



    getCalendar(key: Symbol) {
        return CommunicationService.store.get(key);
    }

    getColumnByIndex(calendarId: Symbol, index: number) {
        return this.getCalendar(calendarId)?.view.getBody().getColumns()[index];
    }

    // addTask(key: Symbol, column: number, dateTime: Date, duration: number, template: HTMLElement | string) {
    //     this.getCalendar(key)?.view.getBody().addTask(column, dateTime, duration, template);
    // }

    static getOptions(key: Symbol): IWeekViewOptions | IDayViewOptions | undefined {
        if(!this.store.get(key)) return;
        return this.store.get(key)!.getOptions();
    }

    static getData(key: Symbol) {
        if(!this.store.get(key)) return;
        return this.store.get(key)!.getData();
    }

    // public static getInstance(): CommunicationService {
    //     if (!CommunicationService.instance) {
    //         CommunicationService.instance = new CommunicationService();
    //     }
    //     return CommunicationService.instance;
    // }
}