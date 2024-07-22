import { CommunicationService } from "../../../application/CommunicationService";
import { Popover } from "../../popover/Popover";
import { PopoverContent } from "../../popover/PopoverContent";
import { generateUuid, TypesView } from "../../tools/tools";
import { IDayViewOptions, IWeekViewOptions, defaultWeekViewOptions, defaultDayViewOptions } from "../contracts/ICalendar";
import { TypesCalendarEvent } from "../contracts/IEventsCalendar";
import { CalendarTaskMovement } from "../values-object/CalendarTaskMovement";
import { CalendarWeekView } from "../values-object/CalendarWeekView";
import { IView } from "./iview";
import { CalendarTask } from "./Task/CalendarTask";

export abstract class CalendarFz {
  view!: IView;
  typeView: TypesView = TypesView.weeks;
  contentClickRow!: PopoverContent;
  private element: HTMLElement;
  private options!: IWeekViewOptions | IDayViewOptions;
  private calendarId = generateUuid();
  private calendarMovements!: CalendarTaskMovement;
  constructor(
    querySelector: string,
    options?: Partial<IWeekViewOptions | IDayViewOptions>
  ) {
    this.element = document.querySelector(querySelector)!;
    if (!this.element) {
      throw new Error("Element not found");
    }
    this.calendarMovements = new CalendarTaskMovement(this);

    this.element.setAttribute("calendar-id", this.calendarId);
    CommunicationService.registerCalendar(this.calendarId, this);
    this.changeView(TypesView.weeks, options);
    this.assignClassCss();
    Popover.init();
    if (options?.querySelectorRowClick) {
      this.setEnabledPopupInput(true, options?.querySelectorRowClick)
    }
  }

  setEnabledPopupInput(enabled: boolean, querySelectorRowClick?: string) {
    if (enabled && querySelectorRowClick) {
      this.options.querySelectorRowClick = querySelectorRowClick;
      this.contentClickRow = new PopoverContent(querySelectorRowClick);
      document.addEventListener(TypesCalendarEvent.CalendarRowClick, this.cbPopupClickRow.bind(this));
    } else {
      this.options.querySelectorRowClick = "";
      document.removeEventListener(TypesCalendarEvent.CalendarRowClick, this.cbPopupClickRow.bind(this));
    }
  }

  

  cbPopupClickRow(e: any) {
    Popover.open(e.detail.event.clientX, e.detail.event.clientY, this.contentClickRow);
  }

  addEventListener(typesCalendarEvent:TypesCalendarEvent, callback: (e: any) => void) {
    document.addEventListener(typesCalendarEvent, (e: any) => callback(e.detail));
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
        this.view = new CalendarWeekView(this.calendarId, this.element);
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

  addTask(task: CalendarTask) {
    this.view.addTask(task);
  }

  getData() {
    this.view.getData();
  }

  closePopup() {
    Popover.close();
  }
}

