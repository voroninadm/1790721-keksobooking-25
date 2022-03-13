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
  mainFormSlider.forEach((element) => {
    element.disabled = isActive;
    element.children.disabled = isActive;
  });
  mapFiltersElements.forEach((element) => {
    element.disabled = isActive;
    element.children.disabled = isActive;
  });
};

export { toggleFormToUnactive };
