import { CalendarFz } from "./domain/calendar/entities/CalendarFz";

export function setupActionButtons(calendar: CalendarFz) {
  document.getElementById("next")?.addEventListener("click", () => {
    calendar.next();
  });

  document.getElementById("prev")?.addEventListener("click", () => {
    calendar.previous();
  });
  const selectInterval = document.getElementById(
    "select-interval"
  )! as HTMLSelectElement;
  selectInterval!.addEventListener("change", () => {
    calendar.changeInterval(+selectInterval!.value);
  });

  document.getElementById("add-task")?.addEventListener("click", () => {
    console.log(calendar);
        calendar.addTask(2, '15:00', 30, `
          <p>hola mundo</p>
          <p>hola mundo</p>
          <p>hola mundo</p>
          `);

  });
}