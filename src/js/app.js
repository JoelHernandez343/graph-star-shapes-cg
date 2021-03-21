import '../css/style.css';
import { drawStar, drawShape } from './modules/graph';
import { AdaptableCanvas } from './modules/adaptable-canvas';
import { renderItems } from './modules/sorteable-list';
import { PointList } from './modules/ui';
import { getId } from './modules/tools';

const graph = ({ ctx }) => {
  let shape = [
    { x: 50, y: 50 },
    { x: 100, y: 20 },
    { x: 200, y: 50 },
    { x: 100, y: 200 },
  ];
  shape = shape.map(({ x, y }) => ({ x: x * 2, y: y * 2 }));
  drawShape(shape, '#42A5F6', ctx, 3);
  drawStar(shape, { x: 160, y: 110 }, '#C70039', ctx, 3);
};

window.addEventListener('load', () => {
  let canvas = new AdaptableCanvas({
    canvas: getId('shape'),
    gridSize: 20,
  });
  canvas.render();

  let canvas2 = new AdaptableCanvas({
    canvas: getId('star-shape'),
    gridSize: 20,
  });
  canvas2.render();

  let list = getId('shape-points');
  let pointList = new PointList(list, 4);

  getId('add-shape-points').addEventListener('click', () => pointList.append());

  getId('graph-shape').addEventListener('click', () => {
    let shape = pointList.getAllPoints();

    canvas.changeRenderFun(({ ctx }) => {
      drawShape(shape, '#42A5F6', ctx, 3);
    });
  });

  getId('clear-shape').addEventListener('click', () => {
    canvas.changeRenderFun(() => {});
  });
});
