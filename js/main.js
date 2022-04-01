import {toggleFormToUnactive} from './form.js';
import {toggleMapFiltersToUnactive, adsFilter} from './form-filter.js';
import {mapInit, renderMarkers, clearMarkers} from './map.js';
import {formValidating, onResetButton, onSubmitButton} from './form.js';
import { getData } from './ajax.js';
// import {debounce} from './utils.js';


// const timeToDelay = 500;


//блок формы
toggleFormToUnactive(true);
//блок фильтров
toggleMapFiltersToUnactive(true);


//инит карты с включением объявления
mapInit(() => toggleFormToUnactive(false));

//валидация формы
formValidating();

getData((ads) => {
  renderMarkers(ads.slice(0, 10));
  toggleMapFiltersToUnactive(false);
  adsFilter(ads, () => clearMarkers());
  onSubmitButton();
  onResetButton();
});
