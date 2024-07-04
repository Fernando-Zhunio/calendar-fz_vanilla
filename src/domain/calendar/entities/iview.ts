import { TypesView } from "../../tools/tools"

export interface IView {
    render(element: HTMLElement): void
    changeView(): void
    //setView(typeView: TypesView): void

    //typeView: TypesView
}