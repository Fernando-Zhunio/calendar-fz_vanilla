import { CommunicationService } from "../../../application/CommunicationService";
import { TypesView } from "../../tools/tools";
import { IDayViewOptions, IWeekViewOptions, defaultWeekViewOptions, defaultDayViewOptions } from "../contracts/ICalendar";
import { TypesCalendarEvent } from "../contracts/IEventsCalendar";
import { WeekView } from "../values-object/WeekView";
import { IView } from "./iview";

export class CalendarFz {
  view!: IView;
  private element: HTMLElement;
  private id = Symbol("CalendarFz");
  private options!: IWeekViewOptions | IDayViewOptions;

  constructor(
    querySelector: string,
    options?: Partial<IWeekViewOptions | IDayViewOptions>
  ) {
    this.element = document.querySelector(querySelector)!;
    if (!this.element) {
      throw new Error("Element not found");
    }
    CommunicationService.getInstance().registerCalendar(this.id, this);
    this.changeView(TypesView.weeks, options);
  }

  addEventListener(typesCalendarEvent:TypesCalendarEvent, callback: (e: any) => void) {
    document.addEventListener(typesCalendarEvent, (e: any) => callback(e.detail));
  }

  getElement() {
    return this.element;
  }

  render() {
    this.view.render(this.element);
  }


  changeView(typeView: TypesView, options?: Partial<IWeekViewOptions | IDayViewOptions>) {
    switch (typeView) {
      case TypesView.days:
        this.options = {
          ...defaultDayViewOptions,
          ...options,
        };
        break;
      case TypesView.weeks:
        this.options = {
          ...defaultWeekViewOptions,
          ...options,
        };
        this.view = new WeekView(this.id);
        break;

      default:
        break;
    }

    this.render();
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

  addTask(day: number, startHour: string, duration: number, template: HTMLElement | string) {
    CommunicationService.getInstance()
    .addTask(this.id, day, startHour, duration, template);
  }
}

