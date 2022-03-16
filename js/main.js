import { generateData } from './generate-data.js';
import { getPopup } from './popup.js';
import { initForm } from './form.js';


const tempMapBlock = document.querySelector('#map-canvas');
const testPopup = generateData(1);
tempMapBlock.appendChild(getPopup(testPopup[0]));

initForm(false);
