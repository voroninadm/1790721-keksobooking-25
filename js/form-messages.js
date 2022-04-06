import { getIsEscapeKey } from './utils.js';

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

const messagePopup = (template, isCloseButton) => {
  const message = template.cloneNode(true);
  document.body.appendChild(message);

  const onKeyUp = (evt) => {
    if (getIsEscapeKey(evt)) {
      evt.preventDefault();
      message.remove();
      document.removeEventListener('keyup', onKeyUp);
    }
  };

  document.addEventListener('keyup', onKeyUp);

  message.addEventListener('click', () => {
    message.remove();
    document.removeEventListener('keyup', onKeyUp);
  });

  if (isCloseButton) {
    const closeButton = message.querySelector('[type="button"]');
    closeButton.addEventListener('click', () => {
      message.remove();
      document.removeEventListener('keyup', onKeyUp);
    });
  }
};

const showSuccessMessagePopup = () => {
  messagePopup(successMessageTemplate);
};

const showErrorMessagePopup = () => {
  messagePopup(errorMessageTemplate, true);
};

export { showSuccessMessagePopup, showErrorMessagePopup };
