import { MouseHandler } from './mouse-handler';
import { renderGrid } from './render-grid';
import { dark, superLight } from './../colors';

class AdaptableCanvas {
  constructor({
    canvas,
    height = 2000,
    width = 2000,
    render = () => {},
    drawGrid = true,
    gridSize = 10,
    fitParent = true,
    bgColor = dark,
    gridColor = superLight,
  }) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this.height = height;
    this.width = width;

    this.x = 0;
    this.y = 0;

    this.mouseHandler = new MouseHandler(this);

    this.drawGrid = drawGrid;
    this.gridSize = gridSize;
    this.gridColor = gridColor;

    this.fitParent = fitParent;

    this.renderFun = Array.isArray(render)
      ? render.map(cb => () => cb(this.getParams()))
      : [() => render(this.getParams())];

    this.canvas.style.backgroundColor = bgColor;
  }

  getParams() {
    return {
      canvas: this.canvas,
      ctx: this.ctx,
      fixedOrigin: {
        x: -this.x,
        y: -this.y,
      },
      dimensions: {
        height: this.height,
        width: this.width,
      },
    };
  }

  reset() {
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.globalAlpha = 1;

    let [pw, ph] = [
      this.canvas.parentNode.clientWidth,
      this.canvas.parentNode.clientHeight,
    ];
    let [w, h] = [this.canvas.width, this.canvas.height];

    if ((w !== pw || h !== ph) && this.fitParent) {
      w = this.canvas.width = pw;
      h = this.canvas.height = ph;
    } else {
      this.ctx.clearRect(0, 0, w, h);
    }
  }

  resetCoordinates() {
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  applyCoordinates() {
    this.ctx.setTransform(1, 0, 0, 1, this.x, this.y);
  }

  updateMouseEvents() {
    [this.x, this.y] = this.mouseHandler.checkMouse(this);
  }

  render() {
    this.reset();

    this.updateMouseEvents();
    this.applyCoordinates();

    this.renderGrid();
    this.renderFun.forEach(f => f());

    this.resetCoordinates();

    requestAnimationFrame(() => this.render());
  }

  renderGrid() {
    if (this.drawGrid) {
      renderGrid(this);
    }
  }
}

export { AdaptableCanvas };
