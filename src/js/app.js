import '../css/style.css';
import { drawStar, drawShape } from './modules/graph';
import { AdaptableCanvas } from './modules/adaptable-canvas';

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

const graph2 = ({ ctx, fixedOrigin: { x, y } }) => {
  ctx.beginPath();
  ctx.strokeStyle = '#C70039';
  ctx.moveTo(x + 200, y + 200);
  ctx.lineTo(x + 400, y + 400);
  ctx.stroke();
  ctx.closePath();
};

window.addEventListener('load', () => {
  let canvas = new AdaptableCanvas({
    canvas: document.getElementById('shape'),
    gridSize: 20,
    render: [graph, graph2],
  });
  canvas.render();

  let canvas2 = new AdaptableCanvas({
    canvas: document.getElementById('star-shape'),
    gridSize: 50,
  });
  canvas2.render();
});
