import { CommunicationService } from "../../../application/CommunicationService";
import { getStartDateOfWeek } from "../../tools/tools";
import { ICalendarBody, IWeekViewOptions } from "../contracts/ICalendar";
import { CalendarBodyColumn } from "../entities/CalendarBodyColumn";
import { CalendarBodyWeek } from "../entities/CalendarBodyWeek";
import { CalendarFz } from "../entities/CalendarFz";
import { CalendarHeaderColumn } from "../entities/CalendarHeaderColumn";
import { CalendarHeaderWeek } from "../entities/CalendarHeaderWeek";
import { IView as ICalendarView } from "../entities/iview";

export class CalendarWeekView implements ICalendarView {
  currentDate = new Date();
  data = {
    startDate: new Date(),
    endDate: new Date(),
  };

  header!: CalendarHeaderWeek;
  body!: CalendarBodyWeek;

  columnsHeaderAndBody: {
    // date: Date;
    columnHead: CalendarHeaderColumn;
    columnBody: CalendarBodyColumn;
  }[] = [];

  constructor(private calendarId: symbol, parentElement: HTMLElement) {
    this.init(parentElement);
  }

  private init(parentElement: HTMLElement) {
    this.header = new CalendarHeaderWeek(this.calendarId, parentElement);
    this.body = new CalendarBodyWeek(this.calendarId);
    parentElement.appendChild(this.header.getElement());
    parentElement.appendChild(this.body.getElement());
    this.buildColumns();
  }

  next() {
    let { currentDate, sprintDays } = this.getOptions() as IWeekViewOptions;
    currentDate.addDays(sprintDays);
    this.columnsHeaderAndBody.forEach((column) => {
      column.columnHead.next(sprintDays);
      column.columnBody.next(sprintDays);
    });
    this.header.getDescription().update();
  }

  previous() {
    let { currentDate, sprintDays } = this.getOptions() as IWeekViewOptions;
    currentDate.addDays(-sprintDays);
    this.columnsHeaderAndBody.forEach((column) => {
      column.columnHead.previous(sprintDays);
      column.columnBody.previous(sprintDays);
    });
    this.header.getDescription().update();
  }

  getCalendar(): CalendarFz {
    return CommunicationService.getInstance().getCalendar(this.calendarId)!;
  }

  getOptions() {
    return CommunicationService.getInstance().getOptions(
      this.calendarId
    )! as IWeekViewOptions;
  }

  buildColumns() {
    let { omitDays, sprintDays, currentDate, startDay } = this.getOptions();
    this.columnsHeaderAndBody = [];
    currentDate = getStartDateOfWeek(currentDate, startDay);
    const auxDate = new Date(currentDate);
    for (let i = 0; i < sprintDays; i++) {
      if (omitDays!.includes(auxDate.getDay())) {
        auxDate.addDays(1);
        continue;
      }
      this.columnsHeaderAndBody.push({
        columnHead: this.header.addColumn(auxDate),
        columnBody: this.body.getContainerColumns().addColumn(auxDate),
      });
      auxDate.addDays(1);
    }
    this.body.getContainerColumns().updateGridStyle();
    this.header.updateGridStyle();
  }

  getBody(): ICalendarBody {
    return this.body;
  }

  changeInterval(interval: number) {
    this.body.changeInterval(interval);
  }

  getData() {
    return this.data;
  }

  addTask(startDate: Date, duration: number) {
    this.body.addTask(startDate, duration);
    // const columnBody = this.body.getContainerColumns().columns.find(
    //   (x) =>
    //     x.getDate().toLocaleDateString() ===
    //     startDate.toLocaleDateString()
    // );

    // columnBody?.columnBody.addTask(startDate, duration);
    // console.log({columnBody});
  }
}
