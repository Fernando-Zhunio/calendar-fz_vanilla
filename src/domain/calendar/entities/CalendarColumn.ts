// import { formatDateYYYYMMDD } from "../../tools/tools";
//import { IColumn } from "../contracts/IColumn";
// import { type TaskBody } from "./TaskBody";

import { CalendarElement } from "../values-object/CalendarElement";

export class CalendarColumn extends CalendarElement {
    private key!: any
    constructor(parent: HTMLElement) {
        super(parent);
    }

    getElement() {
        return this.element;
    }

    getKey() {
        return this.key;
    }

    setKey(key: any) {
        this.key = key;
    }
    
}