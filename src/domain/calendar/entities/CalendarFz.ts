import { TaskFactory } from "../../../application/factories/task-factory";
import { CalendarWeek } from "../../../application/week/calendar-week";
import { ScopeCalendar, ScopeTokens } from "../../../infraestructure/dependency-container";
import { Popover } from "../../popover/Popover";
import { PopoverContent } from "../../popover/PopoverContent";
import { CalendarEvents, TypesView } from "../../tools/tools";
import {
  IDayViewOptions,
  IWeekViewOptions,
  defaultWeekViewOptions,
  defaultDayViewOptions,
  IEventData,
} from "../contracts/ICalendar";
import { TypesCalendarEvent } from "../contracts/IEventsCalendar";
import { IView } from "./iview";
import { CalendarTask } from "./Task/CalendarTask";

export class CalendarFz {
  view!: IView;
  formCreateOrEditTask!: PopoverContent;
  private element: HTMLElement;
  scope = new ScopeCalendar();
  private options!: IWeekViewOptions | IDayViewOptions;

  constructor(
    querySelector: string,
    private typeView: TypesView = TypesView.weeks,
    options?: Partial<IWeekViewOptions | IDayViewOptions>,
  ) {

    this.element = document.querySelector(querySelector)!;
    if (!this.element) {
      throw new Error("Element not found");
    }

    this.defaultOptions(options || {});
    this.validations();
    this.changeHeightRow(this.options.heightRow);
    this.init();
    // Popover.init();
    // if (options?.idFormCreateOrEditTask)
    //   this.setEnabledPopupInput(options?.idFormCreateOrEditTask)
    
    // this.calendarMovements = new CalendarTaskMovement(this);
  }

  getTypeView() {
    return this.typeView;
  }

  defaultOptions(options: Partial<IWeekViewOptions | IDayViewOptions>) {
    if (this.typeView === TypesView.weeks) {
      this.options = { ...defaultWeekViewOptions, ...options } as IWeekViewOptions;
    } else if (this.typeView === TypesView.days) {
      this.options = { ...defaultDayViewOptions, ...options } as IDayViewOptions;
    }
  }

  assignClassCss() {
    this.element.classList.add("calendar-fz");
  }

  validations() {
    const { intervalMinutes, startTime, endTime } = this.options!;
    if (startTime >= endTime) throw new Error("The start time must be less than the end time");
    if (intervalMinutes <= 0) throw new Error("The interval must be greater than 0");
    const start = startTime.split(":").map(Number);
    if (start[0] < 0 || start[0] > 22) throw new Error("The start time must be between 00:00 and 22:59");
    const end = endTime.split(":").map(Number);
    if ((end[0] < 1 || end[0] > 24)  ) throw new Error("The end time must be between 01:00 and 24:00");
    if (end[0] === 24 && end[1] > 0) throw new Error("The end time must be between 01:00 and 24:00");
  }

  init() {
    this.registerScopes();
    this.changeView(this.typeView);
    this.assignClassCss();
  }

  registerScopes() {
    this.scope.setValue(ScopeTokens.CALENDAR, this);
    this.scope.setValue(ScopeTokens.OPTIONS, this.options);
  }

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

  // addEventListener(
  //   typesCalendarEvent: TypesCalendarEvent,
  //   callback: (e: any) => void
  // ) {
  //   document.addEventListener(typesCalendarEvent, (e: any) =>
  //     callback(e.detail)
  //   );
  // }

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
    TaskFactory.createTask(task, this.scope);
  }

  addTasks(tasks: CalendarTask[]) {
    TaskFactory.createTasks(tasks, this.scope);
  }

  // getData() {
  //   this.view.getData();
  // }

  closePopup() {
    Popover.close();
  }

  addEventListener<E extends CalendarEvents>(event: E, callback: (e: IEventData<E>) => void): void {
    document.addEventListener(event, (e: any) =>
      callback(e.detail)
    );
  }

}

// class ConfigurationCalendar {
//   options!: IWeekViewOptions | IDayViewOptions;
//   element!: HTMLElement;
//   calendar!: CalendarFz;
// }
