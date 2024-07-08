import { computePosition, flip, shift } from "@floating-ui/dom";

export class Popover {
  element!: HTMLElement;
  constructor(private templateId: string) {
    this.element = document.getElementById(templateId)!;
    this.element.classList.add('calendar__popover');
    this.element.classList.add('hidden');
    this.close();
  }

  getElement() {
    return document.getElementById(this.templateId)!;
  }
  virtualElement(clientX: number, clientY: number) {
    return {
      getBoundingClientRect() {
        return {
          width: 0,
          height: 0,
          x: clientX,
          y: clientY,
          top: clientY,
          left: clientX,
          right: clientX,
          bottom: clientY,
        };
      },
    };
  }

  close() {
    const element = this.getElement();
    element.querySelector('button[name=close]')!.addEventListener('click', () => {
      element.classList.add('hidden');
    });
  }

  open(clientX: number, clientY: number) {
    const template = this.getTemplate();
    template.classList.remove('hidden');
    console.log(template.clientWidth);
    computePosition(
        this.virtualElement(clientX, clientY), 
        template, {
            strategy: 'fixed',
            middleware: [
                flip(),
                shift({ padding: 8 }),
            ]
        }).then(
      (data) => {
        Object.assign(template.style, {
            left: `${data.x}px`,
            top: `${data.y}px`,
          });
      }
    );
  }

  getTemplate() {
    const clone = this.getElement() as HTMLTemplateElement;
    let header = clone.querySelector("h2")!;
    header.textContent = "test";
    return clone;
  }
}
