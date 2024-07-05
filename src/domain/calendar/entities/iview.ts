
export interface IView {
    render(element: HTMLElement): void
    changeView(): void
    next(): void
    previous(): void
    changeInterval(interval: number): void
    //setView(typeView: TypesView): void

    //typeView: TypesView
}