import {MIN_HOUSING_PRICES} from './generate-data.js';

const mainForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const mainFormFieldsets = mainForm.querySelectorAll('fieldset');
const mainFormSlider = mainForm.querySelector('.ad-form__slider');
const mapFiltersElements = mapFilters.querySelectorAll('select, fieldset');

const toggleFormToUnactive = (isActive) => {
  mainForm.classList.toggle('ad-form--disabled', isActive);
  mapFilters.classList.toggle('map__filters--disabled', isActive);
  mainFormFieldsets.forEach((element) => {
    element.disabled = isActive;
    element.children.disabled = isActive;
  });
  mainFormSlider.classList.toggle('ad-form--disabled', isActive);
  mapFiltersElements.forEach((element) => {
    element.disabled = isActive;
    element.children.disabled = isActive;
  });
};

const pristine = new Pristine(mainForm, {
  classTo: 'ad-form__element',
  errorClass: 'has-danger',
  successClass: 'has-success',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'text-help'
});

//title validation
function validateTitle(value) {
  return value.length >= 30 && value.length <= 100;
}

pristine.addValidator(mainForm.querySelector('[name="title"]'),
  validateTitle,
  'Заголовок должен быть не меньше 30 и не более 100 символов');

//price for living validation
const priceField = mainForm.querySelector('[name="price"]');
const typeOfHousesField = mainForm.querySelector('[name="type"]');

function onLivingTypeChange () {
  priceField.placeholder = MIN_HOUSING_PRICES[this.value];
  pristine.validate(priceField);
}
typeOfHousesField.addEventListener('change', onLivingTypeChange);

function validatePrice (value) {
  return value >= MIN_HOUSING_PRICES[typeOfHousesField.value] && value <= 100000;
}

function getPriceErrorMessage () {
  return `Не менее ${MIN_HOUSING_PRICES[typeOfHousesField.value]} и не более 100 000`;
}

pristine.addValidator(priceField, validatePrice, getPriceErrorMessage);


mainForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});


export { toggleFormToUnactive };
