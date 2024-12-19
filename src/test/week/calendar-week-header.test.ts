import { describe, expect } from "@jest/globals";
// import { CalendarWeekHeader } from "../../application/week/calendar-week-header"
import {
  defaultWeekViewOptions,
  IWeekViewOptions,
} from "../../domain/calendar/contracts/ICalendar";
import { CalendarWeek } from "../../application/week/calendar-week";
import { CssWeekHeader } from "../../shared/Css";

// class DummyCalendarWeekHeader extends CalendarWeekHeader {
//     public currentDate!: Date
//     public key: symbol = Symbol()
//     public options: IWeekViewOptions = defaultWeekViewOptions
//     protected getStartDate(): Date {

//     }
// }
declare global {
  interface Date {
    addDays(n: number): Date;
  }
}

(Date.prototype as any).addDays = function (days: number) {
  this.setDate(this.getDate() + days);
  return this;
};

describe("Verificando correcto Header week", () => {
  it("Omit Days", () => {
    const options: IWeekViewOptions = defaultWeekViewOptions;
    const element = document.createElement("div");
    const instance = new CalendarWeek(options, element);
    instance.options.omitDays = [1, 2];
    instance.initHeader();
    expect(instance.columnsHeader.length).toEqual(5);
  });
  it("Disabled Days", () => {
    const options: IWeekViewOptions = defaultWeekViewOptions;
    const element = document.createElement("div");
    const instance = new CalendarWeek(options, element);
    instance.options.disabledDays = [1, 2];
    instance.initHeader();
    const elementsDisabled = document.getElementsByClassName(CssWeekHeader.columnDisabled)
    expect(elementsDisabled.length).toEqual(2);
  });
});
