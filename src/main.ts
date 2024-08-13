import { setupActionButtons } from "./ActionButtons";
import { CalendarFz } from "./domain/calendar/entities/CalendarFz";
import { TypesCalendarEvent } from "./domain/tools/tools";
import "./style.css";
declare global {
  interface Date {
    addDays(n: number): Date;
  }
}

(Date.prototype as any).addDays = function (days: number) {
  this.setDate(this.getDate() + days);
  return this;
};

const calendar = new CalendarFz("#calendar", {
  idFormCreateOrEditTask: "#form-template",
});

calendar.addEventListener(TypesCalendarEvent.CalendarRowClick, (e) => {
  (document.getElementById("datetime") as HTMLInputElement).value = `${e.date
    .toISOString()
    .substr(0, 10)} ${e.hour}`;
  console.log(e);
});

setupActionButtons(calendar);
