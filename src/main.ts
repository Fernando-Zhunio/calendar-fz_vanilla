import { setupActionButtons } from './ActionButtons';
import { CalendarFz } from './domain/calendar/entities/CalendarFz'
import { TypesCalendarEvent } from './domain/tools/tools';
import './style.css'
declare global {
  interface Date {
      addDays(n: number): Date;
  }
}

(Date.prototype as any).addDays = function(days: number) {
  this.setDate(this.getDate() + days);
  return this;
}

const calendar = new CalendarFz('#calendar', {
  cbTemplateClickRow: (date: Date, hour: string) => {
    return templateClickRow(date, hour)
  }
});

function templateClickRow(date:Date, hour: string) {
  const element = document.createElement('div');
  element.textContent = 'fernando' + date.toLocaleDateString() + ' ' + hour;
  return element
}

function buildFormAddTask() {
  const form = document.createElement('form');
  /*
  ```ts
  */
  const stringTemplate = `
  <div>
  </div>
  `
}

calendar.addEventListener(TypesCalendarEvent.CalendarRowClick, (e) => {
  console.log(e)
})

document.addEventListener('click', (e) => {
  console.log({client: e.clientX})
})

setupActionButtons(calendar);


