export enum TypesCalendarEvent {
    CalendarRowClick = 'calendar_row_click'

}

export interface ICalendarEventRowClick {
    hour: string,
    elementRow: HTMLElement,
    event: MouseEvent,
    columnNumber: number
}