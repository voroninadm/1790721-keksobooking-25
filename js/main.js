import { generateData } from './generate-data.js';
import { initForm } from './form.js';
import { mapInit, renderMarker} from './map.js';

initForm(true);
mapInit(initForm.bind(false));

const adsArray = generateData(10);
adsArray.forEach((ad) => {
  renderMarker(ad);
});
