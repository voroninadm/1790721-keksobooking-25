import { TYPES_OF_HOUSING, generateData } from './generate-data.js';

const offerTemplate = document.querySelector('#card').content.querySelector('.popup');

//creating new ads BY HTML TEMPLATE
const getPopup = (ad) => {
  const { title, address, price, type, rooms, guests, checkin, checkout, features, description, photos } = ad.offer;
  const { avatar } = ad.author;

  const adItem = offerTemplate.cloneNode(true);

  adItem.querySelector('.popup__title').textContent = (title)
    ? title
    : adItem.querySelector('.popup__title').remove();
  adItem.querySelector('.popup__text--address').textContent = (address)
    ? address
    : adItem.querySelector('.popup__text--address').remove();
  adItem.querySelector('.popup__text--price').textContent = (price)
    ? `${price} ₽/ночь`
    : adItem.querySelector('.popup__text--price').remove();
  adItem.querySelector('.popup__type').textContent = (type)
    ? TYPES_OF_HOUSING[type]
    : adItem.querySelector('.popup__type').remove();
  adItem.querySelector('.popup__text--capacity').textContent = (rooms || guests)
    ? `${rooms} комнаты для ${guests} гостей`
    : adItem.querySelector('.popup__text--capacity').remove();
  adItem.querySelector('.popup__text--time').textContent = (checkin || checkout)
    ? `Заезд после ${checkin}, выезд до ${checkout}`
    : adItem.querySelector('.popup__text--time').remove();
  adItem.querySelector('.popup__description').textContent = (description)
    ? description
    : adItem.querySelector('.popup__description').remove();
  adItem.querySelector('.popup__avatar').src = (avatar)
    ? avatar
    : adItem.querySelector('.popup__avatar').remove();

  const featuresContainer = adItem.querySelector('.popup__features');
  const featuresList = featuresContainer.querySelectorAll('.popup__feature');
  featuresList.forEach((featuresListItem) => {
    const included = features.some(
      (feature) => featuresListItem.classList.contains(`popup__feature--${feature}`),
    );
    if (!included) {
      featuresListItem.remove();
    }
  });

  const photosContainer = adItem.querySelector('.popup__photos');
  photosContainer.innerHTML = '';
  photos.forEach((photo) => {
    photosContainer.insertAdjacentHTML('beforeend', `<img src="${photo}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`);
  });

  return adItem;
};

// generating and rendering element for testing
const tempMapBlock = document.querySelector('#map-canvas');
const a = generateData(1);
tempMapBlock.appendChild(getPopup(a[0]));

