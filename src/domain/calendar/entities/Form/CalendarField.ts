import { AbstractControl } from "./AbstractControl";

export class CalendarField extends AbstractControl {

    input!: HTMLInputElement
    parent

    constructor(protected value: string, private fieldName?: string) {  
        super();
        if (this.fieldName) {
            this.init(fieldName!);
        }
    }

    init(fieldName: string) {
        this.input = document.querySelector(fieldName)! as HTMLInputElement;
        this.input.value = this.value;
    }

    getValue() {
        return this.input.value;
    }

    setValue(value: any) {
        this.input.value = value;
    }
}