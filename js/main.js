import { getData } from './ajax.js';
import { render } from './map.js';


getData((ads) => {
  render(ads);
});

// getData((ads) => {
//   checkAllFilters(ads);
//   changeFilters();
//   activateMapFilter(); // При успешной загрузке карты фильтр для карты переключается в активное состояние
//   publishFormSubmit(() => checkAllFilters(ads));
//   onButtonReset(() => checkAllFilters(ads));
// });
