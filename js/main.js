//gen randon int
const getRandomInt = (min, max) => {
  if (min > 0 && max > 0 && min < max) {
    const randomInt = min + Math.random() * (max + 1 - min);
    return Math.floor(randomInt);
  }
  return null;
};

getRandomInt(1, 10);

//gen random coordinates
const getRandomCoordinates = (min, max, length) => {
  if (min > 0 && max > 0 && min < max) {
    const coordinates = (min + Math.random() * (max - min)).toFixed(length);
    return coordinates;
  }
  return null;
};

getRandomCoordinates(1, 5, 1);
