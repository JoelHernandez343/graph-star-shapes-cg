let a = [1, 2, 3];

let base, randomized, dragging, draggedOver;
let isRight = 'Not In Order!';
randomized = a.sort(() => Math.random() - 0.5);

const renderItems = () => {
  let parent = document.getElementById('shape-point');

  randomized.forEach(item => {
    let node = document.createElement('li');

    let button = document.createElement('button');
    button.addEventListener('click', () => console.log('hola'));
    button.innerHTML = 'Hello';

    node.draggable = true;
    node.addEventListener('drag', setDragging);
    // node.addEventListener('dragover', setDraggedOver);
    // node.addEventListener('drop', compare);
    node.innerText = item;
    node.appendChild(button);

    parent.appendChild(node);
  });
};

const setDragging = e => {
  dragging = parseInt(e.target.innerText);
};

const setDraggedOver = e => {
  e.preventDefault();
  draggedOver = parseInt(e.target.innerText);

  console.log(e.target);
};

const compare = e => {
  var index1 = randomized.indexOf(dragging);
  var index2 = randomized.indexOf(draggedOver);
  randomized.splice(index1, 1);
  randomized.splice(index2, 0, dragging);

  isRight =
    randomized.join('') === base.join('') ? 'In Order!' : 'Not In Order!';

  renderItems(randomized);
};

export { renderItems };
