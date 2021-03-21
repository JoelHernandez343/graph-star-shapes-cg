import { drawShape } from './draw-shape';
import { drawPoint } from './draw-point';
import { drawSegment } from './draw-segment';

const drawStar = (shape, center, color, ctx, lineWidth = 1) => {
  if (shape.length === 0) {
    return;
  }

  let segments = drawShape(shape, color, ctx, lineWidth);
  drawPoint(center, segments, color, ctx);

  shape.forEach(point =>
    drawSegment({
      start: center,
      end: point,
      color,
      ctx,
      segmentNumber: ++segments,
      drawEnd: false,
      lineWidth,
    })
  );
};

export { drawStar };
