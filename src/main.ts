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

const calendar = new CalendarFz('#calendar', {
  currentDate: new Date('2022-01-01'),
});

document.getElementById('next')?.addEventListener('click', () => {
  calendar.next();
})

document.getElementById('prev')?.addEventListener('click', () => {
  calendar.previous();
})
const selectInterval = document.getElementById('select-interval')! as HTMLSelectElement;
selectInterval!.addEventListener('change', () => {
  calendar.changeInterval(+selectInterval!.value);
})

