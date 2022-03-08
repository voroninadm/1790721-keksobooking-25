import { generateData } from './generate-data.js';

const tempMapBlock = document.querySelector('#map-canvas');

const offerTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const similarOffers = generateData(1);

similarOffers.forEach( (of) => {
  const offerElement = offerTemplate.cloneNode(true);
  offerElement.querySelector('.popup__title').textContent = of.offer.title;
  offerElement.querySelector('.popup__text--address').textContent = of.offer.address;
  offerElement.querySelector('.popup__text--price').textContent = `${of.offer.price} ₽/ночь`;
  const img = offerElement.querySelector('img');
  img.src = `${  of.author.avatar}`;
  tempMapBlock.appendChild(offerElement);
});

