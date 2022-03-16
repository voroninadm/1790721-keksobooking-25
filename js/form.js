import { MIN_HOUSING_PRICES, ROOMS_CAPACITYS } from './generate-data.js';

const mainForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const mainFormFieldsets = mainForm.querySelectorAll('fieldset');
const mainFormSlider = mainForm.querySelector('.ad-form__slider');
const mapFiltersElements = mapFilters.querySelectorAll('select, fieldset');

const priceField = mainForm.querySelector('[name="price"]');
const typeOfHousesField = mainForm.querySelector('[name="type"]');
const timeIn = mainForm.querySelector('[name="timein"]');
const timeOut = mainForm.querySelector('[name="timeout"]');
const timeInOutParent = mainForm.querySelector('.ad-form__element--time');
const rooms = mainForm.querySelector('[name="rooms"]');
const capacity = mainForm.querySelector('[name="capacity"]');

const pristine = new Pristine(mainForm, {
  classTo: 'ad-form__element--validating',
  errorClass: 'ad-form__element--validating-danger',
  successClass: 'ad-form__element--validating-success',
  errorTextParent: 'ad-form__element--validating',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__element--validating-error'
});

//=======FORM DISABLING-ACTIVATING
const toggleFormToUnactive = (value) => {
  mainForm.classList.toggle('ad-form--disabled', value);
  mapFilters.classList.toggle('map__filters--disabled', value);
  mainFormFieldsets.forEach((element) => {
    element.disabled = value;
    element.children.disabled = value;
  });
  mainFormSlider.classList.toggle('ad-form--disabled', value);
  mapFiltersElements.forEach((element) => {
    element.disabled = value;
    element.children.disabled = value;
  });
};

//=======FORM VALIDATING
const formValidating = () => {

  //title validation
  const validateTitle = (value) => value.length >= 30 && value.length <= 100;
  pristine.addValidator(mainForm.querySelector('[name="title"]'),
    validateTitle,
    'Заголовок должен быть не меньше 30 и не более 100 символов', 1, false);

  //handler. synchronize type of houses and min price
  const onLivingTypeChange = function () {
    priceField.placeholder = MIN_HOUSING_PRICES[this.value];
    pristine.validate(priceField);
  };
  const validatePrice = (value) => value >= MIN_HOUSING_PRICES[typeOfHousesField.value] && value <= 100000;
  typeOfHousesField.addEventListener('change', onLivingTypeChange);

  //price for living validation
  const getPriceErrorMessage = () => `Не менее ${MIN_HOUSING_PRICES[typeOfHousesField.value]} и не более 100 000`;
  pristine.addValidator(priceField, validatePrice, getPriceErrorMessage, 1, false);

  //handler. synchronize checkin and checkout
  timeInOutParent.addEventListener('change', (evt) => {
    timeIn.value = timeOut.value = evt.target.value;
  });

  //synchronize rooms and capacity
  const validateCapacity = () => ROOMS_CAPACITYS[rooms.value].includes(capacity.value);
  pristine.addValidator(capacity, validateCapacity, 'Пожалуйста, выберите верное количество гостей или комнат', 1, false);

  rooms.addEventListener('change', () => {
    pristine.validate(capacity);
  });

  //handler. form validating on submit
  mainForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    pristine.validate();
  });
};

const initForm = (isActive) => {
  toggleFormToUnactive(isActive);
  if (!isActive) {
    formValidating();
  }
};


export { initForm };
