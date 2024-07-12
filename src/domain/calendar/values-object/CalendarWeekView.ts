import { CommunicationService } from "../../../application/CommunicationService";
import { ICalendarBody, IWeekViewOptions } from "../contracts/ICalendar";
import { CalendarBodyWeek } from "../entities/CalendarBodyWeek";
import { CalendarFz } from "../entities/CalendarFz";
import { CalendarHeaderWeek } from "../entities/CalendarHeaderWeek";
import { IView as ICalendarView } from "../entities/iview";

export class CalendarWeekView implements ICalendarView {
  currentDate = new Date();
  data = {
    startDate: new Date(),
    endDate: new Date(),
  }

  header!: CalendarHeaderWeek;
  body!: CalendarBodyWeek;

  constructor(private calendarId: symbol, parentElement: HTMLElement) {
    this.init(parentElement);
  }

  private init(parentElement: HTMLElement) {
    this.header = new CalendarHeaderWeek(this.calendarId);
    this.body = new CalendarBodyWeek(this.calendarId);
    parentElement.appendChild(this.header.getElement());
    parentElement.appendChild(this.body.getElement());
    this.renderColumns();
  }

  next() {
    this.header.next();
  }

  previous() {
    this.header.previous();
  }

  getCalendar(): CalendarFz {
    return CommunicationService.getInstance().getCalendar(this.calendarId)!
  }

  getOptions() {
    return CommunicationService.getInstance().getOptions(
      this.calendarId
    )! as IWeekViewOptions;
  }    

  renderColumns() {
    let { omitDays, sprintDays, currentDate } = this.getOptions();
    const auxDate = new Date(currentDate);
    for (let i = 0; i < sprintDays; i++) {
      if (omitDays!.includes(auxDate.getDay())) {
        auxDate.addDays(1);
        continue;
      }
      this.header.addColumn(auxDate);
      // this.body.addColumn(auxDate);
      auxDate.addDays(1);
    }
    this.header.updateGridStyle();
    // this.body.updateGridStyle();
  }

  getBody(): ICalendarBody {
    return this.body;
  }

  changeInterval(interval: number) {
    this.body.changeInterval(interval);
  }

  getData() {
    return this.data
  }
}
