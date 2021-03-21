import { drawPoint } from './draw-point';

const drawShape = (originalShape, color, ctx, lineWidth = 1) => {
  let shape = [...originalShape];
  let begin = shape.pop();
  let i = 0;

  ctx.save();

  ctx.lineWidth = lineWidth;

  ctx.beginPath();
  ctx.strokeStyle = color;

  ctx.moveTo(begin.x, begin.y);

  shape.forEach(({ x, y }) => ctx.lineTo(x, y));
  ctx.closePath();

  ctx.stroke();

  originalShape.forEach(point => drawPoint(point, i++, color, ctx));

  ctx.restore();
};

export { drawShape };
