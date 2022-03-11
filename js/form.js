const mainForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const mainFormFieldsets = mainForm.querySelectorAll('fieldset');
const mainFormSlider = mainForm.querySelector('.ad-form__slider');
const mapFiltersElements = mapFilters.querySelectorAll('select, fieldset');


const switchToUnactive = () => {
  // const formElements = [mainFormFieldsets, mainFormSlider, mapFiltersElements];

  mainForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');

};

export { switchToUnactive };
