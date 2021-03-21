import { createE, appendAll, getId } from '../tools';
import { newButton, newLabel } from './common';

let dragged;

const setDragging = input => (dragged = input);

const setDraggedOver = e => e.preventDefault();

const updateDraggedList = (items, begin, end) => {
  if (begin === end) {
    return;
  }

  let data = items[begin].getRawPoint();

  if (begin < end) {
    for (let i = begin + 1; i <= end; ++i) {
      items[i - 1].setRawPoint(items[i].getRawPoint());
    }
  } else {
    for (let i = begin; i > end; --i) {
      items[i].setRawPoint(items[i - 1].getRawPoint());
    }
  }

  items[end].setRawPoint(data);
};

class InputPoint {
  constructor(parent, id, removeMe, compareMe) {
    this.id = id;
    this.parent = parent;

    let container = createE('div');
    this.container = container;

    // container.id = `__input_point_${id}__`;
    container.classList.add('point-input');
    container.draggable = true;

    container.addEventListener('drag', () => setDragging(this.getId()));
    container.addEventListener('dragover', e => setDraggedOver(e));
    container.addEventListener('drop', e => compareMe(e, this.getId()));

    ['x', 'y'].forEach(c => {
      let lbl = newLabel(c);
      this[`${c}Input`] = createE('input');

      appendAll(container, [lbl, this[`${c}Input`]]);
    });

    container.appendChild(newButton('x', '', () => removeMe(this.id)));

    this.parent.appendChild(this.container);
  }

  setRawPoint({ x, y }) {
    this.xInput.value = x;
    this.yInput.value = y;
  }

  getRawPoint() {
    return {
      x: this.xInput.value,
      y: this.yInput.value,
    };
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
        new InputPoint(
          this.parent,
          id,
          id => this.removeInput(id),
          (e, input) => this.compareInput(e, input)
        )
      );
    }
  }

  append() {
    this.lastIndex += 1;
    this.inputs.push(
      new InputPoint(
        this.parent,
        this.lastIndex,
        id => this.removeInput(id),
        (e, input) => this.compareInput(e, input)
      )
    );
  }

  removeInput(id) {
    for (let i = 0; i < this.inputs.length; ++i) {
      if (this.inputs[i].getId() === id) {
        this.parent.removeChild(this.inputs[i].getContainer());
        this.inputs.splice(i, 1);
        break;
      }
    }
  }

  compareInput(e, input) {
    e.preventDefault();

    if (input === dragged) {
      return;
    }

    let draggedFound = false;
    let inputFound = false;

    let origin = -1;
    let dest = -1;

    for (let i = 0; i < this.inputs.length; ++i) {
      if (!inputFound && this.inputs[i].getId() === input) {
        inputFound = true;
        dest = i;
        continue;
      }

      if (!draggedFound && this.inputs[i].getId() === dragged) {
        draggedFound = true;
        origin = i;
      }

      if (draggedFound && inputFound) {
        break;
      }
    }

    updateDraggedList(this.inputs, origin, dest);
  }

  getAllPoints() {
    try {
      return this.inputs.map(input => input.getPoint());
    } catch (e) {
      alert(e);

      throw e;
    }
  }

  clearAll() {
    this.inputs.forEach(input => input.setRawPoint({ x: '', y: '' }));
  }
}

export { PointList };
