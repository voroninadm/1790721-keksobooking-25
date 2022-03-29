import { showAlert } from './utils.js';
import { successMessagePopup, errorMessagePopup } from './form-messages.js';
import { initForm, toggleMapFiltersToUnactive } from './form.js';
import { mapInit } from './map.js';

const getData = (cb) => {
  initForm(true);
  toggleMapFiltersToUnactive(true);
  fetch('https://25.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((data) => {
      cb(data);
      mapInit(initForm(false));
      toggleMapFiltersToUnactive(false);
    })
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
