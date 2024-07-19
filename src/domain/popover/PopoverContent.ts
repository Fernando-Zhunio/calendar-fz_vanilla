export class PopoverContent {
    // querySelector: string = "";

    setQuerySelector(querySelector: string) {
        this.querySelector = querySelector;
    }

    constructor(protected querySelector: string) {
        this.getElement().style.display = "none";
        this.getElement().style.position = "absolute";
        this.getElement().style.zIndex = "100";
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