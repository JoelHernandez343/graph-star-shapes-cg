const drawPoint = ({ x, y }, number, color, ctx) => {
  ctx.save();

  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.font = '20px Verdana';

  ctx.arc(x, y, 4, 0, 2 * Math.PI);
  ctx.fill();
  ctx.fillText(`P${number}`, x + 10, y + 10);

  ctx.stroke();

  ctx.closePath();

  ctx.restore();
};

export { drawPoint };
