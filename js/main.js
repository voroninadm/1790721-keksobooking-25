// import { getData } from './ajax.js'; --было
// import { render } from './map.js';


import {toggleFormToUnactive} from './form.js';
import {toggleMapFiltersToUnactive} from './form-filter.js';
import {mapInit} from './map.js';
import {formValidating} from './form.js';
// import { getData } from './ajax.js';


// getData((ads) => { -- было
//   render(ads);
// });


// , checkAllFilters, onChangeFilters --to filt
//, renderMarkers - to map
// const timeToDelay = 500;


//блок формы
toggleFormToUnactive(true);
//блок фильтров
toggleMapFiltersToUnactive(true);


//инит карты с включением объявления
mapInit(() => toggleFormToUnactive(false));

//валидация формы
formValidating();


/*
------- гет дата
getData((ads);

-открываем фильтры
toggleMapFiltersToUnactive(false);

-чекаем фильтры
checkAllFilters(ads);

-отрисовка маркеров
renderMarkers(ads);

-слушаем изменения фильтров
onChangeFilters(debounce =>(checkAllFilters(ads), timeToDelay))

--cлушаем ресет

--слушаем отправку данных

}


*/
