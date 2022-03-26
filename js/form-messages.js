import { resetFormToDefault } from './form.js';

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

const successMessage = () => {
  const message = successMessageTemplate.cloneNode(true);
  document.body.appendChild(message);
  resetFormToDefault();

  setTimeout(() => {
    message.remove();
  }, 4000);
};

const errorMessage = () => {
  const message = errorMessageTemplate.cloneNode(true);
  document.body.append(message);

  setTimeout(() => {
    message.remove();
  }, 4000);
};

export { successMessage, errorMessage };
