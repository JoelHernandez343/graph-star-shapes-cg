const newButton = (content, id = '', cb) => {
  let button = document.createElement('button');
  button.innerText = content;
  button.addEventListener('click', cb);

  return button;
};

const newLabel = content => {
  let lbl = document.createElement('p');
  lbl.innerText = content;

  return lbl;
};

export { newButton, newLabel };
