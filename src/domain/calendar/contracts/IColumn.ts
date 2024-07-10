import { Column } from "../entities/Column";
import { TaskBody } from "../entities/TaskBody";

export interface IColumn {
  render(): void;
  getElement(): HTMLElement;
  getKey(): string;
  getDay(): number;
  addTask(task: TaskBody): void;
}

export interface IColumnFactory  {
  createColumn(): void;

  renderColumns(): void;

  getColumns(): Column[];
}
