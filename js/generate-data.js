import { getRandomPositiveInteger, getRandomPositiveFloat, getRandomArrayElement, getUniqueElementsArray, getImgNumber, getRandomMixedArray } from './utils.js';

const AVATARS = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png',
  'img/avatars/user09.png',
  'img/avatars/user10.png',
  'img/avatars/user11.png',
];
const TITLES = [
  'Просторное бунгало без интернета, регистрации и смс.',
  'Уютный чердачок с видом на реку.',
  'Респектабельная квартира с шестью постоянно проживающими в ней котами.',
  'Уединенный особнячок.',
  'Дворец достойный императора.',
  'Отель раннего подъема.',
  'Капсульный отель.',
  'Широко известный в узких кругах отель.'
];
const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];
const TYPES_OF_HOUSING = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};
const MIN_HOUSING_PRICES = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};
const ROOMS_CAPACITY = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0'],
};
const IN_OUT_TIMES = [
  '12:00',
  '13:00',
  '14:00'
];
const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
const DESCRIPTIONS = [
  'Пpocтoтa и cдepжaннocть. Блaгoдapя этoмy в дoмe coздaeтcя пpиятнaя aтмocфepa, кoтopaя oтличнo пoдxoдит для oтдыxa и вoccтaнoвлeния.',
  'Отличный выбор для всех, кто любит сдержанный комфорт, семейный уют и тишину, а также для тех, кто хочет большего единения с природой, отдыха от суеты и людей.',
  'Удобное расположение в центре города, все в пешей доступности: до детского сада 5 минут (с усталым ребенком все 20), до поликлиники 10 минут. Рядом книжный магазин, караоке-бар и несколько ресторанов.',
  'В этом доме вы можете спокойно провести время в кругу семьи и друзей, отдохнуть во время длительной поездки, а так же пригласить отметить ваше торжество. Дом стоит отдельно, крайний к лесу, а значит вы спокойно можете проводить ритуалы, в наличии копия "Некрономикона"',
  'Шикарный дворец с вензелями и гербами в Геленджике. Кажется о нем вы когда-то видели репортаж в интернете.',
  'Отель расположен на центральной улице города, в 1.2 км от Национального музея. Гостям предоставляются услуги консьержа и билетной кассы, а также бесплатный мини-бар (обновление мини-бара каждый день в 05:30)',
  'Ночлег для самых крепких духом путешественников. Тусклое помещение со странной геометрией стен, в котором более ста лет назад проживала знаменитая Кеция Мейсон',
  'Отель Гилман Хауз будет раз принять Вас в любое время суток. Только рыбные блюда в ресторане, свежайшая рыба с Рифа Дьявола. Мы гордимся, что за всю историю не получили ни одного отрицательного отзыва.'
];
const PHOTOS = [
  'https://cdn.pixabay.com/photo/2013/11/27/09/49/iceland-219182_960_720.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const createOffer = (randomMixedArray, createCount) => {
  const lat = getRandomPositiveFloat(35.65000, 35.70000, 5);
  const lng = getRandomPositiveFloat(139.70000, 139.80000, 5);
  return {
    author: {
      avatar: `img/avatars/user${getImgNumber(randomMixedArray, createCount)}.png`
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${lat}, ${lng}`,
      price: getRandomPositiveInteger(3000, 30000),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomPositiveInteger(1, 50),
      guests: getRandomPositiveInteger(1, 10),
      checkin: getRandomArrayElement(IN_OUT_TIMES),
      checkout: getRandomArrayElement(IN_OUT_TIMES),
      features: getUniqueElementsArray(FEATURES),
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: getUniqueElementsArray(PHOTOS),
    },
    location: {
      lat: lat,
      lng: lng
    }
  };
};

const generateData = (count) => {
  const photosNumbersArray = getRandomMixedArray(1, AVATARS.length, count);
  return Array.from({ length: count }, () => createOffer(photosNumbersArray, count));
};

export {
  TYPES_OF_HOUSING,
  MIN_HOUSING_PRICES,
  ROOMS_CAPACITY,
  generateData
};
