import { drawPoint } from './draw-point';

const drawSegment = ({
  start,
  end,
  segmentNumber,
  color,
  ctx,
  drawStart = false,
  drawEnd = true,
  startNumber = 0,
  endNumber = 1,
  lineWidth = 1,
}) => {
  let middlePoint = {
    x: (start.x + end.x) / 2,
    y: (start.y + end.y) / 2,
  };

  if (drawStart) {
    drawPoint(start, startNumber, color, ctx);
  }
  if (drawEnd) {
    drawPoint(end, endNumber, color, ctx);
  }

  ctx.save();

  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.font = '20px Verdana';

  ctx.beginPath();

  ctx.fillText(`S${segmentNumber}`, middlePoint.x + 10, middlePoint.y + 10);
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();

  ctx.closePath();

  ctx.restore();
};

export { drawSegment };
