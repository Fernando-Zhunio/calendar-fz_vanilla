import { ICalendarBody } from "../contracts/ICalendar"

export interface IView {
    render(element: HTMLElement): void
    next(): void
    previous(): void
    changeInterval(interval: number): void
    getBody(): ICalendarBody
}