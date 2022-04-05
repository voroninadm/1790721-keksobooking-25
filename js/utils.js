const getRandomPositiveInteger = (a = 0, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomPositiveFloat = (a = 0, b, digits = 1) => {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
};

const getRandomMixedArray = (a, b, maxLength) => {
  const intArray = [];
  while (intArray.length < maxLength) {
    const int = getRandomPositiveInteger(a, b);
    if (intArray.includes(int) === false) {
      intArray.push(int);
    }
    continue;
  }
  return intArray;
};

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const getUniqueElementsArray = (array) => {
  const uniqueNumber = getRandomPositiveInteger(1, array.length);
  const arrayOfIndex = getRandomMixedArray(0, uniqueNumber - 1, uniqueNumber);
  const newArray = [];
  arrayOfIndex.forEach((element) => {
    newArray.push(array[element]);
  });
  return newArray;
};

const getImgNumber = (array) => {
  const number = array.pop();
  return (number < 10) ? `0${number}` : `${number}`;
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 1000;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '50%';
  alertContainer.style.transform = 'translateX(-50%)';
  alertContainer.style.top = '300px';
  alertContainer.style.right = 0;
  alertContainer.style.padding = '20px 30px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = '#00bfffdb';
  alertContainer.textContent = message;

  document.body.append(alertContainer);
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};


export {
  getRandomPositiveInteger,
  getRandomPositiveFloat,
  getRandomArrayElement,
  getUniqueElementsArray,
  getImgNumber,
  getRandomMixedArray,
  showAlert,
  isEscapeKey,
  debounce
};
