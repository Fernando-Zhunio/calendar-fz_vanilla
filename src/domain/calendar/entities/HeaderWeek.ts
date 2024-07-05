import { CommunicationService } from "../../../application/CommunicationService";
import { getLabelDays, getLabelMonths } from "../../tools/tools";
import { IHeaderCalendar, IWeekViewOptions } from "../contracts/ICalendar";
import { IColumn } from "../contracts/IColumn";
import { ColumnHead } from "./ColumnHead";
import { DescriptionHead } from "./DescriptionHead";

export class HeaderWeek implements IHeaderCalendar {
  elementHeader = document.createElement("div");
  descriptionHead!: DescriptionHead;
  //options!: IHeaderWeekOptions;
  columns: IColumn[] = [];

  sprintDays = 7;

  firstDate!: Date;

  constructor(private id: symbol) {
    this.elementHeader.classList.add("calendar__header_week");
    this.render();
  }

  getDescription() {
    return "Semana";
  }


  getElement() {
    return this.elementHeader;
  }

  buildStartDate() {
    const { currentDate } = this.getOptions();
    const dayNum = new Date(currentDate).getDay();
    if (dayNum === 0) {
      return currentDate;
    } else {
      return currentDate.addDays(-dayNum + 1);
    }
  }

  getOptions() {
    return CommunicationService.getInstance().getOptions(
      this.id
    )! as IWeekViewOptions;
  }

  next() {
    let { currentDate } = this.getOptions();
    currentDate.addDays(this.sprintDays);
    //const auxDate = new Date(currentDate);
    this.columns.forEach((column) => {
        let columnHead = column as ColumnHead
       let date = columnHead.getDate();
       date.addDays(this.sprintDays);
       columnHead.setTextDay(date.getDate().toString());
       columnHead.setTextLabel(getLabelDays(date.getDay()));
    })
    this.descriptionHead.update();
  }

  previous() {
    let { currentDate } = this.getOptions();
    currentDate.addDays(-this.sprintDays);
    //const auxDate = new Date(currentDate);
    this.columns.forEach((column) => {
        let columnHead = column as ColumnHead
       let date = columnHead.getDate();
       date.addDays(-this.sprintDays);
       columnHead.setTextDay(date.getDate().toString());
       columnHead.setTextLabel(getLabelDays(date.getDay()));
    })
    this.descriptionHead.update();
  }

  render() {
    let { omitDays, currentDate } = this.getOptions();
    this.elementHeader.innerHTML = "";
    this.descriptionHead = new DescriptionHead(this.id);
    this.descriptionHead.render(this.elementHeader);

    let numColumns = 0;
    currentDate = this.buildStartDate();
    const auxDate = new Date(currentDate);
    for (let i = 0; i < this.sprintDays; i++) {
      if (omitDays!.includes(auxDate.getDay())) {
        auxDate.addDays(1);
        continue;
      }
      numColumns++;
      const column = new ColumnHead(this.elementHeader, new Date(auxDate));
      column.render();
      this.columns.push(column);
      auxDate.addDays(1);
    }
    this.elementHeader.style.gridTemplateColumns = `var(--width-label-hours) repeat(${numColumns}, calc(calc(100% - var(--width-label-hours)) / ${numColumns}))`;
  }
}
