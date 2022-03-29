import { getData } from './ajax.js';
import { renderMarkers } from './map.js';


const COUNT_OF_ADS = 5;

getData((ads) => {
  renderMarkers(ads.slice(0, COUNT_OF_ADS));
});

