import { getData } from './ajax.js';
// import { renderMarkers} from './map.js';
import { render } from './map.js';


getData((ads) => {
  // renderMarkers(ads);
  render(ads);
});

// getData((ads) => {
//   checkAllFilters(ads);
//   changeFilters();
//   activateMapFilter(); // При успешной загрузке карты фильтр для карты переключается в активное состояние
//   publishFormSubmit(() => checkAllFilters(ads));
//   onButtonReset(() => checkAllFilters(ads));
// });
