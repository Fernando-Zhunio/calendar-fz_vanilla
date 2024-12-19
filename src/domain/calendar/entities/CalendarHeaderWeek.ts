import { CommunicationService } from "../../../application/CommunicationService";
import { getLabelMonths } from "../../tools/tools";
import { IHeaderCalendar } from "../contracts/ICalendar";
import { CalendarHeader } from "../values-object/CalendarHeader";
//import { IColumn } from "../contracts/IColumn";
import { CalendarHeaderColumn } from "./CalendarHeaderColumn";
import { DescriptionHead } from "./DescriptionHead";

export class CalendarHeaderWeek extends CalendarHeader implements IHeaderCalendar {
  // element = document.createElement("div");
  headDescription!: DescriptionHead;
  columns: CalendarHeaderColumn[] = [];
  // sprintDays = 7;
  // firstDate!: Date;
  // endDate!: Date;
  constructor(protected calendarId: string, protected parent: HTMLElement) {
    super(calendarId, parent);
    this.init();
    this.assignClassCss();
    this.setDescription();
  }

  init() {
    // let {currentDate, startDay} = this.getOptions<IWeekViewOptions>();
    // currentDate = getStartDateOfWeek(currentDate, startDay);
    // this.firstDate = currentDate;
    // this.buildColumns();
  }

  assignClassCss() {
    this.element.classList.add("calendar__header_week");
  }
  
  updateGridStyle() {
    this.element.style.gridTemplateColumns = `var(--width-label-hours) repeat(${this.columns.length}, calc(calc(100% - var(--width-label-hours)) / ${this.columns.length}))`;
  }

  getDescription() {
    return this.headDescription;
  }

  addColumn(date: Date) {
    const column = new CalendarHeaderColumn(new Date(date), this.element);
    this.columns.push(column);
    return column;
  }

  setDescription(text1: string | null = null, text2: string | null = null) {
    if (!this.headDescription) {
      this.headDescription = new DescriptionHead(this.calendarId);
      this.headDescription.render(this.element);
    }
    const {startDate} = CommunicationService.getOptions(this.calendarId)!
    text1 = text1 ?? '/'+startDate.getFullYear().toString();
    text2 = text2 ?? getLabelMonths(startDate.getMonth())
    this.headDescription.setTextYear(text1);
    this.headDescription.setTextMonth(text2);
  }
}
