const getId = id => document.getElementById(id);
const getQuery = q => document.querySelector(q);
const createE = e => document.createElement(e);

const appendAll = (parent, children) =>
  children.forEach(child => parent.appendChild(child));

export { getId, createE, getQuery, appendAll };
