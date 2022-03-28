import { showAlert } from './utils.js';
import { successMessagePopup, errorMessagePopup } from './form-messages.js';

const getData = (cb) => {
  fetch('https://25.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((data) => cb(data))
    .catch(() => {
      showAlert('Не удалось получить данные с сервера. Попробуйте перезагрузить страницу');
    });
};

const sendData = (data, unblockButton) => {
  fetch(
    'https://25.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: data,
    },
  )
    .then((response) => {
      if (response.ok) {
        successMessagePopup();
        unblockButton();
      } else {
        errorMessagePopup('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      errorMessagePopup('Не удалось отправить форму. Попробуйте ещё раз');
      unblockButton();
    });
};

export { getData, sendData };
