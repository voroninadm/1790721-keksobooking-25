import {toggleFormToUnactive} from './form.js';
import {toggleMapFiltersToUnactive, adsFilter} from './form-filter.js';
import {mapInit, renderMarkers} from './map.js';
import {formValidating, onResetButton, onSubmitButton} from './form.js';
import { getData } from './ajax.js';

const timeToDelay = 500;

toggleFormToUnactive(true);
toggleMapFiltersToUnactive(true);

mapInit(() => toggleFormToUnactive(false));
formValidating();

const allAds = [];

(async () => {
  const fetchedAds = await getData();
  allAds.push(...fetchedAds);
  renderMarkers(allAds.slice(0, 10));
  toggleMapFiltersToUnactive(false);
  adsFilter(allAds, timeToDelay);
  onResetButton(() => renderMarkers(allAds.slice(0, 10)));
  onSubmitButton();
})();
