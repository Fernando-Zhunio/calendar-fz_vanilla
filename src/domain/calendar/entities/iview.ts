import { ICalendarDataWeek } from "../contracts/ICalendar"
// import { CalendarBodyBackdrop } from "./CalendarBodyBackdrop"
import { CalendarTask } from "./Task/CalendarTask"

export interface IView {
   // render(element: HTMLElement): void
    next(): void
    previous(): void
    changeInterval(interval: number): void
    getBody(): ICalendarBody
    getData(): ICalendarDataWeek 
    addTask(task: CalendarTask): void
    goDate(date: Date): void
    getHeader(): ICalendarHeader
    getBody(): ICalendarBody
}

export interface IViewWeek extends IView {
    goDate(date: Date): void
}

export interface ICalendarHeader {
    goDate(date: Date): void
    next(): void
    previous(): void
}

export interface ICalendarBody {
    nextBody(): void
    previousBody(): void
}