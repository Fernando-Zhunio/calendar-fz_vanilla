import { CommunicationService } from "../../../application/CommunicationService";
import { Popover } from "../../popover/Popover";
import { TypesView } from "../../tools/tools";
import { IDayViewOptions, IWeekViewOptions, defaultWeekViewOptions, defaultDayViewOptions } from "../contracts/ICalendar";
import { TypesCalendarEvent } from "../contracts/IEventsCalendar";
import { CalendarWeekView } from "../values-object/CalendarWeekView";
import { IView } from "./iview";

export class CalendarFz {
  view!: IView;
  private element: HTMLElement;
  private id = Symbol("CalendarFz");
  typeView: TypesView = TypesView.weeks;
  private options!: IWeekViewOptions | IDayViewOptions;
  // popo

  constructor(
    querySelector: string,
    options?: Partial<IWeekViewOptions | IDayViewOptions>
  ) {
    this.element = document.querySelector(querySelector)!;
    if (!this.element) {
      throw new Error("Element not found");
    }
    CommunicationService.registerCalendar(this.id, this);
    this.changeView(TypesView.weeks, options);

    this.assignClassCss();
    Popover.init();
    this.addEventListener(TypesCalendarEvent.CalendarRowClick, (e) => {
      console.log(e.event.clientX, e.event.clientY, e.date, e.hour);
      this.popupClickRow(e.event.clientX, e.event.clientY, e.date, e.hour);
    })
  }

  addEventListener(typesCalendarEvent:TypesCalendarEvent, callback: (e: any) => void) {
    document.addEventListener(typesCalendarEvent, (e: any) => callback(e.detail));
    if (typesCalendarEvent === TypesCalendarEvent.CalendarRowClick) {

    }
  }

  popupClickRow(clientX: number, clientY: number, date: Date, hour: string) {
    const {cbTemplateClickRow} = this.getOptions();
    if (!cbTemplateClickRow || typeof cbTemplateClickRow !== "function") {
      return;
    }

    const template = cbTemplateClickRow(date, hour);
    Popover.open(clientX, clientY, template);
  }

  assignClassCss() {
    this.element.classList.add("calendar__fz");
  }

  getElement() {
    return this.element;
  }

  changeView(typeView: TypesView, options?: Partial<IWeekViewOptions | IDayViewOptions>) {
    switch (typeView) {
      case TypesView.days:
        this.options = {
          ...defaultDayViewOptions,
          ...(options as IDayViewOptions),
        };
        break;
      case TypesView.weeks:
        this.options = {
          ...defaultWeekViewOptions,
          ...(options as IWeekViewOptions),
        };
        this.view = new CalendarWeekView(this.id, this.element);
        break;

      default:
        break;
    }
    this.typeView = typeView;
    //this.render();
  }

  getOptions() {
    return this.options;
  }

  next() {
    this.view.next();
  }

  previous() {
    this.view.previous();
  }

  changeInterval(interval: number) {
    this.view.changeInterval(interval);
  }

  getView() {
    return this.view;
  }

  addTask(dateTime: Date, duration: number, template: HTMLElement | string) {
    this.view.addTask(dateTime, duration);
  }

  getData() {
    this.view.getData();
  }
}

