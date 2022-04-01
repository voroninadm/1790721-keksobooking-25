import { showAlert } from './utils.js';
import { successMessagePopup, errorMessagePopup } from './form-messages.js';

const GET_DATA_LINK = 'https://25.javascript.pages.academy/keksobooking/data';
const SEND_DATA_LINK = 'https://25.javascript.pages.academy/keksobooking';

const getData = (cb) => {
  fetch(GET_DATA_LINK)
    .then((response) => response.json())
    .then((data) => {
      cb(data);
    })
    .catch(() => {
      showAlert('Не удалось получить данные с сервера. Попробуйте перезагрузить страницу');
    });
};

const sendData = (data, unblockButton) => {
  fetch(
    SEND_DATA_LINK,
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
      errorMessagePopup('Что-то пошло не так. Попробуйте перезагрузить страницу');
      unblockButton();
    });
};

export { getData, sendData };
