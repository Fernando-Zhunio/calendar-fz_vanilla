import { Hour } from "../../application-contract/hour";
import { CalendarTask } from "../calendar/entities/Task/CalendarTask";

export enum TypesView {
  days = "days",
  months = "months",
  weeks = "weeks",
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
// export const HEIGHT_ROW_HOURS = 32;
export function convertMinutesToPixels(minutes: number) {
  return (minutes / 60) * 100;
}

function convertStringToMinutes(str: string) {
  const [hours, minutes] = str.split(":");
  return parseInt(hours) * 60 + parseInt(minutes);
}

function convertMinutesToString(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const minutesLeft = minutes % 60;
  return `${hours.toString().padStart(2, "0")}:${minutesLeft
    .toString()
    .padStart(2, "0")}`;
}

export function listHoursByInterval(
  intervalMinutes: number,
  startHour: string,
  endHour: string
): string[] {
  const hours: string[] = [];
  const start = convertStringToMinutes(startHour);
  const end = convertStringToMinutes(endHour);

  for (let i = start; i < end; i += intervalMinutes) {
    hours.push(convertMinutesToString(i));
  }

  return hours;
}

export function formatDateYYYYMMDD(date: Date) {
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
}

export enum TypesCalendarEvent {
  CalendarRowClick = "calendar_row_click",
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

/*
25-12-2024  -> dia = miercoles(3)
5 -> inicio viernes(5)
20-12-2024 -> viernes(5) 



*/

// export function calculePositionTask(startTime: string, duration: number): ITaskPosition {
//   const { startTime: calendarStartTime } = this.getOptions<IViewOptions>()!;
//   const heightPixelsRow = this.rows[0]
//     .getElement()!
//     .getBoundingClientRect().height;
//   const PxM = this.convertPixelsForMinutes(heightPixelsRow);
//   const diffMinutes = this.getMinutesDistance(calendarStartTime, startTime);

//   return {
//     top: diffMinutes * PxM + "px",
//     height: duration * PxM + "px",
//   };
// }

/**
 * Calculate the position and height of a task in a calendar row.
 * @param {Date} date - The date of the task.
 * @param {string} startTime - The start time of the column that contains the task.
 * @param {number} pixelsForMinutes - The number of pixels that a minute occupies in a row.
 * @param {number} duration - The duration of the task in minutes.
 * @returns {object} An object with two properties: `top` and `height`, both given as strings in the format `<value>px`.
 */
export function calculeTopAndHeight(
  startTime: string,
  initTaskTime: Hour,
  endTaskTime: Hour,
  pixelsForMinutes: number
) {
  //const endTime = date.toTimeString().split(" ")[0];

  return {
    top: diffMinutes(startTime, initTaskTime) * pixelsForMinutes + "px",
    height: diffMinutes(initTaskTime, endTaskTime) * pixelsForMinutes + "px",
  };
}

/**
 * Calculate the number of pixels that a minute occupies in a row.
 * @param {number} heightRow - The height of the row in pixels.
 * @param {number} intervalMinutes - The interval in minutes between two consecutive rows.
 * @returns {number} The number of pixels that a minute occupies in a row.
 */
export function getPixelsForMinutes(heightRow: number, intervalMinutes: number) {
  return heightRow / intervalMinutes;
}

/**
 * Calculate the difference in minutes between two times given as strings in the format 'HH:mm'.
 * @param {string} startTime - The start time.
 * @param {string} endTime - The end time.
 * @returns {number} The difference in minutes.
 */
export function diffMinutes(startTime: string, endTime: string) {
  const start = startTime.split(":").map(Number);
  const end = endTime.split(":").map(Number);
  return (end[0] - start[0]) * 60 + (end[1] - start[1]);
}

export function getMinutesDistance(startTime: string, endTime: string) {
  const start = startTime.split(":").map(Number);
  const end = endTime.split(":").map(Number);
  return (end[0] - start[0]) * 60 + (end[1] - start[1]);
}

export function convertPixelsForMinutes(
  pixels: number,
  intervalMinutes: number
) {
  // const { intervalMinutes } = this.getOptions<IViewOptions>()!;
  return pixels / intervalMinutes;
}

export function generateUuid() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

export function sanitizeHTML(input: string) {
  // Crea un documento temporal para parsear el HTML de manera segura
  const doc = new DOMParser().parseFromString(input, 'text/html');

  // Elimina todos los elementos <script>
  const scripts = doc.querySelectorAll('script');
  scripts.forEach(script => script.remove());
  
  // Opcional: Eliminar atributos peligrosos
  const dangerousAttributes = ['onerror', 'onclick', 'onload', 'onmouseover', 'onfocus', 'onkeydown'];
  dangerousAttributes.forEach(attr => {
    const elements = doc.querySelectorAll(`[${attr}]`);
    elements.forEach(el => el.removeAttribute(attr));
  });
  
  // Devuelve el contenido limpio como HTML
  return doc.body.innerHTML;
}


export function addMinutes(hora: Hour, minutesToAdd: number): Hour {
  // Separar la hora y los minutos
  let [horas, minutos] = hora.split(':').map(num => parseInt(num));
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
  const hours = String(horas).padStart(2, '0');
  const minutes = String(minutos).padStart(2, '0');
  // Retornar la hora en formato 'HH:MM'
  return `${hours}:${minutes}` as Hour;
}

export function diffMinutes2(hour1: Hour, hour2: Hour): number {
  // Convertir las horas 'HH:MM' a minutos
  const [horas1, minutos1] = hour1.split(':').map(num => parseInt(num));
  const [horas2, minutos2] = hour2.split(':').map(num => parseInt(num));

  // Convertir a minutos totales desde medianoche
  const totalMinutos1 = horas1 * 60 + minutos1;
  const totalMinutos2 = horas2 * 60 + minutos2;

  // Calcular la diferencia en minutos
  let diferencia = totalMinutos2 - totalMinutos1;

  // Si la diferencia es negativa, ajustamos para el caso de pasar de un día a otro
  if (diferencia < 0) {
      diferencia += 24 * 60; // Añadimos 24 horas en minutos
  }

  return diferencia;
}

function timeToMinutes(time:Hour) {
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
}

function isOverlapping(start1: number, end1: number, start2: number, end2: number) {
  // Verifica si los intervalos se solapan
  return (start1 < end2 && end1 > start2);
}
// Función para encontrar las tareas que se solapan
export function findOverlappingTasks(tasks: CalendarTask[]) {
  const overlaps = [];

  // Compara todas las tareas entre sí
  for (let i = 0; i < tasks.length; i++) {
    const task1 = tasks[i];
    const start1 = timeToMinutes(task1.getStartTime());
    const end1 = timeToMinutes(task1.getEndTime());

    for (let j = i + 1; j < tasks.length; j++) {
      const task2 = tasks[j];
      const start2 = timeToMinutes(task2.getStartTime());
      const end2 = timeToMinutes(task2.getEndTime());

      // Si las tareas se solapan, agregar a la lista de solapamientos
      if (isOverlapping(start1, end1, start2, end2)) {
        overlaps.push(task1);
        overlaps.push(task2);
      }
    }
  }

  return overlaps;
}