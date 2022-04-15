import {toggleFormToUnactive} from './form.js';
import {toggleMapFiltersToUnactive, checkAdsFiltering} from './form-filter.js';
import {mapInit, renderMarkers} from './map.js';
import {formValidating, checkResetButton, checkSubmitButton} from './form.js';
import { getData } from './ajax.js';
import { checkAvatarChange, checkImageAdd } from './form-images.js';

const ADS_TO_RENDER = 10;
const TIME_TO_DELAY = 500;

toggleFormToUnactive(true);
toggleMapFiltersToUnactive(true);

mapInit(() => toggleFormToUnactive(false));
formValidating();

const allAds = [];

//main async get
(async () => {
  const fetchedAds = await getData();
  allAds.push(...fetchedAds);
  renderMarkers(allAds.slice(0, ADS_TO_RENDER));
  toggleMapFiltersToUnactive(false);
  checkAdsFiltering(allAds, TIME_TO_DELAY);
  checkAvatarChange();
  checkImageAdd();
  checkResetButton(() => renderMarkers(allAds.slice(0, ADS_TO_RENDER)));
  checkSubmitButton(() => renderMarkers(allAds.slice(0, ADS_TO_RENDER)));
})();
