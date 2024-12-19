// import { IWeekViewOptions } from "../../domain/calendar/contracts/ICalendar";
// import { getLabelDays } from "../../domain/tools/tools";
// import { CalendarHeaderColumn } from "../shared/calendar-header-column";

// export abstract class CalendarMonthHeader  {
//   public abstract currentDate: Date;
//   public abstract key: symbol;
//   public abstract options: IWeekViewOptions;
//   columnsHeader: CalendarHeaderColumn[] = [];
//   elementHeader = document.createElement('div')

//   getElementHeader() {
//     return this.elementHeader;
//   }

//   protected abstract getStartDate(): Date;

//   constructor() {
//     this.assignClassCssHeader();
//   }

//   assignClassCssHeader() {
//     this.getElementHeader().classList.add("calendar__header_week");
//   }

//   refreshHeader() {
//     const startDate = this.getStartDate(); 
//     const element = this.getElementHeader();

//     for (let dayNumber = 0; dayNumber < 7; dayNumber++) {
//       const column = new CalendarHeaderColumn(
//         getLabelDays(startDate.getDay()),
//         startDate.getDate(),
//         !!this.options.omitDays?.includes(startDate.getDay())
//       );
//       startDate.addDays(1);
//       element.append(column.getElement());
//       this.columnsHeader.push(column);
//     }
//   }

//   nextHeader() {
//     const date = new Date(this.currentDate);
//     this.columnsHeader.forEach(x => {
//         const day = date.addDays(1).getDate(); 
//         x.setDay(day)
//     })
//   }
// }
