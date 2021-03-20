const drawShape = (originalShape, color, ctx, lineWidth = 1) => {
  let shape = [...originalShape];
  let begin = shape.pop();

  ctx.save();

  ctx.lineWidth = lineWidth;

  ctx.beginPath();
  ctx.strokeStyle = color;

  ctx.moveTo(begin.x, begin.y);
  shape.forEach(({ x, y }) => ctx.lineTo(x, y));
  ctx.closePath();

  ctx.stroke();

  ctx.restore();
};

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

export { drawShape, drawStar };
