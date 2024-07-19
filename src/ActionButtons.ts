import { CalendarFz } from "./domain/calendar/entities/CalendarFz";
import { CalendarTask } from "./domain/calendar/entities/Task/CalendarTask";

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

  document.getElementById('save-task')?.addEventListener('click', (e) => {
    const data = getValuesFormAddTask();
    e.preventDefault();
    calendar.addTask(new CalendarTask(data.date, data.duration))
    calendar.closePopup();
      // , `
      // <div>${data.name}</div>
      // <div>${data.date.toLocaleDateString()}</div>
      // <div>${data.duration}</div>
      // `);
  })

  // document.getElementById("add-task")?.addEventListener("click", () => {
    
  //   console.log(calendar);
  //       calendar.addTask(new Date('2022-01-05 15:00'), 30, `
  //         <p>hola mundo</p>
  //         <p>hola mundo</p>
  //         <p>hola mundo</p>
  //         `);
  // });

  // document.getElementById("save-task")?.addEventListener("click", () => {
  //   console.log(calendar);
  //   // const name = document.getElementById("name") as HTMLInputElement;
  //   const date = document.getElementById("date") as HTMLInputElement;
  //   calendar.addTask(new Date(date.value), 30, `
  //         <p>hola mundo</p>
  //         <p>hola mundo</p>
  //         <p>hola mundo</p>
  //         `);

  // });

}

function getValuesFormAddTask() {
  const form = {
    name: document.getElementById("name") as HTMLInputElement,
    date: document.getElementById("datetime") as HTMLInputElement,
    duration: document.getElementById("duration") as HTMLInputElement
  }

  return {
    name: form.name.value,
    date: new Date(form.date.value),
    duration: +form.duration.value
  }
}


// let isDragging = false;
// document.addEventListener("click", (e: any) => {
//   console.log({ client: e.clientX , e});
//   console.log(e.target.classList.contains('calendar__body_task'))
// })

// document.addEventListener("mousedown", (e: any) => {
//   if (e.target.classList.contains('calendar__body_task')) {
//     isDragging = true;
//     console.log('isDragging', isDragging)
//   }
// })

// document.addEventListener("mouseup", (e: any) => {
//   if (e.target.classList.contains('calendar__body_task')) {
//     isDragging = false;
//     console.log('isDragging', isDragging)
//   }
// })  