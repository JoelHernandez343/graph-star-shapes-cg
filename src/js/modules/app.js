import { getId } from './tools';
import { Shape } from './geometry';
import { drawStar, drawShape } from './graph';
import { AdaptableCanvas } from './adaptable-canvas';
import { PointList, setPointsTable, setSegmentsTable } from './ui';

class App {
  constructor() {
    this.shapeCanvas = new AdaptableCanvas({
      canvas: getId('shape'),
      gridSize: 20,
    });
    this.shapeCanvas.render();

    this.starCanvas = new AdaptableCanvas({
      canvas: getId('star-shape'),
      gridSize: 20,
    });
    this.starCanvas.render();

    this.shape = new Shape([]);

    this.pointList = new PointList(getId('shape-points'), 3);

    getId('add-points-bttn').addEventListener('click', () =>
      this.pointList.append()
    );
    getId('clear-points-bttn').addEventListener('click', () =>
      this.pointList.clearAll()
    );

    getId('graph-shape-bttn').addEventListener('click', () => {
      this.shape = new Shape(this.pointList.getAllPoints());

      this.shapeCanvas.changeRenderFun(({ ctx }) => {
        drawShape(this.shape.getPoints(), '#42A5F6', ctx, 3);
      });

      setPointsTable(this.shape.getPoints(), getId('points-table'));
      setSegmentsTable(this.shape.getSegments(), getId('segments-table'));
    });
    getId('clear-graph-bttn').addEventListener('click', () =>
      this.shapeCanvas.changeRenderFun(() => {})
    );

    getId('graph-star-bttn').addEventListener('click', () => {
      let xInput = getId('center-point-x');
      let yInput = getId('center-point-y');

      if (isNaN(parseInt(xInput.value)) || isNaN(parseInt(yInput.value))) {
        let m = `El punto central no es válido`;

        alert(m);
        throw m;
      }

      let center = {
        x: parseInt(xInput.value),
        y: parseInt(yInput.value),
      };

      this.starCanvas.changeRenderFun([
        ({ ctx }) =>
          drawStar(this.shape.getPoints(), center, '#42A5F6', ctx, 3),
        ({ ctx }) => drawShape(this.shape.getPoints(), '#42A5F6', ctx, 3),
      ]);
    });
    getId('clear-star-bttn').addEventListener('click', () =>
      this.starCanvas.changeRenderFun(() => {})
    );
  }
}

export { App };
