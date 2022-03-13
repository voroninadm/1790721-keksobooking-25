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

const title = mainForm.querySelector('.ad-form__title-input');
const pristine = new Pristine(mainForm);


pristine.addValidator(title, (value) => {
  if (value.length >= 30 && value.length <= 100) {
    return true;
  }
  return false;
}, 'Заголовок должен быть не меньше 30 и не более 100 символов', 1, false);

mainForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const valid = pristine.validate();
});


export { toggleFormToUnactive };
