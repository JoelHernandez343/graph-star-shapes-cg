class MouseHandler {
  constructor(adaptableCanvas) {
    this.x = 0;
    this.y = 0;
    this.lastX = 0;
    this.lastY = 0;
    this.button = false;
    this.drag = false;

    this.adaptableCanvas = adaptableCanvas;
    this.canvas = adaptableCanvas.canvas;

    this.registerEvents();
  }

  mouseEvent(e) {
    const bounds = this.canvas.getBoundingClientRect();
    this.x = e.pageX - bounds.left - scrollX;
    this.y = e.pageY - bounds.top - scrollY;
    this.button =
      e.type === 'mousedown'
        ? true
        : e.type === 'mouseup'
        ? false
        : this.button;
  }

  registerEvents() {
    ['mousedown', 'mouseup', 'mousemove'].forEach(event =>
      this.canvas.addEventListener(event, e => this.mouseEvent(e))
    );
  }

  checkMouse() {
    let { x, y, width, height } = this.adaptableCanvas;
    let [w, h] = [this.canvas.width, this.canvas.height];

    if (this.button) {
      if (!this.drag) {
        this.lastX = this.x;
        this.lastY = this.y;
        this.drag = true;
      } else {
        x += this.x - this.lastX;
        y += this.y - this.lastY;

        if (x > 0) {
          x = 0;
        }

        if (y > 0) {
          y = 0;
        }

        if (w - x > width) {
          x = w < width ? w - width : 0;
        }
        if (h - y > height) {
          y = h < height ? h - height : 0;
        }

        this.lastX = this.x;
        this.lastY = this.y;
      }
    } else if (this.drag) {
      this.drag = false;
    }

    return [x, y];
  }
}

export { MouseHandler };
