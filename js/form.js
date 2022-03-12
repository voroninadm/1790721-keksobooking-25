const mainForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const mainFormFieldsets = mainForm.querySelectorAll('fieldset');
const mainFormSlider = mainForm.querySelector('.ad-form__slider');
const mapFiltersElements = mapFilters.querySelectorAll('select, fieldset');

const doDisabledElements = (elements) => {
  elements.forEach((element) => {
    element.disabled = true;
    element.children.disabled = true;
  });
};

const doEnabledElements = (elements) => {
  elements.forEach((element) => {
    element.disabled = false;
    element.children.disabled = false;
  });
};

const switchFormsToDisabled = (boolean) => {
  if (boolean === true) {
    mainForm.classList.add('ad-form--disabled');
    mapFilters.classList.add('map__filters--disabled');
    doDisabledElements(mapFiltersElements);
    doDisabledElements(mainFormFieldsets);
    doDisabledElements(mainFormSlider);
  }
  mainForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');
  doEnabledElements(mapFiltersElements);
  doEnabledElements(mainFormFieldsets);
  doEnabledElements(mainFormSlider);
};

export { switchFormsToDisabled };
