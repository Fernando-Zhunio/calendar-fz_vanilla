import { CalendarFz } from './domain/calendar/entities/CalendarFz'
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

const calendar = new CalendarFz('#calendar');


