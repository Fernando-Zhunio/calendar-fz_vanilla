import { CalendarTask } from "../../domain/calendar/entities/Task/CalendarTask";
import { CalendarElement } from "../../domain/calendar/values-object/CalendarElement";
import { CssWeekHeader } from "../../shared/Css";

export class CalendarBodyColumn extends CalendarElement {

    taskList: CalendarTask[] = [];
    constructor(private date: Date, protected isDisabled: boolean) {
        super();
        this.assignStylesCss();
    }


    getDate() {
        return this.date;
    }


    setDate(date: Date) {
        this.date = date;
    }

    setEnabled() {
        this.isDisabled = false;
        this.getElement().classList.remove(CssWeekHeader.columnDisabled);
    }

    setDisabled() {
        this.isDisabled = true;
        this.getElement().classList.add(CssWeekHeader.columnDisabled);
    }

    assignStylesCss() {
        this.getElement().classList.add("calendar__body_column");
        if (this.isDisabled)
            this.getElement().classList.add("calendar__body_column--disabled");
    }

    addTask(calendarTask: CalendarTask) {
        this.taskList.push(calendarTask);
        console.log("add task")
    }
    
}