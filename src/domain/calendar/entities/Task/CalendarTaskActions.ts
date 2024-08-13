import { CalendarElement } from "../../values-object/CalendarElement";

export class CalendarTaskActions extends CalendarElement {

    buttonEdit = document.createElement("button");
    buttonRemove = document.createElement("button");
    svgRemove = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgEdit = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    constructor(parent: HTMLElement) {
        super(parent);
        this.assignClassCss();
        this.element.append(this.buttonEdit, this.buttonRemove);
        this.buttonRemove.append(this.svgRemove);
        this.buttonEdit.append(this.svgEdit);
        this.svgRemove.setAttribute("viewBox", "0 0 448 512");
        this.svgEdit.setAttribute("viewBox", "0 0 512 512");
        this.svgRemove.innerHTML = '<!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M170.5 51.6L151.5 80l145 0-19-28.4c-1.5-2.2-4-3.6-6.7-3.6l-93.7 0c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80 368 80l48 0 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-8 0 0 304c0 44.2-35.8 80-80 80l-224 0c-44.2 0-80-35.8-80-80l0-304-8 0c-13.3 0-24-10.7-24-24S10.7 80 24 80l8 0 48 0 13.8 0 36.7-55.1C140.9 9.4 158.4 0 177.1 0l93.7 0c18.7 0 36.2 9.4 46.6 24.9zM80 128l0 304c0 17.7 14.3 32 32 32l224 0c17.7 0 32-14.3 32-32l0-304L80 128zm80 64l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16z"/>';
        this.svgEdit.innerHTML = '<!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/>'
        // this.buttonRemove.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"></svg>'
        //this.disabledButtons();
    }
    
    assignClassCss() {
        this.element.classList.add("calendar__task_actions");
        this.buttonEdit.classList.add("calendar__task_button");
        this.buttonRemove.classList.add("calendar__task_button");
        this.buttonRemove.style.fill = 'red'
    }



    setIsLoadingEdit(isLoading: boolean) {
        if (isLoading) {
            this.svgEdit.style.display = 'none';
            this.buttonEdit.classList.add("is-loading");
            this.buttonEdit.disabled = true
        } else {
            this.buttonEdit.classList.remove("is-loading");
            this.buttonEdit.disabled = false;
            this.svgEdit.style.display = 'block';
        }
    }

    setIsLoadingDelete(isLoading: boolean) {
        if (isLoading) {
            this.svgRemove.style.display = 'none';
            this.buttonRemove.classList.add("is-loading");
            this.buttonRemove.disabled = true
        } else {
            this.buttonRemove.classList.remove("is-loading");
            this.buttonRemove.disabled = false
            this.svgRemove.style.display = 'block';
        }
    }

    addEventListener(cb: (eventInfo:{event: 'delete'| 'edit'}) => void) {
        this.buttonEdit.addEventListener("click", () => {
            cb({event: 'edit'});
        })
        this.buttonRemove.addEventListener("click", () => {
            cb({event: 'delete'});
        })
    }

    disabledButtons({disabledEdit , disabledRemove} ={disabledEdit: true , disabledRemove : true}) {
        this.buttonEdit.disabled = disabledEdit;
        this.buttonRemove.disabled = disabledRemove;
    }





    


}