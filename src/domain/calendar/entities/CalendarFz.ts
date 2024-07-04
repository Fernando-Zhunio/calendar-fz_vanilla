import { TypesCalendarEvent, TypesView } from "../../tools/tools";
import { WeekView } from "../values-object/WeekView";
import { IView } from "./iview";

export class CalendarFz {
  view!: IView;
  element: HTMLElement;
  constructor(querySelector: string, typeView: TypesView = TypesView.weeks) {
    this.element = document.querySelector(querySelector)!;
    if (!this.element) {
      throw new Error("Element not found");
    }
    // document.addEventListener(TypesCalendarEvent.CalendarRowClick, (e) => {
    //   console.log(e);
    // })
    this.changeView(typeView);
  }

  render() {
    this.view.render(this.element);
  }

  changeView(typeView: TypesView) {
    switch (typeView) {
      case TypesView.days:
        break;
      case TypesView.weeks:
        this.view = new WeekView(this.element);
        break;

      default:
        break;
    }

    this.render();
  }
}
