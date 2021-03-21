import { createE } from './../tools';

const newButton = (content, id = '', cb) => {
  let button = createE('button');
  button.innerText = content;
  button.addEventListener('click', cb);

  return button;
};

const newLabel = content => {
  let lbl = createE('p');
  lbl.innerText = content;

  return lbl;
};

const newTr = items => {
  let tr = createE('tr');

  items.forEach(item => {
    let td = createE('td');
    td.innerText = item;

    tr.appendChild(td);
  });

  return tr;
};

export { newButton, newLabel, newTr };
