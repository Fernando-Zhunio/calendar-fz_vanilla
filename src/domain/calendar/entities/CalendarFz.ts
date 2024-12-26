import { TaskFactory } from "../../../application/factories/task-factory";
import { CalendarWeek } from "../../../application/week/calendar-week";
import { ScopeCalendar, ScopeTokens } from "../../../infraestructure/dependency-container";
import { Popover } from "../../popover/Popover";
import { PopoverContent } from "../../popover/PopoverContent";
import { TypesView } from "../../tools/tools";
import {
  IDayViewOptions,
  IWeekViewOptions,
  defaultWeekViewOptions,
  defaultDayViewOptions,
} from "../contracts/ICalendar";
import { TypesCalendarEvent } from "../contracts/IEventsCalendar";
// import { CalendarTaskMovement } from "../values-object/CalendarTaskMovement";
// import { CalendarWeekView } from "../values-object/CalendarWeekView";
import { IView } from "./iview";
import { CalendarTask } from "./Task/CalendarTask";

export class CalendarFz {
  view!: IView;
  typeView: TypesView = TypesView.weeks;
  formCreateOrEditTask!: PopoverContent;
  private element: HTMLElement;
  scope = new ScopeCalendar();

  constructor(
    querySelector: string,
    private options?: Partial<IWeekViewOptions | IDayViewOptions>
  ) {
    this.element = document.querySelector(querySelector)!;
    if (!this.element) {
      throw new Error("Element not found");
    }
    this.init();
    // Popover.init();
    // if (options?.idFormCreateOrEditTask)
    //   this.setEnabledPopupInput(options?.idFormCreateOrEditTask)
    if (options?.heightRow) this.changeHeightRow(options.heightRow);
    // this.calendarMovements = new CalendarTaskMovement(this);
  }

  assignClassCss() {
    this.element.classList.add("calendar-fz");
  }

  init() {
    this.registerScopes();
    // this.registersContainer();
    // this.element.setAttribute("calendar-id", this.calendarId);
    // CommunicationService.registerCalendar(this.calendarId, this);
    this.changeView(TypesView.weeks);
    this.assignClassCss();
    const task = new CalendarTask(new Date('12-12-2024'), 10);
    this.addTask(task)
  }

  registerScopes() {
    this.scope.setValue(ScopeTokens.CALENDAR, this);
    this.scope.setValue(ScopeTokens.OPTIONS, this.options);
  }

  // registersContainer() {
  //   this.scope.registerSingleton(ConfigurationCalendar);
  //   this.scope.registerSingleton<IView>(CalendarWeek, this.options, this.getElement());
  // }

  changeHeightRow(height: number) {
    document.documentElement.style.setProperty(
      "--calendar-height-row",
      height + "px"
    );
  }

  // setEnabledPopupInput(querySelectorRowClick?: string) {
  //   if (querySelectorRowClick) {
  //     this.options.idFormCreateOrEditTask = querySelectorRowClick;
  //     this.contentClickRow = new PopoverContent(querySelectorRowClick);
  //     document.addEventListener(TypesCalendarEvent.CalendarRowClick, this.cbPopupClickRow.bind(this));
  //   } else {
  //     this.options.idFormCreateOrEditTask = "";
  //     document.removeEventListener(TypesCalendarEvent.CalendarRowClick, this.cbPopupClickRow.bind(this));
  //   }

  // }

  // cbPopupClickRow(e: any) {
  //   Popover.open(e.detail.event.clientX, e.detail.event.clientY, this.contentClickRow);
  // }

  addEventListener(
    typesCalendarEvent: TypesCalendarEvent,
    callback: (e: any) => void
  ) {
    document.addEventListener(typesCalendarEvent, (e: any) =>
      callback(e.detail)
    );
  }

  getElement() {
    return this.element;
  }

  changeView(typeView: TypesView) {
    switch (typeView) {
      case TypesView.days:
        this.options = {
          ...defaultDayViewOptions,
          ...(this.options as IDayViewOptions),
        };
        break;
      case TypesView.weeks:
        this.options = {
          ...defaultWeekViewOptions,
          ...(this.options as IWeekViewOptions),
        };
        this.view = new CalendarWeek(this.options as any, this.element);

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

  goDate(date: Date) {
    this.view.goDate(date);
  }

  changeInterval(interval: number) {
    this.view.changeInterval(interval);
  }

  getView() {
    return this.view;
  }

  addTask(task: CalendarTask) {
    // debugger;
    //task.setCalendarId(this.getId());
    //task.update();
    //this.view.addTask(task);
    TaskFactory.createTask(task, this.scope);
  }

  getData() {
    this.view.getData();
  }

  closePopup() {
    Popover.close();
  }
}

class ConfigurationCalendar {
  options!: IWeekViewOptions | IDayViewOptions;
  element!: HTMLElement;
  calendar!: CalendarFz;
}
