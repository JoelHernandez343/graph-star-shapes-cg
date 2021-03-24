import { mod } from './../tools';
import { closedSegmentsIntersect } from './segments';

const isSimpleShape = segments => {
  for (let i = 0; i < segments.length; ++i) {
    for (let j = 0; j < segments.length - 3; ++j) {
      if (
        closedSegmentsIntersect(
          segments[i],
          segments[mod(i + 2 + j, segments.length)]
        )
      ) {
        return [i, mod(i + 2 + j, segments.length)];
      }
    }
  }

  return true;
};

const getSegments = points => {
  let segments = [];

  let shape = [...points];
  let before = shape.shift();
  shape.push(before);

  shape.forEach(current => {
    segments.push([before, current]);
    before = current;
  });

  return segments;
};

class Shape {
  constructor(points) {
    this.setPoints(points);
  }

  setPoints(points) {
    this.points = points;
    this.segments = getSegments(points);
    this.isSimple = isSimpleShape(this.segments);
  }

  getPoints() {
    return this.points;
  }

  getSegments() {
    return this.segments;
  }

  isSimpleShape() {
    return this.isSimple;
  }
}

export { Shape };
