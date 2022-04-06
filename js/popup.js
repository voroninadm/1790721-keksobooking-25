import { OfferTypeToReadable } from './form-data.js';

const offerTemplate = document.querySelector('#card').content.querySelector('.popup');

const checkExsistValue = (templateElement, value) => (value) ? value : templateElement.remove();

const roomsWord = (value) => {
  if (value > 5 && value <= 20 ||
    value % 10 >= 5 && value % 10 <= 9 ||
    value % 10 === 0) {
    return 'комнат';
  } else if (value % 10 >= 2 && value % 10 <= 4) {
    return 'комнаты';
  }
  return 'комната';
};

//creating new ads BY HTML TEMPLATE
const getPopup = (ad) => {
  const adItem = offerTemplate.cloneNode(true);

  const { title, address, price, type, rooms, guests, checkin, checkout, features, description, photos } = ad.offer;
  const { avatar } = ad.author;
  const templateTitle = adItem.querySelector('.popup__title');
  const templateAddress = adItem.querySelector('.popup__text--address');
  const templatePrice = adItem.querySelector('.popup__text--price');
  const templateType = adItem.querySelector('.popup__type');
  const templateCapacity = adItem.querySelector('.popup__text--capacity');
  const templateTime = adItem.querySelector('.popup__text--time');
  const templateDescription = adItem.querySelector('.popup__description');
  const templateAvatar = adItem.querySelector('.popup__avatar');

  templateTitle.textContent = checkExsistValue(templateTitle, title);
  templateAddress.textContent = checkExsistValue(templateAddress, address);
  templatePrice.textContent = checkExsistValue(templatePrice, `${price} ₽/ночь`);
  templateType.textContent = checkExsistValue(templateType, OfferTypeToReadable[type]); ///
  templateCapacity.textContent = checkExsistValue(templateCapacity,
    `${rooms} ${roomsWord(rooms)} для
    ${guests} ${(guests > 1) ? 'гостей' : 'гостя'}`);
  templateTime.textContent = checkExsistValue(templateTime, `Заезд после ${checkin}, выезд до ${checkout}`);
  templateDescription.textContent = checkExsistValue(templateDescription, description);
  templateAvatar.src = checkExsistValue(templateAvatar, avatar);

  const featuresContainer = adItem.querySelector('.popup__features');
  if (features) {
    const featuresList = featuresContainer.querySelectorAll('.popup__feature');
    featuresList.forEach((featuresListItem) => {
      const included = features.some(
        (feature) => featuresListItem.classList.contains(`popup__feature--${feature}`),
      );
      if (!included) {
        featuresListItem.remove();
      }
    });
  } else {
    featuresContainer.remove();
  }
  const photosContainer = adItem.querySelector('.popup__photos');
  if (photos) {
    photosContainer.innerHTML = '';
    photos.forEach((photo) => {
      photosContainer.insertAdjacentHTML('beforeend', `<img src="${photo}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`);
    });
  } else {
    photosContainer.remove();
  }
  return adItem;
};

export { getPopup };
