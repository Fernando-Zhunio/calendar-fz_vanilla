// import { formatDateYYYYMMDD } from "../../tools/tools";
//import { IColumn } from "../contracts/IColumn";
// import { type TaskBody } from "./TaskBody";

import { CalendarElement } from "../values-object/CalendarElement";

export class CalendarColumn extends CalendarElement {
    // private  elementBody = document.createElement("div");
    // private  elementHead = document.createElement("div");
    element = document.createElement("div");
    private key!: any
    constructor(parent: HTMLElement) {
        super(parent);
    }

    getElement() {
        return this.element;
    }

    //abstract addTask(task: TaskBody): void

    getKey() {
        return this.key;
    }

    setKey(key: any) {
        this.key = key;
    }



    // addChild(child: HTMLElement) {
    //     this.elementColumn.append(child);
    // }
    
}