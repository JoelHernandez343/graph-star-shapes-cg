/*
 * Algorithm to detect if two segments intersects.
 * Based on the @dmitri's answer at
 * https://stackoverflow.com/questions/3838329/how-can-i-check-if-two-segments-intersect
 */

const arePointsEqual = ({ x: x1, y: y1 }, { x: x2, y: y2 }) =>
  x1 === x2 && y1 === y2;

const arePointsColinnear = ({ x1, y1 }, { x2, y2 }, { x3, y3 }) =>
  x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2) === 0;

const getSide = (segment, point) => {
  let [start, end] = segment;

  let diff =
    (point.y - start.y) * (end.x - start.x) -
    (end.y - start.y) * (point.x - start.x);

  return diff > 0 ? 1 : diff < 0 ? -1 : 0;
};

// The segment's point and point are expected to be collinear
const isPointInClosedSegment = (segment, point) => {
  let [start, end] = segment;

  if (start.x < end.x) {
    return start.x <= point.x && point.x <= end.x;
  }
  if (end.x < start.x) {
    return end.x <= point.x && point.x <= start.x;
  }

  if (start.y < end.y) {
    return start.y <= point.y && point.y <= end.y;
  }
  if (end.y < start.y) {
    return end.y <= point.y && point.y <= start.y;
  }

  return arePointsEqual(start, point);
};

const closedSegmentsIntersect = (segmentA, segmentB) => {
  let [pointA, pointB] = segmentA;
  let [pointC, pointD] = segmentB;

  // Point and segment
  if (arePointsEqual(pointA, pointB)) {
    if (!arePointsColinnear(pointA, pointC, pointD)) {
      return false;
    }

    return isPointInClosedSegment(segmentB, pointA);
  }

  // Point and segment
  if (arePointsEqual(pointC, pointD)) {
    if (!arePointsColinnear(pointA, pointB, pointC)) {
      return false;
    }

    return isPointInClosedSegment(segmentA, pointC);
  }

  let side1 = getSide(segmentA, pointC);
  let side2 = getSide(segmentA, pointD);

  // All points are collinear
  if (side1 === 0 && side2 === 0) {
    return (
      isPointInClosedSegment(segmentA, pointC) ||
      isPointInClosedSegment(segmentA, pointD) ||
      isPointInClosedSegment(segmentB, pointA) ||
      isPointInClosedSegment(segmentB, pointB)
    );
  }

  // No touching and on the same side
  if (side1 !== 0 && side1 === side2) {
    return false;
  }

  side1 = getSide(segmentB, pointA);
  side2 = getSide(segmentB, pointB);

  // No touching and on the same side
  if (side1 !== 0 && side1 === side2) {
    return false;
  }

  return true;
};

let segmentA = [
  { x: 10, y: 14 },
  { x: 5, y: 9 },
];

let segmentB = [
  { x: 10, y: 13 },
  { x: 10, y: 2 },
];

export { closedSegmentsIntersect };
