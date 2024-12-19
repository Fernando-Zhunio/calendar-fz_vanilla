import { ICalendarBody, ICalendarDataWeek } from "../contracts/ICalendar"
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
}

export interface IViewWeek extends IView {
    changeDate(date: Date): void
}