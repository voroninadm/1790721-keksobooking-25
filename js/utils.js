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
    if (intArray.includes(int) === false){
      intArray.push(int);
    }
    continue;
  }
  return intArray;
};

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const getUniqueElementsArray = (array) => {
  const uniqueNumber = getRandomPositiveInteger(1, array.length - 1);
  const arrayOfIndex = getRandomMixedArray(0, uniqueNumber, uniqueNumber);
  const newArray = [];
  arrayOfIndex.forEach((element) => {
    newArray.push(array[element]);
  });
  return newArray;
};

const randomArray = (count) => getRandomMixedArray(1, count, count);

const getImgNumber = (count) => {
  const array = randomArray(count);
  const number = array.pop();
  if (number < count) {
    return `0${number}`;
  }
  return `${number}`;
};

export {getRandomPositiveInteger, getRandomPositiveFloat, getRandomArrayElement, getUniqueElementsArray, getImgNumber};
