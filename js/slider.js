const sliderElement = document.querySelector('.ad-form__slider');
const priceField = document.querySelector('[name="price"]');

const sliderInit = (cb) => {
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100000,
    },
    start: 5000,
    connect: 'lower',
  });

  sliderElement.noUiSlider.on('slide', () => {
    const sliderValue = sliderElement.noUiSlider.get();
    priceField.value = parseInt(sliderValue, 10);
    setTimeout(cb, 10);
  });

  priceField.addEventListener('input', () => {
    sliderElement.noUiSlider.set(priceField.value);
  });
};

const sliderReset = () => {
  sliderElement.noUiSlider.reset();
};

export { sliderInit, sliderReset };
