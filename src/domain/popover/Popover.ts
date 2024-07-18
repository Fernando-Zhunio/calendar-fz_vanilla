import { computePosition, flip, shift } from "@floating-ui/dom";
import { PopoverBtnClose } from "./PopoverBtnClose";

export class Popover {
  static element: HTMLElement = document.createElement("div");
  constructor() {
    // Popover.element = document.getElementById(templateId)!;
  }
  
  static init() {
    const btnClose = new PopoverBtnClose();
    btnClose.getElement().addEventListener("click", () => {
      Popover.close();
    })
    const element = Popover.element;
    element.append(btnClose.getElement());
    element.classList.add("calendar__popover");
    document.body.appendChild(Popover.element);
    element.classList.add("calendar__popover");
    element.style.display = "none";
    // element.style.border = '1px solid black';
    element.style.borderRadius = "5px";
    element.style.zIndex = "10000";
    // element.style.boxShadow = '0 0 10px 0 rgba(0, 0, 0, 0.2)';
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
    element.style.display = "none";
  }

  static lastElement() {
    return this.element;
  }

  static open(clientX: number, clientY: number, template: HTMLElement) {
    const element = Popover.lastElement();
    element.style.display = "inline-block";
    if (element.childElementCount > 1) {
      element.lastElementChild!.remove();
    }
    element.append(template);
    computePosition(Popover.virtualElement(clientX, clientY), element, {
      strategy: "absolute",
      middleware: [flip(), shift({ padding: 8 })],
    }).then((data) => {
      Object.assign(element.style, {
        left: `${data.x}px`,
        top: `${data.y}px`,
      });
    });
  }

  // getTemplate() {
  //   const clone = this.getElement() as HTMLTemplateElement;
  //   let header = clone.querySelector("h2")!;
  //   header.textContent = "test";
  //   return clone;
  // }
}
