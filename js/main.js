import { initForm } from './form.js';
import { mapInit } from './map.js';
// import { renderMarker } from './map.js';

initForm(true);
mapInit(initForm(false));
