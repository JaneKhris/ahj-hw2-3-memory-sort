import data from './data.json';

const table = document.querySelector('.films').querySelector('tbody');
const sortArray = document.querySelectorAll('.sort');
let i = 0;

function formRows(array) {
  array.forEach((item) => {
    const str = document.createElement('tr');
    Object.entries(item).forEach(([key, value]) => {
      str.setAttribute(`data-${key}`, value);
      if (key === 'year') {
        str.innerHTML += `<td>(${value})</td>`;
      } else if (key === 'imdb') {
        str.innerHTML += `<td>imdb:${value.toFixed(2)}</td>`;
      } else {
        str.innerHTML += `<td>${value}</td>`;
      }
    });
    table.appendChild(str);
  });
}

formRows(data);

function sortNumberUp(array, param) {
  array.sort((a, b) => b[param] - a[param]);
  document.querySelector(`.head_${param}`).querySelector('.sort').textContent = '↑';
}

function sortNumberDown(array, param) {
  array.sort((a, b) => a[param] - b[param]);
  document.querySelector(`.head_${param}`).querySelector('.sort').textContent = '↓';
}

function getSortedArray(k) {
  switch (k) {
    case 0:
      sortNumberDown(data, 'id');
      break;

    case 1:
      sortNumberUp(data, 'id');
      break;

    case 2:
      data.sort((a, b) => (a.title > b.title ? 1 : -1));
      document.querySelector('.head_title').querySelector('.sort').textContent = '↓';
      break;

    case 3:
      data.sort((a, b) => (a.title < b.title ? 1 : -1));
      document.querySelector('.head_title').querySelector('.sort').textContent = '↑';
      break;

    case 4:
      sortNumberDown(data, 'imdb');
      break;

    case 5:
      sortNumberUp(data, 'imdb');
      break;

    case 6:
      sortNumberDown(data, 'year');
      break;

    case 7:
      sortNumberUp(data, 'year');
      break;

    default:
      break;
  }
}

setInterval(() => {
  table.innerHTML = '';
  sortArray.forEach((item) => {
    const symb = item;
    symb.textContent = '';
  });
  getSortedArray(i);
  formRows(data);
  if (i < 7) {
    i += 1;
  } else {
    i = 0;
  }
}, 2000);
