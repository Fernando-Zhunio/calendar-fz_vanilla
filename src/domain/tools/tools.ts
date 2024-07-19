
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
  const currentDay = new Date(date).getDay();
  if (currentDay == startDay) {
    return date;
  }
  return new Date(date.addDays(startDay - currentDay));
}


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

export function getMinutesDistance(startTime: string, endTime: string) {
  const start = startTime.split(":").map(Number);
  const end = endTime.split(":").map(Number);
  return (end[0] - start[0]) * 60 + (end[1] - start[1]);
}

export function convertPixelsForMinutes(pixels: number, intervalMinutes: number) {
  // const { intervalMinutes } = this.getOptions<IViewOptions>()!;
  return pixels / intervalMinutes;
}

export function generateUuid() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}