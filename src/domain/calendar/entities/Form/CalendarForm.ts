import { CalendarField } from "./CalendarField";
import { CalendarTask } from "../Task/CalendarTask";
import { AbstractControl } from "./AbstractControl";

export class CalendarForm<T> {
    state: 'edit' | 'create' = 'create';
    task: CalendarTask | null = null;
    fields: { [key: string]: AbstractControl } = {};
    constructor(protected id: string, fields:{[key: string]: AbstractControl}) {
        this.fields = fields
        Object.entries(this.fields).forEach(([key, value]) => {
            //value.input = this.getElementFieldByName(key);
            value.init();
        })
    }

    addField(fieldName: string, value: any) {
        const calendarField = new CalendarField(fieldName);
        this.fields[fieldName] =  this.getElementFieldByName(fieldName) as HTMLInputElement;
        this.fields[fieldName].value = value;
        return this;
    }

    get(fieldName: string){
        return this.fields[fieldName]
    }

    private getElementFieldByName(fieldName: string) {
        return document.querySelector(`#${this.id} [calendar-field="${fieldName}"]`)! as HTMLInputElement;
    }

    changeStateToEdit(task: CalendarTask) {
        this.state = 'edit';
        this.task = task;
    }


}