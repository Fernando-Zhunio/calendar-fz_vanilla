"use strict";

function makeResizableDiv(div) {
  const element = document.querySelector(div);
  const resizers = document.querySelector(div + " .resizer");
  const minimum_size = 20;
  //   let original_width = 0;
  let original_height = 0;
  //   let original_x = 0;
  let original_y = 0;
  //   let original_mouse_x = 0;
  let original_mouse_y = 0;
  resizers.addEventListener("mousedown", function (e) {
    e.preventDefault();

    original_height = parseFloat(
      getComputedStyle(element, null)
        .getPropertyValue("height")
        .replace("px", "")
    );
    original_y = element.getBoundingClientRect().top;
    original_mouse_y = e.pageY;
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResize);
  });

  function resize(e) {
    if (resizers.classList.contains("bottom-right")) {
      const offset = e.pageY - original_mouse_y;
      if (offset%15 != 0) {
        return;
      }
      const height = original_height + (e.pageY - original_mouse_y);
        if (height > minimum_size) {
          element.style.height = height + "px";
      }
    }
  }

  function stopResize() {
    window.removeEventListener("mousemove", resize);
  }
}
makeResizableDiv(".resizable");
