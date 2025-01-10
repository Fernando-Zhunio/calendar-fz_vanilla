import { setupActionButtons } from "./ActionButtons";
import { CalendarFz } from "./domain/calendar/entities/CalendarFz";
import { CalendarTask } from "./domain/calendar/entities/Task/CalendarTask";
import {  TypesView } from "./domain/tools/tools";
import "./style.css";
import { viewPosition } from "./test/week/position";
declare global {
  interface Date {
    addDays(n: number): Date;
  }
}

viewPosition();

(Date.prototype as any).addDays = function (days: number) {
  this.setDate(this.getDate() + days);
  return this;
};

const calendar = new CalendarFz("#calendar", TypesView.weeks, {
  idFormCreateOrEditTask: "#form-template",
  omitDays: [],
  disabledDays: [6, 0],
  startDate: new Date('12-12-2024'),
  startDay: 1,
  endTime: "24:00",
  cbChangePositionTask: (taskOld, taskNew) => {
      console.log('change start posicion', {taskNew, taskOld})
      return Promise.resolve(true);
  },
});

const task = new CalendarTask(new Date('12-12-2024'), '10:00', '15:00', { templateOrTitle: 'Task 1' });
    // const task1 = new CalendarTask(new Date('12-12-2024'), '11:00', '15:00', { templateOrTitle: 'Task 1' });
    // const task2 = new CalendarTask(new Date('12-12-2024'), '11:30', '11:50', { templateOrTitle: 'Task 1' });
    // const task3 = new CalendarTask(new Date('12-12-2024'), '08:00', '11:01', { templateOrTitle: 'Task 1' });
    // const task4 = new CalendarTask(new Date('12-12-2024'), '16:00', '17:00', { templateOrTitle: 'Task 1' });
    const task5 = new CalendarTask(new Date('12-12-2024'), '02:00', '04:00', { templateOrTitle: 'Task 1' });
  calendar.addTasks([task,task5]);

// calendar.addEventListener(CalendarEvents.ChangePositionTask, (e) => {
//   // (document.getElementById("datetime") as HTMLInputElement).value = `${e.date
//   //   .toISOString()
//   //   .substr(0, 10)} ${e.hour}`;
//   console.log(e);
// });

setupActionButtons(calendar);


///***** Injection Dependency */
//const container = new DependencyContainer();

// Registramos las clases.
// container.register(CalendarFz);

// // Creamos un primer scope y resuelve las dependencias.
// const scope1 = container.createScope();
// const calendar1 = scope1.resolve<CalendarFz>(CalendarFz);

//  */
