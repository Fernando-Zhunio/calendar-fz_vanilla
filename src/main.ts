import { setupActionButtons } from "./ActionButtons";
import { CommunicationService } from "./application/CommunicationService";
import { CalendarFz } from "./domain/calendar/entities/CalendarFz";
import { CalendarTask } from "./domain/calendar/entities/Task/CalendarTask";
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
  querySelectorRowClick: '#form-template',
});

// function templateClickRow(date: Date, hour: string) {
//   //  const element = document.createElement("div");
//    const element = document.getElementById('form-template');
//    const inputDateTime = document.getElementById('datetime') as HTMLInputElement;
//   inputDateTime.value = `${date.toISOString().substring(0, 10)} ${hour}`
//   return element
// }

// function buildTemplateFormAddTask(date: Date, hour: string) {
//   return `
//   <form class="calendar-form-add-task">
//               <div>
//                 <label for="name">Nombre de la tarea</label>
//                 <input id="name" type="text" name="name">
//               </div>
//               <div>
//                 <label for="name">Fecha y Hora de Inicio</label>
//                 <input id="date" value="${date.toISOString().substr(0, 10)} ${hour}" type="datetime-local" name="date">
//               </div>
//               <div>
//                 <label for="name">Duración (Minutos)</label>
//                 <input id="duration" type="number" name="duration">
//               </div>
//               <button id="save-task">Guardar evento</button>
//             </form>
//   `;
// }

calendar.addEventListener(TypesCalendarEvent.CalendarRowClick, (e) => {
  (document.getElementById("datetime") as HTMLInputElement).value = `${e.date.toISOString().substr(0, 10)} ${e.hour}`;
  console.log(e);
});


// document.addEventListener("click", (e) => {
//   console.log({ client: e.clientX });
//   if ((e?.target as HTMLElement).getAttribute('task-id')){
//     debugger
//     const calendarId = (e?.target as HTMLElement).getAttribute('calendar-id')!;
//     const taskId = (e?.target as HTMLElement).getAttribute('task-id');
//     const calendar = CommunicationService.getCalendarForId(calendarId);
//   }
// });

// let isMovement: boolean = false;

// document.addEventListener("mousedown", (e) => {
//   const target = e.target as HTMLElement;
//   if (target.classList.contains('calendar__body_task')) {
//     isMovement = true;
//     const calendarId = (target as HTMLElement).getAttribute('calendar-id')!;
//     const taskId = (target as HTMLElement).getAttribute('task-id');
//     calendarFz = CommunicationService.getCalendarForId(calendarId)!;
//     task = calendar?.view.getBody().getTaskForId(taskId);
//   }
// });

// document.addEventListener("mousemove", (e) => {
//   if (!isMovement) return;

// });

// document.addEventListener("mouseup", (e) => {
//   isMovement = false;
//   calendarFz = null;
//   task = null;
// });

setupActionButtons(calendar);
