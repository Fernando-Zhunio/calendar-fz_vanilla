import { computePosition, flip, shift } from "@floating-ui/dom";
import { PopoverBackdrop } from "./PopoverBackdrop";
import { PopoverContent } from "./PopoverContent";
import { PopoverBtnClose } from "./PopoverBtnClose";

export class Popover {
  static element: HTMLElement = document.createElement("div");
  static content: PopoverContent
  
  static init() {
    PopoverBtnClose.init();
    PopoverBackdrop.init();
    Popover.builderElement();
    Popover.assignClassCss();
    
    this.element.append(PopoverBtnClose.getElement());
    this.element.addEventListener("click", (e) => {
      e.stopPropagation();
    })
  }

  private static builderElement() {
    PopoverBackdrop.getElement().append(Popover.getElement());
  }

  static getElement() {
    return Popover.element;
  }

  private static assignClassCss() {
    Popover.element.classList.add("calendar__popover");
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
    PopoverBackdrop.hide();
    this.content?.hide();
  }

  static open(clientX: number, clientY: number, content: PopoverContent) {
    Popover.content = content
    const element = content.getElement();
    content.show();
    PopoverBackdrop.getElement().style.display = "inline-block";
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
}
