//import { Column } from "../entities/Column";
import { TaskBody } from "../entities/TaskBody";

export interface IColumn {
  render(parent: HTMLElement,): void;
  getElement(): HTMLElement;
  getKey(): any;
  addTask(task: TaskBody): void;
}

export interface IColumnHead  {
  // render(parent: HTMLElement): void;
  getElement(): HTMLElement;
  getKey(): any;
}
