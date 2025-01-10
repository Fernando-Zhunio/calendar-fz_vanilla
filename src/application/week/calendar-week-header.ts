import { IWeekViewOptions } from "../../domain/calendar/contracts/ICalendar";
import { ICalendarHeader } from "../../domain/calendar/entities/iview";
import { getLabelDays, getStartDateOfWeek } from "../../domain/tools/tools";
import { CalendarHeaderColumn } from "../shared/calendar-header-column";

export class CalendarWeekHeader implements ICalendarHeader {
  // public  currentDate: Date;
  // public key: symbol;
  // public options: IWeekViewOptions;
  //protected startDate: Date;

  columnsHeader: CalendarHeaderColumn[] = [];
  elementContainer = document.createElement("div");
  element = document.createElement("div");

  constructor(public options: IWeekViewOptions) {
    this.assignClassCssHeader();
    this.elementContainer.append(this.element);
    //this.startDate = this.getStartDate();
  }

  getElement() {
    return this.element;
  }

  getColumns() {
    return this.columnsHeader
  }

  protected getStartDate(date?: Date, startDay?: number): Date {
    return getStartDateOfWeek(
      date || this.options.startDate,
      startDay || this.options.startDay
    );
  }

  assignClassCssHeader() {
    this.getElement().classList.add("calendar__header_week");
    this.element.style.display = "grid";
    this.elementContainer.classList.add("calendar__header_week_container");
  }

  initHeader() {
    const element = this.getElement();
    const columnDate = this.getStartDate(
      this.options.startDate,
      this.options.startDay
    );
    element.innerHTML = "";
    this.columnsHeader = [];
    const omitDays = this.options.omitDays;
    for (let dayNumber = 1; dayNumber <= 7; dayNumber++) {
      if (omitDays.includes(dayNumber as any)) {
        columnDate.addDays(1);
        continue;
      }
      const column = new CalendarHeaderColumn(
        getLabelDays(columnDate.getDay()),
        new Date(columnDate),
        this.isDayDisable(columnDate.getDay())
      );
      columnDate.addDays(1);
      element.append(column.getElement());
      this.columnsHeader.push(column);
    }
    const colsLength = this.columnsHeader.length;
    this.element.style.gridTemplateColumns = `repeat(${colsLength}, ${
      100 / colsLength
    }%)`;
  }

  isDayDisable(day: number): boolean {
    return this.options.disabledDays.includes(day as any);
  }

  goDate(date: Date) {
    const startDate = new Date(date);
    for (let i = 1; i <= 7; i++) {
      const day = this.columnsHeader.find(
        (x) => x.getDate().getDay() == startDate.getDay()
      );
      if (day != undefined) {
        day.setDate(new Date(startDate));
      }
      startDate.addDays(1);
    }
  }

  next() {
    this.columnsHeader.forEach((x) => {
      x.setDate(x.getDate().addDays(7));
    });
  }

  previous() {
    //this.startDate = this.startDate.addDays(-7);
    this.columnsHeader.forEach((x) => {
      x.setDate(x.getDate().addDays(-7));
    });
  }
}
