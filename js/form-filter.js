import { renderMarkers, clearMarkers } from './map.js';
import { debounce } from './utils.js';

const mapFilters = document.querySelector('.map__filters');
const mapFiltersElements = mapFilters.children;
const typeFilter = mapFilters.querySelector('#housing-type');
const priceFilter = mapFilters.querySelector('#housing-price');
const roomsFilter = mapFilters.querySelector('#housing-rooms');
const guestsFilter = mapFilters.querySelector('#housing-guests');

const DEFAULT_VALUE = 'any';
const COUNT_OF_ADS = 10;

const PriceMapFilter = {
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
    end: Infinity,
  },
};

//filter functions
const checkType = (ad) => typeFilter.value === ad.offer.type || typeFilter.value === DEFAULT_VALUE;

const checkPrice = (ad) => priceFilter.value === DEFAULT_VALUE || (ad.offer.price >= PriceMapFilter[priceFilter.value].start && ad.offer.price <= PriceMapFilter[priceFilter.value].end);

const checkRooms = (ad) => ad.offer.rooms.toString() === roomsFilter.value || roomsFilter.value === DEFAULT_VALUE;

const checkGuests = (ad) => ad.offer.guests.toString() === guestsFilter.value || guestsFilter.value === DEFAULT_VALUE;

const getSelectedChekboxes = () => Array.from(document.querySelectorAll('input[name="features"]:checked')).map((cb) => cb.value) ;

const checkFeatures = (ad) => {
  const adFeatures = ad.offer.features;
  const selectedFeatures = getSelectedChekboxes();
  if (selectedFeatures.length === 0) {
    return true;
  }
  if (adFeatures) {
    return selectedFeatures.every((feature) => adFeatures.includes(feature));
  }
  return false;
};

//main filter check function
const checkAllFilters = (ads)  =>
  ads.filter((ad) => checkType(ad) && checkPrice(ad) && checkRooms(ad) && checkGuests(ad) && checkFeatures(ad)).slice(0, COUNT_OF_ADS);

//filters disabling-activating
const toggleMapFiltersToUnactive = (isActive) => {
  mapFilters.classList.toggle('map__filters--disabled', isActive);
  for (const element of mapFiltersElements) {
    element.disabled = isActive;
  }
};

//reset checked map filters
const mapFiltersReset = () => {
  mapFilters.reset();
};

//handler. on filter change
const checkChangeFilters = (cb) => {
  mapFilters.addEventListener('change', () => {
    clearMarkers();
    cb(checkAllFilters());
  });
};

//handler. filtering ads
const checkAdsFiltering = (array, timeToDelay) => {
  mapFilters.addEventListener('change', debounce(() => {
    clearMarkers();
    const filteredArray = checkAllFilters(array);
    renderMarkers(filteredArray);
  }, timeToDelay));
};

export {
  checkAdsFiltering,
  toggleMapFiltersToUnactive,
  checkChangeFilters,
  checkAllFilters,
  mapFiltersReset
};
