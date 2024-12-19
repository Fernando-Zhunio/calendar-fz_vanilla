// import { ICalendar, ICalendarBody, ICalendarDataWeek, IWeekViewOptions } from "../../domain/calendar/contracts/ICalendar";
// import { IView } from "../../domain/calendar/entities/iview";
// import { CalendarTask } from "../../domain/calendar/entities/Task/CalendarTask";
// import { CalendarMonthHeader } from "./calendar-moth-header";

// export interface IOptionsRender {
//     tasks:CalendarTask
// }
// export class CalendarMonth extends CalendarMonthHeader implements IView {
//     public currentDate!: Date;
//     public key!: symbol;
//     //public days: string[];
//     public options!: IWeekViewOptions;
//     listEvent: any;

//     constructor(options: IWeekViewOptions) {
//         super();
//         this.options = options;
//         this.render();
        
//     }
//     protected getStartDate(): Date {
//         throw new Error("Method not implemented.");
//     }

//     previous(): void {
//         throw new Error("Method not implemented.");
//     }

//     changeInterval(interval: number): void {
//         throw new Error("Method not implemented.");
//     }

//     getBody(): ICalendarBody {
//         throw new Error("Method not implemented.");
//     }

//     getData(): ICalendarDataWeek {
//         throw new Error("Method not implemented.");
//     }

//     next(): void {
//         throw new Error("Method not implemented.");
//     }

//     addTask(): void {
//         throw new Error("Method not implemented.");
//     }

//     render(): void {
//         this.refreshHeader();
//     }
// }