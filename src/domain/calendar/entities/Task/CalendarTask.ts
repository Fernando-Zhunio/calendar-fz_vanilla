export interface ITaskPosition {
    top?: string
    left?: string
    height?: string
    width?: string
}

export class CalendarTask {

    element = document.createElement('div');
    taskId!: string

    position: ITaskPosition = {
        top: '0',
        left: '0',
        height: '0px',
        width: '100%'
    }
    constructor(protected date: Date, protected duration: number) {
        this.element.classList.add('calendar__body_task');
        Object.assign(this.element.style, this.position);
    }

    getDate() {
        return this.date
    }

    getDuration() {
        return this.duration
    }

    setDuration(duration: number) {
        this.duration = duration
        return this
    }

    setTaskId(id: string) {
        this.element.setAttribute('task-id', id)
        this.taskId = id
        return this
    }

    getId() {
        return this.taskId
    }

    getElement() {
        return this.element
    }


    setPosition(position: ITaskPosition) {
        this.position = position;
        Object.assign(this.element.style, this.position)
    }

    getPosition() {
        return this.position
    }

    render(parent: HTMLElement) {
        parent.append(this.element)
    }

    setHeight(height: string, minutes: number) {
        this.position.height = height
        this.duration+=minutes;
        this.element.style.height = height
       // Object.assign(this.element.style, this.position)    
    }
}