export interface ITaskPosition {
    top?: string
    left?: string
    height?: string
    width?: string
}

export class TaskBody {

    id = Symbol('TaskBody');
    element = document.createElement('div');
    position: ITaskPosition = {
        top: '0',
        left: '0',
        height: '0px',
        width: '100%'
    }
    constructor(position: ITaskPosition) {
        this.element.classList.add('calendar__body_task');
        this.position = position;
        Object.assign(this.element.style, this.position);
    }

    setId(id: any) {
        this.id = id
        return this
    }

    getId() {
        return this.id
    }

    getElement() {
        return this.element
    }

    setTaskPosition(position: ITaskPosition) {
        this.position = position;
        Object.assign(this.element.style, this.position)
    }

    render(parent: HTMLElement) {
        parent.append(this.element)
    }
}