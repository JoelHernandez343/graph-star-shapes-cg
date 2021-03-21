import { newTr } from './common';

const setPointsTable = (points, body) =>
  points.forEach(({ x, y }, index) => body.appendChild(newTr([index, x, y])));

const setSegmentsTable = (segments, body) =>
  segments.forEach(([{ x: x1, y: y1 }, { x: x2, y: y2 }], index) =>
    body.appendChild(newTr([index, x1, y1, x2, y2]))
  );

export { setPointsTable, setSegmentsTable };
