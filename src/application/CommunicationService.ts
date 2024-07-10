import { IDayViewOptions, IWeekViewOptions } from "../domain/calendar/contracts/ICalendar";
import { CalendarFz } from "../domain/calendar/entities/CalendarFz";

export class CommunicationService {
    private static instance: CommunicationService;
    private constructor() {}

    private store = new Map<Symbol, CalendarFz>();
    registerCalendar(key: Symbol, calender: CalendarFz) {
        this.store.set(key, calender);
    }

    getCalendar(key: Symbol) {
        return this.store.get(key);
    }

    addTask(key: Symbol, column: number, startHour: string, duration: number, template: HTMLElement | string) {
        this.getCalendar(key)?.view.getBody().addTask(column, startHour, duration, template);
    }

    getOptions(key: Symbol): IWeekViewOptions | IDayViewOptions | undefined {
        if(!this.store.get(key)) return;
        return this.store.get(key)!.getOptions();
    }

    public static getInstance(): CommunicationService {
        if (!CommunicationService.instance) {
            CommunicationService.instance = new CommunicationService();
        }
        return CommunicationService.instance;
    }
}