import { CalendarTask } from "../../domain/calendar/entities/Task/CalendarTask";
import { calculeTopAndHeight } from "../../domain/tools/tools";

export class TaskFactory {
/**
 * Creates a new CalendarTask instance based on the specified date and duration.
 *
 * @param date - The starting date and time for the task.
 * @param duration - The duration of the task in minutes.
 * @returns The created CalendarTask instance.
 */
    static createTask(date: Date, duration: number, ) {
        const task = new CalendarTask(date, duration);
        const {} = calculeTopAndHeight(date, duration);
    }
    
}
