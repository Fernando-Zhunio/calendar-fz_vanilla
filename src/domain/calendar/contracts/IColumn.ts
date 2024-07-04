import { Column } from "../entities/Column";

export interface IColumn {
  render(): void;
  getElement(): HTMLElement;
  getKey(): string;
}

export interface IColumnFactory  {
  createColumn(): void;

  renderColumns(): void;

  getColumns(): Column[];
}
