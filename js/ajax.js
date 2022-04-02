import { showAlert } from './utils.js';
import { successMessagePopup, errorMessagePopup } from './form-messages.js';

const GET_DATA_LINK = 'https://25.javascript.pages.academy/keksobooking/data';
const SEND_DATA_LINK = 'https://25.javascript.pages.academy/keksobooking';


const getData = async () => {
  let response;
  try {
    response = await fetch(GET_DATA_LINK);
    if (!response.ok) {
      throw new Error();
    }
  }
  catch (err) {
    showAlert('Не удалось получить данные с сервера. Попробуйте перезагрузить страницу');
    return;
  }
  const allAds = await response.json();
  return allAds;
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
        unblockButton();
      }
    })
    .catch(() => {
      errorMessagePopup('Не удалось отправить форму. Попробуйте ещё раз');
      unblockButton();
    });
};

export { getData, sendData };
