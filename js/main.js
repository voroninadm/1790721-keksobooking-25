// import { generateData } from './generate-data.js';
import { initForm } from './form.js';
import { mapInit } from './map.js';

initForm(true);
mapInit(initForm(false));
