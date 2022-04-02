import { resetFormToDefault } from './form.js';
import { isEscapeKey } from './utils.js';

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

const onMessageRemove = (place, message) => {
  place.addEventListener('click', () => {
    document.body.removeChild(message);
  });
  document.addEventListener('keyup', (evt) => {
    if (isEscapeKey(evt)) {
      document.body.removeChild(message);
    }
  });
};

const successMessagePopup = () => {
  const message = successMessageTemplate.cloneNode(true);
  document.body.appendChild(message);
  resetFormToDefault();
  onMessageRemove(document, message);
};

const errorMessagePopup = () => {
  const message = errorMessageTemplate.cloneNode(true);
  document.body.appendChild(message);
  const messageButton = message.querySelector('[type="button"]');
  onMessageRemove(messageButton, message);
};

export { successMessagePopup, errorMessagePopup };
