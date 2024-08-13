export class PopoverContent {
    // querySelector: string = "";

    setQuerySelector(querySelector: string) {
        this.querySelector = querySelector;
    }

    constructor(protected querySelector: string) {
        const element = this.getElement();
        element.style.display = "none";
        element.style.position = "absolute";
        element.style.zIndex = "100";
    }

    show() {
        this.getElement().style.display = "block";
    }

    hide() {
        this.getElement().style.display = "none";
    }

    getElement() {
        return document.querySelector(this.querySelector)! as HTMLElement;
    }

    
}