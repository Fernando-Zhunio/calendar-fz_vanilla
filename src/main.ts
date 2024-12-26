import { setupActionButtons } from "./ActionButtons";
import { DependencyContainer } from "./infraestructure/dependency-container";
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
  omitDays: [],
  disabledDays: [6, 0],
  startDate: new Date('12-12-2024'),
  startDay: 1
});

calendar.addEventListener(TypesCalendarEvent.CalendarRowClick, (e) => {
  (document.getElementById("datetime") as HTMLInputElement).value = `${e.date
    .toISOString()
    .substr(0, 10)} ${e.hour}`;
  console.log(e);
});

setupActionButtons(calendar);


///***** Injection Dependency */
//const container = new DependencyContainer();

// Registramos las clases.
// container.register(CalendarFz);

// // Creamos un primer scope y resuelve las dependencias.
// const scope1 = container.createScope();
// const calendar1 = scope1.resolve<CalendarFz>(CalendarFz);

//  */
