import { generateData } from './generate-data.js';
import { getPopup } from './popup.js';
import { toggleFormToUnactive } from './form.js';
import  './form.js';

const tempMapBlock = document.querySelector('#map-canvas');
const testPopup = generateData(1);
tempMapBlock.appendChild(getPopup(testPopup[0]));

toggleFormToUnactive(false);
