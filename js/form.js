import './pristine-config-ru.js';
import { OfferTypeToPrice, ROOMS_CAPACITYS } from './generate-data.js';
import { sliderInit, sliderReset } from './slider.js';
import { mapReset, closeMapPopup } from './map.js';
import { sendData } from './ajax.js';

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

const resetButton = document.querySelector('[type="reset"]');

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
  priceField.placeholder = OfferTypeToPrice[typeOfHousesField.value];
  if (value) {
    const validate = () => pristine.validate(priceField);
    sliderInit(validate);
  }
};

//=======FORM VALIDATING
const formValidating = () => {

  //handler. synchronize type of houses and min price
  const onLivingTypeChange = function () {
    priceField.placeholder = OfferTypeToPrice[this.value];
    if (priceField.value) {
      pristine.validate(priceField);
    }
  };
  typeOfHousesField.addEventListener('input', onLivingTypeChange);

  //price for living validation
  const validatePrice = (value) => value >= OfferTypeToPrice[typeOfHousesField.value] && value <= 100000;
  const getPriceErrorMessage = () => `Не менее ${OfferTypeToPrice[typeOfHousesField.value]} и не более 100 000`;
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
};

const resetFormToDefault = () => {
  mainForm.reset();
  priceField.placeholder = OfferTypeToPrice[typeOfHousesField.value];
  mapReset();
  sliderReset();
  pristine.reset();
  closeMapPopup();
};

//handler. form validating on submit
mainForm.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  } else {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    sendData(formData);
  }
});

// handler. reset button
resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetFormToDefault();
});

const initForm = (isActive) => {
  toggleFormToUnactive(isActive);
  if (!isActive) {
    formValidating();
  }
};


export { initForm, resetFormToDefault };
