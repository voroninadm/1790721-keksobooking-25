import { generateData } from './generate-data.js';
import { getLiv } from './utils.js';

const tempMapBlock = document.querySelector('#map-canvas');
const offerTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const similarAds = generateData(1);

//creating new ads BY HTML TEMPLATE

// similarAds.forEach((ad) => {
//   const { title, address, price, type, rooms, guests, checkin, checkout, features, description, photos } = ad.offer;
//   const { avatar } = ad.author;

//   const offerElement = offerTemplate.cloneNode(true);

//   offerElement.querySelector('.popup__title').textContent = title;
//   offerElement.querySelector('.popup__text--address').textContent = address;
//   offerElement.querySelector('.popup__text--price').textContent = `${price} ₽/ночь`;
//   offerElement.querySelector('.popup__type').textContent = getLiv(type);
//   offerElement.querySelector('.popup__text--capacity').textContent = `${rooms} комнаты для ${guests} гостей`;
//   offerElement.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
//   //checking features
//   const featuresContainer = offerElement.querySelector('.popup__features');
//   const featuresList = featuresContainer.querySelectorAll('.popup__feature');
//   featuresList.forEach((featuresListItem) => {
//     const included = features.some(
//       (feature) => featuresListItem.classList.contains(`popup__feature--${feature}`),
//     );
//     if (!included) {
//       featuresListItem.remove();
//     }
//   });

//   offerElement.querySelector('.popup__description').textContent = description;

//   //adding photos
//   const photosContainer = offerElement.querySelector('.popup__photos');
//   photosContainer.innerHTML = '';
//   photos.forEach((photo) => {
//     photosContainer.insertAdjacentHTML('beforeend', `<img src="${photo}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`);
//   });

//   offerElement.querySelector('.popup__avatar').src = avatar;

//   tempMapBlock.appendChild(offerElement);
// });


//creating new offers BY JS TEMPLATE

similarAds.forEach((ad) => {
  const { title, address, price, type, rooms, guests, checkin, checkout, features, description, photos } = ad.offer;
  const { avatar } = ad.author;
  const adTemplate = `<article class="popup">
      <img src="${avatar}" class="popup__avatar" width="70" height="70" alt="Аватар пользователя">
      <h3 class="popup__title">${title}</h3>
      <p class="popup__text popup__text--address">${address}</p>
      <p class="popup__text popup__text--price">${price}₽/ночь</span></p>
      <h4 class="popup__type">${getLiv(type)}</h4>
      <p class="popup__text popup__text--capacity">${rooms} комнаты для ${guests} гостей</p>
      <p class="popup__text popup__text--time">Заезд после ${checkin}, выезд до ${checkout}</p>
      <ul class="popup__features">
        <li class="popup__feature popup__feature--washer"></li>
      </ul>
      <p class="popup__description">${description}</p>
      <div class="popup__photos">
        <img src="" class="popup__photo" width="45" height="40" alt="Фотография жилья">
      </div>
    </article>`;
  tempMapBlock.insertAdjacentHTML('beforeend', adTemplate);
});


