export interface IRow {
  render(parent: HTMLElement): void;
  getElement(): HTMLElement;
  getKey(): string;
}
