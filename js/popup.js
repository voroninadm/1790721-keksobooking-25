import { TYPES_OF_HOUSING } from './generate-data.js';

const offerTemplate = document.querySelector('#card').content.querySelector('.popup');

const checkExsistValue = (templateElement, value) => (value) ? value : templateElement.remove();

//creating new ads BY HTML TEMPLATE
const getPopup = (ad) => {
  const adItem = offerTemplate.cloneNode(true);

  const { title, address, price, type, rooms, guests, checkin, checkout, features, description, photos } = ad.offer;
  const { avatar } = ad.author;
  const templateTitle =  adItem.querySelector('.popup__title');
  const templateAddress =  adItem.querySelector('.popup__text--address');
  const templatePrice =  adItem.querySelector('.popup__text--price');
  const templateType =  adItem.querySelector('.popup__type');
  const templateCapacity =  adItem.querySelector('.popup__text--capacity');
  const templateTime =  adItem.querySelector('.popup__text--time');
  const templateDescription = adItem.querySelector('.popup__description');
  const templateAvatar = adItem.querySelector('.popup__avatar');

  templateTitle.textContent = checkExsistValue(templateTitle, title);
  templateAddress.textContent = checkExsistValue(templateAddress, address);
  templatePrice.textContent = checkExsistValue(templatePrice, `${price} ₽/ночь`);
  templateType.textContent = checkExsistValue(templateType, TYPES_OF_HOUSING[type]);
  templateCapacity.textContent = checkExsistValue(templateCapacity, `${rooms} комнаты для ${guests} гостей`);
  templateTime.textContent = checkExsistValue(templateTime, `Заезд после ${checkin}, выезд до ${checkout}`);
  templateDescription.textContent = checkExsistValue(templateDescription, description);
  templateAvatar.src = checkExsistValue(templateAvatar, avatar);

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

export {getPopup};
