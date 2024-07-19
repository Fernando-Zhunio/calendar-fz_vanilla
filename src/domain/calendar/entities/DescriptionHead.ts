import { CommunicationService } from "../../../application/CommunicationService"
import { getLabelMonths } from "../../tools/tools"

export class DescriptionHead {
    elementYear = document.createElement("span")
    elementMonth = document.createElement("strong")
    elementDescription = document.createElement("div")
    elementContentDescription = document.createElement("small")
    constructor(private calendarId: string) {
        this.elementDescription.classList.add("calendar__description")
        this.elementDescription.append(this.elementContentDescription)
        this.elementContentDescription.classList.add("calendar-text-truncate")
        this.elementContentDescription.classList.add("calendar-description-head")
        this.elementYear.classList.add("calendar__label_year")
        this.elementMonth.classList.add("calendar__label_month")
        this.elementContentDescription.append(this.elementMonth, this.elementYear)
    }

    render(parent: HTMLElement) {
        this.update()
        parent.append(this.elementDescription)
    }

    update() {
        const {currentDate} = CommunicationService.getOptions(this.calendarId)!
        this.setTextYear('/'+currentDate.getFullYear().toString())
        this.setTextMonth(getLabelMonths(currentDate.getMonth()))
    } 

    setTextYear(text: string) {
        this.elementYear.textContent = text
    }

    setTextMonth(text: string) {
        this.elementMonth.textContent = text
    }
}