import { computePosition, flip, shift } from "@floating-ui/dom";

export class Popover {
  static element: HTMLElement;
  constructor() {
    // Popover.element = document.getElementById(templateId)!;
    Popover.element.classList.add('calendar__popover');
    Popover.element.classList.add('hidden');
    // this.close();
  }
  
  static virtualElement(clientX: number, clientY: number) {
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

  static close() {
    const element = Popover.lastElement();
    element.querySelector('button[name=close]')!.addEventListener('click', () => {
      element.classList.add('hidden');
    });
  }

  static lastElement() {return this.element;}

  static open(clientX: number, clientY: number, template: HTMLElement) {
    //const template = this.getTemplate();
    template.style.display = 'inline-block';
    Popover.lastElement().appendChild(template);
    computePosition(
        Popover.virtualElement(clientX, clientY), 
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

  // getTemplate() {
  //   const clone = this.getElement() as HTMLTemplateElement;
  //   let header = clone.querySelector("h2")!;
  //   header.textContent = "test";
  //   return clone;
  // }
}
