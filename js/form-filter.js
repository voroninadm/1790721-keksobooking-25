import { renderMarkers } from './map.js';
import { debounce } from './utils.js';

const mapFilters = document.querySelector('.map__filters');
const mapFiltersElements = mapFilters.children;
const typeFilter = mapFilters.querySelector('#housing-type');
const priceFilter = mapFilters.querySelector('#housing-price');
const roomsFilter = mapFilters.querySelector('#housing-rooms');
const guestsFilter = mapFilters.querySelector('#housing-guests');
const featuresFilter = mapFilters.querySelectorAll('.map__checkbox');

const DEFAULT_VALUE = 'any';
const COUNT_OF_ADS = 10;

const priceMapFilter = {
  low: {
    start: 0,
    end: 10000,
  },
  middle: {
    start: 10000,
    end: 50000,
  },
  high: {
    start: 50000,
    end: 1000000,
  },
};

const checkType = (ad) => typeFilter.value === ad.offer.type || typeFilter.value === DEFAULT_VALUE;

const checkPrice = (ad) => priceFilter.value === DEFAULT_VALUE || (ad.offer.price >= priceMapFilter[priceFilter.value].start && ad.offer.price <= priceMapFilter[priceFilter.value].end);

const checkRooms = (ad) => ad.offer.rooms === +roomsFilter.value || roomsFilter.value === DEFAULT_VALUE;

const checkGuests = (ad) => ad.offer.guests === +guestsFilter.value || guestsFilter.value === DEFAULT_VALUE;

const checkFeatures = (ad) => Array.from(featuresFilter)
  .every((feature) => {
    if (!feature.checked) {
      return true;
    }
    if (!ad.offer.features) { // если нет предлождения
      return false;
    }
    return ad.offer.features.includes(feature.value);
  });


//=======FILTERS DISABLING-ACTIVATING
const toggleMapFiltersToUnactive = (value) => {
  mapFilters.classList.toggle('map__filters--disabled', value);
  for (const element of mapFiltersElements) {
    element.disabled = value;
  }
};


// Отфильтрованные объявления
const checkAllFilters = (ads)  => {
  const filteredData = [];
  for (let i = 0; i < ads.length; i++) {
    const ad = ads[i];
    if (
      checkType(ad) &&
      checkPrice(ad) &&
      checkRooms(ad) &&
      checkGuests(ad) &&
      checkFeatures(ad)
    ) {
      filteredData.push(ad);
    }
    if (filteredData.length === COUNT_OF_ADS) {
      break;
    }
  }

  return filteredData;
};

const adsFilter = (array, cb) => {
  mapFilters.addEventListener('change', debounce(() => {
    cb();
    const filteredArray = checkAllFilters(array);
    renderMarkers(filteredArray);
  }));
};

export {
  adsFilter,
  toggleMapFiltersToUnactive
};
