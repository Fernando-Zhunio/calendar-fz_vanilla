import { Popover } from "./Popover";

export class PopoverBackdrop {
     static element: HTMLElement;


    static init() {
        this.element = document.createElement("div");
        document.body.append(this.element);

        this.element.style.display = "none";
        this.element.classList.add("calendar__popover_backdrop");

        this.element.addEventListener("click", () => {
            Popover.close();
        });
    }

    static show() {
        this.element.style.display = "inline-block";
    }

    static hide() {
        this.element.style.display = "none";
    }

    static getElement() {
        return this.element;
    }
}