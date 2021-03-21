class Shape {
  constructor(points) {
    this.points = points;
  }

  setPoints(points) {
    this.points = points;
  }

  getPoints() {
    return this.points;
  }

  getSegments() {
    let segments = [];

    let shape = [...this.points];
    let before = shape.pop();
    shape.push(before);

    shape.forEach(current => {
      segments.push([before, current]);
      before = current;
    });

    return segments;
  }
}

export { Shape };
