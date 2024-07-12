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
  //currentDate: new Date('2022-01-01'),
});

calendar.addEventListener(TypesCalendarEvent.CalendarRowClick, (e) => {
  console.log(e)
})


setupActionButtons(calendar);


