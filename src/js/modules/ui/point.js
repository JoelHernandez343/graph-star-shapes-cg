import { createE, appendAll } from './../tools';
import { newButton, newLabel } from './common';

class InputPoint {
  constructor(parent, id, removeMe) {
    this.id = id;
    this.parent = parent;
    this.container = createE('div');
    this.container.classList.add('point-input');

    ['x', 'y'].forEach(c => {
      let lbl = newLabel(c);
      this[`${c}Input`] = createE('input');

      appendAll(this.container, [lbl, this[`${c}Input`]]);
    });

    this.container.appendChild(
      newButton('x', '', () => removeMe(this.id, this.container))
    );

    this.parent.appendChild(this.container);
  }

  getPoint() {
    if (
      isNaN(parseInt(this.xInput.value)) ||
      isNaN(parseInt(this.yInput.value))
    ) {
      throw `El punto ${this.id + 1} no es válido`;
    }

    return {
      x: parseInt(this.xInput.value),
      y: parseInt(this.yInput.value),
    };
  }

  getId() {
    return this.id;
  }

  getContainer() {
    return this.container;
  }
}

class PointList {
  constructor(parent, length) {
    this.parent = parent;
    this.inputs = [];
    this.lastIndex = length;

    for (let id = 0; id < length; ++id) {
      this.inputs.push(
        new InputPoint(this.parent, id, id => this.removeInput(id))
      );
    }
  }

  append() {
    this.lastIndex += 1;
    this.inputs.push(
      new InputPoint(this.parent, this.lastIndex, id => this.removeInput(id))
    );

    console.table(this.inputs);
  }

  removeInput(id) {
    for (let i = 0; i < this.inputs.length; ++i) {
      if (this.inputs[i].getId() === id) {
        this.parent.removeChild(this.inputs[i].getContainer());
        this.inputs.splice(i, 1);
        break;
      }
    }

    console.log(this.inputs);
  }

  getAllPoints() {
    try {
      return this.inputs.map(input => input.getPoint());
    } catch (e) {
      alert(e);

      throw e;
    }
  }
}

export { PointList };
