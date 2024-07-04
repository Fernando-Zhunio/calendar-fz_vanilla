import { TypesCalendarEvent } from "../../tools/tools";
import { Column } from "./Column";

export class ColumnBody extends Column {

    constructor(public parent: HTMLElement, protected date: Date) {
        super(parent, date);
        this.getElement().classList.add("calendar__body_week_columns__column");
        this.getElement().addEventListener("click", () => {
            console.log(this.date, 'hola mundo');
        })
        document.addEventListener(TypesCalendarEvent.CalendarRowClick, (e) => {
            console.log(e);
          })
    }
    
    setDate() {
        this.date = new Date(this.date);
        return this;
    }
    render() {
        super.render();
    }

}