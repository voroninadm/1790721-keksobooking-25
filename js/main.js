import { initForm } from './form.js';
import { mapInit } from './map.js';
import { getData } from './ajax.js';
import { renderMarkers } from './map.js';

initForm(true);
mapInit(initForm(false));

const COUNT_OF_ADS = 3;

//get data by ajax
getData((ads) => {
  renderMarkers(ads.slice(0, COUNT_OF_ADS));
});

