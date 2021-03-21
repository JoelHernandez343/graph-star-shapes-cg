const calculateSlope = ({ x1, y1 }, { x2, y2 }) => {
  if (x1 === x2 && y1 === y2) {
    throw 'No se puede crear un segmento con un solo punto';
  }

  return;
};

class Segment {
  constructor(beginPoint, endPoint) {
    this.beginPoint = beginPoint;
    this.endPoint = endPoint;
  }
}
