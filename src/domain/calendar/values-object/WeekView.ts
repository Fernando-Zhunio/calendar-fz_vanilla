import { CommunicationService } from "../../../application/CommunicationService";
import { BodyWeek } from "../entities/BodyWeek";
import { CalendarFz } from "../entities/CalendarFz";
import { HeaderWeek } from "../entities/HeaderWeek";
import { IView } from "../entities/iview";

export class WeekView implements IView {
  currentDate = new Date();
  startDay!: number;
  endDay!: number;
  days = 7;

  elementHeader = document.createElement("div");
  header!: HeaderWeek;
  body!: BodyWeek;
  elementBody = document.createElement("div");

  constructor(private id: symbol) {

  }

  next() {
    this.header.next();
  }

  previous() {
    this.header.previous();
  }

  getCalendar(): CalendarFz {
    return CommunicationService.getInstance().getCalendar(this.id)!
  }

  render(): void {
    const calendarElement = this.getCalendar().getElement()!;
    calendarElement.innerHTML = "";
    this.header = new HeaderWeek(this.id);
    this.body = new BodyWeek(this.id);
    calendarElement.appendChild(this.header.getElement());
    calendarElement.appendChild(this.body.getElement());
  }

  changeView(): void {
    throw new Error("Method not implemented.");
  }

  changeInterval(interval: number) {
    this.body.changeInterval(interval);
  }
}
