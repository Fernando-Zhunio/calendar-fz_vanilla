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

export class CalendarFz  {
  view!: IView;
  typeView: TypesView = TypesView.weeks;
  formCreateOrEditTask!: PopoverContent;
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

    Popover.init();
    if (options?.idFormCreateOrEditTask) 
      this.setEnabledPopupInput(options?.idFormCreateOrEditTask)
    if (options?.heightRow)
      this.changeHeightRow(options.heightRow);

    this.calendarMovements = new CalendarTaskMovement(this);
  }

  initCalendar() {
    this.element.setAttribute("calendar-id", this.calendarId);
    CommunicationService.registerCalendar(this.calendarId, this);
    this.changeView(TypesView.weeks, options);
    this.assignClassCss();
  }

  changeHeightRow(height: number) {
    document.documentElement.style.setProperty('--calendar-height-row', height + 'px');
  }

  getId() {
    return this.calendarId;
  }

  setEnabledPopupInput(querySelectorRowClick?: string) {
    if (querySelectorRowClick) {
      this.options.idFormCreateOrEditTask = querySelectorRowClick;
      this.contentClickRow = new PopoverContent(querySelectorRowClick);
      document.addEventListener(TypesCalendarEvent.CalendarRowClick, this.cbPopupClickRow.bind(this));
    } else {
      this.options.idFormCreateOrEditTask = "";
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
    debugger;
    task.setCalendarId(this.getId());
    task.update();
    this.view.addTask(task);
  }

  getData() {
    this.view.getData();
  }

  closePopup() {
    Popover.close();
  }
}

