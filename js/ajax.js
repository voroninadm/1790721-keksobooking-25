import { showAlert } from './utils.js';
import { successMessage, errorMessage } from './form-messages.js';

const getData = (cb) => {
  fetch('https://25.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((data) => cb(data))
    .catch(() => {
      showAlert('Не удалось получить данные с сервера. Попробуйте перезагрузить страницу');
    });
};

const sendData = (data) => {
  fetch(
    'https://25.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: data,
    },
  )
    .then((response) => {
      if (response.ok) {
        successMessage();
      } else {
        errorMessage('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      errorMessage('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export { getData, sendData };
