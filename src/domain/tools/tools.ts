import { IColumn } from "../calendar/contracts/IColumn";

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

export function renderColumnsWeek({
  currentDate,
  parent,
  omitDays = [],
  cb,
}: {
  currentDate: Date;
  parent: HTMLElement;
  omitDays: number[];
  cb: (parent: HTMLElement, date: Date) => void;
}) {
  const elementByDay: Record<string, HTMLElement> = {};
  const auxDate = new Date(currentDate);
  const columns = document.createElement("div");
  columns.classList.add("calendar__column");
  parent.appendChild(columns);

  for (let i = 0; i < 7; i++) {
    if (omitDays.includes(auxDate.getDay())) {
      auxDate.addDays(1);
      continue;
    }
    const [formatDate, column] = renderColumnDay(columns, auxDate);
    cb && cb(column, auxDate);
    elementByDay[formatDate] = column;
    auxDate.addDays(1);
  }
  return elementByDay;
}

function renderColumnDay(
  parent: HTMLElement,
  date: Date
): [string, HTMLElement] {
  const div = document.createElement("div");
  const formatDate = formatDateYYYYMMDD(date);
  div.setAttribute("data-day", formatDate);
  parent.appendChild(div);
  return [formatDate, div];
}

export function formatDateYYYYMMDD(date: Date) {
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
}

export enum TypesCalendarEvent {
    CalendarRowClick = 'calendar_row_click'
}