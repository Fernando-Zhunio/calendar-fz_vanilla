import { Time } from "../../application-contract/hour";
import { CalendarTask } from "../calendar/entities/Task/CalendarTask";

export enum TypesView {
  days = "days",
  months = "months",
  weeks = "weeks",
}

export enum CalendarEvents {
  RowClick = "calendar_row_click",
  ChangePositionTask = "calendar_change_position_task",
}

export function getLabelDays(dayNum: number) {
  return [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ][dayNum];
}

export function getLabelMonths(monthNum: number) {
  return [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ][monthNum];
}

export function getStartDateOfWeek(date: Date, startDay = 1): Date {
  const currentDay = new Date(date).getDay(); //3
  if (currentDay == startDay) {
    //false
    return date;
  }
  const dayAux = startDay - currentDay;
  const daysToSubtract = startDay < currentDay ? dayAux : dayAux - 7;
  return new Date(date.addDays(daysToSubtract));
}

export function listHoursByInterval(
  intervalMinutes: number,
  startHour: Time,
  endHour: Time
): string[] {
  const hours: string[] = [];
  const start = convertTimeToMinutes(startHour);
  const end = convertTimeToMinutes(endHour);

  for (let i = start; i < end; i += intervalMinutes) {
    hours.push(convertMinutesToTime(i));
  }

  return hours;
}

export function formatDateYYYYMMDD(date: Date) {
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
}

/**
 * Calculate the position and height of a task in a calendar row.
 * @param {Date} date - The date of the task.
 * @param {string} startTime - The start time of the column that contains the task.
 * @param {number} pixelsForMinutes - The number of pixels that a minute occupies in a row.
 * @param {number} duration - The duration of the task in minutes.
 * @returns {object} An object with two properties: `top` and `height`, both given as strings in the format `<value>px`.
 */
export function calculeTopAndHeight(
  startTime: Time,
  initTaskTime: Time,
  endTaskTime: Time,
  pixelsForMinutes: number
) {
  //const endTime = date.toTimeString().split(" ")[0];

  return {
    top: diffTime(startTime, initTaskTime) * pixelsForMinutes + "px",
    height: diffTime(initTaskTime, endTaskTime) * pixelsForMinutes + "px",
  };
}

export function calculePixelsForMinutes(
  heightRow: number,
  intervalMinutes: number
) {
  return heightRow / intervalMinutes;
}

/**
 * Calculates the distance in minutes between two times given in "HH:MM" format.
 *
 * @param startTime - The start time in "HH:MM" format.
 * @param endTime - The end time in "HH:MM" format.
 * @returns The distance in minutes between the start time and end time.
 */
export function calculeDistanceTime(startTime: Time, endTime: Time) {
  const start = startTime.split(":").map(Number);
  const end = endTime.split(":").map(Number);
  return (end[0] - start[0]) * 60 + (end[1] - start[1]);
}

/**
 * Calculate the difference in minutes between two times given as strings in the format 'HH:mm'.
 * @param {Time} startTime - The start time.
 * @param {Time} endTime - The end time.
 * @returns {number} The difference in minutes.
 */
export function diffTime(startTime: Time, endTime: Time) {
  const start = startTime.split(":").map(Number);
  const end = endTime.split(":").map(Number);
  return (end[0] - start[0]) * 60 + (end[1] - start[1]);
}

export function generateUuid() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

export function sanitizeHTML(input: string) {
  // Crea un documento temporal para parsear el HTML de manera segura
  const doc = new DOMParser().parseFromString(input, "text/html");

  // Elimina todos los elementos <script>
  const scripts = doc.querySelectorAll("script");
  scripts.forEach((script) => script.remove());

  // Opcional: Eliminar atributos peligrosos
  const dangerousAttributes = [
    "onerror",
    "onclick",
    "onload",
    "onmouseover",
    "onfocus",
    "onkeydown",
  ];
  dangerousAttributes.forEach((attr) => {
    const elements = doc.querySelectorAll(`[${attr}]`);
    elements.forEach((el) => el.removeAttribute(attr));
  });

  // Devuelve el contenido limpio como HTML
  return doc.body.innerHTML;
}

export function addMinutes(hora: Time, minutesToAdd: number): Time {
  // Separar la hora y los minutos
  let [horas, minutos] = hora.split(":").map((num) => parseInt(num));
  // Sumar los minutos
  minutos += minutesToAdd;
  // Convertir los minutos en horas y minutos (en caso de que pase de 60)
  while (minutos >= 60) {
    minutos -= 60;
    horas++;
  }
  // Asegurarse de que las horas estén en formato de 24 horas
  if (horas >= 24) {
    horas -= 24;
  }
  // Formatear la hora y los minutos para que siempre tengan 2 dígitos
  const hours = String(horas).padStart(2, "0");
  const minutes = String(minutos).padStart(2, "0");
  // Retornar la hora en formato 'HH:MM'
  return `${hours}:${minutes}` as Time;
}

//RESUME: Converts
export function convertPixelsToTime(
  heightRow: number,
  pixels: number,
  intervalMinutes: number
) {
  // const { intervalMinutes } = this.getOptions<IViewOptions>()!;
  const pxm = calculePixelsForMinutes(heightRow, intervalMinutes)
  return convertMinutesToTime(pixels / pxm);
}

export function convertTimeToMinutes(time: Time) {
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
}

export function convertMinutesToTime(minutes: number): Time {
  const hours = Math.floor(minutes / 60);
  const minutesLeft = minutes % 60;
  return `${hours.toString().padStart(2, "0")}:${minutesLeft
    .toString()
    .padStart(2, "0")}` as Time;
}

export function convertMinutesToPixels(
  minutes: number,
  heightRow: number,
  intervalMinutes: number
) {
  return (heightRow / intervalMinutes) * minutes;
}

function isOverlapping(
  start1: number,
  end1: number,
  start2: number,
  end2: number
) {
  // Verifica si los intervalos se solapan
  return start1 < end2 && end1 > start2;
}

// Función para encontrar las tareas que se solapan
export function findOverlappingTasks(tasks: CalendarTask[]) {
  const overlaps = [];

  // Compara todas las tareas entre sí
  for (let i = 0; i < tasks.length; i++) {
    const task1 = tasks[i];
    const start1 = convertTimeToMinutes(task1.getStartTime());
    const end1 = convertTimeToMinutes(task1.getEndTime());

    for (let j = i + 1; j < tasks.length; j++) {
      const task2 = tasks[j];
      const start2 = convertTimeToMinutes(task2.getStartTime());
      const end2 = convertTimeToMinutes(task2.getEndTime());

      // Si las tareas se solapan, agregar a la lista de solapamientos
      if (isOverlapping(start1, end1, start2, end2)) {
        overlaps.push(task1);
        overlaps.push(task2);
      }
    }
  }

  return overlaps;
}

export function dispatchEventCalendar<T>(typeEvent: CalendarEvents, detail: T) {
  const customEvent = new CustomEvent(typeEvent, {
    detail,
  });
  document.dispatchEvent(customEvent);
}
