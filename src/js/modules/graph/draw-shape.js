import { drawSegment } from './draw-segment';

const drawShape = (original, color, ctx, lineWidth = 1) => {
  if (original.length === 0) {
    return;
  }

  let shape = [...original];
  let begin = shape.pop();
  let before = begin;
  let segment = 0;

  shape.forEach(current => {
    drawSegment({
      start: before,
      end: current,
      color,
      ctx,
      lineWidth,
      segmentNumber: segment,
      endNumber: segment,
    });

    segment++;
    before = current;
  });

  drawSegment({
    start: before,
    end: begin,
    color,
    ctx,
    segmentNumber: segment,
    endNumber: 0,
    lineWidth,
  });

  return segment;
};

export { drawShape };
