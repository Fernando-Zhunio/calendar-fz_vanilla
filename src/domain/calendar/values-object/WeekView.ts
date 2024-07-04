import { TypesView, getLabelDays, listHoursByInterval } from "../../tools/tools";
import { BodyWeek } from "../entities/BodyWeek";
import { HeaderWeek } from "../entities/HeaderWeek";
import { IView } from "../entities/iview";
export interface IWeekViewOptions {
  omitDays: number[];
  intervalMinutes: number;
  startTime: string;
  endTime: string;
}
export class WeekView implements IView {
  currentDate = new Date();
  startDay!: number;
  endDay!: number;
  days = 7;

  elementHeader = document.createElement("div");
  header!: HeaderWeek;
  body!: BodyWeek;
  elementBody = document.createElement("div");

  constructor(
    private calendarElement: HTMLElement,
    private options: IWeekViewOptions = {
      omitDays: [],
      intervalMinutes: 15,
      startTime: '08:00',
      endTime: '18:00',
    }
  ) {
    // this.calendarElement.innerHTML = "";
    // this.header = new HeaderWeek();
    // this.calendarElement.appendChild(this.header.getElement());
    // this.calendarElement.appendChild(this.elementBody);
    // this.currentDate = this.getMonday();
    // this.startDay = this.currentDate.getDate();
    // const endDate = new Date(this.currentDate);
    // endDate.setDate(6);
    // this.endDay = endDate.getDate();
  }

  getMonday() {
    const dayNum = new Date(this.currentDate).getDay();
    if (dayNum === 0) {
      return this.currentDate;
    } else {
      return this.currentDate.addDays(-dayNum + 1);
    }
  }

  next() {
    this.currentDate.setDate(this.currentDate.getDate() + 7);
    this.startDay = this.currentDate.getDate();
    const endDate = new Date(this.currentDate);
    endDate.setDate(6);
    this.endDay = endDate.getDate();
  }

  generateHeader() {
    const auxDate = new Date(this.currentDate);
    const divHours = document.createElement("div");
    divHours.classList.add("calendar__hours");
    this.elementHeader.appendChild(divHours);
    for (let i = 0; i < this.days; i++) {
      if (this.options.omitDays.includes(auxDate.getDay())) {
        auxDate.addDays(1);
        continue;
      }
      const div = document.createElement("div");
      div.setAttribute("data-day", auxDate.toDateString());

      const divDate = document.createElement("div");
      divDate.textContent = auxDate.getDate().toString();

      const divLabel = document.createElement("div");
      divLabel.textContent = getLabelDays(auxDate.getDay());

      div.appendChild(divDate);
      div.appendChild(divLabel);

      auxDate.addDays(1);
      this.elementHeader.appendChild(div);
    }
  }

  generateColumnsByDays() {
    const auxDate = new Date(this.currentDate);
    const divColumn = document.createElement("div");
    divColumn.classList.add("calendar__column");
    this.elementBody.appendChild(divColumn);
    for (let i = 0; i < this.days; i++) {
      if (this.options.omitDays.includes(auxDate.getDay())) {
        auxDate.addDays(1);
        continue;
      }
      const div = document.createElement("div");
      div.setAttribute("data-day", auxDate.toDateString());
      auxDate.addDays(1);
      divColumn.appendChild(div);
    }
  }

  generateRowsByInterval() {
    
  }
  generateBody() {
    this.generateColumnsByDays();
    this.generateRowsByInterval();
  }

  render(): void {
    this.calendarElement.innerHTML = "";
    this.header = new HeaderWeek({
      omitDays: this.options.omitDays,
      currentDate: this.currentDate,
    });
    this.body = new BodyWeek({
      omitDays: this.options.omitDays,
      currentDate: this.currentDate
    });
    this.calendarElement.appendChild(this.header.getElement());
    this.calendarElement.appendChild(this.body.getElement());
  }

  changeView(): void {
    throw new Error("Method not implemented.");
  }
}
