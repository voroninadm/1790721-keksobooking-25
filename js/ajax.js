import { showAlert } from './utils.js';
import { showSuccessMessagePopup, showErrorMessagePopup } from './form-messages.js';
import { resetFormToDefault } from './form.js';

//html academy link to json array of ads
//const GET_DATA_LINK = 'https://25.javascript.pages.academy/keksobooking/data';
const GET_DATA_LOCAL_LINK = './data/data.json';
const SEND_DATA_LINK = 'https://25.javascript.pages.academy/keksobooking';


const getData = async () => {
  let response;
  try {
    response = await fetch(GET_DATA_LOCAL_LINK);
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


const sendData = async (data, unblockButton, cb) => {
  let request;
  try {
    request = await fetch(
      SEND_DATA_LINK,
      {
        method: 'POST',
        body: data,
      },
    );
    if (!request.ok) {
      throw new Error();
    }
    showSuccessMessagePopup();
    unblockButton();
    resetFormToDefault();
    cb();
  }
  catch (err) {
    showErrorMessagePopup('Не удалось отправить форму. Попробуйте ещё раз');
    unblockButton();
  }
};


export { getData, sendData };
