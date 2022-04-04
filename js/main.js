import {toggleFormToUnactive} from './form.js';
import {toggleMapFiltersToUnactive, adsFilter} from './form-filter.js';
import {mapInit, renderMarkers} from './map.js';
import {formValidating, onResetButton, onSubmitButton} from './form.js';
import { getData } from './ajax.js';
import { onAvatarChange } from './form-images.js';

const ADS_TO_RENDER = 10;
const TIME_TO_DELAY = 500;

toggleFormToUnactive(true);
toggleMapFiltersToUnactive(true);

mapInit(() => toggleFormToUnactive(false));
formValidating();

const allAds = [];

(async () => {
  const fetchedAds = await getData();
  allAds.push(...fetchedAds);
  renderMarkers(allAds.slice(0, ADS_TO_RENDER));
  toggleMapFiltersToUnactive(false);
  adsFilter(allAds, TIME_TO_DELAY);
  onResetButton(() => renderMarkers(allAds.slice(0, ADS_TO_RENDER)));
  onSubmitButton(() => renderMarkers(allAds.slice(0, ADS_TO_RENDER)));
  onAvatarChange();
})();
