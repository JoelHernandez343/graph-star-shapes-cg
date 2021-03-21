import { drawPoint } from './draw-point';

const drawStar = (shape, center, color, ctx, lineWidth = 1) => {
  ctx.save();

  ctx.beginPath();

  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;

  ctx.moveTo(center.x, center.y);

  shape.forEach(({ x, y }) => {
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.moveTo(center.x, center.y);
  });

  ctx.closePath();

  ctx.restore();
};

export { drawStar };
