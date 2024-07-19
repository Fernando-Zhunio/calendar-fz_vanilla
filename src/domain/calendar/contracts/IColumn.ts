//import { Column } from "../entities/Column";
import { CalendarTask } from "../entities/Task/CalendarTask";

export interface IColumn {
  render(parent: HTMLElement,): void;
  getElement(): HTMLElement;
  getKey(): any;
  addTask(task: CalendarTask): void;
}

export interface IColumnHead  {
  // render(parent: HTMLElement): void;
  getElement(): HTMLElement;
  getKey(): any;
}
