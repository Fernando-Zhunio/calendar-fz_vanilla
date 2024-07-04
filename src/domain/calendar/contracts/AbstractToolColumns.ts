import { IColumn } from "./IColumn";

export abstract class AbstractToolColumns {
  abstract getInstanceColumn(date: Date): IColumn
  buildColumns(
    startDate: Date,
    numColumns: number = 7,
    omitDays: number[] = []
  ) {
    const data = [];
    const auxDate = new Date(startDate);
    for (let i = 0; i < numColumns; i++) {
      if (omitDays.includes(auxDate.getDay())) {
        auxDate.addDays(1);
        continue;
      }
      const column = this.getInstanceColumn(auxDate);
      column.render();
      data.push(column);
      auxDate.addDays(1);
    }
    return data;
  }
}
