const renderGrid = ({
  x,
  y,
  gridSize,
  ctx,
  canvas,
  width,
  height,
  gridColor,
}) => {
  let [w, h] = [canvas.width, canvas.height];

  x = (-(x / gridSize + 1) | 0) * gridSize + 0.5;
  y = (-(y / gridSize + 1) | 0) * gridSize + 0.5;

  ctx.lineWidth = 0.5;
  ctx.strokeStyle = gridColor;
  ctx.globalAlpha = 0.8;

  let xlim = Math.min(w + 2 * gridSize, width);
  let ylim = Math.min(h + 2 * gridSize, height);

  ctx.save();

  for (let i = 0; i < xlim; i += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x + i, y);
    ctx.lineTo(x + i, y + ylim);
    ctx.stroke();
  }

  for (let i = 0; i < ylim; i += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, y + i);
    ctx.lineTo(x + xlim, y + i);
    ctx.stroke();
  }

  ctx.restore();
};

export { renderGrid };
