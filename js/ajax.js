import { showAlert } from './utils.js';

// const COUNT_OF_ADS = 8;

const getData = (cb) => {
  fetch('https://25.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    // .then((data) => data.slice(0, COUNT_OF_ADS))
    .then((data) => cb(data))
    .catch(() => {
      showAlert('Не удалось получить данные с сервера. Попробуйте перезагрузить страницу');
    });
};

const sendData = (formData) => {
  fetch(
    'https://25.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: formData,
    },
  )
    .then(() => console.log('all is sent'))
    .catch(() => console.log('sending in error'));
};

export { getData, sendData };
