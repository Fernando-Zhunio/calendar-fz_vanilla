import { ICalendarBody, IHeaderCalendar } from "../contracts/ICalendar";

export abstract class CalendarView {
  public abstract getHeader(): IHeaderCalendar;
  public abstract getBody(): ICalendarBody;
//   public changeInterval(interval: number): void {
//     const body = this.getBody();
//     elementBodyRows.innerHTML = "";
//     this.rows = [];
//     const { intervalMinutes, startTime, endTime } = this.getOptions()!;
//     const listHours = listHoursByInterval(intervalMinutes, startTime, endTime);
//     listHours.forEach((hour) => {
//       const row = new RowBody(this.elementBodyRows, hour, this.id);
//       row.render();
//       this.rows.push(row);
//     });
//   }

  public next(): void {
    this.getHeader().next();
  }

  public previous(): void {
    this.getHeader().previous();
  }

}
